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

const initialState = { normalizedRecipes: {} }

export default function recipesReducer(state = initialState, action) {
    let newState
    switch (action.type) {
        case LOAD_RECIPES:
            newState = JSON.parse(JSON.stringify(state))
            console.log(action)
            action.recipes.all_recipes.forEach(recipe => {
                newState.normalizedRecipes[recipe.id] = recipe
            })
            return newState

        default:
            return state
    }
}