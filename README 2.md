# YoutubePlayerList

This project is created and developed for a challenge. This is a *React-App* created using *Create-react-app*, and hosted using *Express.js* (server.js). This app is a simple application where you can copy list of youtube urls and create a playlist. And a player will play the videos in the queue. 


# Features

-  Syncing up data between all tabs
- Storage persistance (UI will remain same, after reopen/refresh)
- Data stays in browser
- Validates youtube url and shows meta data before adding to Queue


# Libraries & Stack details

- React, Redux, Redux-Thunk, Persist
- Custom built Redux-middleware for syncing data across tabs
- React-Player (for playing videos)
- SCSS
- Express.js for hosting
- Docker for Deployment

# Demo Video
[![Youtube Demo Video](https://i.ytimg.com/vi/juWbCgUBHFw/hqdefault.jpg)](https://youtube.com/watch?v=juWbCgUBHFw)

# Usage or Set up
1. Hosted
   - Log on to [http://18.219.92.53:1234/](http://18.219.92.53:1234/)
2. Docker
   - `docker build . -t video-player-youtube`
   - `docker run -p 1234:1234 -d video-player-youtube`
   - Log on to `http://localhost:1234/`
3. Manual (requires node.js installation)
	- `npm i`
	- `npm run build`
	- `node server.js`
	- Log on to `http://localhost:1234/`
4. Dockerhub
	- `docker run -p 1234:1234 -d senthilbalajiganesan/video-player-react`
	-  Log on to `http://localhost:1234/`

### Tasks
- SPA :+1:
- Add link and play in Queue order :+1:
- Remove video after playing :+1:
- Validate URL :+1:

### Bonus

- Remove video :+1:
- Reorder videos :pensive: :alarm_clock:
- Sync Data across tabs :+1:
	- Adding :+1:
	- Removing :+1:
	- Forwarding :+1:
	- Entering URL  :fire:
	- Validation message :fire:
- Showing meta data for video :fire:
- Dockerized :fire:

### Deliverables
- Create a fork of this repository :+1:
- Code your solution in a frontend stack of your choice :+1:
- Include instructions on how to set it up and run in the README.md :+1:
- Add your resume and other profile / project links :+1:
- Submit a pull request (PR) :+1: