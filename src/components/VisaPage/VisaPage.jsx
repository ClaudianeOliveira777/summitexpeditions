import { useState, useEffect } from 'react';
import { visaCheck } from '../../config/visaConfig';
import {doc, getDoc, getDocs, collection } from 'firebase/firestore';

import './VisaPage.scss';


const VisaPage = () => {

    //Lista para preencher os <option> do select
    const [passportOptions, setPassaportOptions] = useState([]);
    const [destinationsOptions, setDestinationsOptions] = useState([]);

    //Valores escolhidos pelo usuário no <select>
    const [passportSelected, setPassportSelected] = useState('');
    const [destinationSelected, setDestinationSelected] = useState('');

    const [visaResult, setVisaResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [fetchError, setFetchError] = useState('');

    useEffect(() => {
        const fetchCountries = async () => {
            try{
                const snapShot = await getDocs(collection(visaCheck, "visaRequirements"));

                const passports = snapShot.docs.map(doc => doc.data().passport_country);
                const destinations = snapShot.docs.map(doc => doc.data().destination_country);

                setPassaportOptions([...new Set(passports)].sort());
                setDestinationsOptions([... new Set(destinations)].sort());
                
            } catch (error){
                console.log(error);
                setFetchError("Failed to load available countries.")
            }
        };

        fetchCountries();
    }, []);

    
    const handleVisaCheck = async () => {

        setIsLoading(true);

        try{
            
            const docId = `${passportSelected}-${destinationSelected}`;
            const visaSnap = await getDoc(doc(visaCheck, "visaRequirements", docId));

            if(visaSnap.exists()){
                setVisaResult(visaSnap.data().requirement);
            } else {
                setVisaResult(`No specific visa information found for ${passportSelected} citizens traveling to ${destinationSelected}. Please check official sources.`);
            }  
        } catch (error) {
            console.error(error);
            setFetchError('Error loading visa information. Please try again.')
        } finally{
            setIsLoading(false);
        }
    }

    return(
        <>
        <div className="visa-hero">
        <div className="visa-overlay">
        <div className="visa-content">
        <h1>Visa Requirements</h1>
        <p>Plan your journey with confidence</p>
        </div>
        </div>
        </div>

        <div className="visa-container">

        <div className="visa-form">

        <div className="form-row">

        

        <div className="form-field">
        <label htmlFor="passportSelected" className="passport-title">Passport Country</label>
        <span className="passport-description">Your Citizenship</span>

        <select  
        id="passportSelected"
        value={passportSelected}
        onChange={(e) => setPassportSelected(e.target.value)}
        >
        <option value="">Select...</option>
        {passportOptions.map(passport => (
            <option key={passport} value={passport}>{passport}</option>
        ))}
        </select>

        </div>


        <div className="form-field">
        <label htmlFor="destinationSelect" className="destination-title">Destination Country</label>
        <span className="destination-description">Where you are traveling to</span>

        <select  id="destinationSelected"
        value={destinationSelected}
        onChange={(e) => setDestinationSelected(e.target.value)}
        >
            <option value="">Select...</option>
            {destinationsOptions.map(destination => (
                <option key={destination} value={destination}>{destination}</option>
            ))}
        </select>
        </div>

        </div>

        <div className="button-wrapper">
           <button className="check-visa-button"
           onClick={handleVisaCheck}
           disabled={isLoading || !passportSelected || !destinationSelected }
           
           > {isLoading ? 'CHECKING...' : 'SEE REQUIREMENTS'}</button> 
        </div>

        </div>

        {visaResult && !isLoading && (
        <div className="visa-results">
        <h3>Visa Information</h3>

        <div className="result-content">
        <p>{visaResult}</p>
        </div>

        <h4>Important Notes:</h4>
        <ul className="important-notes">
        <li>Always verify with official government sources</li>
        <li>Visa rules may change at any time</li>
        <li>Additional documents may be required</li>
        <li>Processing times vary by country</li>
        </ul>
        </div>
        )}

        {fetchError && (
            <div className="error-message">
            <p>{fetchError}</p>
            </div>
        )}

        {visaResult && !isLoading &&(
        <div className="visa-disclaimer">
        <p>*Information provided is for general guidance only. Please verify with offical sources.</p>
        </div>
        )}
        


        </div>
        


        </>
    )
}

export default VisaPage;