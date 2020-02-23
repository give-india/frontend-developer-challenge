# Youtube video player
This is a real-time application for playing youtube videos with creating a playlist. <br/>
Here you can add youtube video urls, it will added to playlist and videos from playlist will automaticaly play one by one.<br/>
you can remove and reorder items in your playlist. <br/>

### Full App Demo: <a href="http://13.126.28.110:8030/"> youtube-video-player </a>

### App description
This is only frontend in react.js and designed with material-ui. <br/>
when user will add url to textfield it will validate that url ( isYoutubeVideoUrl & isValidUrl ) then if validation success, it will added to playlist (playlist works as queue) otherwise it will give alert. <br/>
Url from playlist will automatically remove alfter play.<br/>
User can remove item by clicking `X` button and can reorder playlist items by dragging items. <br/>
I used `socket.io` for making the application a ***real-time application*** (if you will open more than one tab and updating someting in any tab it will update that to all the tabs.<br/>
it also has a small backend part inside the frontend repo that is for implementing `socket.io` . <br/>

## Requirements and executions
1. clone the repository from my github account. <br/>
2. go to the directory `frontend-developer-challenge` by `cd frontend-developer-challenge` and run command `npm install` to install all necessary dependencies. <br/>
3. run command `npm start` to run frontend application and visit http://localhost:3000/ .

##### it also has a smaill backend part, follow the given steps to run backend.
4. go to the `server` directory inside `frontend-developer-challenge` and run `npm install` to install all the dependencies. <br/>
5. run `nodemon server.js` to run the backned application.

Now you can use the application 

happy coding :)

