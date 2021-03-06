# socar-backend
π  μμΉ΄μμμμν·  π

<br/>

## λ΄λΉμ
|HTTP METHOD| API | λ΄λΉμ | path | μλ£ |
| :----: | :----: | :----: | :----: | :----: |
|GET|[μ°¨λ νλ] λμ μμ½|μ΄λ€μ|/my/rent| β |
|GET|[μ°¨λ νλ] μΆμ² μ°¨λ|μ΄λ€μ|/my/recommend| β |
|GET|[μ°¨λ μμ½] μ°¨λ νν° λ¦¬μ€νΈ|λ°λν¬|/reserve| β |
|PUT|[μ°¨λ μμ½] ννΈ λ²νΌ ν΄λ¦­|μ΄λ€μ|/my/favorite| β |

<br/>

## ν΄λλ§
```
 ββ socar-backend
    βββ firebase.json
    βββ functions
    βΒ Β  βββ api
    βΒ Β  βΒ Β  βββ index.js
    βΒ Β  βΒ Β  βββ routes
    βΒ Β  βΒ Β      βββ index.js
    βΒ Β  βΒ Β      βββ my
    βΒ Β  βΒ Β      βΒ Β  βββ favoritePOST.js
    βΒ Β  βΒ Β      βΒ Β  βββ index.js
    βΒ Β  βΒ Β      βΒ Β  βββ recommendGET.js
    βΒ Β  βΒ Β      βΒ Β  βββ rentGET.js
    βΒ Β  βΒ Β      βββ reserve
    βΒ Β  βΒ Β          βββ index.js
    βΒ Β  βΒ Β          βββ reserveGET.js
    βΒ Β  βββ config
    βΒ Β  βΒ Β  βββ dbConfig.js
    βΒ Β  βββ constants
    βΒ Β  βΒ Β  βββ responseMessage.js
    βΒ Β  βΒ Β  βββ statusCode.js
    βΒ Β  βββ db
    βΒ Β  βΒ Β  βββ db.js
    βΒ Β  βΒ Β  βββ index.js
    βΒ Β  βΒ Β  βββ my.js
    βΒ Β  βΒ Β  βββ reserve.js
    βΒ Β  βββ index.js
    βΒ Β  βββ lib
    βΒ Β  βΒ Β  βββ convertDate.js
    βΒ Β  βΒ Β  βββ convertSnakeToCamel.js
    βΒ Β  βΒ Β  βββ util.js
    βΒ Β  βββ package.json
    βββ package-lock.json
    βββ package.json
```

<br/>

## git μ λ΅

