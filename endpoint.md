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


**nex URL**
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