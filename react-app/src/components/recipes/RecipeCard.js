import { NavLink } from "react-router-dom";
import './recipes.css'
export default function RecipeCard({recipe}) {
    return (
        <div className="recipe-list-card">
            <NavLink to={`/recipes/${recipe.id}`} className="recipe-list-card-link">
                <img src={recipe.imageUrl} alt=" " className="recipe-list-card-image"></img>
                <div className="recipe-list-card-info">
                    <div className="recipe-list-card-name">{recipe.name}</div>
                </div>
            </NavLink>
        </div>
    )
}