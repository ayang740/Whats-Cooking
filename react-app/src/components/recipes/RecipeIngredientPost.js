import { useState } from "react";
import { useDispatch } from "react-redux";
import { createNewIngredient } from "../../store/recipes";

export default function RecipeIngredientPost({allRecipes}) {
    const dispatch = useDispatch
    console.log(allRecipes[allRecipes.length-1].id)
    const [ingredient, setIngredient] = useState('')
    const [errors, setErrors] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])
        const payload = {
            ingredient,
            recipe_id: allRecipes[allRecipes.length-1].id
        }

        await dispatch(createNewIngredient(payload))

    }

    return (
        <div>
            <form>
                <label> Ingredient:
                    <input 
                        type="text"
                        value={ingredient}
                        onChange={(e) => setIngredient(e.target.value)}
                        required
                    />
                </label>
            </form>
        </div>
    )
}