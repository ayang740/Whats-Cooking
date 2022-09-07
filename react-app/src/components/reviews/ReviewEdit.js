import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { editReview } from "../../store/reviews"

export default function ReviewEdit({reviewId, recipeId}) {
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
            setReview('')
            setRating('')
            setErrors([])
        }
    }

    return(
        <div>
            <div>
                <form>
                    <ul>
                        {!!errors && errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    <textarea 
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                    />
                    <label> Rating:
                        <input
                            type="number"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                        />
                    </label>
                    <button type="submit" onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </div>
    )
}