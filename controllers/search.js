const rp = require('request-promise');
const crypto = require('crypto');
const {
  UNSPLASH_AK,
  STORYBLOCKS_PRK,
  STORYBLOCKS_PK,
  PIXABAY_AK,
} = require('../config');

module.exports = async (req, res) => {
  const key = req.body.key || req.query.key;

  const { unsplash, pixabay, storyblocks } = await new Promise(
    (resolve, reject) => {
      let result = {};

      rp({
        method: 'GET',
        uri: 'https://api.unsplash.com/search/photos',
        qs: {
          client_id: UNSPLASH_AK,
          query: key,
        },
        json: true,
      })
        .then(r => (result.unsplash = r))
        .catch(err => {
          console.error(err)
          result.unsplash = err;
        });

      rp({
        method: 'GET',
        uri: 'https://pixabay.com/api/',
        qs: {
          key: PIXABAY_AK,
          q: key,
          image_type: 'photo',
        },
        json: true,
      })
        .then(r => (result.pixabay = r))
        .catch(err => {
          console.error(err)
          result.pixabay = err;
        });

      // HMAC generation
      const searchUri = '/api/v1/stock-items/search/';
      const expires = Math.floor(Date.now() / 1000);
      const hmacBuilder = crypto.createHmac(
        'sha256',
        STORYBLOCKS_PRK + expires,
      );
      hmacBuilder.update(searchUri);
      const hmac = hmacBuilder.digest('hex');
      rp({
        method: 'GET',
        uri: 'https://api.graphicstock.com' + searchUri,
        qs: {
          keywords: key,
          APIKEY: STORYBLOCKS_PK,
          EXPIRES: expires,
          HMAC: hmac,
        },
        json: true,
      })
      .then(r => (result.storyblocks = r))
      .catch(err => {
        console.error(err)
        result.storyblocks = err;
      });

      const timer = setInterval(() => {
        if (result.unsplash === undefined) return;
        if (result.pixabay === undefined) return;
        if (result.storyblocks === undefined) return;
        resolve(result);
        clearInterval(timer);
      }, 100);
    },
  );

  let result = [];
  if (unsplash.total > 0) {
    result = result.concat(
      unsplash.results.map(image => ({
        image_ID: image.id,
        thumbnails: image.urls.thumb,
        preview: image.urls.thumb,
        title: image.description,
        source: 'Unsplash',
        tags: image.tags.map(tag => tag.title),
      })),
    );
  }
  if (pixabay.total > 0) {
    result = result.concat(
      pixabay.hits.map(image => ({
        image_ID: image.id,
        thumbnails: image.previewURL,
        preview: image.previewURL,
        title: '',
        source: 'Pixabay',
        tags: image.tags.replace(/ */g, '').split(','),
      })),
    );
  }
  if (storyblocks.totalSearchResults > 0) {
    result = result.concat(
      storyblocks.info.map(image => ({
        image_ID: image.id,
        thumbnails: image.thumbnail_url,
        preview: image.preview_url,
        title: image.title,
        source: 'Storyblocks',
        tags: image.keywords.split(','),
      })),
    );
  }

  res.json(result);
};
