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
                photos.map((photo) => (
                    <div className="card" key={photo.id} onClick={() => handleShowModal(photo.id)}>
                        <img
                            className="card--image"
                            alt={photo?.alt_description}
                            src={photo?.urls?.full}
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

