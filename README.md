# Quick Start

## Install
```javascript
// install expo and main packages
$ npm install exp --global
$ npm install // or yarn install

// server dependancies
$ cd server
$ npm install // or yarn install

```

## Run
```javascript
// run client
$ exp start
// follow instructions in the console

// run server
$ cd server
$ npm run start // will start server
// OR
$ npm run dev // will run watch script using nodemon. Will livereload server on every save.
```


# FAQ

## Server side
#### How do I add endpoints?
* Look at the docs in https://vincit.github.io/objection.js/
* And look at the sample endpoint in server/routes/moods.js
