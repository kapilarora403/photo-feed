import './App.scss';
import { connect } from "react-redux";
import PhotoSearchbar from "components/PhotoSearchbar";
import PhotoCards from "./components/PhotoCards";
import React from "react";
import {getQueryResults} from "./actions/photoActions";
import InfiniteScroller from "./components/InfiniteScroller";

function App({ query, pageNum, queryResults, loading, photos }) {
    const loadMore = () => {
        queryResults({ query, page: pageNum})
    }
    console.log(process.env.PHOTO_ACCESS_KEY);
  return (
    <div className="App">
      <div className="container">
        <h1 className="title">Photo Search App</h1>
        <PhotoSearchbar />
        <PhotoCards />
          {photos.length > 0 && (
              <div className="infiniteWrapper">
              <InfiniteScroller callback={loadMore} loading={loading} />
              </div>
          )}
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    queryResults: (query) => dispatch(getQueryResults(query)),
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
