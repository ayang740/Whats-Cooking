import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom"
import { createNewRecipe } from "../../store/recipes"
import { FaTrashAlt } from "react-icons/fa";
import './recipeforms.css'


export default function RecipePost() {
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const history = useHistory()

    const [name, setName] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [description, setDescription] = useState('')
    const [servings, setServings] = useState('')
    const [activeTime, setActiveTime] = useState('')
    const [totalTime, setTotalTime] = useState('')
    const [ingredients, setIngredients] = useState([{ ingredient: '' }])
    const [instructions, setInstructions] = useState([{ instruction: '' }])
    const [errors, setErrors] = useState([])

    const ingredientNames = ingredients.map(ingredient => {
        return ingredient['ingredient']
    })

    const instructionNames = instructions.map(instruction => {
        return instruction['instruction']
    })

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
            ingredients: ingredientNames,
            instructions: instructionNames
        }

        const badData = await dispatch(createNewRecipe(payload))
        if (badData) {
            setErrors(badData)
        } else {
            setErrors([])
            history.push('/recipes')
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setErrors([]);
        history.push('/recipes');
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
        data.splice(index, 1)
        setInstructions(data)
    }

    return (
        <div className="recipe-form-wrapper">
            <div className="recipe-form-title">Add a New Recipe</div>
            <form className="recipe-form-container">
                <ul className="recipe-form-errors">
                    {!!errors && errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label className="recipe-form-label"> Name:
                    <input
                        className="recipe-form-input"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        
                    />
                </label>
                <label className="recipe-form-label"> Image: 
                    <input
                        className="recipe-form-input"
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        
                    />
                </label>
                <label className="recipe-form-label"> Servings:
                    <input
                        className="recipe-form-input"
                        type="number"
                        value={servings}
                        onChange={(e) => setServings(e.target.value)}
                        
                    />
                </label>
                <label className="recipe-form-label"> Active Time:
                    <input
                        className="recipe-form-input"
                        type="number"
                        value={activeTime}
                        onChange={(e) => setActiveTime(e.target.value)}
                    />
                </label>
                <label className="recipe-form-label"> Total Time: 
                    <input
                        className="recipe-form-input"
                        type="number"
                        value={totalTime}
                        onChange={(e) => setTotalTime(e.target.value)}
                    />
                </label>
                <label className="recipe-form-label"> Description:
                    <textarea 
                        className="recipe-form-input-textarea"
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
                    <button className="recipe-form-submit" type="submit" onClick={handleSubmit}>Add Recipe</button>
                    <button className="recipe-form-cancel" type="button" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    )
}