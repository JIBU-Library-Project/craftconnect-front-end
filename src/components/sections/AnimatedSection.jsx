// src/components/AnimatedSection.jsx

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const AnimatedSection = ({ children, direction = "up", delay = 0, amount = 0.2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
      x: direction === "left" ? 50 : direction === "right" ? -50 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration: 0.8, delay },
    },
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className="w-full"
    >
      {children}
    </motion.section>
  );
};

export default AnimatedSection;
