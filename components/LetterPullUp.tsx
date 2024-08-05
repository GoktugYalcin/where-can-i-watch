import { motion } from "framer-motion";
import { Gupter } from "next/font/google";

const gupter = Gupter({ subsets: ["latin"], weight: "400" });

export function LetterPullUp({ extraClasses = "", title = "" }) {
  const letters = title?.split("") ?? [];

  const pullupVariant = {
    initial: { y: 100, opacity: 0 },
    animate: (i: any) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05, // Delay each letter's animation by 0.05 seconds
      },
    }),
  };

  return (
    <div className="flex justify-center items-center flex-wrap">
      {letters.map((letter, i) => (
        <motion.p
          key={i}
          variants={pullupVariant}
          initial="initial"
          animate="animate"
          custom={i}
          className={extraClasses + " " + gupter.className}
        >
          {letter === " " ? <span>&nbsp;</span> : letter}
        </motion.p>
      ))}
    </div>
  );
}
