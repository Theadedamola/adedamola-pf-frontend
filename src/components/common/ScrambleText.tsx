import { useState, useEffect } from "react";
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

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsRevealing(true);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!isRevealing) return;

    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText((_current) => {
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
        clearInterval(interval);
      }

      iterations += 1 / 3; // Slow down the reveal for each character
    }, 30);

    return () => clearInterval(interval);
  }, [text, isRevealing]);

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayText || text.split("").map(() => " ")}
    </motion.span>
  );
};
