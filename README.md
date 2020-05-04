# Zé Delivery Backend Challenge

## Intro

Challenge proposed by Zé Delivery in a selection process for a vacancy in Back-end Developer that consists of developing a backend application, with the requirements:

-   Develop a service that provides API using REST or GraphQL and enable the following functionalities. The programming language and the database you choose to use it is entirely up to you.

-   Create a Partner.

-   Get a Partner By Id.

-   Search partner by coordinates(latitude, longitude).

-   The project must be cross-platform.

-   Provide a documentation so we know how to execute your service locally and how to deploy it (focus on simplicity, and don't forget that we should test your service on our own, without further assistance).

First of all, I would like to thank the opportunity to be able to take the test and have the chance to join a company as innovative and commented as Zé Delivery. Given the challenge of creating a REST API I decided to use the Node.JS language due to its greater familiarity / experience.

[README of the proposed challenge](https://github.com/ZXVentures/ze-code-challenges/blob/master/backend.md)

## Demonstration

I performed a demonstration of the project running, follow link.

[Demo Video](https://youtu.be/)

PS: MAC development environment

## Project Behavior

-   **INFRASTRUCTURE**

    Docker was used to facilitate the environment, in this case the database and its initialization as the creation of the DB and collections for later import and creation of data.

-   **AUTENTHICATION**

    Due to the fact that the security of an API is essential, I performed the implementation of authentication with JWT being necessary in the header of each request in the Authorization field to insert the JWT token.

*   **DATA PERSISTENCE**

    Decidi utilizar o banco NoSQL MongoDB devido a ser um dos melhores para geolocalização contendo algumas funcionalidades interessantes.

-   **API REST**

    For the exhibition of the routes in the REST model with JSON format I used the Express micro-framework for being very lean, simple to work with and for having much more contact. I could have used Hapi or another, without any problem.

-   **TESTS**

    To perform unit and integration tests, the Mocha, Chai and Supertest facilities were used. You could also have used JEST.

-   **OTHERS**

    I used some libs for formatting, indenting and standardizing code.

# End-points

### Token

| resource             | description                            |
| :------------------- | :------------------------------------- |
| `/sessions` **POST** | Post credentials and return JWT token. |

`/sessions` **POST** - BODY

```shell
{
	"email": "ze@delivery.com",
	"password": "123456"
}
```

`/sessions` **POST** - 422 RESPONSE

```shell
{
  "error": "Incorrect E-mail/Password Combination."
}
```

`/sessions` **POST** - 200 RESPONSE

```shell
  {
  "user": {
    "name": "ZeDelivery",
    "email": "ze@delivery.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODg0NzA2ODMsImV4cCI6MTU4ODQ3MDc2OSwic3ViIjoiM2MxMzZhMzQzNTkxZTJhYTNjNzBhOGJjIn0.1aM8x6btpovCA9FZU12swp44v_gT_c_aVyfLkpYmh-0"
}
```

### Users

| resource         | description     |
| :--------------- | :-------------- |
| `/users` **GET** | Read all users. |

`/users` **POST** - 404 RESPONSE

```shell
{
  "status": 404,
  "message": "Users not found."
}
```

`/users` **POST** - 200 RESPONSE

```shell
  [
  {
    "_id": "3c136a343591e2aa3c70a8bc",
    "name": "ZeDelivery",
    "email": "ze@delivery.com",
    "__v": 0,
    "createdAt": "2020-05-03T01:52:02.728Z",
    "updatedAt": "2020-05-03T01:52:02.728Z"
  },
  {
    "_id": "f9036a343149e25a3c70a8bc",
    "name": "Harbs",
    "email": "jp@harbs.com",
    "__v": 0,
    "createdAt": "2020-05-01T03:51:00.728Z",
    "updatedAt": "2020-05-01T03:51:00.728Z"
  }
]
```

| resource                  | description            |
| :------------------------ | :--------------------- |
| `/users/{_id}` **DELETE** | Delete specified user. |

`/users/{_id}` **DELETE** - 404 RESPONSE

```shell
{
  "status": 404,
  "message": "User not found."
}
```

`/users/{_id}` **DELETE** - 204 RESPONSE

```shell
No body
```

| resource          | description  |
| :---------------- | :----------- |
| `/users` **POST** | Create user. |

`/users` **POST** - 409 RESPONSE

```shell
{
  "status": 409,
  "message": "Email Address Already Used."
}
```

`/users` **POST** - 201 RESPONSE

```shell
{
  "_id": "5eaf53c4ebdf47338c45a60f",
  "name": "ZeDelivery",
  "email": "zedelivery@test.com",
  "password": "$2a$08$jTDsXrcl8YSeNmQ8z7BWUeDO2nBSKBSZr8RKNodqhCm76i.RAty5m",
  "createdAt": "2020-05-03T23:29:08.565Z",
  "updatedAt": "2020-05-03T23:29:08.565Z",
  "__v": 0
}
```

### Partners

| resource                 | description         |
| :----------------------- | :------------------ |
| `/partners/{id}` **GET** | Read partner by ID. |

`/partners/{id}` **GET** - 404 RESPONSE

```shell
{
  "status": 404,
  "message": "Partner not found."
}
```

`/users` **GET** - 200 RESPONSE

```shell
  {
  "_id": "5eae1601a1d08883a5c72bdf",
  "id": 1,
  "tradingName": "Adega Osasco",
  "ownerName": "Ze da Ambev",
  "document": "02.453.716/000170",
  "coverageArea": {
    "type": "MultiPolygon",
    "coordinates": [
      [
        [
          [
            -43.36556,
            -22.99669
          ],
          [
            -43.36539,
            -23.01928
          ],
          [
            -43.26583,
            -23.01802
          ],
        ]
      ]
    ]
  },
  "address": {
    "type": "Point",
    "coordinates": [
      -43.297337,
      -23.013538
    ]
  },
  "__v": 0,
  "createdAt": "2020-05-03T23:20:51.187Z",
  "updatedAt": "2020-05-03T23:20:51.187Z"
}
]
```

| resource                                   | description                         |
| :----------------------------------------- | :---------------------------------- |
| `/partners/?long={long}&lat={lat}` **GET** | Read partner Nearby by Coordinates. |

`/partners/?long={long}&lat={lat}` **GET** - 404 RESPONSE

```shell
{
  "status": 404,
  "message": "Partner not found."
}
```

`/partners/?long={long}&lat={lat}` **GET** - 200 RESPONSE

```shell
{
  "id": 7,
  "tradingName": "Mercado Pinheiros",
  "ownerName": "Luiz Santo",
  "document": "06004905000116",
  "coverageArea": {
    "type": "MultiPolygon",
    "coordinates": [
      [
        [
          [
            -46.623238,
            -21.785538
          ],
          [
            -46.607616,
            -21.819803
          ],
        ]
      ]
    ]
  },
  "address": {
    "type": "Point",
    "coordinates": [
      -46.57421,
      -21.785742
    ]
  },
  "__v": 0,
  "distanceInMeters": 0.11131884575380743
}
```

| resource             | description     |
| :------------------- | :-------------- |
| `/partners` **POST** | Create Partner. |

`/partners` **POST** - 409 RESPONSE

```shell
{
  "status": 409,
  "message": "CNPJ Already Used."
}
```

`/partners/{id}` **POST** - 200 RESPONSE

```shell
{
  "_id": "5eae2a4a8bedf99a0943a1ec",
  "id": 7,
  "tradingName": "Mercado Pinheiros",
  "ownerName": "Luiz Santo",
  "document": "06004905000116",
  "coverageArea": {
    "type": "MultiPolygon",
    "coordinates": [
      [
        [
          [
            -46.623238,
            -21.785538
          ],
          [
            -46.607616,
            -21.819803
          ],
        ]
      ]
    ]
  },
  "address": {
    "type": "Point",
    "coordinates": [
      -46.57421,
      -21.785742
    ]
  },
  "__v": 0,
  "distanceInMeters": 0.11131884575380743
}
```

## Installation

### Prerequisites

To run the application it is necessary to have installed Node in version v13.7.0 or higher, Docker in version 19.03.5, build 633a0ea or higher and Docker-Compose in version 1.25.4, build 8d51620a or higher

### User to authenticate to the API

```shell
{
    "email": 'ze@delivery.com',
    "password": '123456',
}
```

### Phases

To run the application on your machine, follow these steps:

1. git clone [https://github.com/harbsprog/ze-delivery-backend-challenge.git](https://github.com/harbsprog/ze-delivery-backend-challenge.git)

2) cd ze-delivery-backend-challenget `Access the project folder`

3. yarn install `Performs installation of dependencies`

4) cp .env.example .env `Copy environment variables`

5. yarn importData `Import the Pdvs from the pdvs.json file and create a user for testing in the API`

6) yarn start `Run the application`

7. Access: http://127.0.0.1:3000/ If you present a welcome message everything went well.

## Tests

Integration tests and unit tests were carried out:

To run the integration tests run the following command:
`yarn test-integration`

To run the unit tests run the following command:
`yarn test-unit`

## Author

[Harbs](https://github.com/harbsprog)