![image](https://user-images.githubusercontent.com/71601985/145086014-e86b0475-a270-4b6b-b675-e83ea69539bb.png)

<br/>

## API Docs
Base URL: [https://asia-northeast3-socar-server-814e9.cloudfunctions.net/api](https://asia-northeast3-socar-server-814e9.cloudfunctions.net/api)

<details>
<summary>`GET` [μ°¨λ νλ] λμ μμ½</summary>

### path: `/my/rent`

### REQUEST HEADER
```
{
	userId: int
}

EX)
{
	userId: 3
}
```

### RESPONSE BODY

```json
{
    "status": 200,
    "success": true,
    "message": "λμ μμ½ μ‘°ν μ±κ³΅",
    "data": [
        {
            "date": "02 sat",
            "location": "μ λΌμ€νμ΄ μΌμ±",
            "address": "μμΈνΉλ³μ κ°λ¨κ΅¬ μλλλ‘ 506"
        },
        {
            "date": "12 tue",
            "location": "μ λ¦ΌνλμννΈ μ£Όμ°¨μ₯",
            "address": "μμΈνΉλ³μ κ΄μκ΅¬ μ λ¦Όλ‘ 29κΈΈ 8"
        },
        {
            "date": "21 thu",
            "location": "μ λ¦Ό ν¬λλͺ° μ£Όμ°¨μ₯",
            "address": "μμΈνΉλ³μ κ΄μκ΅¬ μ λ¦Όλ‘ 330"
        }
    ]
}
```
</details>

<details>
<summary>`GET` [μ°¨λ νλ] μΆμ² μ°¨λ</summary>    

### path: `/my/recommend`

### REQUEST HEADER

```
{
	userId: int,
}

EX)
{
	userId: 4,
}
```

### RESPONSE BODY

```json

{
    "status": 200,
    "success": true,
    "message": "μΆμ² μ°¨λ μ‘°ν μ±κ³΅",
    "data": [
        {
            "carName": "ν¬μΌ(κ²½μ )",
            "priceUnit": "μ",
            "price": 503000,
            "discountRate": 26,
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/socar-server-814e9.appspot.com/o/car%2Ftosan.png?alt=media"
        },
        {
            "carName": "μΉ΄λλ° 11μΈμΉ",
            "priceUnit": "μ",
            "price": 653000,
            "discountRate": 16,
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/socar-server-814e9.appspot.com/o/car%2Fcarnival11.png?alt=media"
        },
        {
            "carName": "μ¬λ΄λͺ¨λ",
            "priceUnit": "μ",
            "price": 454000,
            "discountRate": 15,
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/socar-server-814e9.appspot.com/o/car%2Fallnewmorning.png?alt=media"
        },
        {
            "carName": "λλ΄μλ°λΌ",
            "priceUnit": "μ",
            "price": 385000,
            "discountRate": 37,
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/socar-server-814e9.appspot.com/o/car%2Fthenewavante.png?alt=media"
        }
    ]
}
```
</details>

<details>
<summary>`GET` [μ°¨λ μμ½] μ°¨λ νν° λ¦¬μ€νΈ</summary>

- μΏΌλ¦¬ λ³΄λ΄λ νμ (νν°κ° μ κ±Έλ €μλ μΏΌλ¦¬ κ°μ λ³΄λ΄μ§ μμΌμλ λ©λλ€.)
    
```
/reserve?start=20211113&end=20211115&type=μ€μ€ν&location=μμΈ/κ²½κΈ°/μΈμ²&price=desc&trend=true
```
    
- μμ
    
```
/reserve?start=202111118&end=20211128&type=μ€μ€ν&location=μμΈ/κ²½κΈ°/μΈμ²&price=desc
```
    

### REQUEST HEADER

```
REQUEST HEADER
{
	userId: int,
}
```

### RESPONSE BODY

- μ‘°ν μ±κ³΅

```jsx
{
    "status": 200,
    "success": true,
    "message": "μμ½ κ°λ₯ν μ°¨λ λ¦¬μ€νΈ μ‘°ν μ±κ³΅",
    "data": [
        {
            "carId": 2,
            "carName": "λλ΄μλ°λΌ",
            "modelYear": "2018λ~2019λ",
            "priceUnit": "μ",
            "price": 385000,
            "discountRate": 37,
            "currentLocation": "μ λ¦Ό ν¬λλͺ° μ£Όμ°¨μ₯",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/socar-server-814e9.appspot.com/o/car%2Fthenewavante.png?alt=media",
            "isLiked": false
        },
        {
            "carId": 1,
            "carName": "ν¬μΌ(κ²½μ )",
            "modelYear": "2016λ~2017λ",
            "priceUnit": "μ",
            "price": 503000,
            "discountRate": 26,
            "currentLocation": "μ λ¦ΌνλμννΈ μ£Όμ°¨μ₯",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/socar-server-814e9.appspot.com/o/car%2Ftosan.png?alt=media",
            "isLiked": false
        },
        {
            "carId": 5,
            "carName": "μ¬λ΄K3",
            "modelYear": "2018λ~2019λ",
            "priceUnit": "μ",
            "price": 542000,
            "discountRate": 16,
            "currentLocation": "μ λ¦ΌνλμννΈ μ£Όμ°¨μ₯",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/socar-server-814e9.appspot.com/o/car%2Fallnewk3.png?alt=media",
            "isLiked": false
        },
        {
            "carId": 4,
            "carName": "μ½λ",
            "modelYear": "2018λ~2019λ",
            "priceUnit": "μ",
            "price": 579000,
            "discountRate": 14,
            "currentLocation": "μ λΌμ€νμ΄ μΌμ±",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/socar-server-814e9.appspot.com/o/car%2Fcona.png?alt=media",
            "isLiked": false
        }
    ]
}
```

- startμ end λ μ€ νλλ§ μμ±ν κ²½μ° / userId μλ κ²½μ°
    
```jsx
{
    "status": 400,
    "success": false,
    "message": "νμν κ°μ΄ μμ΅λλ€"
}
```
</details>    
<details>
<summary>`PUT` [μ°¨λ μμ½] ννΈ λ²νΌ ν΄λ¦­</summary>

### path: `/my/favorite`

### REQUEST BODY

```
{
	userId: int,
	carId: int,
	isLiked: boolean,
}

EX)
{
    "userId": 1,
    "carId": 2,
    "isLiked": false
}
```

### RESPONSE BODY

```json
{
    "status": 200,
    "success": true,
    "message": "μ’μμ μν λ³κ²½ μ±κ³΅",
    "data": {
        "carId": 2,
        "isLiked": false
    }
}
```
</details>

<br/>

## ERD

![image](https://user-images.githubusercontent.com/71601985/145085960-24583d69-ba53-4ff1-869b-6916337fbe1a.png)
