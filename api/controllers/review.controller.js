import createError from "../utils/createError.js";
import Review from "../models/review.model.js";
import Gig from "../models/gig.model.js";

export const createReview = async (req, res, next) => {
    try {

        const newReview = new Review({
            ...req.body
        });

        await newReview.save();

        res.status(201).send(newReview);
    } catch (err) {
        next(err);
    }
};

export const getReviews = async (req, res, next) => {
    try {
        const reviews = await Review.find({ gigId: req.params.gigId });
        res.status(200).send(reviews);
    } catch (err) {
        next(err);
    }
};
export const deleteReview = async (req, res, next) => {
    try {
    } catch (err) {
        next(err);
    }
};