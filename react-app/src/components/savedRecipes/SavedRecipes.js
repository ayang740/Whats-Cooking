import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import RecipeCard from "../recipes/RecipeCard"
import '../recipes/recipes.css'

export default function SavedRecipes() {
    const allRecipes = useSelector(state => Object.values(state.recipes.normalizedRecipes).reverse())
    const userId = useSelector((state) => state.session.user.id)
    const allSavedRecipes = allRecipes.filter(recipe => recipe.userSaves.includes(userId))
    console.log(allSavedRecipes)
    useEffect(() => {
        window.scrollTo(0,0)
    },[])

    return (
        <div>
            <div className="saved-recipe-list-wrapper">
                <div className="saved-recipe-list-container">
                    <div className="saved-recipe-title">My Saved Recipes</div>
                    <div className="saved-recipe-text">These recipes are saved to your account, so you can revisit them anytime.</div>
                    <div className="saved-recipe-cards">
                        {allSavedRecipes.length > 0 && allSavedRecipes.map(recipe => (
                            <RecipeCard key={recipe.id} recipe={recipe} />
                        ))}
                    </div>
                    {allSavedRecipes.length < 1 &&
                    (
                    <div className="no-saved-recipes">
                        <div className="no-saved-recipes-text">You have not saved any recipes recently.</div>
                        <Link to={'/recipes'} className="no-saved-recipes-link">SEARCH ALL RECIPES</Link>
                    </div>
                    )
                    }
                </div>
            </div>
        </div>
    )
}
