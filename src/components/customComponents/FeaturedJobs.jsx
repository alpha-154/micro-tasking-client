import JobCard from "./JobCard"

function getFeaturedJobs(){
    // In a real application, you would fetch this data from your API or database
    return [
      {
        id: '1',
        title: 'Data Entry Job',
        description: 'We need help entering data into a spreadsheet',
        workersNeeded: 3,
        paymentAmount: 50,
        dueDate: '2025-01-30',
        submissionInfo: 'Submit your work via the platform for review',
        imageUrl: "/dataEntry.webp"  // Use relative path from the public folder
      },
      {
        id: '2',
        title: 'Web Design Project',
        description: 'Create a modern landing page for a startup',
        workersNeeded: 1,
        paymentAmount: 200,
        dueDate: '2025-02-15',
        submissionInfo: 'Submit your design files through our project management tool',
        imageUrl: "/website-design.jpg"  // Use relative path from the public folder
      },
      {
        id: '3',
        title: 'Website Hosting',
        description: 'Host a website for a small business',
        workersNeeded: 4,
        paymentAmount: 150,
        dueDate: '2025-1-25',
        submissionInfo: 'Submit your design files through our project management tool',
        imageUrl: "/website-hosting.jpg"  // Use relative path from the public folder
      },
    ]
  }
export default  function FeaturedJobs() {
  const jobs =  getFeaturedJobs()

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Jobs & Opportunities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </section>
  )
}

