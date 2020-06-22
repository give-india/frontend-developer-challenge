import React, { Component } from 'react';

class List extends Component {
    constructor(props){
        super(props)
        this.state={
            data :this.props.data
        }
    }
    // Remove particular url from list
    removeURL(index){
        let data = this.state.data
        data.splice(index,1)
        this.setState({data:data})
        this.props.updateState("data",data)
    }
  render() {
    return (
        <div className="col-md-4 col-12">
            <ul className="list-group">
                {/* iteration on url list */}
                { this.state.data.length> 0? this.props.data.map((link,i)=>
                <li key={i} className="word-break list-group-item text-secondary py-2 d-flex justify-content-between align-items-center">
                    <p className="mb-0 pr-1 cursor-pointer" onClick={()=>this.props.updateState("video_to_run",link)}>{link}</p>
                    <span onClick={()=>this.removeURL(i)} className="badge badge-primary badge-pill cursor-pointer"><i className="fa fa-times" aria-hidden="true"></i></span>
                </li>): <li className="list-group-item text-dark py-2 font-weight-bold">Please add youtube videos link to see.</li>}
            </ul>
        </div>
    );
  }
}
export default List