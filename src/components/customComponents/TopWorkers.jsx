import React from "react";
import { WorkerCard } from "./WorkerCard";
import { CheckCheckIcon } from "lucide-react";

const workerProfiles = [
  {
    name: "John Doe",
    specialization: "Data Entry Specialist",
    coins: "$20,000",
    description:
      "Expert in data entry, transcription, and maintaining accuracy in high-volume tasks.",
    highlights: [
      { title: "Completed 1,000+ data entry tasks with 99% accuracy." },
      { title: "Specialist in Excel, Google Sheets, and CRM software." },
      { title: "Fast turnaround time for urgent projects." },
    ],
    image:
      "https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "John Smith",
    specialization: "Social Media Content Creator",
    coins: "$18,000",
    description:
      "Skilled in creating engaging social media posts, captions, and marketing campaigns.",
    highlights: [
      { title: "Managed content for 50+ brands on Instagram and Facebook." },
      { title: "Experienced in Canva and Adobe Photoshop." },
      { title: "Expert in boosting engagement through creative visuals." },
    ],
    image:
      "https://images.pexels.com/photos/2955376/pexels-photo-2955376.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Joe Johnson",
    specialization: "Virtual Assistant",
    coins: "$16,000",
    description:
      "Providing administrative support, email management, and scheduling services remotely.",
    highlights: [
      { title: "Assisted CEOs and managers of 20+ small businesses." },
      {
        title: "Proficient in handling multiple email accounts and calendars.",
      },
      { title: "Recognized for organizational skills and reliability." },
    ],
    image:
      "https://images.pexels.com/photos/29453330/pexels-photo-29453330/free-photo-of-stylish-man-in-a-coat-in-autumn-geneva-park.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Michael Brown",
    specialization: "Content Writer",
    coins: "$12,000",
    description:
      "Specialized in writing blogs, articles, and SEO-friendly content to drive traffic.",
    highlights: [
      { title: "Published 500+ articles for various industries." },
      { title: "Expert in keyword research and SEO optimization." },
      { title: "Recognized for clear, engaging, and concise writing style." },
    ],
    image:
      "https://images.pexels.com/photos/29861078/pexels-photo-29861078/free-photo-of-portrait-of-a-man-by-the-riverfront.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Joe Davis",
    specialization: "Graphic Designer",
    coins: "$10,000",
    description:
      "Experienced in creating visually appealing logos, banners, and infographics for clients.",
    highlights: [
      {
        title: "Delivered 300+ design projects with a focus on brand identity.",
      },
      { title: "Expertise in Adobe Creative Suite and Figma." },
      {
        title:
          "Skilled in crafting eye-catching visuals for marketing campaigns.",
      },
    ],
    image:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Rose Taylor",
    specialization: "Market Researcher",
    coins: "$8,000",
    description:
      "Proficient in conducting surveys, analyzing data, and delivering actionable insights.",
    highlights: [
      {
        title: "Worked on 100+ research projects for startups and enterprises.",
      },
      { title: "Skilled in using tools like Google Analytics and Tableau." },
      { title: "Expert in compiling detailed reports for decision-making." },
    ],
    image:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

const TopWorkersSection = () => {
  return (
    <section id="featured-lawyers" className="pb-16 lg:py-24 px-4">
      <div className="container">
        {/* Section Heading */}
        <div className="section-heading mb-10">
          <div className="flex justify-center">
            <div className="tag dark:border-gray-600">Freelancers</div>
          </div>
          <h2 className="section-title mt-5 dark:from-white dark:to-[#4583df]">
            Meet Our Task Experts
          </h2>
          <p className="section-description mt-5 dark:text-[#6195cf]">
            Discover skilled professionals ready to tackle your micro-tasks with
            precision and efficiency.
          </p>
        </div>

        <div className="flex flex-col mt-10 md:mt-20 gap-20">
          {workerProfiles.map((worker, wokerIndex) => (
            <WorkerCard
              key={worker.name}
              className="px-8 pt-8 pb-0 md:pt-12 md:px-10 lg:pt-16 lg:px-20 sticky top-0"
              style={{
                top: `calc(64px + ${wokerIndex * 40}px)`,
              }}
            >
              <div className="lg:grid lg:grid-cols-2 lg:gap-16 ">
                <div className="lg:pb-16">
                  <div className="uppercase font-bold inline-flex gap-2 tracking-widest text-sm bg-gradient-to-r from-red-300 to-violet-400 bg-clip-text text-transparent">
                    <span>{worker.name}</span>
                    <span>&bull;</span>
                    <span>{worker.specialization}</span>
                  </div>

                  <h3 className="font-serif text-neutral-800 dark:text-primary text-2xl md:text-4xl mt-2 md:mt-5">
                    {worker.description}
                  </h3>
                  <h1 className="text-2xl font-bold mt-4 md:mt-5">Total Earnings:{" "}<span className="text-green-500">{worker.coins}</span></h1>
                  <hr className="border-t-2 border-neutral-700/30 mt-4 md:mt-5" />
                  <ul className="flex flex-col gap-4 mt-4 md:mt-5">
                    {worker.highlights.map((highlight) => (
                      <li
                        key={highlight.title}
                        className="flex gap-2 text-sm md:text-base dark:text-primary text-neutral-600"
                      >
                        <CheckCheckIcon className="text-neutral-600 w-4 h-4" />
                        <span>{highlight.title}</span>
                      </li>
                    ))}
                  </ul>
                 
                  <button className="bg-white hover:bg-white/80 transition duration-300 cursor-pointer text-gray-950 h-12 w-full md:w-auto px-6 rounded-xl font-semibold inline-flex items-center justify-center gap-2 mt-8">
                    <span>Top Rated</span>
                  </button>
                  
                </div>
                <div>
                  <img
                    src={worker.image}
                    alt={worker.title}
                    className="mt-8 -mb-4 md:-mb-0 rounded-xl lg:mt-0 lg:absolute lg:h-full lg:w-auto lg:max-w-none"
                  />
                </div>
              </div>
            </WorkerCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopWorkersSection;
