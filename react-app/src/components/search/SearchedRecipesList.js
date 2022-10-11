import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import RecipeCard from "../recipes/RecipeCard"
import Search from "./Search"

export default function SearchedRecipesList() {
    const { search } = useParams()
    const history = useHistory()
    const allRecipes = useSelector(state => Object.values(state.recipes.normalizedRecipes).reverse())
    const searchedRecipes = allRecipes.filter(recipe => recipe.name.toLowerCase().includes(search))

    useEffect(() => {
        window.scrollTo(0,0)
    },[])

    return(
        <div className="recipe-list-wrapper">
            <div className="search-container">
                <Search />
            </div>
            <div className="recipe-list-container">
                {searchedRecipes.length > 0 && searchedRecipes.map(recipe => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
                {searchedRecipes.length < 1 &&
                (
                <div className="no-recipes-search">No recipes found, please try another search...</div>
                )
                }
            </div>
        </div>
    )
}