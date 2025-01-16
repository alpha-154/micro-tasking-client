import grainImage from "/grain.jpg";
import { twMerge } from "tailwind-merge";

export const WorkerCard = ({ className, children, ...other }) => {
  return (
    <>
      <div
        className={twMerge(
          "bg-navBg dark:bg-background rounded-3xl z-0 after:z-10 after:pointer-events-none overflow-hidden relative after:content-[''] after:absolute after:inset-0 after:outline after:outline-2 after:-outline-offset-2 after:rounded-3xl after:outline-white/20",
          className
        )}
        {...other}
      >
        <div
          className="absolute inset-0 -z-10 opacity-5"
          style={{ backgroundImage: `url(${grainImage.src})` }}
        ></div>
        {children}
      </div>
    </>
  );
};
