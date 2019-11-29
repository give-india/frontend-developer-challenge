import React from "react";
import { Form, Button, Input } from "antd";
import { connect } from "react-redux";
import { appendLink } from "../../../actions/PlaySongsActions";

class AddLinkForm extends React.Component {
  state = {
    help: "",
    validateStatus: "",
    inputText: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let youtubeId = this.youtube_parser(values.youtubeLink);
        if (youtubeId) {
          if (this.props.linkData && this.props.linkData.length > 0) {
            let filteredData = this.props.linkData.filter(
              eachObj => eachObj.key === youtubeId
            );
            if (filteredData && filteredData.length > 0) {
              this.setState({
                help: "This link already been added!",
                validateStatus: "error"
              });
            } else {
              this.props.appendLink(youtubeId, [...this.props.linkData], this.props.songIndex);
              this.setState({
                validateStatus: "success"
              });
              setTimeout(() => {
                this.props.form.resetFields();
              }, 3000);
            }
          } else {
            this.props.appendLink(youtubeId, [...this.props.linkData], this.props.songIndex);
            this.setState({
              validateStatus: "success"
            });
            setTimeout(() => {
              this.props.form.resetFields();
            }, 3000);
          }
        } else {
          this.setState({
            help: "Not a valid Link!",
            validateStatus: "error"
          });
        }
        console.log(this.youtube_parser(values.youtubeLink));
      } else {
        this.setState({
          help: "Please paste your youtube link!",
          validateStatus: "error"
        });
      }
      setTimeout(() => {
        this.resetValidations();
      }, 3000);
    });
  };

  resetValidations = () => {
    this.setState({
      help: "",
      validateStatus: ""
    });
  };

  youtube_parser = url => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : false;
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div style={{ textAlign: "center" }}>
        <Form onSubmit={this.handleSubmit} hideRequiredMark={true}>
          <Form.Item
            label="Add Youtube-link"
            validateStatus={this.state.validateStatus}
            hasFeedback
            help={this.state.help}
            colon={false}
          >
            {getFieldDecorator("youtubeLink", {
              rules: [{ required: true, message: "" }]
            })(
              <Input
                placeholder="Please paste your youtube link here"
                onChange={() => this.resetValidations()}
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const AddLinkComponent = Form.create({ name: "register" })(AddLinkForm);

const mapStateToProps = statef => {
    return {
      songIndex: statef.songsData.songIndex,
      linkData: statef.songsData.linkData
    };
  };
  
  const mapDispatchToProps = dispatch => ({
    appendLink: (link, linkData, songIndex) => dispatch(appendLink(link, linkData, songIndex)),
  });

export default connect(mapStateToProps, mapDispatchToProps)(AddLinkComponent);
