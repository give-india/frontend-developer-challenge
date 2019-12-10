The App completes the below tasks mentioned -

### Tasks

- The application must be a SPA.
- The application should allow user to add a youtube link to the playlist and start playing songs from the playlist first in first out.
- Once a song is finished, it should be removed from the playlist.
- The youtube link must be validated by the app for proper url format before adding to the queue.

### Bonus

- Allow the user to remove and reorder items in the playlist.
- Sync different versions of the application. If the application is open across two tabs, both must be in sync for all activities. For e.g adding/removing/forwarding a song on any one, should update both of them.

### Pointers for the app -

1. The app is build using React
2. To run the project, go to the frontend-developer-challenge folder in terminal
3. Run "npm install"
4. Once done, run "npm start" to run the app

### Features used -

1. Initially map function was used to display each videoList item, but that has been removed to implement drag and drop feature. The VideoItem file is still present although irrelevant now just to showcase old approach, along with map functionality in VideoList file in the end.
2. React-Youtube npm package has been used to handle youtube end time functionality

### P.S.

I am attaching my Resume as well in the repository
