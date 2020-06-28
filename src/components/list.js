import React from 'react';

var placeholder = document.createElement("li");
placeholder.className = "placeholder";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [...props.items]
    };
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      items: [...nextProps.items]
    });
  }

  dragStart(e) {
    this.dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.dragged);
  }

  dragEnd(e) {
    this.dragged.style.display = 'block';
    this.dragged.parentNode.removeChild(placeholder);
    
    // update list
    var data = this.state.items;
    var from = Number(this.dragged.dataset.id);
    var to = Number(this.over.dataset.id);
    if(from < to) to--;
    data.splice(to, 0, data.splice(from, 1)[0]);
    this.setState({items: data});
    this.props.updateList(data);
  }

  dragOver(e) {
    e.preventDefault();
    this.dragged.style.display = "none";
    if(e.target.className === 'placeholder') return;
    this.over = e.target;
    e.target.parentNode.insertBefore(placeholder, e.target);
  }

  removeItem(i, e) {
    const arr = this.state.items;
    arr.splice(i, 1);
    this.setState({items: arr});
    this.props.updateList(arr);
  }

  render() {
    var listItems = this.state.items.map((item, i) => {
      return (
        <li key={i}
            data-id={i}
            draggable='true'
            onDragEnd={this.dragEnd.bind(this)}
            onDragStart={this.dragStart.bind(this)}
        >
            {item}
            <span onClick={this.removeItem.bind(this, i)}>X</span>
        </li>
      )
     });
    return (
      <ul onDragOver={this.dragOver.bind(this)}>
        {listItems}
      </ul>
    )
  }
}

export default List;