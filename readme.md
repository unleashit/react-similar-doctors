# react-similar-doctors
React app that displays a list of doctors with detail views. In the detail view, there is component that displays related doctors using a custom relevance algorithm. Uses React, Webpack, ES6, json-server and Axios.

### To use

1. clone the repo
2. `npm install`
3. `npm run start`
4. Navigate to http://localhost:8080

`npm run start` uses concurrently to load both json-server (simple rest api, used locally here) and webpack-dev-server at once.

To ouput a production version, run `NODE_ENV=production npm run production`. This will create a dist folder that can run natively in a browser. It will still expect the api, so either run `npm run json` or set up on a server and update the ajax url.