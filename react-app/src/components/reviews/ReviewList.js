
import { useDispatch, useSelector } from 'react-redux';
import { removeReview } from '../../store/reviews';
import EditReviewModal from './ReviewEditModal';
import { FaTrashAlt } from "react-icons/fa";
import './reviews.css'


export default function ReviewList({recipeId}) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const recipe = useSelector(state => state.recipes.normalizedRecipes[recipeId])
    const reviews = useSelector(state=> state.reviews.normalizedReviews)
    
    let recipeReviews
    if (recipe && reviews) {
        recipeReviews = Object.values(reviews).filter(review => review.recipeId === recipe.id).reverse();
      }

    if (!reviews || !recipe) {
        return null;
    }

    return (
        <div className='reviews-container'>
            <div className='reviews-list-title'>Reviews ({recipeReviews.length})</div>
            <div>
                {recipeReviews && recipeReviews.map(review => {
                    return (
                        <div key={review.id} className='reviews-list-individual'>

                            <div className='reviews-list-individual-review'>{review.review}</div>
                            <div className='reviews-list-individual-info'>
                                <div className='reviews-list-individual-name'>{(review.user.name).toUpperCase()}</div>
                                {sessionUser?.id === review?.userId &&
                                (
                                    <div>
                                        <button
                                        className='reviews-list-individual-button'
                                        onClick={async()=> await dispatch(removeReview(review.id))}
                                        ><FaTrashAlt /></button>
                                        <EditReviewModal reviewId={review.id} recipeId={recipeId} />
                                    </div>
                                )
                                }
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}