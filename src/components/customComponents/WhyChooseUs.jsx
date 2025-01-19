import { motion } from 'framer-motion'
import { Users, Zap, DollarSign, Clock, CreditCard, Award } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const benefits = {
  buyers: [
    { icon: Users, title: "Large Talent Pool", description: "Access to a diverse range of skilled workers" },
    { icon: Zap, title: "Fast Completion", description: "Get your tasks done quickly and efficiently" },
    { icon: DollarSign, title: "Flexible Pricing", description: "Choose from various pricing options to fit your budget" },
  ],
  workers: [
    { icon: Clock, title: "Flexible Hours", description: "Work on your own schedule" },
    { icon: CreditCard, title: "Quick Payments", description: "Receive payments reliably and promptly" },
    { icon: Award, title: "Build Reputation", description: "Grow your professional profile with each task" },
  ],
}

const testimonials = [
  { name: "John D.", role: "Buyer", quote: "I've found amazing talent for my projects here!" },
  { name: "Sarah M.", role: "Worker", quote: "This platform has given me the flexibility I need in my work life." },
]

const stats = [
  { value: "10,000+", label: "Tasks Completed" },
  { value: "95%", label: "Satisfaction Rate" },
  { value: "$1M+", label: "Paid to Workers" },
]

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-gray-50 mb-10 border rounded-lg">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-semibold mb-6">For Buyers</h3>
            <div className="grid gap-4">
              {benefits.buyers.map((benefit, index) => (
                <motion.div key={index} {...fadeInUp} custom={index}>
                  <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                      <div className="bg-primary p-2 rounded-full">
                        <benefit.icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <CardTitle>{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{benefit.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-6">For Workers</h3>
            <div className="grid gap-4">
              {benefits.workers.map((benefit, index) => (
                <motion.div key={index} {...fadeInUp} custom={index}>
                  <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                      <div className="bg-secondary p-2 rounded-full">
                        <benefit.icon className="h-6 w-6 text-secondary-foreground" />
                      </div>
                      <CardTitle>{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{benefit.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-6 text-center">What Our Users Say</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} {...fadeInUp} custom={index}>
                <Card>
                  <CardContent className="pt-6">
                    <p className="italic mb-4">"{testimonial.quote}"</p>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-6 text-center">Our Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div key={index} {...fadeInUp} custom={index} className="text-center">
                <p className="text-4xl font-bold text-primary mb-2">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

