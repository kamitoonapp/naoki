# Endpoints

# Preface

**base URL**
```
baseURL -> http://localhost:3000/
```

# Main
## Main
Check if API send everything and he is working


**Next URL**
```
GET /
```

**example**
```markdown
{{baseURL}}/

http://localhost:3000/
______________________
```

# Version
API version
| Version | Available |
|---------|----------|
| **v1**  | true     |

**next URL**
```
GET nextURL -> /v{{version}}
```
**example**
```markdown
{{baseURL}}/v1

http://localhost:3000/v1
________________________
```

# Authentificates
```markdown
GET nextURL -> {{baseURL}}{{nextURL}}/authentificates

http://localhost:3000/v1/authentificates
________________________________________
```

## Register
Create account


**next URL**
```
POST /register

body
  |-> acceptCGU: boolean
  |-> username: string
  |-> email: string
  |-> password: string
```
**example**
```markdown
{{baseURL}}{{nextURL}}/register

http://localhost:3000/v1/authentificates/register
_________________________________________________
```

## Login
Login account


**next URL**
```
POST /login

body
  |-> email: string
  |-> password: string
```
**example**
```markdown
{{baseURL}}{{nextURL}}/login

http://localhost:3000/v1/authentificates/login
______________________________________________
```

# User
```markdown
GET nextURL -> {{baseURL}}{{nextURL}}/users

http://localhost:3000/v1/users
______________________________
```

## User
Get user data


**next URL**
```
GET /:id

params
  |-> id: ObjectID
```
**example**
```markdown
{{baseURL}}{{nextURL}}/:id

http://localhost:3000/v1/users/602af9800fe1df28888b923a
_______________________________________________________
```
## @me
Get personnal data


**next URL**
```
GET /@me
```
**example**
```markdown
{{baseURL}}{{nextURL}}/@me

http://localhost:3000/v1/users/@me
__________________________________
```
## @me
Modify personnal data


**next URL**
```
PATCH /@me

body
  |-> email?: string
  |-> username?: string
```
**example**
```markdown
{{baseURL}}{{nextURL}}/@me

http://localhost:3000/v1/users/@me
__________________________________
```

## webtoon
Add webtoon


**next URL**
```
PUT /webtoons/:id
```
**example**
```markdown
{{baseURL}}{{nextURL}}/webtoons/:id

http://localhost:3000/v1/users/webtoons/5448gerg64564485
________________________________________________________
```

## webtoon
Remove webtoon


**next URL**
```
DELETE /@me
```
**example**
```markdown
{{baseURL}}{{nextURL}}/webtoon/:id

http://localhost:3000/v1/users/webtoons/5448gerg64564485
________________________________________________________
```