const express = require('express');
const axios = require('axios');
const mongodb = require('mongodb').MongoClient;

var app = express();

app.get('/:query', (request, response) => {
  const query = request.params.query;
  const offset = request.query.offset;
  console.log('offset: ', offset);
  // const url = `https://www.google.com/search?tbm=isch&source=hp&biw=950&bih=970&q=trump&oq=${query}&gs_l=img.3..0l10.5097.5581.0.5911.5.5.0.0.0.0.128.332.0j3.3.0....0...1.1.64.img..2.3.330....0.PQyEj0jvBCA`;
  
  // axios.get(url)
  //   .then( (googleResponse) => {
  //     response.json(googleResponse.data);
  //   });

  response.send(`the offset is ${offset}`);

});
  
  app.get('*', (request, response) => {
    response.send('please enter search query.');
  })
  
  app.listen(process.env.PORT || 8080);
  
  //   axios.request({
  //     method: 'get',
  //     url: url,
  //     headers: { "Authorization": "Client-ID 750ce936a288371" }
  //   })
  //     .then( (imgurResponse) => {
  //       console.log('received')
  //       var galleries = imgurResponse.data.data;
  //       var results = [];
  //       galleries.forEach( (gallery) => {
  //         try {
  //           gallery.images.forEach( (image) => {
  //             results.push(image.link);
  //           });
  //         } catch (e) {
  //           console.log(e);
  //         }
  //       });
  //       response.json(galleries);
  //     });
  // })

  //AIzaSyAWGP9yqBcC2P9sJnqj9aoJCzqPfLQ0gs4