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
            by [GroupName]
        </footer>
    )
}

export default Footer;