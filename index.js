const express = require('express');
const axios = require('axios');
const mongodb = require('mongodb').MongoClient;
const dbURL = 'mongodb://dsoucie:devpassword@ds117605.mlab.com:17605/image-search-abstraction-layer';

var app = express();

app.set('view engine', 'pug');

app.get('/search/:query', (request, response) => {
  const query = request.params.query;
  const offset = request.query.offset || 0;
  const start = String(Number(offset) + 1);

  console.log('query: ', query);
  console.log('offset: ', offset);
  console.log('start: ', start);

  mongodb.connect(dbURL, (error, db) => {
    var myCol = db.collection('myCol');

    myCol.insert({
      searchQuery: query,
      unixTimestamp: Math.round(Date.now() / 1000),
    });

  });

  const url = `https://www.googleapis.com/customsearch/v1?key=AIzaSyDKcOIgYFECBl3wZ_iHtyw7CODoNuXopNQ&cx=010287229141200450979:t6euai2tuhe&q=${query}&start=${start}&searchType=image`;
  console.log('url: ', url);

  axios.get(url)
    .then( (googleResponse) => {
      const pictureArray = googleResponse.data.items;
      var responseArray = [];

      pictureArray.forEach( (picture) => {
        let pictureObj = {};
        pictureObj.pageURL = picture.image.contextLink;
        pictureObj.imageURL = picture.link;
        pictureObj.altText = picture.snippet;
        responseArray.push(pictureObj);
      })

      response.json(responseArray);
    });

});

app.get('/history', (request, response) => {
  mongodb.connect(dbURL, (error, db) => {
    var myCol = db.collection('myCol');

    myCol.find({}).toArray( (error, documents) => {
      var allHistory = documents;
      
      allHistory.sort((a, b) => {
        return b.unixTimestamp - a.unixTimestamp;
      });
  
      var recent = allHistory.slice(0, 9);
  
      response.json(recent);
    });  
  });
});
  
app.get('*', (request, response) => {
  response.render('index');
})

app.listen(process.env.PORT || 8080);
