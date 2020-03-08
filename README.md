### DEMO
http://images.imallenlai.com:4001/graphql

### Quict Start

1. set ENV in docker-compose
      - SECRET_KEY=random secret string
      - UNSPLASH_AK=unsplash access key
      - UNSPLASH_SK=unsplash secret key
      - PIXABAY_AK=pixabay access key
      - STORYBLOCKS_PK=storyblocks public key
      - STORYBLOCKS_PRK=storyblocks private key
3. ```docker-compose up -d```
4. signup on http://127.0.0.1:4001/graphql
5. login to get authorization token on http://127.0.0.1:4001/graphql
6. search with key and authorization on http://127.0.0.1:4001/graphql
7. logout to revoke authorization token on http://127.0.0.1:4001/graphql

### Graphql Example
```
query {
  search(key:"city" authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7Il9pZCI6IjVlNjQ0OGM2N2I1ZDRjMDAxZjNjY2JkYSIsInVzZXJuYW1lIjoidGVzdCJ9LCJleHAiOjE1ODQyMzg2MTksImlhdCI6MTU4MzYzMzgxOX0.4BDOJ2e0P22keAG_5xP-H0ZN2zPaqZZCrVdhSsFa_nM") {
    image_ID
    thumbnails
    preview
    title
    source
    tags
  }
}

# mutation {
#   signup(username:"test" password:"test")
#   login(username:"test" password:"test")
# 	logout(authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7Il9pZCI6IjVlNjQ0OGM2N2I1ZDRjMDAxZjNjY2JkYSIsInVzZXJuYW1lIjoidGVzdCJ9LCJleHAiOjE1ODM2MzE0MzQsImlhdCI6MTU4MzYzMDUzNH0.cl3G4A7ybiD3pIBPJEwiCuck7QYVBJeiJTxvfTw3nac")
# }
```