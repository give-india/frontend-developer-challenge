import { action, computed, observable, decorate } from 'mobx';
import Axios from 'axios';

class StateStore {
  videoId = [];
  videoTitle = [];
  ytAPIKey = 'AIzaSyCgq-R5RAhqA3rX98NNJRxzridWlgBGc9g';

  addId = async (id) => {
    this.videoId.push(id);
    try {
      const res = await Axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${this.ytAPIKey}`
      );
      // console.log(res);
      this.addTitle(res.data.items[0].snippet.title);
    } catch (error) {
      console.log('Error Occured !');
      console.log(error);
      window.alert('Something Went Wrong!');
    }
  };

  addTitle = (title) => {
    this.videoTitle.push(title);
  };

  removeId = () => {
    this.videoId.shift();
    this.videoTitle.shift();
  };

  get idCount() {
    return this.videoId.length;
  }

  swapId = (x, y) => {
    const a = this.videoId[x];
    this.videoId[x] = this.videoId[y];
    this.videoId[y] = a;
  };

  swapTitle = (x, y) => {
    const a = this.videoTitle[x];
    this.videoTitle[x] = this.videoTitle[y];
    this.videoTitle[y] = a;
  };

  removeVid = (i) => {
    const a = this.videoId.splice(i, 1);
    const b = this.videoTitle.splice(i, 1);
    console.log('ID Removed: ' + a);
    console.log('Title Removed: ' + b);
  };
}

decorate(StateStore, {
  videoId: observable,
  videoTitle: observable,
  idCount: computed,
  addId: action,
  addTitle: action,
  removeId: action,
  swapId: action,
  swapTitle: action,
  removeVid: action,
});

const store = new StateStore();
export default store;
