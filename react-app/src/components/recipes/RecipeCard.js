import { NavLink } from "react-router-dom";

export default function RecipeCard({recipe}) {
    return (
        <div>
            <NavLink to={`/recipes/${recipe.id}`}>
                <img src={recipe.imageUrl} alt=" "></img>
                <div>{recipe.name}</div>
            </NavLink>
        </div>
    )
}