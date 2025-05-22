import React, { useRef } from 'react';
import Atropos from 'atropos/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import brainImg from '../../assets/brain-rafiki.svg';
import computerImg from '../../assets/computer-amico.svg';
import dataImg from '../../assets/data-rafiki.svg';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const slides = [
  {
    image: brainImg,
    title: 'Desarrolla tu mente',
    description: 'Entrena tu pensamiento lógico con nuestros ejercicios interactivos.',
  },
  {
    image: computerImg,
    title: 'Aprende tecnología',
    description: 'Domina herramientas modernas para el mundo profesional.',
  },
  {
    image: dataImg,
    title: 'Convierte datos en conocimiento',
    description: 'Análisis, dashboards y más.',
  },
];

export default function Hero() {
    const swiperRef = useRef(null);
  
    return (
      <section className="hero-section">
        <h2 className="hero-title">Explora lo que aprenderás</h2>
  
        <div className="hero-container">
          {/* Botón anterior */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="hero-button hero-button-prev"
          >
            <FaArrowLeft />
          </button>
  
          {/* Swiper + Atropos */}
          <div className="hero-swiper-container">
            <Swiper
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              spaceBetween={50}
              slidesPerView={1}
              centeredSlides
              loop
            >
              {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                  <Atropos shadow={false} highlight={false} className="hero-atropos">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      data-atropos-offset="1"
                      className="hero-slide-image"
                    />
                    <div className="hero-slide-content">
                      <h3 data-atropos-offset="10" className="hero-slide-title">
                        {slide.title}
                      </h3>
                    </div>
                  </Atropos>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
  
          {/* Botón siguiente */}
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="hero-button hero-button-next"
          >
            <FaArrowRight />
          </button>
        </div>
      </section>
    );
  }
