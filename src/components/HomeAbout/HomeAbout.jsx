
import { useEffect, useRef } from "react";
import { CountUp } from "countup.js";
import { Link } from "react-router-dom";
import "./HomeAbout.scss"

import Mountain from "../../assets/img/Mountain.png";
import Clouds from '../../assets/img/clouds.png';
import FingerprintsIcon from '../../assets/img/fingerprintsicon.png';
import SupportIcon from '../../assets/img/supporticon.png';
import FirstAidIcon from '../../assets/img/firstaidicon.png';
import ClimbIcon from '../../assets/img/climbicon.png';

const HomeAbout = () =>{

    const containerRef = useRef(null);
    const cloudsRef = useRef(null);
    const onScrollRef = useRef(null);

    const parallaxEffect = (container, clouds) => {
        const rect = container.getBoundingClientRect();
        const parallaxSpeed = 0.4;
        const yPos = -(rect.top * parallaxSpeed);
        clouds.style.transform = `translateY(${yPos}px)`;
    };

    const animateCounter = (counter, target, duration = 2500) => {
        const countUp = new CountUp(counter, target, {
            startVal: +counter.textContent,
            duration: duration / 1000,
            separator: '',
            useGrouping: false,
        });

        if(!countUp.error){
            countUp.start();
        } else {
            console.error(countUp.error);
            counter.textContent = target;
        }
    };

    useEffect(() =>{
        const container = containerRef.current;
        const clouds = cloudsRef.current;
        const statsData = container.querySelector('.stats-data');

        if(!container || !clouds || !statsData) return;

        const observerViewport = new IntersectionObserver (([element]) =>{
            if (element.isIntersecting){

                statsData.querySelectorAll('.counter').forEach(counter => {
                    animateCounter(counter, +counter.dataset.target);
                });

                onScrollRef.current = () => parallaxEffect(container, clouds);
                window.addEventListener('scroll', onScrollRef.current);
                window.addEventListener('resize', onScrollRef.current);
                parallaxEffect(container, clouds);
            } else {
                if(onScrollRef.current){
                    window.removeEventListener('scroll', onScrollRef.current);
                }
            }
        }, { threshold: 0.1 });

        observerViewport.observe(container);

        //
        return () => {
            observerViewport.disconnect();
            if(onScrollRef.current){
                window.removeEventListener('scroll', onScrollRef.current);
                window.removeEventListener('resize', onScrollRef.current);
            }
        };
    }, []);


    return (
        <>
        <div className="about-wrapper">
    <div className="container">
        
        

    <section className="about">
    <h2>About us</h2>
    <p>
    Since 2015, Summit Expeditions has guided over 5,000 adventurers to the world's 
most challenging peaks. We are not just tour operators, we are climbers who've summited 
Everest 47 times, Sherpas who know every crevasse by heart, and guides who believe 
the journey matters as much as the summit.

From your first training hike to standing at base camp, we handle logistics, safety, 
and acclimatization so you can focus on the experience. Our 15 professional guides 
average 12+ years of high-altitude experience, and our success rate speaks for 
itself: 96% of our clients reach their goal.
    </p>
    </section>

    <section className="highlights-grid">
    <div className="highlights-card individualization">
    <div className="highlights-icon">
    <img src={FingerprintsIcon} alt="Individualization" />
    </div>
        <div className="highlights-title">Individualization</div>
        <div className="highlights-description">
            <p>
             We focus on small group adventures to offer personalized attention. 
             Whether you are solo, with friends, or in a private group, we tailor 
            your itinerary to match your needs and preferences.
            </p>
        </div>
        <div className="highlights-link">
        <Link to="/">Discover more</Link>
        </div>
    </div>
    
    <div className="highlights-card support">
    <div className="highlights-icon">
    <img src={SupportIcon} alt="support" />
    </div>
        <div className="highlights-title">Support</div>
        <div className="highlights-description">
            <p>
            You won't be alone in preparing for your next trip. We offer monthly calls 
           with our specialists to answer your questions, choose the best gear, and 
            help you prepare with confidence.
            </p>
        </div>
        <div className="highlights-link">
        <Link to="/">Discover more</Link>
        </div>
    </div>
    
    <div className="highlights-card safety">
    <div className="highlights-icon">
    <img src={FirstAidIcon} alt="safety" />
    </div>
        <div className="highlights-title">Safety is Our Priority</div>
        <div className="highlights-description">
            <p>
            We prioritize your safety at every stage of your journey. Our guides are 
            trained in first aid, altitude sickness prevention, and emergency response. 
            With well-planned itineraries and careful acclimatization schedules, we 
            ensure a safe and enjoyable adventure.
            </p>
        </div>
        <div className="highlights-link">
        <Link to="/">Discover more</Link>
        </div>
    </div>

    <div className="highlights-card culture">
    <div className="highlights-icon">
    <img src={ClimbIcon} alt="culture" />
    </div>
        <div className="highlights-title">Culture</div>
        <div className="highlights-description">
            <p>
           Every peak has a story — and so do its people. Our local partnerships open 
           doors to authentic experiences that reveal the real life of the mountains, 
            far beyond what guidebooks can show.
            </p>
        </div>
        <div className="highlights-link">
        <Link to="/">Discover more</Link>
        </div>
    </div>

    </section>

</div>
       





    </div>

     <section className="stats-section" ref={containerRef}>
        <div
        className="stats-mountain"
        style={{backgroundImage: `url(${Mountain})`}}
        > </div>
        <div
        className="stats-clouds" ref={cloudsRef}
        style={{backgroundImage: `url(${Clouds})`}}></div>

        <div className="stats-data">
        <div className="counter-description">
        <span className="counter" data-target="5000">0</span>
        Happy Guests
        </div>
        <div className="counter-description">
        <span className="counter" data-target="15">0</span>
        Professional Guides
        </div>
        <div className="counter-description">
        <span className="counter" data-target="25">0</span>
        Expeditions Offered
        </div>
        </div>
        </section>
        </>
    )
}

export default HomeAbout;