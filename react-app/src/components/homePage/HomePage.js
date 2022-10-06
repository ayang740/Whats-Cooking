import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import Search from "../search/Search"
import './homepage.css'

export default function HomePage() {
    const allRecipes = useSelector(state => Object.values(state.recipes.normalizedRecipes))

    const [recipe1Image, setRecipe1Image] = useState(allRecipes[allRecipes.length-1].imageUrl)
    const [recipe2Image, setRecipe2Image] = useState(allRecipes[allRecipes.length-2].imageUrl)
    const [recipe3Image, setRecipe3Image] = useState(allRecipes[allRecipes.length-3].imageUrl)

    useEffect(() => {
        window.scrollTo(0,0)
    },[])

    return (
        <div className="home-page-wrapper">
            <div className="home-page-header">
                <div className="home-page-header-title">
                    Welcome to Top Recipes
                </div>
                <Search />
            </div>
            <div className="newest-recipes-wrapper">
                <div className="newest-recipes-title">Our Newest Recipes</div>
                <div className="newest-recipes-card-container">
                    <NavLink to={`/recipes/${allRecipes[allRecipes.length-1].id}`} className="newest-recipes-card">
                        <img onError={() => setRecipe1Image("https://www.takeoutlist.com/assets/images/food_default.png")} src={recipe1Image} className="newest-recipes-card-image"></img>
                        <div className="newest-recipes-card-name">{allRecipes[allRecipes.length-1].name}</div>
                    </NavLink>
                    <NavLink to={`/recipes/${allRecipes[allRecipes.length-2].id}`} className="newest-recipes-card">
                        <img onError={() => setRecipe2Image("https://www.takeoutlist.com/assets/images/food_default.png")} src={recipe2Image} className="newest-recipes-card-image"></img>
                        <div className="newest-recipes-card-name">{allRecipes[allRecipes.length-2].name}</div>
                    </NavLink>
                    <NavLink to={`/recipes/${allRecipes[allRecipes.length-3].id}`} className="newest-recipes-card">
                        <img onError={() => setRecipe3Image("https://www.takeoutlist.com/assets/images/food_default.png")} src={recipe3Image} className="newest-recipes-card-image"></img>
                        <div className="newest-recipes-card-name">{allRecipes[allRecipes.length-3].name}</div>
                    </NavLink>
                </div>
            </div>
            <div className="about-me">
                <div className="about-me-link">Created By: Allan Yang</div>
                <a href="https://github.com/ayang740" className="about-me-link">Github</a>
                <a href="https://www.linkedin.com/in/allan-yang-46a31624a/" className="about-me-link">LinkedIn</a>
            </div>
        </div>
    )
}