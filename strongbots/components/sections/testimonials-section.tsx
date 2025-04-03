"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote, MessageCircle, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FadeInWhenVisible } from "@/components/ui/animations"
import type { Testimonial } from "@/types/testimonial"
import { useMediaQuery } from "@/hooks/use-media-query"

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Carlos Silva",
    role: "Marketing Director",
    company: "E-commerce Leader",
    text: "The chatbot developed by Strongbots completely transformed our sales process. I never imagined a bot could be so efficient at qualifying leads and directing only the most promising ones to our sales team.",
    image: "/testimonial-1.jpg",
  },
  {
    id: 2,
    name: "Amanda Rodrigues",
    role: "Operations Manager",
    company: "Medical Clinic Network",
    text: "The implementation was surprisingly smooth and the results exceeded our expectations. The Strongbots team perfectly understood our needs and delivered a solution that truly solves our problems.",
    image: "/testimonial-2.jpg",
  },
  {
    id: 3,
    name: "Marcelo Mendes",
    role: "CTO",
    company: "Financial Institution",
    text: "What impressed me most was Strongbots' consultative approach. They didn't try to sell us a ready-made platform, but rather understood our business and developed a customized solution that truly delivered results.",
    image: "/testimonial-3.jpg",
  },
]

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const isMobile = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth)
      }
    }

    updateWidth()
    window.addEventListener("resize", updateWidth)
    return () => window.removeEventListener("resize", updateWidth)
  }, [])

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay])

  const nextSlide = () => {
    setAutoplay(false)
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setAutoplay(false)
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  return (
    <section id="testimonials" className="section-dark">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      <div className="container-custom relative z-10">
        <FadeInWhenVisible>
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4">
              <MessageCircle className="h-4 w-4 text-white mr-2" />
              <span className="text-sm font-medium text-white">O que dizem nossos clientes</span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-white text-shadow-lg">
              O Que Nossos Clientes Dizem
            </h2>
            <p className="text-base md:text-lg text-white/90 font-medium">
              Não acredite apenas em nossa palavra. Veja o que nossos clientes dizem sobre trabalhar conosco e os
              resultados que alcançaram com nossos serviços de consultoria em IA.
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="relative" ref={containerRef}>
          <div className="overflow-hidden">
            {isMobile ? (
              // Mobile view - stacked cards
              <div className="space-y-6">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className={`transition-opacity duration-500 ${
                      index === activeIndex ? "opacity-100" : "opacity-0 hidden"
                    }`}
                  >
                    <TestimonialCard testimonial={testimonial} width={width} />
                  </div>
                ))}
              </div>
            ) : (
              // Desktop view - horizontal slider
              <motion.div
                animate={{ x: -activeIndex * width }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="flex"
              >
                {testimonials.map((testimonial) => (
                  <TestimonialCard key={testimonial.id} testimonial={testimonial} width={width} />
                ))}
              </motion.div>
            )}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 rounded-full z-10 bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30 hover:scale-110 transition-all"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-5 w-5 text-white" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 rounded-full z-10 bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30 hover:scale-110 transition-all"
            onClick={nextSlide}
          >
            <ChevronRight className="h-5 w-5 text-white" />
          </Button>

          <div className="flex justify-center mt-6 md:mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "bg-white w-6" : "bg-white/40 hover:bg-white/60"
                }`}
                onClick={() => {
                  setAutoplay(false)
                  setActiveIndex(index)
                }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

interface TestimonialCardProps {
  testimonial: Testimonial
  width: number
}

function TestimonialCard({ testimonial, width }: TestimonialCardProps) {
  return (
    <div
      className="flex items-center justify-center px-4 py-6 md:py-8"
      style={{ width: width || "100%", flexShrink: 0 }}
    >
      <motion.div
        className="glass-effect-dark rounded-2xl p-8 md:p-10 max-w-3xl relative border border-white/30 hover-lift bg-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
        whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35)" }}
      >
        <Quote className="h-12 md:h-16 w-12 md:w-16 text-white/20 absolute top-6 left-6" />

        <div className="text-lg md:text-xl text-center mb-8 md:mb-10 relative z-10 pt-8 md:pt-10 text-white leading-relaxed font-medium">
          "{testimonial.text}"
        </div>

        <div className="flex items-center justify-center">
          <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden mr-5 border-2 border-white/50 glow-effect">
            <img
              src={testimonial.image || "/placeholder.svg"}
              alt={testimonial.name}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <p className="font-semibold text-lg md:text-xl text-white">{testimonial.name}</p>
            <p className="text-white/80 text-sm">{testimonial.role}</p>
            <p className="text-white/90 font-medium text-base">{testimonial.company}</p>
            <div className="flex mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-white/10 rounded-full"></div>
        <div className="absolute -top-3 -left-3 w-16 h-16 bg-white/10 rounded-full"></div>
      </motion.div>
    </div>
  )
}

