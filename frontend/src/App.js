import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { Button, Layout, Menu, theme } from "antd";
import YoutubeEmbed from "./components/video";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';

const { Header, Content, Footer, Sider } = Layout;

const SERVER_URL = "http://localhost:5000";
const App = () => {
  const [link, setLink] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [lists, setLists] = useState([]);

  //useeffect call get list
  useEffect(() => {
    getLists();
  }, []);

  const getLists = async () => {
    const response = await axios.get(`${SERVER_URL}/playlist`);
    const { data, status } = response;
    if (status === 200) {
      let playlist = data?.playlist;
      setLists(playlist);
      setLink("")
      setSelectedItem(playlist?.[0]?.link ?? "");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let youtubeParser = youtube_parser(link)
    if (ytVidId(link) && youtubeParser) {
      console.log("link validator");
      try {
        let params = {
          link: youtubeParser,
          isActive: true,
        };
        const response = await axios.post(`${SERVER_URL}/playlist`, params);
        const { data, status } = response;
        if (status === 201) {
          toast.success("Link successfully Added!!")
          getLists();
        } else {
          console.log(data)
        }
      } catch(e) {
        toast.error(e.message)
      }
    } else {
      toast.error("Invalid URL!!")
    }
  };

  const playNext = () => {
    const currentIndex = lists.map(e => e.link).indexOf(selectedItem);
    // const nextIndex = (currentIndex + 1) % lists.length;
    handleUpdate(lists?.[currentIndex]?._id);
  }

  //url validator
  const ytVidId = (url) => {
    var p =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    return url.match(p) ? RegExp.$1 : false;
  };

  const youtube_parser = (url) => {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  };

  const handleUpdate = async(_id) => {
    const response = await axios.put(`${SERVER_URL}/playlist/${_id}`, {isActive:false});
    const { data, status } = response;
    if (status === 200) {
      // toast.success("Link successfully deleted!!")
      getLists();
    }
  }

  const handleDelete = async(_id) => {
    const response = await axios.delete(`${SERVER_URL}/playlist/${_id}`);
    const { data, status } = response;
    if (status === 200) {
      // toast.success("Link successfully deleted!!")
      getLists();
    }
  }

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Layout>
        
        <Sider>
          <div>
            <ul className="allVideo">
              <h1>Your playlist</h1>
              {lists.map((t) => (
                <li className="video" onClick={()=>setSelectedItem(t.link)}>
                  <span className="inputText" key={t.id}>
                    {t.link}
                  </span>
                  <Button className="deleteBtn" onClick={()=>handleDelete(t._id)}>Delete</Button>
                </li>
              ))}
            </ul>
          </div>
        </Sider>
        <Layout>
          <ToastContainer />
          <Header
            style={{
              background: colorBgContainer,
              justifyContent: "space-around",
            }}
          >
            <form onSubmit={handleSubmit}>
              <input type="text" className="linkInput" value={link} onChange={(e) => setLink(e.target.value)} />
              <button type="submit">Add to the playlist</button>
            </form>
          </Header>
          <Content
            style={{
              margin: "24px 16px 0",
            }}
          >
            <div
              style={{
                padding: 24,
                minHeight: 410,
                background: colorBgContainer,
              }}
            >
              <YoutubeEmbed videoId={selectedItem} playNext={playNext} />
            </div>
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          ></Footer>
        </Layout>
      </Layout>
    </>
  );
};
export default App;
