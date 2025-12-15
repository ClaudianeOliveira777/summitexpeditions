
import { Link } from "react-router-dom";
import "../Footer/Footer.scss" // Import do SCSS
import Logo from "../../assets/img/logo.svg";

const Footer = () => {
   return(
    <footer>
        <div className="footer-container">
        
        <div>
            <img src={Logo} alt="Summit Expeditions logo"
            className="footer-logo"/>
            <p>Espírito Santo, Brazil</p>
            <p>+55 (28) 1234-5678</p>
        </div>

        <div>
            <h4>About</h4>
           <Link to="" className="link-footer">About Us</Link>
           <Link to="" className="link-footer">Our Team</Link>
           <Link to="" className="link-footer">All Expeditions</Link>
        </div>

        <div>
            <h4>Quick Links</h4>
            <Link to="" className="link-footer">Visa Requirements</Link>
            <Link to="" className="link-footer">Insurance</Link>
            <Link to="" className="link-footer">Tearms & Conditions</Link>
            <Link to="" className="link-footer">Privacy Policy</Link>
        
        </div>

        </div>
    </footer>
   )
};

export default Footer;