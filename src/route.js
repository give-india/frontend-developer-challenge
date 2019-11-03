import React, { Component } from 'react';

import history from './utils/history';
import { Router, Route, Switch } from 'react-router';
import { connect } from 'react-redux';

import Main from './Components/main';

class Routes extends Component {
    render() {
        return (
            <div>
                <Router history={history}>
                    <div>
                        <Switch>
                            <Route exact path='/' render={() => <Main />} />
                        </Switch>
                    </div>
                </Router>
            </div>);
    }
}

function mapStateToProps(state) {
    return {
    }
}
function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes);