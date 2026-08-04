"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react"; // or "framer-motion"

export default function Typeahead({
  words = ["Developer Jobs", "Remote Roles", "Tech Careers", "Design Jobs"],
  typingSpeed = 90,
  deletingSpeed = 45,
  delayBetweenWords = 1800,
}) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const targetWord = words[currentWordIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        setCurrentText(targetWord.substring(0, currentText.length + 1));
        if (currentText === targetWord) {
          setTimeout(() => setIsDeleting(true), delayBetweenWords);
        }
      } else {
        setCurrentText(targetWord.substring(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        }
      }
    };

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(handleTyping, speed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, delayBetweenWords]);

  return (
    <span className="inline-flex items-center text-primary font-bold">
      {/* Typed Text */}
      <span>{currentText}</span>

      {/* Blinking Cursor using motion.span and animate */}
      <motion.span
        animate={{
          opacity: [1, 0, 1],
          scaleY: [1, 0.9, 1],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="ml-1 inline-block h-[0.85em] w-[3px] bg-primary rounded-full"
      />
    </span>
  );
}