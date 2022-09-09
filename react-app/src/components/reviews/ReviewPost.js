import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { createNewReview } from "../../store/reviews"
import './reviews.css'


export default function ReviewPost({recipeId, recipe}) {
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()

    const [review, setReview] = useState('')
    const [rating, setRating] = useState('')
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
        if (sessionUser.id !== recipe.userId) {
            const badData = await dispatch(createNewReview(payload))
            if (badData) {
                setErrors(badData)
            } else {
                setReview('')
                setRating('')
                setErrors([])
            }
        } else {
            setErrors(['Cannot review your own recipe'])
        }
        
    }

    return (
        <div className="reviews-container">
            <div className="reviews-post-title">Leave a Review</div>
            <div className="reviews-form">
                <form>
                    <ul className="reviews-form-errors">
                        {!!errors && errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    <textarea 
                        className="reviews-form-textarea"
                        placeholder="Let us know your thoughts..."
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                    />
                    <div className="reviews-form-bottom">
                        <label className="reviews-form-label"> Rating:
                            <input
                                className="reviews-form-input"
                                type="number"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                            />
                        </label>
                        <button className="reviews-form-button" type="submit" onClick={handleSubmit}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}