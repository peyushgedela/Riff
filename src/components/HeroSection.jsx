// src/components/HeroSection.jsx
import React, { useState, useEffect, useRef } from "react";
import { TypeAnimation } from "react-type-animation";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [buttonStyle, setButtonStyle] = useState({});
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  const dynamicWords = ["Idea", "Side Project", "Inspiration"];

  // Mouse tracking for button
  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Max rotation/tilt
      const maxTilt = 8; // degrees

      // Tilt based on mouse position relative to button center
      const tiltX = (y / rect.height) * -maxTilt;
      const tiltY = (x / rect.width) * maxTilt;

      setButtonStyle({
        transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.05)`,
        transition: "transform 0.1s ease-out",
      });
    };

    const handleMouseLeave = () => {
      setButtonStyle({
        transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
        transition: "transform 0.3s ease-in-out",
      });
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 pt-20 md:pt-24">
      {/* Hero Title */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-lime-950 mb-8 leading-tight">
        Find Your Next{" "}
        <span className="inline-block">
          <TypeAnimation
            sequence={dynamicWords
              .map((word) => [
                (el) => {
                  // Clear previous word's letters for cascading effect if needed
                  // This implementation types out fully, then deletes.
                  // For letter-by-letter cascading IN, you might need a more custom solution
                  // or a library that supports it directly.
                  // react-type-animation primarily focuses on typing.
                  // We'll use its speed for a pseudo-cascading feel.
                },
                word, // type word
                2000, // wait
                (el) => el.classList.add("fade-out-letters"), // Prepare for delete animation
                () => {}, // Placeholder for a slight delay if needed before deletion starts
                200, // Wait before starting delete
              ])
              .flat()}
            wrapper="span"
            speed={20} // Typing speed (lower is faster)
            deletionSpeed={40} // Deletion speed
            className="bg-clip-text text-amber-800"
            repeat={Infinity}
            cursor={true}
            style={{ "--letter-animation-delay": "50ms" }} // For potential CSS animation
          />
        </span>
      </h1>

      {/* Call-to-Action Button */}
      <button
        ref={buttonRef}
        style={buttonStyle}
        onClick={() => {
          navigate("/filters");
        }}
        className="
          relative group px-10 py-4 md:px-26 md:py-5
          bg-lime-950 text-white font-semibold text-lg md:text-xl
          rounded-lg shadow-lg overflow-hidden
          transform-gpu transition-all duration-300 ease-out
          hover:shadow-2xl hover:scale-105
        "
        // The rainbow backlight will be an ::after pseudo-element
      >
        <span className="relative z-10">Let's Go</span>
        <div
          className="
            absolute -inset-0.5 rounded-lg
            bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
            opacity-0 group-hover:opacity-75 blur
            transition-opacity duration-500 ease-in-out
            animate-pulse- вокруг group-hover:animate-none
          "
          aria-hidden="true"
        ></div>
        <div
          className="
            absolute inset-0 rounded-lg
            bg-gradient-to-r from-red-500 via-yellow-400 to-green-400 opacity-0
            group-hover:opacity-60 blur-md
            transition-opacity duration-700 ease-in-out delay-100
            animate-pulse-slow group-hover:animate-none
          "
          style={{ animationDuration: "4s" }}
          aria-hidden="true"
        ></div>
      </button>

      {/* CSS for custom letter animation (if TypeAnimation doesn't fully cover cascading) */}
      <style jsx global>{`
        .typed-cursor {
          color: #60a5fa; /* Light blue cursor */
        }
        // Placeholder for cascading letter animation if needed (more complex)
        // .fade-in-letter {
        //   opacity: 0;
        //   transform: translateY(20px);
        //   animation: fadeIn 0.5s forwards;
        //   display: inline-block; /* Important for animation */
        // }
        // @keyframes fadeIn {
        //   to {
        //     opacity: 1;
        //     transform: translateY(0);
        //   }
        // }

        // Simple fade out for letters before deletion (if TypeAnimation doesn't handle it smoothly)
        // .fade-out-letters span { /* Assuming TypeAnimation wraps letters in spans */
        //   animation: fadeOutLetter 0.2s ease-out forwards;
        // }
        // @keyframes fadeOutLetter {
        //   to { opacity: 0; transform: translateY(-10px); }
        // }

        // Tailwind doesn't have arbitrary animation names easily, so we define pulse-around here
        @keyframes pulse-around {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(0.95);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.05);
          }
        }
        .animate-pulse-around {
          animation: pulse-around 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse-slow {
          /* A different pulse for the second layer */
          0%,
          100% {
            opacity: 0.1;
            transform: scale(0.98);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.02);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
