import { useParams, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function SingleRecipe() {
    const { recipeId } = useParams()
    const recipe = useSelector(state => state.recipes.normalizedRecipes[recipeId])
    console.log(recipe)
    const sessionUser = useSelector(state => state.session.user);


    // if (!recipe) {
    //     return <Redirect to="/recipes"/>
    // }

    return (
        <div>
            <div>{recipe.name}</div>
            <img src={recipe.imageUrl} alt=" "></img>
            <div>{recipe.description}</div>
        </div>
    )
}