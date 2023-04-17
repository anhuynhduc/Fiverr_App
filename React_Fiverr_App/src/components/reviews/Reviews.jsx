import React, {useState} from 'react';
import './Reviews.scss'
import Review from "../review/Review.jsx";
import {useQuery} from "@tanstack/react-query";
import newRequest from "../../../utils/newRequest.js";
const Reviews = ({gigId}) => {

    const [desc, setDesc] = useState("")
    const [stars, setStars] = useState(0)

    const { isLoading, error, data } = useQuery({
        queryKey: ["reviews"],
        queryFn: () =>
            newRequest
                .get(
                    `/reviews/${gigId}`
                )
                .then((res) => {
                    return res.data;
                }),
    });
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    const userId = currentUser._id

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await newRequest.post("/reviews", { userId, gigId, stars, desc });

        } catch (err) {
           console.log(err)
        }
    };


    return (
        <div className="reviews">
            <h2>Reviews</h2>
            {isLoading ? "loading" : error ? "Something went wrong!" :
                data.map((review) =>  <Review key={review._id} review={review}/>)}
            <div className="add">
                <h3>Add a review</h3>
                <form action="" className="addForm" onSubmit={handleSubmit}>
                    <input type="text" placeholder="write your opinion" onChange={(e) => setDesc(e.target.value)}/>
                    <select name="" id="" onChange={(e) => setStars(e.target.value)}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                    <button>Send</button>
                </form>
            </div>
        </div>
    );
};

export default Reviews;