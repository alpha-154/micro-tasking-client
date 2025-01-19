import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CalendarIcon, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'


export default function JobCard({ job }) {
    const navigate = useNavigate();

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex items-center w-[50px] h-[50px] space-x-4">
          <img
            src={job.imageUrl || "/placeholder.svg"}
            alt={job.title}
            className="rounded-full"
          />
          <CardTitle>{job.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600 mb-4">{job.description}</p>
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
          <Users size={16} />
          <span>{job.workersNeeded} Freelancer{job.workersNeeded > 1 ? 's' : ''} Needed</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
          <CalendarIcon size={16} />
          <span>Due by {job.dueDate}</span>
        </div>
        <p className="text-lg font-semibold text-green-600">${job.paymentAmount} for completion</p>
        <p className="text-xs text-gray-500 mt-2">{job.submissionInfo}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={() => navigate(`/register`)} className="w-full">Sign Up For Apply</Button>
      </CardFooter>
    </Card>
  )
}

