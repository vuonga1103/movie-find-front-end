# MovieFind

A simple movie app that allows user to search, view, and like/dislike movies.

[Link to Backend API](https://github.com/vuonga1103/movie-find-back-end)

## Table of Contents
* [Getting Started](#getting-started)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Tools](#tools)

<a name="getting-started"/>

## Getting Started
1. Install and run [Rails Backend API](https://github.com/vuonga1103/movie-find-back-end)
2. Install [Node.js and npm](https://www.npmjs.com/get-npm)

    ```$ brew install node```
    
3. Clone this repo and cd into the directory
4. Install all dependencies

    ```$ npm install```

5. Make sure the Rails server is running and then run the app

    ```$ npm start```
    
<a name="features"/>

### Search for Movies

![](https://im6.ezgif.com/tmp/ezgif-6-0c518a053251.gif)

* Search among millions of movies via [TMDB database](https://www.themoviedb.org/)
* See displayed title results (achieved via debounce) on input

### See Movie Details & Like/Dislike
![](https://im6.ezgif.com/tmp/ezgif-6-6c4b0293bca0.gif)
* See movie details, including title, release date/year, description
* Like or dislike movie via clicking on thumbs-up or thumbs-down icon (data for thumbs-up and thumbs-down persisted backend API)

### Mobile Responsive
![](https://im6.ezgif.com/tmp/ezgif-6-5c19f8a38c03.gif)
* Easily accessible on mobile devices

<a name="tech-stack"/>

## Tech Stack
* React.js
* Ruby on Rails API
* PostgresQL
* HTML/CSS
* Material UI
* Active Record

<a name="tools"/>

## Tools
* [Rack CORS](https://github.com/cyu/rack-cors)
* [React Router](https://reacttraining.com/react-router/web/guides/quick-start)
* [Axios](https://github.com/axios/axios)
* [material-ui-search-bar](https://www.npmjs.com/package/material-ui-search-bar)
