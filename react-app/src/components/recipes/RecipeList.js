import { useDispatch, useSelector } from "react-redux"
import RecipeCard from "./RecipeCard"

export default function RecipeList() {
    const dispatch = useDispatch()
    const allRecipes = useSelector(state => Object.values(state.recipes.normalizedRecipes).reverse())
    return (
        <div>
            {allRecipes && allRecipes.map(recipe => (
                <RecipeCard recipe={recipe} />
            ))}
        </div>
    )
}