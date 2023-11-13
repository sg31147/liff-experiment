const axios = require('axios')
const express = require('express')
const cors = require('cors')

const templateJSON = require('./template.json')

require('dotenv').config()

const app = express()
app.use(cors())
const port = 8888

const LINE_API_URL = 'https://api.line.me/v2/bot/message/push'
const LINT_BOT_API_URL = 'https://api.line.me/v2/bot/user'

// const LINE_REPLY_URL = 'https://api.line.me/v2/bot/message/reply'
// const LINE_RICH_MENU_API_URL = 'https://api.line.me/v2/bot/richmenu'

const LINE_ACCESS_TOKEN = process.env.LINE_ACCESS_TOKEN

app.use(express.json())

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${LINE_ACCESS_TOKEN}`
}

// send message
const sendMessage = async (userUid, message) => {
  const body = {
    'to': userUid,
    'messages': [
      {
        'type': 'text',
        'text': message
      }
    ]
  }
  const response = await axios.post(LINE_API_URL, body, { headers })
  return response
}

// send Flex Message
const sendFlexMessage = async (userUid, message) => {
  try {
    let contents = Object.assign({}, templateJSON)
    contents.body.contents[0].text = message

    const body = {
      to: userUid,
      messages: [
        {
          type: "flex",
          altText: "this is a flex message",
          contents
        }
      ]
    }
    console.log('body', JSON.stringify(body))
    const response = await axios.post(LINE_API_URL, body, { headers })
    return response
  } catch (error) {
    // console.log(error.response)
    throw new Error(error.message)
  }
}

const defaultRichmenu = async () => {
  try {
    const response = await axios.get(
      `${LINT_BOT_API_URL}/all/richmenu`,
      { headers }
    )
    return response
  } catch (error) {

  }
}

const updateRichmenu = async (userUid, richmenuId) => {
  try {
    const response = await axios.post(
      `${LINT_BOT_API_URL}/${userUid}/richmenu/${richmenuId}`,
      {},
      { headers }
    )
    return response
  } catch (error) {
    throw new Error(error.message)
  }
  
}


// API Zone

app.post('/send-message', async (req, res) => {
  const { userUid, message } = req.body

  try {
    const response = await sendFlexMessage(userUid, message)
    console.log('=== LINE log', response.data)
    res.json({
      message: 'Message OK'
    })
  } catch (error) {
    console.log('error', error.response.data)
    res.status(400).json({
      error: error.response
    })
  }
})

app.post('/webhook', async (req, res) => {
  const { events } = req.body

  console.log('body', req.body)

  if (!events || events.length <= 0) {
    console.log('error event not found')
    res.json({
      message: 'event not found !'
    })
    return false
  }

  try {
    const lineEvent = events[0]
    const lineUserID = lineEvent.source.userId
    let commandMessage = ''

    if (lineEvent.type === 'message') {
      console.log('message', lineEvent.message.text)
      if (lineEvent.message.text === 'อยากกลับบ้าน') {
        commandMessage = 'back'
      }
    }

    // send back message ด้วย userId
    // const response = await sendMessage(lineUserID, 'Hello from webhook')

    // update richmenu ด้วย userId
    if (commandMessage === 'back') {
      const richmenuResponse = await defaultRichmenu()
      const response = await updateRichmenu(lineUserID, richmenuResponse.data.richMenuId)
      console.log('=== LINE log', response.data)
    }
  } catch (error) {
    console.log('error', error)
  }
})

app.listen(port, async () => {
  console.log(`Express app listening at http://localhost:${port}`)
})
