import { NavLink } from "react-router-dom";
import './notfound.css'


export default function NotFound() {
    return(
        <div className="notfound-wrapper">
            <div className="notfound-text-error">404</div>
            <div className="notfound-text">The page you are looking for could not be found...</div>
            <NavLink className="notfound-link" to={`/`}>Navigate back to home</NavLink>
        </div>
    )
}