
import { useDispatch, useSelector } from 'react-redux';
import { removeReview } from '../../store/reviews';

export default function ReviewList({recipeId}) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const recipe = useSelector(state => state.recipes.normalizedRecipes[recipeId])
    const reviews = useSelector(state=> state.reviews.normalizedReviews
        )
    let recipeReviews
    if (recipe && reviews) {
        recipeReviews = Object.values(reviews).filter(review => review.recipeId === recipe.id).reverse();
      }

    if (!reviews || !recipe) {
        return null;
    }

    return (
        <div>
            <div>Reviews {reviews.length}</div>
            <div>
                {recipeReviews && recipeReviews.map(review => {
                    return (
                        <div key={review.id}>

                            <div>{review.review}</div>
                            <div>{review.user.name}</div>
                            {sessionUser?.id === review?.userId &&
                            (
                                <button className='review-delete'
                                onClick={async()=> await dispatch(removeReview(review.id))}
                                >Delete Review</button>
                            )
                            }
                        </div>
                    )
                })}
            </div>
        </div>
    )
}