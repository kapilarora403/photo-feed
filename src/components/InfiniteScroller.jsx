import Loader from "./Loader";
import handleViewport from 'react-in-viewport';
import React, { PureComponent } from "react";

class InfiniteScroller extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            enterCount: this.props.enterCount,
        };
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.enterCount > prevState.enterCount && !nextProps.loading) {
            nextProps.callback();
            return { enterCount: nextProps.enterCount}
        }
        return null;
    }
    render() {
        return (
            <div className="scrollerWrapper">
                <Loader />
            </div>
        );
    }
}

export default handleViewport(InfiniteScroller)