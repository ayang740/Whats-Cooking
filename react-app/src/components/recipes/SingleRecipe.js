import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function SingleRecipe() {
    const {recipeId} = useParams()
    const sessionUser = useSelector(state => state.session.user);
    const recipe = useSelector((state) => state.recipes[recipeId]);
}