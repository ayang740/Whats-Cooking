import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { savingRecipe } from "../../store/recipes"
import { BsFillBookmarkCheckFill, BsFillBookmarkPlusFill } from 'react-icons/bs';
import '../recipes/recipes.css'

export default function SaveRecipe({recipeId}) {
    const dispatch = useDispatch()
    const userId = useSelector((state) => state.session.user.id)
    const recipe = useSelector(state => state.recipes.normalizedRecipes[recipeId])
    const [saved, setSaved] = useState(false)

    useEffect(() => {
        if (recipe) {
            setSaved(recipe.userSaves.includes(userId))
        }
    }, [recipe])

    const handleClick = () => {
        dispatch(savingRecipe(recipeId, userId))
        }

    return (
        <div>
            {saved === false &&
            (
            <div onClick={handleClick} className='save-recipe-container'>
                <BsFillBookmarkPlusFill className="save-recipe-icon"></BsFillBookmarkPlusFill>
                <div className="save-recipe-text">Save Recipe</div>
            </div>
            )
            }
            {saved === true &&
            (
            <div onClick={handleClick} className='save-recipe-container'>
                <BsFillBookmarkCheckFill className="save-recipe-icon"></BsFillBookmarkCheckFill>
                <div className="save-recipe-text">Recipe Saved</div>
            </div>
            )
            }
        </div>
    )
}