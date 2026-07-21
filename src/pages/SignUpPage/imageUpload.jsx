import React, { useState, useRef, useEffect } from 'react';
import DefaultImage from "../../assets/profilePicture.svg";
import EditIcon from "../../assets/editIcon.svg";
import "../../styles/imageUpload.css";


const ImageUpload = () => {
    const [photoURL, setPhotoURL] = useState(() => {
        return localStorage.getItem('photoURL') || DefaultImage;
    });
    const [hasUploadedPhoto, setHasUploadedPhoto] = useState(false);

    const fileUploadRef = useRef();

    const handleImageUpload = () => {
        fileUploadRef.current.click()
    }

    const uploadImageDisplay = () => {
        const uploadedFile = fileUploadRef.current.files[0];
        const cachedURL = URL.createObjectURL(uploadedFile);
        setPhotoURL(cachedURL);
        setHasUploadedPhoto(true);
        localStorage.setItem('photoURL', cachedURL);
    }

    const handleImageError = () => {
        setPhotoURL(DefaultImage);
        setHasUploadedPhoto(false);
    };

    useEffect(() => {
        return () => {
            if (hasUploadedPhoto) {
                URL.revokeObjectURL(photoURL);
            }
        };
    }, [photoURL, hasUploadedPhoto]);


    return (
        <div className="defaultImgContainer">
            <img
                src={photoURL}
                alt={hasUploadedPhoto ? "Uploaded profile photo" : "Default profile photo"}
                className="defaultImg"
                onError={handleImageError}
            />
            <button
                className='uploadBtn'
                type='button'
                onClick={handleImageUpload}
                aria-label="Change profile photo"
            >
                <img
                    src={EditIcon}
                    alt=""
                    aria-hidden="true"
                    className="editBtn"
                />
            </button>
            <input
                type="file"
                id="profile-photo"
                ref={fileUploadRef}
                onChange={uploadImageDisplay}
                accept="image/*"
                className="sr-only"
            />
        </div>
    )
}

export default ImageUpload
