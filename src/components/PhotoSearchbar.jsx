import React, { useState } from "react";
import { connect } from "react-redux";
import { getQueryResults } from "../actions/photoActions";

function PhotoSearchbar(props) {
    const [query, setQuery] = useState('');
    const searchPhotos = async (e) => {
        e.preventDefault();

        props.queryResults({
            query,
            page: 1,
        });
    };
    return (
        <>
            <form className="form" onSubmit={searchPhotos}>
                <label className="label" htmlFor="query">
                    {" "}
                    📷
                </label>
                <input
                    type="text"
                    name="query"
                    className="input"
                    placeholder={'Search for your favorite snaps here'}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit" className="button">
                    Search
                </button>
            </form>
        </>
    );
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    queryResults: (query) => dispatch(getQueryResults(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhotoSearchbar);
