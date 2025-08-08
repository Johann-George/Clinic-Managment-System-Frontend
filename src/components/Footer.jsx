import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
    return (
        <footer className="footer">
            Built with
            <FontAwesomeIcon 
            icon={faHeart}
            className="footer-icon"
            aria-hidden="true" />
            by Group 3
        </footer>
    )
}

export default Footer;