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
| Version | Vailable |
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
```
**example**
```markdown
{{baseURL}}{{next}}/register

http://localhost:3000/v1/authentificates/register
_________________________________________________
```