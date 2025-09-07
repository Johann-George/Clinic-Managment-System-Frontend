import { faAngleDown, faTags } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { useSelector,useDispatch } from "react-redux"
import { selectIsAuthenticated,selectUser,logout } from "../store/auth-slice"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

function Header() {
    const navigate = useNavigate();
    //const { isAuthenticated, logout } = useAuth();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const user = useSelector(selectUser);

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
        toast.success("Logged out successfully");
        navigate("/home");
    }

    return (
        <header className="header">
            <div className="container">
                <Link to="/" className="link">
                    <FontAwesomeIcon icon={faTags} className="fa-icon" />
                    <span className="brand-title">CMS</span>
                </Link>
                <nav className="cms-nav">
                    <ul>
                        <li>
                            <Link to="/home" className="cms-nav-link">
                                Home
                            </Link>
                        </li>
                        {isAuthenticated ? (
                            <li>
                                <Link
                                    to="/home"
                                    onClick={handleLogout}
                                    className="cms-nav-link"
                                >
                                    Logout
                                </Link>
                            </li>
                        ) : (
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
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;