import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/Header/Header";
import HeroSlides from "./components/HeroSlides/HeroSlides";
import HomeAbout from "./components/HomeAbout/HomeAbout";
import HomeTours from "./components/HomeTours/HomeTours";
import Costumers from "./components/Customers/Customers";
import Gallery from "./components/Gallery/Gallery";
import Footer from "./components/Footer/Footer";

import TourPage from "./components/TourPage/TourPage";


import VisaPage from "./components/VisaPage/VisaPage";



const Paths = () => {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={
                    <>
                        <HeroSlides/>
                        <HomeAbout/>
                        <HomeTours/>
                        <Costumers/>
                        <Gallery/>
                       
                        
                    </>
                } />
                <Route path="/tours/:id" element={<TourPage />} />
                
                <Route path="/VisaPage" element={<VisaPage/>}/>
            </Routes>
             <Footer/>
        </BrowserRouter>
    );
}


export default Paths;