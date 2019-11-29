import React from "react";
import { connect } from "react-redux";
import { Tree, Icon } from "antd";

import "./playlistLinks.css";
import {
  removeFromList,
  playThisSong,
  alterLinks
} from "../../../actions/PlaySongsActions";

const { TreeNode } = Tree;

class PlaylistLinks extends React.Component {
  removeFromPlayList = (event,removingKey) => {
    event.stopPropagation()
      if(this.props.currentPlayingId !== removingKey){
        this.props.removeFromList([...this.props.linkData],removingKey)
      }else{
        let currentIndex = 0;
        let currentPlayingId = this.props.currentPlayingId;
        for (let i = 0; i < this.props.linkData.length; i++) {
          if (this.props.linkData[i].key === this.props.currentPlayingId) {
            currentIndex = i;
            break;
          }
        }
        if (currentIndex === this.props.linkData.length - 1) {
          this.props.playThisSong(this.props.linkData[0].key);
        } else {
          this.props.playThisSong(this.props.linkData[currentIndex + 1].key);
        }
        this.props.removeFromList([...this.props.linkData],currentPlayingId);
      }
  };

  onDrop = info => {
    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    const dropPos = info.node.props.pos.split("-");
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data, key, callback) => {
      data.forEach((item, index, arr) => {
        if (item.key === key) {
          return callback(item, index, arr);
        }
        if (item.children) {
          return loop(item.children, key, callback);
        }
      });
    };
    const data = [...this.props.linkData];

    // Find dragObject
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else {
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }

    this.props.alterLinks(data);
  };

  render() {
    const loop = data =>
      data.map(item => {
        return (
          <TreeNode
            key={item.key}
            title={
              <p
                onClick={() => this.props.playThisSong(item.key)}
                style={{ width: "300px" }}
              >
                {item.title}
                <span style={{ float: "right" }}>
                  <Icon
                    type="close-circle"
                    onClick={(event) => this.removeFromPlayList(event,item.key)}
                  />
                </span>
              </p>
            }
          />
        );
      });
    return (
      <div>
        <Tree
          className="draggable-tree"
          draggable
          blockNode
          onDragEnter={this.onDragEnter}
          onDrop={this.onDrop}
        >
          {loop(this.props.linkData)}
        </Tree>
      </div>
    );
  }
}

const mapStateToProps = statef => {
  return {
    linkData: statef.songsData.linkData,
    currentPlayingId: statef.songsData.currentPlayingId
  };
};

const mapDispatchToProps = dispatch => ({
  playThisSong: playKey => dispatch(playThisSong(playKey)),
  removeFromList: (linkData, deleteKey) =>
    dispatch(removeFromList(linkData, deleteKey)),
  alterLinks: links => dispatch(alterLinks(links))
});
export default connect(mapStateToProps, mapDispatchToProps)(PlaylistLinks);
