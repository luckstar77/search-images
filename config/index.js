module.exports = {
  production: false,
  origin: 'http://localhost:3000',
  cookieKey: '',
  secret: '',
  mongo: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/stage',
    host: process.env.MONGO_HOST,
    database: process.env.MONGO_DATABASE,
  },
  PORT: process.env.PORT || 4000,
  GRAPHQL_PORT: process.env.GRAPHQL_PORT || 4001,
  SECRET_KEY: process.env.SECRET_KEY || '',
  UNSPLASH_AK: process.env.UNSPLASH_AK || '',
  UNSPLASH_SK: process.env.UNSPLASH_SK || '',
  PIXABAY_AK: process.env.PIXABAY_AK || '',
  STORYBLOCKS_PK:
  process.env.STORYBLOCKS_PK || '',
  STORYBLOCKS_PRK:
    process.env.STORYBLOCKS_PRK || '',
};
