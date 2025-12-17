import { useEffect, useState } from "react";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { expeditionsDB } from "../../config/expeditionsConfig";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./TourPage.scss";

const TourPage = () => {
    const [tour, setTour] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // IGUAL AO VISA PAGE:
    const [tourOptions, setTourOptions] = useState([]); // Array para options
    const [selectedTour, setSelectedTour] = useState(''); // String para valor selecionado
    
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. BUSCAR TODAS AS TOURS (igual ao VisaPage)
                const toursSnapshot = await getDocs(collection(expeditionsDB, "tours"));
                const toursList = toursSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                
                // Extrair apenas os nomes, remover duplicatas e ordenar
                const tourNames = toursList.map(tour => tour.name);
                setTourOptions([...new Set(tourNames)].sort());
                
                // 2. BUSCAR TOUR DA PÁGINA
                const docRef = doc(expeditionsDB, "tours", id);
                const docSnap = await getDoc(docRef);

                if(docSnap.exists()){
                    const tourData = {
                        id: docSnap.id,
                        ...docSnap.data()
                    };
                    setTour(tourData);
                    setSelectedTour(tourData.name); // Pre-seleciona no select
                }
            } catch (error){
                console.error("Error fetching data", error);
            } finally{
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) return <div className="loading">Loading...</div>;
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
                        <input type="text" id="firstName" placeholder="First Name" required />

                        <label htmlFor="lastName">Last Name*</label>
                        <input type="text" id="lastName" placeholder="Last Name" required />

                        <label htmlFor="email">Email*</label>
                        <input type="email" id="email" placeholder="Email" required />

                        <label htmlFor="number">Phone Number</label>
                        <input type="text" id="number" placeholder="Phone Number" />

                        <label htmlFor="tourSelected">Expedition Interest*</label>
                        <select 
                            name="tourSelected" 
                            id="tourSelected" 
                            value={selectedTour}
                            onChange={(e) => setSelectedTour(e.target.value)}
                            required
                        >
                            <option value="">Select...</option>
                            {tourOptions.map(tourName => (
                                <option key={tourName} value={tourName}>
                                    {tourName}
                                </option>
                            ))}
                        </select>

                        <label htmlFor="message">Message</label>
                        <textarea name="message" id="message" placeholder="Please let us know what you are interested in"></textarea>
                        
                        <label htmlFor="newsletter">Subscribe to our newsletter?</label>
                        <div className="radio-group">
                            <label htmlFor="newsletter-yes">
                                <input type="radio" id="newsletter-yes" name="newsletter" value="yes" /> Yes
                            </label>
                            <label htmlFor="newsletter-no">
                                <input type="radio" id="newsletter-no" name="newsletter" value="no" /> No
                            </label>
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