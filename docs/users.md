# Users
Get user data

# Authentification
Need user credential

# Endpoints
- GET :id
- GET @me
- PATCH @me
- PUT webtoons/:id
- DELETE webtoons/:id

# Structures

## User Structures
| keys | types | description |
|------|-------|-------------|
| _id | ObjectID | user ID |
| username | string | User information |
| discriminator | string | User discriminator |
| flags | number | User flags |
| timestamp | Date | Date of account created |
| email? | string | User email |
| avatar? | string | User avatar |
| banner? | string | User banner |
| webtoons? | WebtoonsStructure[] | User Webtoons |
| subscribes? | WebtoonsStructure[] | Use Webtoons Subscribe |

# Requests

## get user info
**GET** `/users/:id`

Return `User Structures`

## get my info
**GET** `/users/@me`

Return `User Structures`

## modify my info

## user
**PATCH** `/users/:id`

Return `User Structures`

| keys | types | description | required |
|------|-------|-------------|----------|
| username | string | username's users | false |
| email | string | email's users | false |

## Add webtoons
**PUT** `/users/webtoons/:id`

Return status code 204

## Add webtoons
**DELETE** `/users/webtoons/:id`

Return status code 204
