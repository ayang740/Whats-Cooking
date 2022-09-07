import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { editReview } from "../../../store/reviews"
import '../reviews.css'

export default function ReviewEdit({reviewId, recipeId, setShowModal}) {
    const sessionUser = useSelector(state => state.session.user)
    const currentReview = useSelector(state=> state.reviews.normalizedReviews[reviewId])
    const dispatch = useDispatch()

    const [review, setReview] = useState(currentReview.review)
    const [rating, setRating] = useState(currentReview.rating)
    const [errors, setErrors] = useState([])
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])
        const payload = {
            review,
            rating,
            user_id: sessionUser.id,
            recipe_id: recipeId
        }

        const badData = await dispatch(editReview(payload, reviewId))
        if (badData) {
            setErrors(badData)
        } else {
            setShowModal(false)
            setErrors([])
        }
    }

    return(
        <div className="edit-review-modal">
            <div className="edit-review-title">Update Your Review</div>
            <div className="edit-review-form-wrapper">
                <form className="edit-review-form">
                    <ul className="reviews-form-errors">
                        {!!errors && errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    <textarea 
                        className="edit-review-form-textarea"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                    />
                    <label className="edit-review-form-label"> Rating:
                        <input
                            className="edit-review-form-input"
                            type="number"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                        />
                    </label>
                    <button className="reviews-form-button" type="submit" onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </div>
    )
}