import { useParams, Redirect, useHistory, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeRecipe } from '../../store/recipes';
import './recipes.css'
import ReviewList from '../reviews/ReviewList';
import ReviewPost from '../reviews/ReviewPost';
import { useEffect, useState } from 'react';

export default function SingleRecipe() {
    const { recipeId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user)
    const recipe = useSelector(state => state.recipes.normalizedRecipes[recipeId])

    const [imageSrc, setImageSrc] = useState(recipe.imageUrl)

    useEffect(() => {
        window.scrollTo(0,0)
    },[])

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
                    {sessionUser?.id === recipe?.userId &&
                        (
                            <div className='single-recipe-buttons'>
                                <NavLink className='single-recipe-edit-link' to={`/recipes/${recipe.id}/edit`}>
                                    <div className='single-recipe-edit'>Edit Recipe</div>
                                </NavLink>
                                <button className='single-recipe-delete' onClick={deleteRecipe}>Delete Recipe</button>
                            </div>
                        )
                    }
                </div>
                <div className='single-recipe-header-right'>
                    <img onError={() => setImageSrc('https://www.takeoutlist.com/assets/images/food_default.png')} className='single-recipe-header-image' src={imageSrc} alt=" "></img>
                </div>
            </div>
            <div className='single-recipe-middle'>
                <div className='single-recipe-middle-container'>
                    {(recipe.activeTime && recipe.totalTime) &&  <div className='single-recipe-times'>
                        {recipe.activeTime <= 60 &&
                            <div className='single-recipe-time'>
                                <div><strong>Active Time</strong></div>
                                <div> : {recipe.activeTime} minute(s)</div>
                            </div>
                        }
                        {recipe.activeTime > 60 &&
                            <div className='single-recipe-time'>
                                <div><strong>Active Time</strong></div>
                                <div> : {Math.floor(recipe.activeTime/60)} hour(s) {recipe.activeTime%60} minute(s)</div>
                            </div>
                        }
                        {recipe.totalTime <= 60 &&
                            <div className='single-recipe-time'>
                                <div><strong>Total Time</strong></div>
                                <div> : {recipe.totalTime} minute(s)</div>
                            </div>
                        }
                        {recipe.totalTime > 60 &&
                            <div className='single-recipe-time'>
                                <div><strong>Total Time</strong></div>
                                <div> : {Math.floor(recipe.totalTime/60)} hour(s) {recipe.totalTime%60} minute(s)</div>
                            </div>
                        }
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
            <div>
                <ReviewPost recipeId={recipeId} recipe={recipe}/>
            </div>
            <div>
                <ReviewList recipeId={recipeId}/>
            </div>
        </div>
    )
}