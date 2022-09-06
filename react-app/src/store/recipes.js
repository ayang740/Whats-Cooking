const LOAD_RECIPES = '/recipes/all'
const NEW_RECIPE = '/recipes/new'
const UPDATE_RECIPE = '/recipes/update'
const DELETE_RECIPE = '/recipes/delete'

const loadRecipes = (recipes) => ({
    type: LOAD_RECIPES,
    recipes
})
const createRecipe = (recipe) => ({
    type: NEW_RECIPE,
    recipe
})
const updateRecipe = (recipe) => ({
    type: UPDATE_RECIPE,
    recipe
})
const deleteRecipe = (id) => ({
    type: DELETE_RECIPE,
    id
})

export const getAllRecipes = () => async (dispatch) => {
    const response = await fetch('/api/recipes/', {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
        const data = await response.json()
        if (data.errors) {
            return
        } else dispatch(loadRecipes(data))
    }
}

export const createNewRecipe = (payload) => async (dispatch) => {
    const response = await fetch('/api/recipes/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(createRecipe(data))
    } else {
        const badData = await response.json()
        if (badData.errors) return badData.errors
    }
}

export const editRecipe = (payload, recipeId) => async dispatch => {
    const response = await fetch(`/api/recipes/${recipeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    if (response.ok) {

        const recipe = await response.json();
        dispatch(updateRecipe(recipe));
    } else {
        const badData = await response.json()
        if (badData.errors) return badData.errors
    }
};

export const removeRecipe = (id) => async dispatch => {
    const response = await fetch(`/api/recipes/${id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        dispatch(deleteRecipe(id))
    }
};

const initialState = { normalizedRecipes: {} }

export default function recipesReducer(state = initialState, action) {
    let newState
    switch (action.type) {
        case LOAD_RECIPES:
            newState = JSON.parse(JSON.stringify(state))
            action.recipes.all_recipes.forEach(recipe => {
                newState.normalizedRecipes[recipe.id] = recipe
            })
            return newState
        case NEW_RECIPE:
            newState = JSON.parse(JSON.stringify(state))
            newState.normalizedRecipes[action.recipe.new_recipe.id] = action.recipe.new_recipe
            return newState
        case UPDATE_RECIPE:
            newState = JSON.parse(JSON.stringify(state))
            newState.normalizedRecipes[action.recipe.recipe.id] = action.recipe.recipe
            return newState
        case DELETE_RECIPE:
            newState = JSON.parse(JSON.stringify(state))
            delete newState.normalizedRecipes[action.id]
            return newState
        default:
            return state
    }
}