export default function RecipeCard({recipe}) {
    return (
        <div>
            <img src={recipe.imageUrl} alt=" "></img>
            <div>{recipe.name}</div>
        </div>
    )
}