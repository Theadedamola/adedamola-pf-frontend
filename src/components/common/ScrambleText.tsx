import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

export const ScrambleText = ({
  text,
  className,
  delay = 0,
}: ScrambleTextProps) => {
  const [displayText, setDisplayText] = useState("");
  const [isRevealing, setIsRevealing] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const triggerScramble = () => {
    let iterations = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(() => {
        return text
          .split("")
          .map((char, index) => {
            if (index < iterations) {
              return char;
            }
            if (char === " ") return " ";
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("");
      });

      if (iterations >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }

      iterations += 1 / 3;
    }, 30);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsRevealing(true);
      triggerScramble();
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, delay]);

  const handleMouseEnter = () => {
    if (isRevealing) {
      triggerScramble();
    }
  };

  return (
    <motion.span
      className={`${className} cursor-default select-none`}
      onMouseEnter={handleMouseEnter}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayText || text.split("").map(() => " ")}
    </motion.span>
  );
};

