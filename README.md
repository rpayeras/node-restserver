# Node Basic Rest Server

This is a basic API service made with Express with a db mongo for testing auth, categories, products and file uploads.

## Configure env vars

Configure your own database strings and Google credentials [Google] <https://developers.google.com/identity/protocols/oauth2>

## Docker server

```bash
docker build . -t node-docker
docker run --name node-server -d -p 3000:3000 node-docker
```

## Run project

```bash
npm run start
```

## Api Documentation

[Documentation] <https://documenter.getpostman.com/view/6185490/UVyxRZTe#b78f9eba-3193-4728-b0d8-8cc2c7e9d4a3>
