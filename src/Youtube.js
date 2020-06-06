import React, { Component } from 'react'
import Playlist from './Components/Playlist'

class Youtube extends Component {
    constructor(props){
        super(props);
        this.state={
            items:[],
            currentItem:{
                text:'',
                key:'',
            }
        }
        this.handleInput =this.handleInput.bind(this);
        this.addItem =this.addItem.bind(this);
        this.deleteItem =this.deleteItem.bind(this);
    }

    handleInput(e){
                this.setState({
                   currentItem:{
                   text:e.target.value,
                   key:Date.now()
            }
        })
    }

    addItem(e){
        e.preventDefault();
        const newItem =this.state.currentItem;
        var pattern = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        if(newItem.text!=="" && newItem.text.match(pattern) ){
            const newItems=[...this.state.items,newItem];
            this.setState({
                    items:newItems,
                    currentItem:{
                    text:'',
                    key:''
                }
            })
        }else
        {
            alert('Give Correct url');   
        }
    }

    deleteItem(key){
        const filteredItems = this.state.items.filter(item =>
            item.key!==key);
            this.setState({
                items:filteredItems
            })
    }

    addItemVideo(e){
        const newItem =this.state.currentItem;
        if(newItem.text!=="" ){
            const newItems=[...this.state.items,newItem];
            this.setState({
                    items:newItems,
                    currentItem:{
                    text:'',
                    key:''
                }
            })}
    }

    render() {
        return (
            <div className="Youtube">
                <header>
                    <form id="to-do" onSubmit={this.addItem}>
                        <input type="text" placeholder="Enter youtube link" value={this.state.currentItem.text} onChange={this.handleInput}/>
                        <button type="submit" className="button">Add</button>
                        <button className="buttonlist">Playlists</button>
                        <div items = {this.state.items}>
                            <Playlist items = {this.state.items}
                                deleteItem = {this.deleteItem}
                            > </Playlist>   
                        </div>
                    </form>
                </header>
            </div> 
        );
      }
    }
    
export default Youtube 


  