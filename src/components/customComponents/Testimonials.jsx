import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    text: "As a buyer, I can post tasks easily and get them done in no time by skilled workers!",
    imageSrc:
      "https://images.unsplash.com/photo-1624395213043-fa2e123b2656?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVuJTIwZmFjZXxlbnwwfHwwfHx8MA%3D%3D",
    name: "Josh Smith",
    username: "@jjsmith",
  },
  {
    text: "This platform made earning money flexible and straightforward as a worker.",
    imageSrc:
      "https://images.unsplash.com/photo-1656338997878-279d71d48f6e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1lbiUyMGZhY2V8ZW58MHx8MHx8fDA%3D",
    name: "Sarah Johnson",
    username: "@sjohnson",
  },
  {
    text: "The process is seamless for both buyers and workers. Highly recommend it!",
    imageSrc:
      "https://images.unsplash.com/photo-1653071163517-4ee6b192260d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1lbiUyMGZhY2V8ZW58MHx8MHx8fDA%3D",
    name: "Michael Brown",
    username: "@mbrown",
  },
  {
    text: "This platform is a game changer for freelancers like me looking for quick gigs.",
    imageSrc:
      "https://images.unsplash.com/photo-1642596661575-9d4842a704ed?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fG1lbiUyMGZhY2V8ZW58MHx8MHx8fDA%3D",
    name: "Emily Davis",
    username: "@edavis",
  },
  {
    text: "I’ve never seen a more efficient way to complete tasks and earn extra income.",
    imageSrc:
      "https://images.unsplash.com/photo-1664641560008-b66517f2f0cc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fG1lbiUyMGZhY2V8ZW58MHx8MHx8fDA%3D",
    name: "David Wilson",
    username: "@dwilson",
  },
  {
    text: "Posting tasks and finding the right talent has never been this simple.",
    imageSrc:
      "https://images.unsplash.com/photo-1619451684167-8099a2636378?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fG1lbiUyMGZhY2V8ZW58MHx8MHx8fDA%3D",
    name: "Olivia Martinez",
    username: "@omartinez",
  },
  {
    text: "Completing tasks here has become my primary source of side income.",
    imageSrc:
      "https://images.unsplash.com/photo-1647864019646-e446b0135941?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fG1lbiUyMGZhY2V8ZW58MHx8MHx8fDA%3D",
    name: "William Garcia",
    username: "@wgarcia",
  },
  {
    text: "This platform connects buyers and workers perfectly. It's a win-win!",
    imageSrc:
      "https://plus.unsplash.com/premium_photo-1674777843203-da3ebb9fbca0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fG1lbiUyMGZhY2V8ZW58MHx8MHx8fDA%3D",
    name: "Jessica Clark",
    username: "@jclark",
  },
  {
    text: "Highly intuitive platform for buyers and workers. I love how easy it is to use.",
    imageSrc:
      "https://images.unsplash.com/photo-1656338997878-279d71d48f6e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1lbiUyMGZhY2V8ZW58MHx8MHx8fDA%3D",
    name: "Sophia Lee",
    username: "@slee",
  },
  {
    text: "I can’t imagine managing my tasks without this platform anymore.",
    imageSrc:
      "https://images.unsplash.com/photo-1624395213043-fa2e123b2656?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVuJTIwZmFjZXxlbnwwfHwwfHx8MA%3D%3D",
    name: "James White",
    username: "@jwhite",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const TestimonialsColumn = ({ testimonials, className = "", duration }) => (
  <div className={className}>
    <motion.div
      animate={{
        translateY: "-50%",
      }}
      transition={{
        repeat: Infinity,
        duration: duration || 15,
        ease: "linear",
        repeatType: "loop",
      }}
      className="flex flex-col gap-6 pb-6"
    >
      {/* all of these stuffs makes the testimonial section double */}
      {[...new Array(2)].fill(0).map((_, index) => (
        <React.Fragment key={index}>
          {testimonials.map(({ text, imageSrc, name, username }) => (
            <div key={name} className="card">
              <div>{text}</div>
              <div className="flex items-center gap-2 mt-5">
                <img
                  src={imageSrc}
                  alt={name}
                  className="h-10 w-10 rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <div className="font-medium tracking-tight leading-5">
                  {name}
                </div>
                <div className="leading-5 tracking-tight">{username}</div>
              </div>
            </div>
          ))}
        </React.Fragment>
      ))}
    </motion.div>
  </div>
);

const TestimonialSection = () => {
  return (
    <section className="">
      <div className="container">
        {/* Section Heading */}
        <div className="section-heading mb-10">
          <div className="flex justify-center">
            <div className="tag dark:border-gray-600">Testimonials</div>
          </div>
          <h2 className="section-title mt-5 dark:from-white dark:to-[#4583df]">
            What Our Community Says
          </h2>
          <p className="section-description mt-5 dark:text-[#6195cf]">
            Hear from our buyers and workers who are transforming tasks into
            opportunities. . Buyers love how effortlessly they can get their
            tasks done, while workers share their stories of earning and growth
          </p>
        </div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[738px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
