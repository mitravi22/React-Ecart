import { Rating } from "@material-ui/lab";
import React from "react";
import "./ProductDetails.css"

const ReviewCard = ({ review }) => {
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        value: review.rating,
        size: window.innerWidth < 600 ? 20 : 25,
        isHalf: true
    };

    return (
        <div className="reviewCard">
            <p>{review.name}</p>
            <Rating {...options} />
            <span className="reviewCardComment">{review.comment}</span>
        </div>
    );
}

export default ReviewCard