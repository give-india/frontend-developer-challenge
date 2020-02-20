import update from 'immutability-helper';

// interface
import { NewPositionInterface } from './interface';

const CLEAR_DATA = 'CLEAR_DATA';
const PLAY_NEXT = 'PLAY_NEXT';
const ADD_TO_QUEUE = 'ADD_TO_QUEUE';
const DROP_TO_PLAY = 'DROP_TO_PLAY';
const PROGRESS = 'PROGRESS';
const UPDATE_ITEM_POSITION = 'UPDATE_ITEM_POSITION';
const IS_DRAGGING = 'IS_DRAGGING';

require('dotenv').config();

const headers = {
  'Content-Type': 'application/json'
};

const retrievedlist = localStorage.getItem('player');
const retrievedPlay = localStorage.getItem('play');
const retrievedStats = localStorage.getItem('stats');
const defaultState = {
  playlist: retrievedlist ? JSON.parse(retrievedlist) : [],
  play:
    retrievedPlay !== undefined && retrievedPlay !== null
      ? JSON.parse(retrievedPlay)
      : null,
  isDragging: false,
  stats: retrievedStats ? JSON.parse(retrievedStats) : {}
};

export const addVideo = (url: string) => (dispatch: any) => {
  const urlParams = new URLSearchParams(url.split('?')[1]);
  const params = urlParams.get('v');
  const urlString = `${process.env.REACT_APP_YOUTUBE_URL}&id=${params}`;
  return fetch(urlString, {
    headers,
    credentials: 'omit'
  })
    .then((obj: any) => {
      return obj.json();
    })
    .then((response: any) => {
      if (response.items.length < 1) {
        throw new Error('The video id is invalid');
      }
      dispatch({
        type: ADD_TO_QUEUE,
        payload: response
      });
    });
};

export const setIsDragging = (isDragging: boolean) => (dispatch: any) => {
  dispatch({
    payload: isDragging,
    type: IS_DRAGGING
  });
};

export const setProgress = (progress: number) => (dispatch: any) => {
  dispatch({
    payload: progress,
    type: PROGRESS
  });
};

export const updateItemPosition = (payload: NewPositionInterface) => (
  dispatch: any
) => {
  dispatch({
    payload,
    type: UPDATE_ITEM_POSITION
  });
};

export const clearStorage = () => (dispatch: any) => {
  dispatch({
    type: CLEAR_DATA
  });
};

export const playNext = () => (dispatch: any) => {
  dispatch({
    type: PLAY_NEXT
  });
};

export const drop2Play = (index: number) => (dispatch: any) => {
  dispatch({
    type: DROP_TO_PLAY,
    payload: index
  });
};

const Player = (state = defaultState, action: any) => {
  switch (action.type) {
    case IS_DRAGGING:
      return {
        ...state,
        isDragging: action.payload
      };
    case PLAY_NEXT:
      const [video, newList] = [state.playlist[0], state.playlist.slice(1)];
      localStorage.setItem('player', JSON.stringify([...newList]));
      localStorage.setItem('play', JSON.stringify(video));
      return {
        ...state,
        playlist: [...newList],
        play: video,
        stats: { ...state.stats, progress: 0 }
      };
    case DROP_TO_PLAY:
      const [now, newPlayList] = [
        state.playlist[action.payload],
        [...state.playlist]
      ];
      newPlayList.splice(action.payload, 1);
      localStorage.setItem('player', JSON.stringify([...newPlayList]));
      localStorage.setItem('play', JSON.stringify(now));
      return {
        ...state,
        playlist: [...newPlayList],
        play: now,
        stats: { progress: 0 }
      };
    case PROGRESS:
      localStorage.setItem(
        'stats',
        JSON.stringify({ ...state.stats, progress: action.payload })
      );
      return {
        ...state,
        stats: { ...state.stats, progress: action.payload }
      };
    case ADD_TO_QUEUE:
      localStorage.setItem(
        'player',
        JSON.stringify([...state.playlist, action.payload])
      );
      return {
        ...state,
        playlist: [...state.playlist, action.payload]
      };
    case UPDATE_ITEM_POSITION:
      const { itemIndex, hoverIndex } = action.payload;
      const item = state.playlist.find(
        (data: any, ind: number) => ind === itemIndex
      );
      const newQueue = update(state.playlist, {
        $splice: [
          [itemIndex, 1],
          [hoverIndex, 0, item]
        ]
      });
      localStorage.setItem('player', JSON.stringify([...newQueue]));
      return {
        ...state,
        playlist: [...newQueue]
      };
    case CLEAR_DATA:
      localStorage.setItem('player', JSON.stringify([]));
      return {
        ...state,
        playlist: []
      };
    default:
      return state;
  }
};

export default Player;
