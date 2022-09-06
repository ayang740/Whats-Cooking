import { useParams, Redirect, useHistory, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeRecipe } from '../../store/recipes';
import './recipes.css'

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
            <div className='single-recipe-header'>
                <div className='single-recipe-header-left'>
                    <div className='single-recipe-header-name'>{recipe.name}</div>
                    <div className='single-recipe-header-author'>BY {(recipe.user.name).toUpperCase()}</div>
                </div>
                <div className='single-recipe-header-right'>
                    <img className='single-recipe-header-image' src={recipe.imageUrl} alt=" "></img>
                </div>
            </div>
            <div className='single-recipe-middle'>
                <div className='single-recipe-middle-container'>
                    {(recipe.activeTime && recipe.totalTime) &&  <div className='single-recipe-times'>
                        <div className='single-recipe-time'>
                            <div><strong>Active Time</strong></div>
                            <div> : {recipe.activeTime} minutes</div>
                        </div>
                        <div className='single-recipe-time'>
                            <div><strong>Total Time</strong></div>
                            <div> : {recipe.totalTime} minutes</div>
                        </div>
                    </div>
                    }
                    <div className='single-recipe-description'>{recipe.description}</div>
                </div>
            </div>

            <div className='single-recipe-ingredients-and-instructions'>
                <div className='single-recipe-ingredients-header'>Ingredients</div>
                <div className='single-recipe-servings'>{recipe.servings} servings</div>
                {recipe && (recipe.ingredients).map(ingredient => (
                    <div key={ingredient.id} className='single-recipe-ingredients'>
                        {ingredient.ingredient}
                    </div>
                ))}
                <div>
                    <div className='single-recipe-instructions-header'>Directions</div>
                    {recipe && (recipe.instructions).map((instruction, index) => (
                        <div key={instruction.id} className='single-recipe-instructions'>
                            <div className='single-recipe-instructions-step'> 
                                Step {index + 1}
                            </div>
                            <div>
                                {instruction.instruction}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {sessionUser?.id === recipe?.userId &&
                (
                    <div>
                        <button onClick={deleteRecipe}>Delete Recipe</button>
                        <NavLink to={`/recipes/${recipe.id}/edit`}>
                            <div>Edit Recipe</div>
                        </NavLink>
                    </div>
                )
            }
        </div>
    )
}