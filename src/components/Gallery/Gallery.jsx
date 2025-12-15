import { useEffect, useRef, useState } from 'react';
import { galleryDB } from '../../config/galleryConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import './Gallery.scss';

/*import PeopleClimbing from "../../assets/img/peopleclimbing.avif";
import CoupleSnow from "../../assets/img/couplesnow.avif";
import DogSnow from "../../assets/img/dogsnow.avif";
import PersonClimbing from "../../assets/img/personclibimg.avif";
import SnowOrangeSky from "../../assets/img/snoworangesky.avif";
import SnowPinkSky from "../../assets/img/snowlightpinksky.avif";*/
import ArrowLeft from "../../assets/img/arrowleft.svg";
import ArrowRight from "../../assets/img/arrowright.svg";

const Gallery = () => {

    const galleryRef = useRef(null);
    const [likes, setLikes] = useState({});

    const photos = [
        { id: "01", image: "assets/img/peopleclimbing.avif", alt: "People Climbing" },
        { id: "02", image: "/assets/img/couplesnow.avif", alt: "couple snow" },
        { id: "03", image: "/assets/img/dogsnow.avif", alt: "dog snow" },
        { id: "04", image: "/assets/img/personclibimg.avif", alt: "person snow" },
        { id: "05", image: "/assets/img/snoworangesky.avif", alt: "sky orange" },
        { id: "06", image: "/assets/img/snowlightpinksky.avif", alt: "sky pink" }
    ];

    // -----------------------------
    // Carrega os likes do banco 
    // -----------------------------
    const loadLikes = async () => {
        const initialLikes = {};

        await Promise.all(
            photos.map(async (photo) =>{
                const snapShot = await getDoc(doc(galleryDB, "likes", photo.id));
                initialLikes[photo.id] = snapShot.exists() ? snapShot.data().count : 0;
            })
        );

        setLikes(initialLikes);
    }

   
    // -----------------------------
    // Atualiza os likes
    // -----------------------------

    const handleLike = async (photoId) => {
        try{
            const current = likes[photoId] || 0;
            const isLiked = current > 0;
            const newCount = isLiked ? current - 1 : current + 1;

            setLikes(prev => ({
                ...prev,
                [photoId] : newCount
            }));

            //Salva no banco
            await setDoc(doc(galleryDB, "likes", photoId), {count: newCount});
        } catch (error){
            console.error("Erro ao atualizar like:", error);
        }
    };

    useEffect(()=>{
        loadLikes();
    },[]);
   

    // ---------------------------------------------
    // Scroll da galeria
    // ---------------------------------------------
    const scrollLeft = () =>{
        if(galleryRef.current){
            galleryRef.current.scrollBy({ left: -320, behavior: "smooth" });
        }
    }

    const scrollRight = () =>{
        if(galleryRef.current){
            galleryRef.current.scrollBy({ left: 320, behavior: "smooth" });
        }
    }

    return (
        <section className="gallery-container">
            <button className="gallery-arrow arrow-left" onClick={scrollLeft}>
            <img src={ArrowLeft} alt="Arrow left" />
            </button>

            <button className="gallery-arrow arrow-right" onClick={scrollRight}>
            <img src={ArrowRight} alt="Arrow right" />
            </button>

            <div className="photo-gallery" ref={galleryRef}>
            {photos.map(photo => {
                const likeCount = likes[photo.id] || 0;

                return(
                <div
                key={photo.id}
                className={`photo-item ${likeCount > 0 ? "liked" : ""}`}
                data-photo-id={photo.id}>
                    
                    <img src={photo.image} alt={photo.alt} />

                    <div className="photo-overlay">
                    <button className="heart-btn" onClick={() => handleLike(photo.id)}>
                    <svg className="heart-icon" viewBox="0 0 24 24">
                    <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5 
                    2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08
                    C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5
                    C22,12.27 18.6,15.36 13.45,20.04L12,21.35Z"/>
                    </svg>
                    </button>
                    <div className="likes-counter">
                    {likeCount} like{likeCount !== 1 ? "s" : ""}
                    </div>
                    </div>
                </div>
                )
            })}

            </div>
        </section>
    );
};

export default Gallery;