import { Link } from "react-router-dom"


export default function SavedRecipes() {

    return (
        <div>
            <div>My Saved Recipes</div>
            <div>These recipes are saved to your account, so you can revisit them anytime.</div>
            <div>
                <div>You have not saved any recipes recently.</div>
                <Link to={'/recipes'}>Search All Recipes</Link>
            </div>
        </div>
    )
}