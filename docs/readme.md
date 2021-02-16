# Noaki API

This API use http/1.1 REST for interact with KamiToon service

# Base URL
```
http://localhost:3000/
```
For check if API is working, get `http://localhost:3000/`

# Version
For call endpoints you must specify an version like: `http://localhost:3000/v1`

| Version | Available          | Status      |
|---------|--------------------|-------------|
| v1      | :white_check_mark: | maintained  |
| next ?  | -                  | not planned |

# Errors
API has good error support if he is an expected error
```js
{
  data: null,
  errors: [
    {
      code: 'error code', // obligatory
      message: 'error message', // normally all the time followed by the error code
      data: {}, // optional
    }
  ],
}
```
If an unexpected error occurred, Naoki send a page with an error ID (this error has been saved in DataBase with most informations like stack, name, message)

# Authentification
For authentificate your account you must add `Authorization` in header, some endpoints didn't require authorization
```js
{
  // your token
  Authorization: 'NjAyYWY5ODAwZmUxZGYyODg4OGI5MjNhLjM5Njk5MTI5MDMuMTAzNzY='
}
```

# Mime-Type
!! Naoki only accept application/json mime-type for the moment