import { useEffect } from "react"
import { useSelector } from "react-redux"
import Search from "../search/Search"
import RecipeCard from "./RecipeCard"
import './recipes.css'

export default function RecipeList() {
    const allRecipes = useSelector(state => Object.values(state.recipes.normalizedRecipes).reverse())
    useEffect(() => {
        window.scrollTo(0,0)
    },[])
    return (
        <div className="recipe-list-wrapper">
            <div className="search-container">
                <Search />
            </div>
            <div className="recipe-list-container">
                {allRecipes && allRecipes.map(recipe => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </div>
        </div>
    )
}