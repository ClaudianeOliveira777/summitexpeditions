

import { useEffect, useState } from 'react';
import './Customers.scss';

const Customers = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const testimonials = [
        {
            message: "\"Summit Expeditions gave me the confidence to summit Mount Fuji. The sunrise view from the top was worth every step. I couldn't have asked for a better team to guide me.\"",
            name: "Michael Chen"
        },
        {
            message: "\"Summit Expeditions guided me not only on the mountain, but weeks before with training tips and equipment advice. Every detail was planned, and the cost was completely transparent and reasonable.\"",
            name: "André Silva"
        },
        {
            message: "\"I was amazed by how organized they were. Permits, logistics, food, safety checks — nothing was left to chance. For such a complete service.\"",
            name: "Emma Rodriguez" 
        }
    ];

    useEffect(() =>{
        const timer = setInterval(() =>{
            setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        }, 5000);

        const handleKeyDown = (e) => {
            if (e.key === "ArrowLeft"){
               setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
            } else if (e.key === "ArrowRight") {
                setCurrentIndex((prevIndex) => (prevIndex + 1 ) % testimonials.length);
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            clearInterval(timer);
            document.removeEventListener("keydown", handleKeyDown);
        };
     }, [testimonials.length]);

     const handleDotClick = (index) => {
        setCurrentIndex(index);
     };
    

    return (
       <section className="customers-bg">
        <h2>What our customers say</h2>

        {testimonials.map((testimonial, index) => (
            <div
            key={index}
            className={`customer-container ${index === currentIndex ? 'active' : ''}`}
            >
                <div className="customer-content">
                <p className="customer-msg">{testimonial.message}</p>
                 <div className="customer-name">{testimonial.name}</div>
                </div>
            </div>
        ))}

        <div className="slide-indicators">
        {testimonials.map((_, index) => (
            <span
            key={index}
            className={`indicator ${index === currentIndex ? "active" : ''}`}
            onClick={() => handleDotClick(index)}></span>
        ))}
        </div>
       </section>
    );
};

export default Customers;