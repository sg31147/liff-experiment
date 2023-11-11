#!/bin/bash

curl -v -X POST https://api.line.me/v2/bot/richmenu \
-H 'Authorization: Bearer c4EllYGi1e8OiWUmJezse+ZCqs1dinkawgj+Mn/3zth6W+gfMjU2Tp5zLNFPzPAO64w3F/uycYW6EpwSq0Q2gmIY2QgSSr3SrnJeLa3b8Rc4r2mX09z4Vm/tqm689sy1J7g6/KCtBWFZKyvm70J1agdB04t89/1O/w1cDnyilFU=' \
-H 'Content-Type: application/json' \
-d \
'{
    "size": {
        "width": 800,
        "height": 270
    },
    "selected": false,
    "name": "Default rich",
    "chatBarText": "Tap to open",
    "areas": [
        {
            "bounds": {
                "x": 0,
                "y": 0,
                "width": 400,
                "height": 270
            },
            "action": {
                "type": "uri",
                "label": "Open web",
                "uri": "https://mikelopster.dev"
            }
        },
        {
            "bounds": {
                "x": 401,
                "y": 0,
                "width": 400,
                "height": 270
            },
            "action": {
                "type": "richmenuswitch",
                "richMenuAliasId": "al-menu1",
                "data": "richmenu=al-menu1"
            }
        }
    ]
}'