### Quict Start

1. set ENV in docker-compose
      - SECRET_KEY=random secret string
      - UNSPLASH_AK=unsplash access key
      - UNSPLASH_SK=unsplash secret key
      - PIXABAY_AK=pixabay access key
      - STORYBLOCKS_PK=storyblocks public key
      - STORYBLOCKS_PRK=storyblocks private key
2. ```docker-compose build```
3. ```docker-compose up -d```
4. signup on http://127.0.0.1:4002/graphql
5. login to get authorization token
6. search with key and authorization

### Graphql Example
```
query {
  search(key:"city" authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7Il9pZCI6IjVlNjNhOWMxMTgxOTlkNGQ4MjVlMGFkMSIsInVzZXJuYW1lIjoidGVzdCJ9LCJleHAiOjE1ODM1OTE2NDUsImlhdCI6MTU4MzU5MDc0NX0.j3KmFgt1mgYM7UZA0h8dqFAzhqwxCDod4ulvIRgEU_s") {
    image_ID
    thumbnails
    preview
    title
    source
    tags
  }
}

mutation {
  signup(username:"test" password:"test")
  login(username:"test" password:"test")
  logout(authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7Il9pZCI6IjVlNjM5YjlhNzU1NzA1M2Q2ZTAxZDFmYiIsInVzZXJuYW1lIjoidGVzdCJ9LCJleHAiOjE1ODM1ODc4NjYsImlhdCI6MTU4MzU4Njk2Nn0.PuO0NSy2hFGFgCtljxsehWprxvsZSQv6bm3eoTlrfko")
}
```