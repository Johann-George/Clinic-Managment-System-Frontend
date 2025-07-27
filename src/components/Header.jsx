import { faTags } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

const Header = () => {
    return(
        <header className="header">
            <div className="container">
            <Link to="/" className="link">
                <FontAwesomeIcon icon={faTags} className="fa-icon"/>
                <span className="brand-title">CMS</span>
            </Link>
            <nav className="cms-nav">
                <ul>
                    <li>
                        <Link to="/home" className="cms-nav-link">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/login" className="cms-nav-link">
                        Login 
                        </Link>
                    </li>
                    <li>
                        <Link to="/register" className="cms-nav-link">
                        Register 
                        </Link>
                    </li>

                </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;