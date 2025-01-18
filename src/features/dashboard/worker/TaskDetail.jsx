import React from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, DollarSign, Users, Mail } from 'lucide-react'


// Fake data for demonstration (same as in the TaskList component)
const initialTasks = [
  {
    id: "1",
    taskTitle: "Create a logo design",
    buyerName: "John Doe",
    buyerEmail: "john@example.com",
    completionDate: new Date("2023-07-30"),
    payableAmount: 50,
    requiredWorkers: 5,
    imageUrl: "https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Design a modern and versatile logo for a tech startup. The logo should be simple yet memorable, conveying innovation and trust.",
  },
  {
    id: "2",
    taskTitle: "Write product descriptions",
    buyerName: "Jane Smith",
    buyerEmail: "jane@example.com",
    completionDate: new Date("2023-08-15"),
    payableAmount: 20,
    requiredWorkers: 10,
    imageUrl: "https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Create compelling product descriptions for a new line of eco-friendly home goods. Each description should be 100-150 words long and highlight the product's unique features and benefits.",
  },
  {
    id: "3",
    taskTitle: "Translate website content",
    buyerName: "Alex Johnson",
    buyerEmail: "alex@example.com",
    completionDate: new Date("2023-08-05"),
    payableAmount: 30,
    requiredWorkers: 3,
    imageUrl: "https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Translate our company website from English to Spanish. The website consists of 5 pages including Home, About Us, Services, Blog, and Contact. Ensure that the translation maintains the tone and style of the original content.",
  },
  {
    id: "4",
    taskTitle: "Test mobile application",
    buyerName: "Sarah Brown",
    buyerEmail: "sarah@example.com",
    completionDate: new Date("2023-07-25"),
    payableAmount: 40,
    requiredWorkers: 8,
    imageUrl: "https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Conduct thorough testing of our new mobile application on both iOS and Android platforms. Identify and report any bugs, usability issues, or performance problems. Provide detailed feedback on user experience.",
  },
]

export default function TaskDetail() {
  const { taskId } = useParams()
  const [submissionDetails, setSubmissionDetails] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Find the task by ID
  const task = initialTasks.find(t => t.id === taskId)

  if (!task) {
    return <div>Task not found!</div>
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call to save submission
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Mock submission object
    const submission = {
      task_id: task.id,
      task_title: task.taskTitle,
      imageUrl: task.imageUrl,
      payable_amount: task.payableAmount,
      worker_email: "worker@example.com", // This would come from authenticated user in a real app
      worker_name: "Worker Name", // This would come from authenticated user in a real app
      submission_details: submissionDetails,
      buyer_name: task.buyerName,
      buyer_email: task.buyerEmail,
      current_date: new Date(),
      status: "pending"
    }

    console.log("Submission saved:", submission)

    setIsSubmitting(false)
    setSubmissionDetails("")
    // In a real app, you might redirect or show a success message here
    alert("Submission successful!")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">{task.taskTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video mb-4 overflow-hidden rounded-lg">
            <img
              src={task.imageUrl || "/placeholder.svg"}
              alt={task.taskTitle}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="font-semibold mb-2">Task Details</h3>
              <p className="text-sm text-gray-600 mb-4">{task.description}</p>
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <CalendarIcon className="w-4 h-4 mr-2" />
                Completion Date: {task.completionDate.toLocaleDateString()}
              </div>
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <DollarSign className="w-4 h-4 mr-2" />
                Payable Amount: ${task.payableAmount.toFixed(2)}
              </div>
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <Users className="w-4 h-4 mr-2" />
                Required Workers: {task.requiredWorkers}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Buyer Information</h3>
              <p className="text-sm text-gray-600 mb-2">Name: {task.buyerName}</p>
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                Email: {task.buyerEmail}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Submit Your Work</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="submissionDetails" className="block text-sm font-medium text-gray-700 mb-1">
                Submission Details
              </label>
              <Textarea
                id="submissionDetails"
                value={submissionDetails}
                onChange={(e) => setSubmissionDetails(e.target.value)}
                placeholder="Provide details about your submission..."
                required
                className="min-h-[100px]"
              />
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}


