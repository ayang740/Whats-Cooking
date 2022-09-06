import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom"
import { createNewRecipe } from "../../store/recipes"


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
            instructions
        }

        const badData = await dispatch(createNewRecipe(payload))
        if (badData) {
            setErrors(badData)
        } else {
            history.push('/recipes')
        }
    }

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
        <div>
            <form>
                <ul>
                    {!!errors && errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label> Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        
                    />
                </label>
                <label> Image: 
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        
                    />
                </label>
                <label> Description:
                    <textarea 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        
                    />
                </label>
                <label> Servings:
                    <input
                        type="number"
                        value={servings}
                        onChange={(e) => setServings(e.target.value)}
                        
                    />
                </label>
                <label> Active Time:
                    <input
                        type="number"
                        value={activeTime}
                        onChange={(e) => setActiveTime(e.target.value)}
                    />
                </label>
                <label> Total Time: 
                    <input
                        type="number"
                        value={totalTime}
                        onChange={(e) => setTotalTime(e.target.value)}
                    />
                </label>
                <div>
                    {ingredients.map((input, index) => {
                        return(
                            <div key={index}>
                                <label> Ingredient: 
                                    <input 
                                        type="text"
                                        name="ingredient"
                                        value={input.ingredient}
                                        onChange={(e) => handleIngredients(index, e)}
                                    />
                                    <button onClick={(e) => handleRemoveIngredients(index, e)}>Remove</button>
                                </label>
                            </div>
                        )
                    })}
                    <button onClick={handleAddIngredients}>Add another ingredient</button>
                </div>
                <div>
                    {instructions.map((input, index) => {
                        return(
                            <div key={index}>
                                <label> Step {index + 1}: 
                                    <input 
                                        type="text"
                                        name="instruction"
                                        value={input.instruction}
                                        onChange={(e) => handleInstructions(index, e)}
                                    />
                                    <button onClick={(e) => handleRemoveInstructions(index, e)}>Remove</button>
                                </label>
                            </div>
                        )
                    })}
                    <button onClick={handleAddInstructions}>Add another step</button>
                </div>
                <button type="submit" onClick={handleSubmit}>Add Recipe</button>
            </form>
        </div>
    )
}