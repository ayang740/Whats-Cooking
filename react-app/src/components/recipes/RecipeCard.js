import { useState } from "react";
import { NavLink } from "react-router-dom";
import './recipes.css'
export default function RecipeCard({recipe}) {
    const [imageSrc, setImageSrc] = useState(recipe.imageUrl)
    return (
        <div className="recipe-list-card">
            <NavLink to={`/recipes/${recipe.id}`} className="recipe-list-card-link">
                <img onError={() => setImageSrc("https://www.takeoutlist.com/assets/images/food_default.png")}   src={imageSrc} alt=" " className="recipe-list-card-image"></img>
                <div className="recipe-list-card-info">
                    <div className="recipe-list-card-name">{recipe.name}</div>
                </div>
            </NavLink>
        </div>
    )
}