import React, { useState,useEffect } from "react";
import YouTube from "react-youtube";

const Youtube=(props)=>{
    const [videoSrc,setVideoSrc]= useState("")
    useEffect(() => {
        console.log(props,"effe")
        setVideoSrc(props.videoSrc)

    }, [props.videoSrc]);
    return(
        <YouTube
        videoId={videoSrc}
        onEnd={() => {
          props.setPlaylist();
        }}
        containerClassName={"video-placeholder"}
        opts = {{
          height: '100',
          width: '100',
          playerVars: {
            autoplay: 1,
          },
        }}
      />
    )
}

export default Youtube;
