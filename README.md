# SendIt

<p>It's a Full Stack Social Media Web App build in MERN Stack including real-time communications</p>

[Preview](https://amit-general-bucket.s3.ap-south-1.amazonaws.com/videos/send-it.mp4)

Docker Image : [kamit6337/sendit-client](https://hub.docker.com/repository/docker/kamit6337/sendit-client/general)

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Tech](#tech)
- [Running](#running)

## Description

This is a social media website like Twitter where you can post, like, reply post and share post and also chat with members.

## Features

- Google-OAuth based login
- custom login using email and password
- Socket.io for real-time communications
- efficient fetching and mutation using react-query
- real-time optimistic update on post creation, like, save and reply post
- search functionality
- store multimedia into AWS S3 directly from frontend using pre-signed url
- chat features with members, direct message to a user
- responsive website for all size of devices
- Dockerize this React-Vite app for development and production
- for development using compose.yaml file
- for production using nginx server

## Tech

<ul>
<li>React JS</li>
<li>Tailwind CSS - <i>for styling of web pages</i></li>
<li>Socket.io - <i>for web socket connection</i></li>
<li>Redux - <i>for global state management</i></li>
<li>React Hook Form - <i>making form filling and validation easy</i></li>
<li>React Toastify - <i>showing better UI notification or errors</i></li>
<li>React Query - <i>efficient data fetching and caching making user experience better</i></li>
<li>Shadcn - <i>designing of web page with pre-built component</i></li>
</ul>

## Running

To run this app locally using Docker Image :

- install Docker Desktop from [Docker website](https://www.docker.com/products/docker-desktop) and start to run in background
- create a folder in desktop, open this folder in VS Code
- create a .env file
- copy .env.example file variables from above and paste in .env file
- start filling all environment variables

### SERVER_URL and CLIENT_URL will be enough to run this app.

- open VS Code terminal

```
docker run --env-file .env -p 5173:80 kamit6337/sendit-client
```

- react-app started on http://localhost:5173
