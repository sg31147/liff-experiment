const axios = require('axios')
const express = require('express')

require('dotenv').config()

const app = express()
const port = 8888

const LINE_API_URL = 'https://api.line.me/v2/bot/message/push'
const LINE_RICH_MENU_API_URL = 'https://api.line.me/v2/bot/richmenu'

const LINE_ACCESS_TOKEN = process.env.LINE_ACCESS_TOKEN
const RICH_MENU_ID='richmenu-0b7b847637a5dbb4a41d95f1cfaff6c8'

app.use(express.json())

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${LINE_ACCESS_TOKEN}`
}

app.post('/send-message', async (req, res) => {
  const { userUid } = req.body

  const body = {
    'to': userUid,
    'messages': [
      {
        'type': 'text',
        'text': 'Hello Message Mike'
      }
    ]
  }

  try {
    const response = await axios.post(LINE_API_URL, body, { headers })
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

  console.log('body', req.body.source)

  try {
    const lineUserID = events[0].source.userId
    console.log(events[0].source)
    // const config = {
    //   method: 'post',
    //   url: `https://api.line.me/v2/bot/user/${lineUserID}/richmenu/${RICH_MENU_ID}`,
    //   headers: {
    //     Authorization: `Bearer ${LINE_ACCESS_TOKEN}`
    //   }
    // }
    // const response = await axios(config)

    // console.log('success', response.data)
  } catch (error) {
    console.log('error', error)
  }
})

app.listen(port, async () => {
  console.log(`Express app listening at http://localhost:${port}`)
})
