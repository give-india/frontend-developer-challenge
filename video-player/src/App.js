import React, { useState, useEffect } from "react";
import "./App.css";
import { Button, Grid, TextField } from "@material-ui/core";
import ReactPlayer from "react-player";
import YTLogo from "./youtube_logo.svg";

function App() {
  const [ytLinks, setYtLinks] = useState([]);
  const [errMessage, setErrMessage] = useState(0);

  function validateYouTubeUrl() {
    var url = document.getElementById("yt_link").value;
    if (url !== undefined || url !== "") {
      var match = url.match(
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/
      );
      if (match && match[2].length === 11) {
        var temp = ytLinks;
        temp.push(url);
        setYtLinks(temp);
        setErrMessage("YouTube URL Added");
        setTimeout(function() {
          setErrMessage(0);
        }, 3000);
      } else {
        setErrMessage("Invalid YouTube URL");
        setTimeout(function() {
          setErrMessage(0);
        }, 3000);
      }
      document.getElementById("yt_link").value = "";
    }
  }

  function removeVideoLink(link) {
    var temp = ytLinks;
    const index = ytLinks.indexOf(link);
    if (index > -1) {
      temp.splice(index, 1);
      setYtLinks(temp);
      setErrMessage("YouTube URL Removed");
      setTimeout(function() {
        setErrMessage(0);
      }, 3000);
    }
  }

  useEffect(() => {}, [ytLinks]);

  return (
    <div
      className="App"
      style={{
        height: "100vh"
      }}
    >
      <Grid
        style={{
          padding: "30px",
          fontWeight: "bold",
          fontSize: "x-large",
          alignItems: "center",
          background:
            "linear-gradient(93deg, rgb(255, 2, 0) 0%, rgb(136, 1, 0) 100%) 0% 0% no-repeat padding-box padding-box transparent"
        }}
        container
        alignItems="flex-start"
      >
        <img
          alt="logo"
          src={YTLogo}
          style={{ width: "40px", maxWidth: "100%" }}
        />
        &nbsp;&nbsp; Youtube Video Player
      </Grid>
      <Grid container style={{ height: "90%", borderTop: "2px solid black" }}>
        <Grid
          item
          xs={8}
          style={{
            borderRight: "2px solid #261e1e",
            padding: "20px 0px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {ytLinks.length > 0 ? (
            <>
              <ReactPlayer
                url={ytLinks[0]}
                playing
                width="95%"
                height="95%"
                onEnded={() => removeVideoLink(ytLinks[0])}
                controls={true}
              />
            </>
          ) : (
            "No Videos in playlist"
          )}
        </Grid>
        <Grid item xs={4} style={{ paddingTop: "20px", position: "relative" }}>
          <div>
            {ytLinks.length > 0 ? (
              <>
                <div style={{ paddingBottom: "10px", fontWeight: "bold" }}>
                  Youtube Link lists
                </div>
                <div style={{ height: "460px", overflowY: "scroll" }}>
                  {ytLinks.map((link, index) => (
                    <Grid
                      key={index}
                      container
                      style={{
                        borderTop: "1px solid grey",
                        padding: "10px 0px"
                      }}
                    >
                      <Grid item xs={10}>
                        {index + 1}.&nbsp;&nbsp;{link}
                      </Grid>
                      <Grid
                        item
                        xs={2}
                        style={{ cursor: "pointer" }}
                        onClick={() => removeVideoLink(link)}
                      >
                        ❌
                      </Grid>
                    </Grid>
                  ))}
                </div>
              </>
            ) : (
              "Add something to your playlist"
            )}
          </div>
          <Grid
            container
            style={{
              position: "absolute",
              bottom: "40px",
              alignItems: "center"
            }}
          >
            <Grid xs={12} item style={{ color: "purple" }}>
              {errMessage ? errMessage : ""}
            </Grid>
            <Grid item xs={8}>
              <TextField
                id="yt_link"
                label="Enter YouTube Link"
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => validateYouTubeUrl()}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
