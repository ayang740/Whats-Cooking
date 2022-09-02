import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom"
import { createNewRecipe } from "../../store/recipes"
import RecipeIngredientPost from "./RecipeIngredientPost"

export default function RecipePost() {
    const sessionUser = useSelector(state => state.session.user)
    const allRecipes = useSelector(state => Object.values(state.recipes.normalizedRecipes))
    const dispatch = useDispatch()
    const history = useHistory()

    const [name, setName] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [description, setDescription] = useState('')
    const [servings, setServings] = useState('')
    const [activeTime, setActiveTime] = useState('')
    const [totalTime, setTotalTime] = useState('')
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
        }

        const badData = await dispatch(createNewRecipe(payload))
        if (badData) {
            setErrors(badData)
        } else {
            history.push('/recipes')
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <ul>
                    {!!errors && errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label> Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <label> Image: 
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        required
                    />
                </label>
                <label> Description:
                    <textarea 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                <label> Servings:
                    <input
                        type="number"
                        value={servings}
                        onChange={(e) => setServings(e.target.value)}
                        required
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
                {/* <RecipeIngredientPost allRecipes={allRecipes}/> */}
                <button type="submit">Add Recipe</button>
            </form>
        </div>
    )
}