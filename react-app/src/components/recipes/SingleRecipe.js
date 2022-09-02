import { useParams, Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeRecipe } from '../../store/recipes';

export default function SingleRecipe() {
    const { recipeId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user)
    const recipe = useSelector(state => state.recipes.normalizedRecipes[recipeId])


    const deleteRecipe = (e) => {
        e.preventDefault();
    
        dispatch(removeRecipe(recipeId))
    
        return history.push(`/recipes`);
      };

    if (!recipe) {
        return <Redirect to="/recipes"/>
    }

    return (
        <div>
            <div>{recipe.name}</div>
            <img src={recipe.imageUrl} alt=" "></img>
            <div>{recipe.description}</div>
            {sessionUser?.id === recipe?.userId &&
                (
                    <button onClick={deleteRecipe}>Delete Recipe</button>
                )
            }
        </div>
    )
}