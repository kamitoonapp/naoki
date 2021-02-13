# Noaki API

This API use http/1.1 REST for interact with KamiToon service

## Base URL
```
http://localhost:3000/
```
For check if API is working, get `http://localhost:3000/`

## Version
For call endpoints you must specify an version like: `http://localhost:3000/v1`

| Version | Available          | Status      |
|---------|--------------------|-------------|
| v1      | :white_check_mark: | maintained  |
| next ?  | -                  | not planned |

## Errors
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
## Authentification
For authentificate your account you must add `Authorization` in header, some endpoints didn't require authorization
```js
{
  Authorization: 'Bearer 4g8f5g64hghf8dsq51gf6x4bfderghg4dfdb==' // Bearer + your token
}
```