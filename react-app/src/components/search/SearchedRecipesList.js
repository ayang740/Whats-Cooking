import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import RecipeCard from "../recipes/RecipeCard"

export default function SearchedRecipesList() {
    const { search } = useParams()
    const allRecipes = useSelector(state => Object.values(state.recipes.normalizedRecipes).reverse())
    console.log(allRecipes)
    const searchedRecipes = allRecipes.filter(recipe => recipe.name.toLowerCase().includes(search))
    console.log(searchedRecipes)
    useEffect(() => {
        window.scrollTo(0,0)
    },[])
    return(
        <div className="recipe-list-wrapper">
            <div className="recipe-list-container">
                {searchedRecipes && searchedRecipes.map(recipe => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </div>
        </div>
    )
}