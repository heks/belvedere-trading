import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import Search from '../components/Search';
import Gifs from '../components/Gifs';


/**
 * It is common practice to have a 'Root' container/component require our main App (this one).
 * Again, this is because it serves to wrap the rest of our application with the Provider
 * component to make the Redux store available to the rest of the app.
 */
class App extends Component {

  render() {
    const { query, dispatch, gifs, loading } = this.props;
    return (
      <div className="main-app-container">
        <div className="main-app-nav">Search Gifs</div>
        <Search query={query} dispatch={dispatch} />
        <Gifs gifs={gifs} loading={loading} />
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  query: PropTypes.string.isRequired,
  gifs: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  const { query, gifs, gif, loading } = state.gif;
  return {
    loading,
    query,
    gifs: gifs.map(gifKey => {
      return gif[gifKey];
    })
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
