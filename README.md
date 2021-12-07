# socar-backend
🚗  쏘카아아아악퉷  🚙

<br/>

## 역할 분배
|HTTP METHOD| API | 담당자 | path | 완료 |
| :----: | :----: | :----: | :----: | :----: |
|GET|[차량 플랜] 나의 예약|이다은|/my/rent| ✅ |
|GET|[차량 플랜] 추천 차량|이다은|/my/recommend| ✅ |
|GET|[차량 예약] 차량 필터 리스트|박나희|/reserve| ✅ |
|PUT|[차량 예약] 하트 버튼 클릭|이다은|/my/favorite| ✅ |

<br/>

## 폴더링
```
 ── socar-backend
    ├── firebase.json
    ├── functions
    │   ├── api
    │   │   ├── index.js
    │   │   └── routes
    │   │       ├── index.js
    │   │       ├── my
    │   │       │   ├── favoritePOST.js
    │   │       │   ├── index.js
    │   │       │   ├── recommendGET.js
    │   │       │   └── rentGET.js
    │   │       └── reserve
    │   │           ├── index.js
    │   │           └── reserveGET.js
    │   ├── config
    │   │   └── dbConfig.js
    │   ├── constants
    │   │   ├── responseMessage.js
    │   │   └── statusCode.js
    │   ├── db
    │   │   ├── db.js
    │   │   ├── index.js
    │   │   ├── my.js
    │   │   └── reserve.js
    │   ├── index.js
    │   ├── lib
    │   │   ├── convertDate.js
    │   │   ├── convertSnakeToCamel.js
    │   │   └── util.js
    │   └── package.json
    ├── package-lock.json
    └── package.json
```

<br/>

## git 전략

![image](https://user-images.githubusercontent.com/71601985/145086014-e86b0475-a270-4b6b-b675-e83ea69539bb.png)

<br/>

## API Docs
Base URL: [https://asia-northeast3-socar-server-814e9.cloudfunctions.net/api](https://asia-northeast3-socar-server-814e9.cloudfunctions.net/api)

<details>
<summary>`GET` [차량 플랜] 나의 예약</summary>

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
    "message": "나의 예약 조회 성공",
    "data": [
        {
            "date": "02 sat",
            "location": "신라스테이 삼성",
            "address": "서울특별시 강남구 영동대로 506"
        },
        {
            "date": "12 tue",
            "location": "신림현대아파트 주차장",
            "address": "서울특별시 관악구 신림로 29길 8"
        },
        {
            "date": "21 thu",
            "location": "신림 포도몰 주차장",
            "address": "서울특별시 관악구 신림로 330"
        }
    ]
}
```
</details>

<details>
<summary>`GET` [차량 플랜] 추천 차량</summary>    

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
    "message": "추천 차량 조회 성공",
    "data": [
        {
            "carName": "투싼(경유)",
            "priceUnit": "월",
            "price": 503000,
            "discountRate": 26,
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/socar-server-814e9.appspot.com/o/car%2Ftosan.png?alt=media"
        },
        {
            "carName": "카니발 11인승",
            "priceUnit": "월",
            "price": 653000,
            "discountRate": 16,
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/socar-server-814e9.appspot.com/o/car%2Fcarnival11.png?alt=media"
        },
        {
            "carName": "올뉴모닝",
            "priceUnit": "월",
            "price": 454000,
            "discountRate": 15,
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/socar-server-814e9.appspot.com/o/car%2Fallnewmorning.png?alt=media"
        },
        {
            "carName": "더뉴아반떼",
            "priceUnit": "월",
            "price": 385000,
            "discountRate": 37,
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/socar-server-814e9.appspot.com/o/car%2Fthenewavante.png?alt=media"
        }
    ]
}
```
</details>

<details>
<summary>`GET` [차량 예약] 차량 필터 리스트</summary>

- 쿼리 보내는 형식 (필터가 안 걸려있는 쿼리 값은 보내지 않으셔도 됩니다.)
    
```
/reserve?start=20211113&end=20211115&type=준중형&location=서울/경기/인천&price=desc&trend=true
```
    
- 예시
    
```
/reserve?start=202111118&end=20211128&type=준중형&location=서울/경기/인천&price=desc
```
    

### REQUEST HEADER

```
REQUEST HEADER
{
	userId: int,
}
```

### RESPONSE BODY

- 조회 성공

```jsx
{
    "status": 200,
    "success": true,
    "message": "예약 가능한 차량 리스트 조회 성공",
    "data": [
        {
            "carId": 2,
            "carName": "더뉴아반떼",
            "modelYear": "2018년~2019년",
            "priceUnit": "월",
            "price": 385000,
            "discountRate": 37,
            "currentLocation": "신림 포도몰 주차장",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/socar-server-814e9.appspot.com/o/car%2Fthenewavante.png?alt=media",
            "isLiked": false
        },
        {
            "carId": 1,
            "carName": "투싼(경유)",
            "modelYear": "2016년~2017년",
            "priceUnit": "월",
            "price": 503000,
            "discountRate": 26,
            "currentLocation": "신림현대아파트 주차장",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/socar-server-814e9.appspot.com/o/car%2Ftosan.png?alt=media",
            "isLiked": false
        },
        {
            "carId": 5,
            "carName": "올뉴K3",
            "modelYear": "2018년~2019년",
            "priceUnit": "월",
            "price": 542000,
            "discountRate": 16,
            "currentLocation": "신림현대아파트 주차장",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/socar-server-814e9.appspot.com/o/car%2Fallnewk3.png?alt=media",
            "isLiked": false
        },
        {
            "carId": 4,
            "carName": "코나",
            "modelYear": "2018년~2019년",
            "priceUnit": "월",
            "price": 579000,
            "discountRate": 14,
            "currentLocation": "신라스테이 삼성",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/socar-server-814e9.appspot.com/o/car%2Fcona.png?alt=media",
            "isLiked": false
        }
    ]
}
```

- start와 end 둘 중 하나만 작성한 경우 / userId 없는 경우
    
```jsx
{
    "status": 400,
    "success": false,
    "message": "필요한 값이 없습니다"
}
```
</details>    
<details>
<summary>`PUT` [차량 예약] 하트 버튼 클릭</summary>

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
    "message": "좋아요 상태 변경 성공",
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
