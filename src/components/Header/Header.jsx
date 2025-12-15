import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import "./Header.scss";
import Logo from "../../assets/img/logo.svg";

import {expeditionsDB} from "../../config/expeditionsConfig";
import {collection, getDocs} from "firebase/firestore";

const Header = () =>{
    const [tours, setTours] = useState([]);
    
    //Desktop
    const [submenuOpen, setSubmenuOpen] = useState(false);

    //Mobile
    const [hamburguerOpen, setHamburguerOpen] = useState (false);
    const [mobileSubemenuOpen, setMobileSubmenuOpen] = useState(false);



    useEffect(() =>{
        const fetchTours = async () => {
        try{
            const querySnapshot = await getDocs(collection(expeditionsDB, "tours"));

            const toursList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })).sort((a, b) => a.order - b.order);

            setTours(toursList);
        } catch (error) {
            console.error("Erro ao buscar tours:", error);
        }
        };
        fetchTours();
    }, []);

    return (
        <header className="transparent-header">
        
        <div className="logo">
        <Link to="/">
        <img src={Logo} alt="Summit Expeditions logo" />
        </Link>
        </div>

        {/*Menu Desktop*/}
        <nav className="nav-desktop">
        <Link to="/" 
        id="expeditionLinks"
        onMouseEnter={() => setSubmenuOpen(true)}
        onMouseLeave={() => setSubmenuOpen(false)}>Expeditions
        </Link>
        <ul 
        className={`submenuDesktop ${submenuOpen ? "open" : ""}`}
        onMouseEnter={() => setSubmenuOpen(true)}
        onMouseLeave={() => setSubmenuOpen(false)}
        >
        {tours.map((tour) =>(
            <li key={tour.id}>
            <Link to={`/tours/${tour.id}`}>{tour.name}</Link>
            </li>
        ))}
        </ul>

        <Link to="/">About</Link>
        <Link to="/">Contact</Link>

        </nav>

        {/*Botão Hamburguer*/}
        <div
        className={`hamburguer ${hamburguerOpen ? "open" : ""}`}
        onClick={() => setHamburguerOpen(!hamburguerOpen)}
        >
            <span></span>
            <span></span>
            <span></span>
        </div>

        
        <nav className={`nav-mobile  ${hamburguerOpen ? "open" : ""}`}>
        <ul>
        <li>
        <button
        className="expeditions-mobile-btn"
        onClick={() => setMobileSubmenuOpen(!mobileSubemenuOpen)}>
        Expeditions
        </button>

        <ul className={`submenuMobile ${mobileSubemenuOpen ? "open" : ""}`}>
        {tours.map((tour) => (
        <li key={tour.id}>
        <Link to={`/tours/${tour.id}`} onClick={() => setHamburguerOpen(false)}>
        {tour.name}
        </Link>
        </li>
        ))}

        </ul>
                   
        </li>

        <li>
        <Link>About</Link>
        </li>

        <li>
        <Link>Contact</Link>
        </li>
        </ul>

        </nav>
        

        </header>
    )

}

export default Header;