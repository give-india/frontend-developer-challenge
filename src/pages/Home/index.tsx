import React, { useState, useEffect } from 'react';

// third party libraries
import Loader from 'react-loader';
import { connect } from 'react-redux';
import {
  ToastsContainer,
  ToastsContainerPosition,
  ToastsStore
} from 'react-toasts';

// thunk
import {
  addVideo,
  clearStorage,
  drop2Play,
  playNext,
  setIsDragging,
  setProgress,
  updateItemPosition
} from 'store/module/playlist';

// components
import Details from 'components/Details';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Player from 'components/Player';
import PlayList from 'components/PlayList';

// Utilities
import { isValidYoutubeURL } from 'utilities/validation';

// interface
import { NewPositionInterface } from 'store/module/playlist/interface';

// fixtures
import { options } from './fixtures';

// Styles
import './Home.scss';

const Home = ({
  addVideoData,
  playlist,
  updatePosition,
  playing,
  progress,
  next,
  dropToPlay,
  isDragging,
  setIsDragging,
  updateProgress,
  clear
}: any) => {
  const [state, setState] = useState({
    progress,
    isLoading: false,
    isDragging: false,
    url: ''
  });

  useEffect(() => {
    setState({
      ...state,
      progress
    });
  }, [playing]);

  const onhandleProgress = (progress: any) => {
    updateProgress(progress.playedSeconds);
  };

  const handleOnChange = (event: any) => {
    setState({
      ...state,
      [event.target.id]: event.target.value.trim()
    });
  };

  const onAddURL = async () => {
    if (state.url.length > 0) {
      const isValidURL = isValidYoutubeURL(state.url);
      if (isValidURL) {
        setState({
          ...state,
          isLoading: true
        });
        try {
          await addVideoData(state.url);
        } catch (error) {
          ToastsStore.error(error.message);
          setState({
            ...state,
            isLoading: false
          });
        }
        setState({
          ...state,
          isLoading: false,
          url: ''
        });
      } else {
        ToastsStore.error('Invalid youtube link!');
      }
    }
  };

  const onDrag = (Dragging: boolean) => {
    setIsDragging(Dragging);
  };

  const onNewPosition = (item: any, hoverIndex: number) => {
    updatePosition({ hoverIndex, itemIndex: item.index });
  };

  return (
    <React.Fragment>
      <div className="home-page">
        <Header
          classes="header-page"
          defaultValue={state.url}
          onsubmit={onAddURL}
          handleOnChange={handleOnChange}
        ></Header>
        <div className="home-page__body">
          <Player
            classes="home-page__player"
            playing={playing}
            progress={state.progress}
            onProgress={onhandleProgress}
            drop2Play={dropToPlay}
            isDragging={isDragging}
            onEnded={next}
          ></Player>
          <PlayList
            classes="home-page__play-list"
            playlist={playlist}
            onDrop={onNewPosition}
            onDrag={onDrag}
            playNext={next}
            disableButton={playlist.length < 1}
          ></PlayList>
        </div>
        {playing && <Details details={playing} clear={clear} />}
        <ToastsContainer
          position={ToastsContainerPosition.TOP_RIGHT}
          store={ToastsStore}
          lightBackground
        />
        <Loader
          loaded={!state.isLoading}
          options={options}
          className="spinner"
        />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export const mapStateToProps = (state: any) => ({
  playlist: state.player.playlist,
  playing: state.player.play,
  isDragging: state.player.isDragging,
  progress: state.player.stats.progress
});

export const mapDispatchToProps = (dispatch: any) => ({
  addVideoData: (video: any) => dispatch(addVideo(video)),
  next: () => dispatch(playNext()),
  clear: () => dispatch(clearStorage()),
  dropToPlay: (item: any) => dispatch(drop2Play(item.index)),
  setIsDragging: (isDragging: boolean) => dispatch(setIsDragging(isDragging)),
  updateProgress: (progress: number) => dispatch(setProgress(progress)),
  updatePosition: ({ itemIndex, hoverIndex }: NewPositionInterface) =>
    dispatch(updateItemPosition({ itemIndex, hoverIndex }))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
