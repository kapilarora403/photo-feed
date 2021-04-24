import { connect } from "react-redux";
import './Modal.scss';
import React, {useEffect, useState} from "react";
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {getQueryResults} from "../../actions/photoActions";

function Modal({ show, handleClose, photoId, photos, pageNum, loading, queryResults, query }) {
    const modalManipulatedClassName = show ? "modal show" : "modal hide";
    const [targetPhoto, setTargetPhoto] = useState(null);
    useEffect(() => {
        const result = photos.find((photo) => photo.id === photoId);
        setTargetPhoto(result);
        return () => setTargetPhoto(null);
    }, [photoId, photos])

    const handleForward = async () => {
        const index = photos.indexOf(targetPhoto);
        if (index === photos.length - 1) {
            await queryResults({
                query,
                page: pageNum,
                success: (freshPhotos) => {
                    setTargetPhoto(freshPhotos[0]);
                }
            })
        } else if (index > -1) {
            setTargetPhoto(photos[index + 1]);
        }
    }
    const handleBackward = () => {
        const index = photos.indexOf(targetPhoto);
        if (index === 0) {
            return null;
        }
        if (index > 0) {
            setTargetPhoto(photos[index - 1]);
        }
    }
    if (targetPhoto) {
        return (
            <div className={modalManipulatedClassName}>
                <CloseIcon onClick={handleClose} className="closeIcon" />
                <section className="modal-main">
                    <div className="imageWrapper">
                        <ArrowBackIcon className="closeIcon" onClick={handleBackward}  />
                        <img
                            className="modalImage"
                            alt={targetPhoto?.alt_description}
                            src={targetPhoto?.urls?.full}
                            width="50%"
                            height="50%"
                        />
                        <ArrowForwardIcon className="closeIcon" onClick={handleForward} />
                    </div>
                </section>
            </div>
        )
    } else {
        return <div />
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    queryResults: (query) => dispatch(getQueryResults(query)),
});



export default connect(mapStateToProps, mapDispatchToProps)(Modal)