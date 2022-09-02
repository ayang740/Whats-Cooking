import { useState } from "react";
import { useDispatch } from "react-redux";
import { createNewInstruction } from "../../store/recipes";

export default function RecipeInstructionPost({allRecipes}) {
    const dispatch = useDispatch
    console.log(allRecipes[allRecipes.length-1].id)
    const [instruction, setInstruction] = useState('')
    const [errors, setErrors] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])
        const payload = {
            instruction,
            recipe_id: allRecipes[allRecipes.length-1].id
        }

        await dispatch(createNewInstruction(payload))

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label> Instruction:
                    <input 
                        type="text"
                        value={instruction}
                        onChange={(e) => setInstruction(e.target.value)}
                        required
                    />
                </label>
            </form>
        </div>
    )
}