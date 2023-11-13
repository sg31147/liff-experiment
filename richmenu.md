## สร้าง richmenu

```shell
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
                "richMenuAliasId": "richmenu-7086ef2e70b367e0e70875ecaee57b5f",
                "data": ""
            }
        }
    ]
}'
```

## upload richmenu

```shell
curl -v -X POST https://api-data.line.me/v2/bot/richmenu/richmenu-cc1294da148c6dd91357b1d22188df86/content \
-H "Authorization: Bearer c4EllYGi1e8OiWUmJezse+ZCqs1dinkawgj+Mn/3zth6W+gfMjU2Tp5zLNFPzPAO64w3F/uycYW6EpwSq0Q2gmIY2QgSSr3SrnJeLa3b8Rc4r2mX09z4Vm/tqm689sy1J7g6/KCtBWFZKyvm70J1agdB04t89/1O/w1cDnyilFU=" \
-H "Content-Type: image/png" \
-T ./images/800x270.png
```

## set default richmenu

```shell
curl -v -X POST https://api.line.me/v2/bot/user/all/richmenu/richmenu-7086ef2e70b367e0e70875ecaee57b5f \
-H "Authorization: Bearer c4EllYGi1e8OiWUmJezse+ZCqs1dinkawgj+Mn/3zth6W+gfMjU2Tp5zLNFPzPAO64w3F/uycYW6EpwSq0Q2gmIY2QgSSr3SrnJeLa3b8Rc4r2mX09z4Vm/tqm689sy1J7g6/KCtBWFZKyvm70J1agdB04t89/1O/w1cDnyilFU="
```

## delete default rich menu

```shell
curl -v -X DELETE https://api.line.me/v2/bot/user/all/richmenu \
-H "Authorization: Bearer c4EllYGi1e8OiWUmJezse+ZCqs1dinkawgj+Mn/3zth6W+gfMjU2Tp5zLNFPzPAO64w3F/uycYW6EpwSq0Q2gmIY2QgSSr3SrnJeLa3b8Rc4r2mX09z4Vm/tqm689sy1J7g6/KCtBWFZKyvm70J1agdB04t89/1O/w1cDnyilFU="
```

https://lineforbusiness.com/richmenumaker