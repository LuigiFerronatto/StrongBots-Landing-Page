export interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  text: string
  image: string
}

export interface TestimonialCardProps {
  testimonial: Testimonial
  width: number
}

