import { useSelector } from "react-redux"
import RecipeCard from "./RecipeCard"

export default function RecipeList() {
    const allRecipes = useSelector(state => Object.values(state.recipes.normalizedRecipes).reverse())
    return (
        <div>
            {allRecipes && allRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
        </div>
    )
}