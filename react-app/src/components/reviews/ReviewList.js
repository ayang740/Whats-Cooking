
import { useDispatch, useSelector } from 'react-redux';
import { removeReview } from '../../store/reviews';
import ReviewEdit from './ReviewEdit';

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

    // const showEdit = (e) => {
    //     e.preventDefault()
    //     return (
    //         <ReviewEdit reviewId={review.id} recipeId={recipeId} />
    //     )
    // }

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
                                <div>
                                    <button
                                    onClick={async()=> await dispatch(removeReview(review.id))}
                                    >Delete Review</button>
                                    <ReviewEdit reviewId={review.id} recipeId={recipeId} />
                                </div>
                            )
                            }
                        </div>
                    )
                })}
            </div>
        </div>
    )
}