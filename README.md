# MovieFind

A simple movie app that allows user to search, view, and like/dislike movies.

![MovieFind](https://i.ibb.co/kgW8njk/Screen-Shot-2020-11-15-at-3-33-36-PM.png)

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

## Features

### Search for Movies

![Search Movies](https://im6.ezgif.com/tmp/ezgif-6-227c2077e9e7.gif)

* Search among millions of movies via [TMDB database](https://www.themoviedb.org/)
* See displayed title results (achieved via debounce) on input

### See Movie Details & Like/Dislike
![See Movie Details](https://im6.ezgif.com/tmp/ezgif-6-57a313ebc3b1.gif)
* See movie details, including title, release date/year, description
* Like or dislike movie via clicking on thumbs-up or thumbs-down icon (data for thumbs-up and thumbs-down persisted to backend API)

### Mobile Responsive
![Mobile Responsive](https://im6.ezgif.com/tmp/ezgif-6-8d08d9ac3a6c.gif)
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
