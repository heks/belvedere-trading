import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import Search from '../components/Search';
import { FETCH_REQUESTED } from '../constants/ActionTypes';


/**
 * It is common practice to have a 'Root' container/component require our main App (this one).
 * Again, this is because it serves to wrap the rest of our application with the Provider
 * component to make the Redux store available to the rest of the app.
 */
class App extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: FETCH_REQUESTED, payload: { query: 'kittens' } });
  }

  render() {
    const { query, dispatch } = this.props;
    return (
      <div className="main-app-container">
        <div className="main-app-nav">Search Gifs</div>
        <Search query={query} dispatch={dispatch} />
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  query: PropTypes.string.isRequired,
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

/**
 * Keep in mind that 'state' isn't the state of local object, but your single
 * state in this Redux application. 'counter' is a property within our store/state
 * object. By mapping it to props, we can pass it to the child component Counter.
 */
function mapStateToProps(state) {
  const { query } = state.gif;
  return {
    query,
    state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

/**
 * 'connect' is provided to us by the bindings offered by 'react-redux'. It simply
 * connects a React component to a Redux store. It never modifies the component class
 * that is passed into it, it actually returns a new connected componet class for use.
 *
 * More info: https://github.com/rackt/react-redux
 */

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
