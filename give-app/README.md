
This is a youTube video player app created using ReactJS library. State management of app is done using Redux.
Application is devloped such that it preserves state even if user switch between tabs.

Deployed in aws for demo purpose
website url: https://master.d1yl4y19vg0x4h.amplifyapp.com/

### App features
1. Allows user to add a youtube link to the playlist and start playing from the playlist first in first out
2. Once a video is finished, it should be removed from the playlist.
3. The youtube link validated by the app for proper url format before adding to the queue.
4. User will not be allowed to add link if it is duplicate
5. Allow the user to remove link from list
6. Allows user to reorder items in the playlist by dragging the item in list
7. Sync different versions of the application. If the application is open across two tabs, both will be in sync for all activities.
8. State is managed using redux

### To run the project

In the project directory, you can run:
### `npm install`
  Run this command to install all neccessary packages
### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.


