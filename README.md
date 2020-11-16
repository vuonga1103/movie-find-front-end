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

![Search Movies](https://i.ibb.co/mbBFSJq/Screen-Shot-2020-11-15-at-7-41-32-PM.png)

* Search among millions of movies via [TMDB database](https://www.themoviedb.org/)
* See displayed title results (achieved via debounce) on input

### See Movie Details & Like/Dislike
![See Movie Details](https://i.ibb.co/zb31rtB/Screen-Shot-2020-11-15-at-7-42-25-PM.png)
* See movie details, including title, release date/year, description
* Like or dislike movie via clicking on thumbs-up or thumbs-down icon (data for thumbs-up and thumbs-down persisted to backend API)

### Mobile Responsive
<span><img src="https://i.ibb.co/NTFtfV8/Screen-Shot-2020-11-15-at-7-43-47-PM.png" width="200" /></span><span><img src="https://i.ibb.co/NYcPZGj/Screen-Shot-2020-11-15-at-7-44-34-PM.png" width="200" />
</span><span><img src="https://i.ibb.co/TkHp2Yx/Screen-Shot-2020-11-15-at-7-44-49-PM.png" width="200" />
</span>


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
