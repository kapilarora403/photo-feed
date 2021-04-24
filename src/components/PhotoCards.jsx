import React, { useState } from "react";
import { connect } from "react-redux";
import Modal from "./Modal/Modal";


function PhotoCards({ photos }) {
    const [showModal, setShowModal] = useState(false);
    const [photoId, setPhotoId] = useState('');
    const handleShowModal = (photoId) => {
        setPhotoId(photoId);
        setShowModal(true);
    }
    const handleHideModal = () => {
        setPhotoId('');
    }
    return (
        <div className="card-list">
            {
                photos.map((pic) => (
                    <div className="card" key={pic.id} onClick={() => handleShowModal(pic.id)}>
                        <img
                            className="card--image"
                            alt={pic?.alt_description}
                            src={pic?.urls?.full}
                            width="50%"
                            height="50%"
                        />
                    </div>))
            }
            <Modal show={showModal} handleClose={handleHideModal} photoId={photoId} />
        </div>
    )
}

const mapStateToProps = state => ({
    ...state
});


export default connect(mapStateToProps)(PhotoCards);

