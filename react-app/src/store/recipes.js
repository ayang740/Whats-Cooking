const LOAD_RECIPES = '/recipes/all'
const NEW_RECIPE = '/recipes/new'
const UPDATE_RECIPE = '/recipes/update'
const DELETE_RECIPE = '/recipes/delete'
const NEW_INGREDIENT = '/recipes/ingredient'
const NEW_INSTRUCTION = 'recipes/instruction'

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

const createIngredient = (ingredient) => ({
    type: NEW_INGREDIENT,
    ingredient
})

const createInstruction = (instruction) => ({
    type: NEW_INSTRUCTION,
    instruction
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

export const editRecipe = (payload) => async dispatch => {
    const response = await fetch(`/api/recipes/${payload.id}`, {
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
}

export const createNewIngredient = (payload) => async dispatch => {
    const response = await fetch(`/api/recipes/ingredients`, {
        method: 'POST',
        headers: { "Content-Type": 'application/json' },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const ingredient = await response.json()
        dispatch(createIngredient(ingredient))
        return ingredient
    }
}

export const createNewInstruction = (payload) => async dispatch => {
    const response = await fetch(`/api/recipes/instructions`, {
        method: 'POST',
        headers: { "Content-Type": 'application/json' },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const instruction = await response.json()
        dispatch(createInstruction(instruction))
        return instruction
    }
}

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
        case NEW_INGREDIENT:
            newState = JSON.parse(JSON.stringify(state))
            newState.normalizedRecipes[action.ingredient.new_ingredient.id] = action.ingredient.new_ingredient
            return newState
        case NEW_INSTRUCTION:
            newState = JSON.parse(JSON.stringify(state))
            newState.normalizedRecipes[action.instruction.new_instruction.id] = action.instruction.new_instruction
            return newState
        default:
            return state
    }
}