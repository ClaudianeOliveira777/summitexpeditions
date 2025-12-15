import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { expeditionsDB } from "../../config/expeditionsConfig";

import "./HomeTours.scss"
import { Link } from "react-router-dom";



const HomeTours = () =>{

    const [tours, setTours] = useState([]);

    useEffect(() =>{
        
        const fetchTours = async () => {
            try {
                const querySnapshot = await getDocs(collection(expeditionsDB, "tours"));
                const toursList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                })).sort((a, b) => a.order - b.order);

                setTours(toursList);
            } catch (error){
                console.error("Error tours", error);
            }
        };
        fetchTours();
    }, []);


    return(
        <>
        <section className="journeys">
            <h2>Which journey do you choose?</h2>
            <div className="journey-grid">
            {tours.map((tour) => (
                <Link to={`/tours/${tour.id}`} 
                key={tour.id} 
                className="journey-card">
                    <img src={tour.image} alt={tour.name}  />
                    <span>{tour.name}</span>
                </Link>
            ))}
            </div>
        </section>

        <section className="container-btn">
            <button className="btn-custom">See all</button>
        </section>

        <section className="custom-tours">
            <h2>Want something tailor-made?</h2>
            <button className="btn-custom">Contact Us</button>
        </section>

        </>
    )
}



export default HomeTours;