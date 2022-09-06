const LOAD_REVIEWS = '/reviews/all'
const NEW_REVIEW = '/reviews/new'
const UPDATE_REVIEW = '/reviews/update'
const DELETE_REVIEW = '/reviews/delete'

const loadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
})
const createReview = (review) => ({
    type: NEW_REVIEW,
    review
})
const updateReview = (review) => ({
    type: UPDATE_REVIEW,
    review
})
const deleteReview = (id) => ({
    type: DELETE_REVIEW,
    id
})

export const getAllReviews = () => async (dispatch) => {
    const response = await fetch('/api/reviews/', {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
        const data = await response.json()
        if (data.errors) {
            return
        } else dispatch(loadReviews(data))
    }
}

export const createNewReview = (payload) => async (dispatch) => {
    const response = await fetch('/api/reviews/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(createReview(data))
    } else {
        const badData = await response.json()
        if (badData.errors) return badData.errors
    }
}

export const editReview = (payload, reviewId) => async dispatch => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    if (response.ok) {

        const review = await response.json();
        dispatch(updateReview(review));
    } else {
        const badData = await response.json()
        if (badData.errors) return badData.errors
    }
};

export const removeReview = (id) => async dispatch => {
    const response = await fetch(`/api/reviews/${id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        dispatch(deleteReview(id))
    }
};

const initialState = { normalizedReviews: {} }

export default function reviewsReducer(state = initialState, action) {
    let newState
    switch (action.type) {
        case LOAD_REVIEWS:
            newState = JSON.parse(JSON.stringify(state))
            action.reviews.all_reviews.forEach(review => {
                newState.normalizedReviews[review.id] = review
            })
            return newState
        case NEW_REVIEW:
            newState = JSON.parse(JSON.stringify(state))
            newState.normalizedReviews[action.review.new_review.id] = action.review.new_review
            return newState
        case UPDATE_REVIEW:
            newState = JSON.parse(JSON.stringify(state))
            newState.normalizedReviews[action.review.review.id] = action.review.review
            return newState
        case DELETE_REVIEW:
            newState = JSON.parse(JSON.stringify(state))
            delete newState.normalizedReviews[action.id]
            return newState
        default:
            return state
    }
}