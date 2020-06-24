import React, { Component } from 'react';
import { connect } from "react-redux";

import * as actions from '../../store/actions';
import LinkCard from './LinkCard/LinkCard';
import AddNewLink from './AddNewLink/AddNewLink';

import './index.css';

class Playlist extends Component {
    state = {
        showAddNewLinkPanel: false
    }

    toggleAddNewLinkComp = (showAddNewLinkPanel) => {
        this.setState({
            showAddNewLinkPanel
        })
    }

    addLinkHandler = (data) => {
        this.toggleAddNewLinkComp(false);
        this.props.addNewLinkData(data);
    }

    removeLinkHandler = (data) => {
        this.props.removeLinkData(data);
    }

    render() {
        const { cards, activeCard } = this.props;
        const { showAddNewLinkPanel } = this.state;

        return (
            <div className="playList">
                {
                    cards.map(item => (
                        <LinkCard
                            key={item.id}
                            cardId={item.id}
                            cardContext={item.title}
                            cardIsActive={activeCard.id === item.id}
                            removeCardHandler={() => this.removeLinkHandler(item)}
                        />
                    ))
                }
                <div className="addLinkBtnContainer">
                    <span
                        className="addLinkBtn"
                        onClick={() => this.toggleAddNewLinkComp(true)}
                    >
                        + Add Link
                    </span>
                </div>
                <AddNewLink
                    show={showAddNewLinkPanel}
                    addLinkHandler={this.addLinkHandler}
                    closeCompHandler={() => this.toggleAddNewLinkComp(false)}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    cards: state.playlist.list,
    activeCard: state.playlist.activeItem
})

const mapStateToDispatch = dispatch => ({
    addNewLinkData: (data) => dispatch(actions.addNewLinkDispatch(data)),
    removeLinkData: (data) => dispatch(actions.removeLinkDispatch(data))
})

export default connect(mapStateToProps, mapStateToDispatch)(Playlist);