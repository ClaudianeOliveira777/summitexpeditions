import { useEffect, useState } from "react";
import {doc, getDoc} from "firebase/firestore";
import {expeditionsDB} from "../../config/expeditionsConfig";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./TourPage.scss";

const TourPage = () => {

    const [tour, setTour] = useState(null);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTour = async () => {
            try{
                const docRef = doc(expeditionsDB, "tours", id);
                const docSnap = await getDoc(docRef);

                if(docSnap.exists()){
                    setTour({
                        id: docSnap.id,
                        ...docSnap.data()
                    });
                }
            } catch (error){
                console.error("Tour not found", error);
            } finally{
                setLoading(false);
            }
        };

        fetchTour();
    }, [id])

    if (loading) return <div>Loading...</div>;
    if (!tour) return <div>Tour not found</div>

    return(
        <div>
       
    <section className="expedition-hero">
            <img src={tour.image} alt={tour.name} />
            <div className="expedition-overlay">
            <h1 className="expedition-name">{tour.name}</h1>
            <p className="expedition-descp">{tour.title}</p>
            </div>
     </section>

     
    <div className="expedition-grid">
            
    <section className="expedition-resume">
    <h2>About {tour.name}</h2>
    <p>{tour.about}</p>
    </section>

    <section className="itinerary">
        <h2>{tour.title} Itinerary</h2>
        <ul>
            {tour.itinerary.map((item, index) => (
                <li key={index}>
                    <strong>{item.day}:</strong> {item.description}
                </li>
            ))}
        </ul>
        <p className="note">*{tour.note}</p>
    </section>


    <section className="contact-form">
        <h2>Reach Us about this trip</h2>
        
        <form action="">
            <label htmlFor="firstName">First Name*</label>
            <input type="text" id="firstName" placeholder="First Name"  required/>

            <label htmlFor="lastName">Last Name*</label>
            <input type="text" id="lastName" placeholder="Last Name" required/>

            <label htmlFor="email">Email*</label>
            <input type="email" id="email" placeholder="Email"  required/>

            <label htmlFor="number">Phone Number</label>
            <input type="text" id="number" placeholder="Phone Number" />

            <label htmlFor="">Expedition Interest*</label>
            <select name="" id="" required>
                <option value="">Choose</option>
                <option value="Everest">Mount Everest</option>
                <option value="K2">K2</option>
                <option value="Lhotse">Lhotse</option>
                <option value="Mount Fuji">Mount Fuji</option>
                <option value="Chamonix">Chamonix</option>
                <option value="Kilimajaro">Kilimajaro</option>
            </select>

            <label htmlFor="">Message</label>
            <textarea name="" id="message" placeholder="Please let us know what you are interested in"></textarea>
            
            <label htmlFor="newsletter">Subscribe to our newsletter?</label>
            <div className="radio-group">
            <label htmlFor="newsletter-yes">
            <input type="radio" id="newsletter-yes" name="newsletter" value="yes"/> Yes  </label>

            <label htmlFor="newsletter-no">
            <input type="radio" id="newsletter-no" name="newsletter" value="no"/> No</label>
           </div>

            <div className="inq-button-container">
                <button type="submit" className="btn-custom inq-button">Send Inquiry</button>
            </div>
            
        </form>
        </section>
            

          <aside>
            <div className="visa-box">
                <h3>Check Your Visa Requirements</h3>
                <p>Use our entry requirements tool so you know which documents you need to travel.</p>
                <Link to="/VisaPage" className="link-visa">View Entry Requirements Tool</Link>
            </div>
          </aside>
           
     </div>






 
         </div>
    )
}

export default TourPage;