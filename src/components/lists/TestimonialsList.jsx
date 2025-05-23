import React from 'react';

const testimonials = [
  {
    id: 1,
    name: "Ana M.",
    comment: "Gracias a esta academia conseguí trabajo en 3 meses.",
  },
  {
    id: 2,
    name: "Luis P.",
    comment: "Los profesores son geniales y los cursos muy prácticos.",
  },
  {
    id: 3,
    name: "Marta R.",
    comment: "El pack profesional me cambió la vida.",
  },
];

export default function TestimonialsList() {
  return (
    <div className="testimonials-grid">
      {testimonials.map((t) => (
        <div key={t.id} className="testimonial-card">
          <div className="testimonial-avatar">{t.name.charAt(0)}</div>
          <blockquote className="testimonial-comment">
            “{t.comment}”
          </blockquote>
          <strong className="testimonial-name">{t.name}</strong>
        </div>
      ))}
    </div>
  );
}