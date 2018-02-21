# Deploying a 2 part javascript app

### 1. In terminal, login to heroku: `heroku login`

### 2. Make sure your root folder has a package.json

### 3. In the root level package.json, ensure you have a script:
"heroku-postbuild": "cd __your app__-backend && sequelize db:migrate && cd .. && cd __your app__-frontend/ && yarn install && yarn build"

### 4. In terminal, run: `heroku addons:create heroku-postgresql:hobby-dev`

### 5. In backend sequelize config, make sure production looks like this:

"production": {
  "use_env_variable": "DATABASE_URL"
}

** also check that your listener uses the correct port constant
```
const port = process.env.PORT || 3000

app.listen(port, function () {
 console.log(' Server listening on port ' + port);
});

```
### 6. In the backend app.js, make sure this code is included at the end of the file:

`app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../__your app___-frontend/build', 'index.html'));
});`

### 7. At the top of your backend app.js, add these lines:

`var path = require('path')` to your imports

`app.use(express.static(path.resolve(__dirname, '../cat-tinder-frontend/build')));` to your middlewares

### 8. Change all backend urls to be '/api/[your resource (i.e. cats or sessions or ...)]'.

### 9. Because the backend urls have now changed, make sure that the front end fetch requests are requesting the right address and path

### 10. In front end App.js (or wherever your api fetches) add this code to the top of your file:

`var apiUrl
if(process.env.NODE_ENV === 'production'){
  apiUrl = "/"
} else {
  apiUrl = "http://localhost:3000/"
}`
