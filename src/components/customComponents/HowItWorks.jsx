import React from 'react'
import { motion } from 'framer-motion'
import { Upload, Search, CheckCircle, DollarSign, List, Send, CreditCard } from 'lucide-react'
import { Button } from "@/components/ui/button"

const steps = {
  buyers: [
    { icon: Upload, text: "Post a task" },
    { icon: Search, text: "Review submissions" },
    { icon: CheckCircle, text: "Approve and pay workers" },
  ],
  workers: [
    { icon: List, text: "Browse available tasks" },
    { icon: Send, text: "Submit completed work" },
    { icon: DollarSign, text: "Get paid instantly" },
  ],
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export default function HowItWorks() {
  return (
    <section className="py-16 bg-gray-50 mb-10 border rounded-lg">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="flex flex-col md:flex-row md:justify-center md:items-center gap-10 md:gap-20">
          <div>
            <h3 className="text-xl font-semibold mb-6 text-left">For Buyers</h3>
            {steps.buyers.map((step, index) => (
              <motion.div
                key={index}
                className="flex items-center mb-6"
                {...fadeInUp}
                custom={index}
              >
                <div className="bg-primary text-primary-foreground rounded-full p-3 mr-4">
                  <step.icon size={24} />
                </div>
                <p className="text-lg">{step.text}</p>
              </motion.div>
            ))}
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-6 text-left">For Workers</h3>
            {steps.workers.map((step, index) => (
              <motion.div
                key={index}
                className="flex items-center mb-6"
                {...fadeInUp}
                custom={index}
              >
                <div className="bg-secondary text-secondary-foreground rounded-full p-3 mr-4">
                  <step.icon size={24} />
                </div>
                <p className="text-lg">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="text-center mt-12">
          <Button size="lg">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  )
}

