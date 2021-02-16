# Authentificates
Get user credentials or create account

# Authentification
No need credentials for this endpoint

# Endpoints
- POST register
- POST login

# Structures

## Auth Structures
| keys | types | description |
|------|-------|-------------|
| user | User Structure | User information |
| email | string | User email |
| token | string | User token |

# Requests

## register account
**POST** `/authentificates/register`

Return `Auth Structures`

### Body
| keys | types | description | required |
|------|-------|-------------|----------|
| username | string | username's user | true |
| email | string | email's user | true |
| password | string | account password | true |
| acceptCGU | true | you consent the CGU | true |

## Login account
**PORT** `/authentificates/login`

Return `Auth Structures`

### Body
| keys | types | description | required |
|------|-------|-------------|----------|
| email | string | email's user | true |
| password | string | account password | true |
