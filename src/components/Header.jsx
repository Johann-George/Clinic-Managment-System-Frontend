import { faTags } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        const user = localStorage.getItem("user");
        if(user){
            setIsLoggedIn(true);
        } else{
            setIsLoggedIn(false);
        }
    },[]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        navigate("/login");
    }

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
                    {!isLoggedIn ? (
                        <>
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
                    </>
                    ):(
                        <li>
                            <Link to="/login" onClick={handleLogout} className="cms-nav-link">
                                Logout
                            </Link>
                        </li>
                    )}
                </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;