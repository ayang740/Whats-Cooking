import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory, useParams } from "react-router-dom"
import { editRecipe } from "../../store/recipes"
import { FaTrashAlt } from "react-icons/fa";
import './recipeforms.css'

export default function RecipeEdit() {
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const history = useHistory()
    const { recipeId } = useParams();
    const recipe = useSelector(state => state.recipes.normalizedRecipes[recipeId])

    const [name, setName] = useState(recipe.name)
    const [imageUrl, setImageUrl] = useState(recipe.imageUrl)
    const [description, setDescription] = useState(recipe.description)
    const [servings, setServings] = useState(recipe.servings)
    const [activeTime, setActiveTime] = useState(recipe.activeTime)
    const [totalTime, setTotalTime] = useState(recipe.totalTime)
    const [ingredients, setIngredients] = useState(recipe.ingredients)
    const [instructions, setInstructions] = useState(recipe.instructions)
    const [deletedIngredients, setDeletedIngredients] = useState([])
    const [deletedInstructions, setDeletedInstructions] = useState([])
    const [errors, setErrors] = useState([])
    const [finishedLoading, setFinishedLoading] = useState(false)

    useEffect(() => {
        window.scrollTo(0,0)
    },[])

    useEffect(() => {
        // Check if user is allowed to edit recipe

        // If not allowed, redirect back to original recipe page
        if (sessionUser.id != recipe.userId) {
            console.log("Redirecting")
            history.push('/recipes')
            return null
        }else {
            setFinishedLoading(true)
        }
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])
        const payload = {
            name,
            imageUrl,
            description,
            servings,
            activeTime,
            totalTime,
            user_id: sessionUser.id,
            ingredients,
            instructions,
            deletedIngredients,
            deletedInstructions
        }

        const badData = await dispatch(editRecipe(payload, recipeId))
        if (badData) {
            setErrors(badData)
        } else {
            setErrors([])
            history.push(`/recipes/${recipe.id}`)
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setErrors([]);
        history.push(`/recipes/${recipeId}`);
    };
    
    const handleIngredients = (index, e) => {
        let data = [...ingredients];
        data[index][e.target.name] = e.target.value
        setIngredients(data)
    }

    const handleAddIngredients = (e) => {
        e.preventDefault()
        let newIngredient = { ingredient: "" }
        setIngredients([...ingredients, newIngredient])
    }

    const handleRemoveIngredients = (index, e) => {
        e.preventDefault()
        let data = [...ingredients];
        setDeletedIngredients([...deletedIngredients, data[index]])
        data.splice(index, 1)
        setIngredients(data)
    }

    const handleInstructions = (index, e) => {
        let data = [...instructions];
        data[index][e.target.name] = e.target.value
        setInstructions(data)
    }

    const handleAddInstructions = (e) => {
        e.preventDefault()
        let newInstructions = { instruction: "" }
        setInstructions([...instructions, newInstructions])
    }

    const handleRemoveInstructions = (index, e) => {
        e.preventDefault()
        let data = [...instructions];
        setDeletedInstructions([...deletedInstructions, data[index]])
        data.splice(index, 1)
        setInstructions(data)
    }

    return (

        <div className="recipe-form-wrapper">
            {finishedLoading && 
            <div>
                <div className="recipe-form-title">Edit Your Recipe</div>
                <form className="recipe-form-container">
                    <ul className="recipe-form-errors">
                        {!!errors && errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    <label className="recipe-form-label"> Name:
                        <input
                            className="recipe-form-input"
                            placeholder="Name(required)"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            
                        />
                    </label>
                    <label className="recipe-form-label"> Image: 
                        <input
                            className="recipe-form-input"
                            placeholder="Image(required)"
                            type="text"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            
                        />
                    </label>
                    <label className="recipe-form-label"> Servings:
                        <input
                            className="recipe-form-input"
                            placeholder="Servings(required)"
                            type="number"
                            value={servings}
                            onChange={(e) => setServings(e.target.value)}
                            
                        />
                    </label>
                    <label className="recipe-form-label"> Active Time:
                        <input
                            className="recipe-form-input"
                            placeholder="Active Time(required)"
                            type="number"
                            value={activeTime}
                            onChange={(e) => setActiveTime(e.target.value)}
                        />
                    </label>
                    <label className="recipe-form-label"> Total Time: 
                        <input
                            className="recipe-form-input"
                            placeholder="Total Time(required)"
                            type="number"
                            value={totalTime}
                            onChange={(e) => setTotalTime(e.target.value)}
                        />
                    </label>
                    <label className="recipe-form-label"> Description:
                        <textarea 
                            className="recipe-form-input-textarea"
                            placeholder="Description(required)"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            
                        />
                    </label>
                    <div className="recipe-form-ingredients">
                        {ingredients.map((input, index) => {
                            return(
                                <div key={index}>
                                    <label className="recipe-form-label"> Ingredient: 
                                        <input 
                                            className="recipe-form-input"
                                            placeholder="Ingredient(required)"
                                            type="text"
                                            name="ingredient"
                                            value={input.ingredient}
                                            onChange={(e) => handleIngredients(index, e)}
                                        />
                                        <button className="recipe-form-input-remove" onClick={(e) => handleRemoveIngredients(index, e)}><FaTrashAlt /></button>
                                    </label>
                                </div>
                            )
                        })}
                        <div className="recipe-form-input-add-container">
                            <button className="recipe-form-input-add" onClick={handleAddIngredients}>Add another ingredient</button>
                        </div>
                    </div>
                    <div className="recipe-form-instructions">
                        {instructions.map((input, index) => {
                            return(
                                <div key={index}>
                                    <label className="recipe-form-label"> Step {index + 1}: 
                                        <input 
                                            className="recipe-form-input"
                                            placeholder="Instruction(required)"
                                            type="text"
                                            name="instruction"
                                            value={input.instruction}
                                            onChange={(e) => handleInstructions(index, e)}
                                        />
                                        <button className="recipe-form-input-remove" onClick={(e) => handleRemoveInstructions(index, e)}><FaTrashAlt /></button>
                                    </label>
                                </div>
                            )
                        })}
                        <div className="recipe-form-input-add-container">
                            <button className="recipe-form-input-add" onClick={handleAddInstructions}>Add another step</button>
                        </div>
                    </div>
                    <div className="recipe-form-buttons">
                        <button className="recipe-form-submit" type="submit" onClick={handleSubmit}>Edit Recipe</button>
                        <button className="recipe-form-cancel" type="button" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        }
        </div>
      
    )
}
