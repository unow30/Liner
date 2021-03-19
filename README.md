# Liner 사전과제

## 자기소개
  안녕하십니까, 라이너 개발자 실무과제 백엔드 과제를 제출하게된 코드스테이츠 24기 수료생 김윤호 입니다.
  
  실제 업무처럼 주어진 조건을 가지고 백엔드 서버를 만드는 과정에서 많은 성취감과 아쉬움을 느꼈습니다.
  
  코드 가독성과 라우팅에 집중해서 이전보다 더욱 세분화되고 유지보수가 쉬운 코드를 만들었다는 점에서 가장 큰 성취감을 느꼈습니다.
  
  반면 sequelize 연관관계 설정과 효율적인 db 접근법을 구현하는 과정은 생각만큼 이뤄지질 않아서 아쉬움으로 남았습니다.
  
  이번 과제로 많은 고민과 좌절을 했지만, 개발자 공부에 있어 크게 도움이 되고 의미가 있는 도전이었습니다.
  
  아우름플래닛(라이너)에서 계속 도전하고 성취하는 개발자가 되고 싶습니다.
  
## db 스키마
- [dbdiagram](https://dbdiagram.io/d/604747a1fcdcb6230b233fdf)
![](https://images.velog.io/images/unow30/post/812086fe-6e98-46ef-97df-cb586f125517/image.png)

## 기능소개
### - 회원가입
- 이름과 패스워드를 입력하면 db에 저장됩니다.
- 패스워드는 sha256+salt로 저장됩니다.
- 테마는 기본적으로 '테마1'의 id를 저장합니다.
```js
   const [userInfo, created] = await User.findOrCreate(userCreateOptions(name, password))
        if (created) {
            res.status(201).json({ "message": "ok" })
        } else {
            res.status(409).json({ "error": "user is already exist" })
        }
        
    //request
    {
      "name":"라이너 유저1",
      "password": "1234"
    }
    //response
    { 
      "message": "ok"
   }
```
- users table
>![](https://images.velog.io/images/unow30/post/2a07e09f-0d11-4e09-ac52-9bce07c37b6a/image.png)
- themes table
>![](https://images.velog.io/images/unow30/post/3991f490-1202-493b-afef-8aa6e7c0d27c/image.png)
### - 로그인
- 처음 유저이름을 db에서 찾아봅니다.
- 이름이 있으면 이름과 sha256(패스워드+salt)값을 db에서 찾아봅니다.
- 본인확인이 된다면 accessToken과 refreshToken을 저장합니다.
- response값으로 accessToken과 color값을 보내줍니다.

```js
  const validUser = await User.findOne(findUserNameInDB(name))
        const loginUser = await User.findOne(validUserLogin(validUser.name, password))
        if (loginUser) {
            const colorInfo = await Color.findAll(getThemeColor(loginUser.themeId,))
            const accessToken = generateAccessToken(tokenAlements(loginUser));
            const refreshToken = generateRefreshToken(tokenAlements(loginUser));

            sendRefreshToken(res, refreshToken)
            sendAccessToken(res, accessToken, colorInfo)
 
 //request           
 {
    "name":"라이너 유저1",
    "password": "1234"
 }
 
 //response
 {
   {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IuudvOydtOuEiCDsnKDsoIAxIiwicGFzc3dvcmQiOiJkZjNiNTg1Y2E5ZDgzOTlhNzI0NWQzM2U1NzE5NTQ5NTIxNmJiMjQzZDgzMTZlMTg2YjFlY2E5NDU4ZWFlNzRjIiwidGhlbWVJZCI6MywiaWF0IjoxNjE2MTM2NzgxLCJleHAiOjE2MTYxNDM5ODF9.Cfc0H2NOT7ckOezpFELPcX9qSY7jmiZ1b2zVuvAkyX0",
    "color": [
        {
            "num": 1,
            "colorHex": "#f4ff40"
        },
        {
            "num": 2,
            "colorHex": "#8affd7"
        },
        {
            "num": 3,
            "colorHex": "#ffc477"
        }
    ],
    "message": "ok"
}
 }
```
- users table
>![](https://images.velog.io/images/unow30/post/2a07e09f-0d11-4e09-ac52-9bce07c37b6a/image.png)

### - 로그아웃
- 토큰값이 있다면 logout이 진행됩니다.
- 토큰값을 삭제하고 로그아웃 메시지를 보냅니다.

```js
    const authorization = req.headers.authorization
    if (!authorization) {
        res.status(404).json({ "error": "it can't logout" })
    } else {
        req.headers.authorization = null
        res.clearCookie('refreshToken')
        res.status(200).json({ "message": "logout success" })
    }
```

### 1. 하이라이트 저장(Create)
- barear token값을 매번 확인합니다.
- 토큰값을 해독하여 유저정보를 확인합니다.
```js
 isAuthorized: (req) => {
    const authorization = req.headers["authorization"];
    if (!authorization) {
      return null;
    }
    const token = authorization.split("Bearer ")[1];
    try {
      return verify(token, process.env.ACCESS_SECRET);
    } catch (err) {
      return "fail";
    }
  },

//request
{
  "userId": 1,
  "pageUrl": "www.google.com",
  "colorHex": "#ffff8d",
  "text": "구글에서 가져온 텍스트1"
}
//response
{
    "highlightId": 1,
    "userId": 1,
    "pageId": 1,
    "colorHex": "#ffff8d",
    "text": "구글에서 가져온 텍스트1"
}
```
- pages table
>![](https://images.velog.io/images/unow30/post/d0ed56af-60f4-413b-9678-63ffe90d99c4/image.png)
- highlights table
>![](https://images.velog.io/images/unow30/post/c6f36971-9666-47ed-986f-0d1e621d9470/image.png)
- colors table
>![](https://images.velog.io/images/unow30/post/ca2e23a7-9ecb-496f-8122-7a4aa9185ed9/image.png)

### 2. 하이라이트 수정(Update)
- highlightId는 path parameter로 받습니다.
- text가 변경되면 pages table의 해당 text를 변경합니다.
- colorHex가 변경되면 highlights table의 해당 colorId를 변경합니다.(color 관련값은 지워지지 않고 변경됩니다.)

```js
  await Highlight.findOne(findColorIdAndPageId(highlightId))
                .then(async ele => {
                    if (!colorHex) {
                        await Page.update({ text: text }, { where: { id: ele.pageId } })
                    } else if (!text) {
                        await Color.findOne(findColorId(themeId, colorHex)).then(async col => {
                            await Highlight.update({ colorId: col.id }, { where: { id: highlightId } })
                        })
                    } else {
                        await Page.update({ text: text }, { where: { id: ele.pageId } })
                        await Color.findOne(findColorId(themeId, colorHex)).then(async col => {
                            await Highlight.update({ colorId: col.id }, { where: { id: highlightId } })
                        })
                    }
```
- 변경이 되면 다음의 값을 response로 보냅니다.
```js
{
    "highlightId": 1,
    "userId": 1,
    "pageId": 1,
    "colorHex": "#ffd5c8",
    "text": "수정한 텍스트1."
}
```

### 3. 페이지 내 하이라이트 정보 가져오기(Read)
- pageId값을 받으면 pageId와 관련된 유저의 highlight 정보 1개를 가져옵니다.
```js
//request
{
  "userId": 1,
  "pageId": 2
}
//response
[
    {
        "highlightId": 2,
        "pageId": 2,
        "colorHex": "#ffd5c8",
        "text": "구글에서 가져온 텍스트2.",
        "userId": 1
    }
]
```

- pageUrl값을 받으면 userId가 작성한 pageUrl값을 지닌 모든 page정보를 highlight와 color와 함께 가져옵니다.
```js
//request
{
  "userId": 1,
  "pageUrl":"www.naver.com"
}
//response
[
    {
        "highlightId": 4,
        "pageId": 4,
        "colorHex": "#ffd5c8",
        "text": "네이버에서 가져온 텍스트3",
        "userId": 1
    },
    {
        "highlightId": 5,
        "pageId": 5,
        "colorHex": "#ffd5c8",
        "text": "네이버에서 가져온 텍스트2",
        "userId": 1
    },
    {
        "highlightId": 6,
        "pageId": 6,
        "colorHex": "#ffff8d",
        "text": "네이버에서 가져온 텍스트1",
        "userId": 1
    }
]
```

- pageId, pageUrl 둘 다 받으면 pageId를 우선합니다.

```js
//request
{
  "userId": 1,
  "pageId": 2,
  "pageUrl":"www.google.com"
}
//response
[
    {
        "highlightId": 2,
        "pageId": 2,
        "colorHex": "#ffff8d",
        "text": "구글에서 가져온 텍스트2",
        "userId": 1
    }
]
```

### 4. 유저가 하이라이트한 정보와 페이지 가져오기(Read)
- userId를 받으면 userId로 생성한 pages, highlights, color 테이블을 조인하여 가져옵니다.
- 가져온 값을 forEach로 수정합니다.

```js
 if (id === userId) {
            const pageInfo = await Page.findAll({ raw: true, userId: userId, attributes: [["id", "pageId"], "pageUrl"] })
            let arr = pageInfo.map(el => {
                return el.pageId
            })

            const result = await Highlight.findAll(getHighlightPageColor(arr, Color, Page))
            result.forEach(el => { el['userId'] = userId })

            pageInfo.forEach((el, idx) => {
                el["highlights"] = result[idx]
            })
            res.status(200).json(pageInfo)
        }
//response값

[
    {
        "pageId": 1,
        "pageUrl": "www.google.com",
        "highlights": {
            "highlightId": 1,
            "pageId": 1,
            "colorHex": "#ffd5c8",
            "text": "수정한 텍스트1.",
            "userId": 1
        }
    },
    {
        "pageId": 2,
        "pageUrl": "www.google.com",
        "highlights": {
            "highlightId": 2,
            "pageId": 2,
            "colorHex": "#ffff8d",
            "text": "구글에서 가져온 텍스트2",
            "userId": 1
        }
    },
    {
        "pageId": 3,
        "pageUrl": "www.google.com",
        "highlights": {
            "highlightId": 3,
            "pageId": 3,
            "colorHex": "#a5f2e9",
            "text": "구글에서 가져온 텍스트3",
            "userId": 1
        }
    },
    {
        "pageId": 4,
        "pageUrl": "www.naver.com",
        "highlights": {
            "highlightId": 4,
            "pageId": 4,
            "colorHex": "#ffd5c8",
            "text": "네이버에서 가져온 텍스트3",
            "userId": 1
        }
    },
    {
        "pageId": 5,
        "pageUrl": "www.naver.com",
        "highlights": {
            "highlightId": 5,
            "pageId": 5,
            "colorHex": "#ffd5c8",
            "text": "네이버에서 가져온 텍스트2",
            "userId": 1
        }
    },
    {
        "pageId": 6,
        "pageUrl": "www.naver.com",
        "highlights": {
            "highlightId": 6,
            "pageId": 6,
            "colorHex": "#ffff8d",
            "text": "네이버에서 가져온 텍스트1",
            "userId": 1
        }
    }
]
```

### 5. 하이라이트 삭제(Delete)
- highlightId는 path parameter로 받습니다.
- userId를 받고 본인확인이 완료되면, 해당 highlights table row와 page row만 지워집니다. color table은 지워지지 않습니다.

```js
await Highlight.findOne(findColorIdAndPageId(highlightId)).then(async el => {
                await Page.destroy({ where: { id: el.pageId } })
            })
            await Highlight.destroy({
                where: {
                    id: highlightId
                }
            });
```


## 6. 유저의 하이라이트 테마 변경(Update)
- theme가 변경되면 highlights table의 colorId값이 변경됩니다.

>theme1 colorId: 1,2,3
![](https://images.velog.io/images/unow30/post/27f73c82-f74c-4723-a40b-4fcbc43bd9a1/image.png)

>theme2 colorId: 4,5,6
![](https://images.velog.io/images/unow30/post/e588cf14-a141-4b28-8fe6-65c9458653d1/image.png)

>theme3 colorId: 7,8,9
![](https://images.velog.io/images/unow30/post/ed594351-e8d0-4450-a33d-fba918fdfc98/image.png)

```js
 await User.update({ themeId: themeId }, { raw: true, where: { id: userId } })
            await Page.findAll(getHighlightInfo(userId, Highlight)).then(async res => {

                const checkList = await Color.findAll(changedThemeInfo(themeId))
                const pageIdArr = res.map(ele => { return ele['pageId'] })
                const colorIdArr = res.map(elee => { return elee['colorId'] })
                const prevColorInfo = await Color.findAll(getPrevColorInfo(colorIdArr, Highlight))

                prevColorInfo.forEach(async (el, idx) => {
                    checkList.forEach(async ele => {
                        if (ele.num === el.num) {
                            await Highlight.update({ colorId: ele.id }, { where: { pageId: pageIdArr[idx] } })
                        }
                    })
                })
            })
            res.status(200).json("theme change")
```


- 테마1 -> 테마3
>테마1
>
![](https://images.velog.io/images/unow30/post/f1a9fff3-bd00-4c30-ae26-266f539b7768/image.png)
>테마3
>
![](https://images.velog.io/images/unow30/post/f1a9fff3-bd00-4c30-ae26-266f539b7768/image.png)


- 테마3 -> 테마2
>테마3
>
![](https://images.velog.io/images/unow30/post/f1a9fff3-bd00-4c30-ae26-266f539b7768/image.png)
>테마2
>
![](https://images.velog.io/images/unow30/post/b221a43c-8140-407d-850a-43e0385edac2/image.png)

## 참고링크
- [velog 과제 내용 정리](https://velog.io/@unow30/series/liner)
- [플로우차트](https://miro.com/app/board/o9J_lQxm1_4=/)
