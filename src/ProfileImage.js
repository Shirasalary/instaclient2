import React from "react";

const ProfileImage = (props) => {
    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <div className="image-window">
                {props.imageUrl && props.imageUrl !== "" ? (
                    <img
                        src={props.imageUrl}
                        alt="Circular view"
                        className="image"
                    />
                ) : (
                    <p>Enter a URL to see the image</p>
                )}
            </div>
        </div>
    );
};

export default ProfileImage;
