### Objective

A simple Radio app where user can listen to already requested songs by other and request songs to be played by adding YouTube links

Sample UI below. The app doesn't need to have fancy design. We are looking for functional implementation.
![Sample UI](https://d1v9g1a6pf512p.cloudfront.net/static/images/misc/ec4db85c-5e31-4427-9463-aec56061f61a-a.jpg)

### Tasks

- [x] The application must be a SPA.
- [x] The application should allow user to add a youtube link to the playlist and start playing songs from the playlist first in first out.
- [x] Once a song is finished, it should be removed from the playlist.
- [x] The youtube link must be validated by the app for proper url format before adding to the
      queue.

### Setup instruction

- This app is built using firebase as backend, so head to firebase (firestore) to create your project, etc. More can be found at - https://firebase.google.com/docs/firestore
- Once you have the a configuration for the web-app to `initializeApp`, `export default` the configuration object from the `src/firebase.no-show.js`; By the way the file has to be created first;
- Depending on how you have modelled the database - app needs the video-id which is usually the end of the youtube url `?v=<some-video-id>`; Configure the name of collection using the `FIREBASE_COLLECTION_NAME` and the attribute pointing to video-id in a document using the `FIREBASE_ATTRIB_NAME_VIDEO_ID` in `src/YouTubeRadio.js`; If defaults are fine then fine-tune the collection and documents in your database accordingly.
- Use `npm start` to run the app locally.
- Use `npm run build` to build the production site. While building tweak `homepage` attribute in `package.json` according to deployment.
- The most-recent build is in `/docs` in the repository; To run copy the `/docs` directory and use programs like `serve` to serve the live project - `serve -s docs`;
