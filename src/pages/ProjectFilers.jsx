// src/components/ProjectFiltersPage.jsx
import React, { useState, useEffect } from "react";
import { X, Filter, RotateCcw } from "lucide-react";
import Navbar from "../components/Navbar";

// Re-usable Chip component (same as before)
const Chip = ({ label, isSelected, onSelect, type = "checkbox", value }) => {
  const baseStyle =
    "px-4 py-2 m-1 text-sm font-medium border rounded-full cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-105";
  const selectedStyle = "bg-lime-950 text-white border-orange-800 shadow-md";
  const unselectedStyle =
    "bg-orange-100 text-lime-950 border-gray-600 hover:border-gray-500";

  return (
    <button
      type="button"
      onClick={() => onSelect(value || label)}
      className={`${baseStyle} ${isSelected ? selectedStyle : unselectedStyle}`}
      role={type}
      aria-checked={isSelected}
    >
      {label}
    </button>
  );
};

const dummyProjects = [
  {
    title: "AI-powered Plant Irrigation",
    domain: "Embedded / IoT",
    techStack: {
      languages: ["Python", "C++"],
      frameworks: ["Flask"],
      databases: ["Firebase"],
      cloud: ["AWS"],
      devTools: ["Git", "Docker"],
    },
    difficulty: "Intermediate",
    timeCommitment: "1–2 weeks",
    skillsToLearn: [
      "API Integration",
      "ML Model Training",
      "Deployment & DevOps",
    ],
    projectType: "End-to-End Pipeline",
    soloOrTeam: "Suitable for Solo",
    openSourceFriendly: ["Has open-source starter"],
  },
  {
    title: "Resume Reviewer with LLMs",
    domain: "Machine Learning / AI",
    techStack: {
      languages: ["Python"],
      frameworks: ["React", "Flask"],
      databases: ["PostgreSQL"],
      cloud: ["Google Cloud (GCP)"],
      devTools: ["Docker", "GitHub Actions"],
    },
    difficulty: "Advanced",
    timeCommitment: "Long-term / Capstone",
    skillsToLearn: ["ML Model Training", "CI/CD", "System Design"],
    projectType: "Web App",
    soloOrTeam: "Designed for Team Collaboration",
    openSourceFriendly: ["Contribute to existing repo"],
  },
  {
    title: "Blockchain Voting DApp",
    domain: "Blockchain / Web3",
    techStack: {
      languages: ["JavaScript", "Solidity"],
      frameworks: ["React", "Node.js"],
      databases: ["MongoDB"],
      cloud: ["Azure"],
      devTools: ["Git", "Docker"],
    },
    difficulty: "Advanced",
    timeCommitment: "1 month",
    skillsToLearn: ["Security", "Frontend Design", "API Integration"],
    projectType: "Web App",
    soloOrTeam: "Designed for Team Collaboration",
    openSourceFriendly: ["From curated OS list"],
  },
  {
    title: "AR Pirate Math Game",
    domain: "AR/VR",
    techStack: {
      languages: ["C#"],
      frameworks: [],
      databases: ["SQLite"],
      cloud: [],
      devTools: ["Unity"],
    },
    difficulty: "Beginner",
    timeCommitment: "1–2 weeks",
    skillsToLearn: ["Game Development", "Frontend Design"],
    projectType: "Game / Simulation",
    soloOrTeam: "Suitable for Solo",
    openSourceFriendly: ["Has open-source starter"],
  },
  {
    title: "Real-time Chat App with Firebase",
    domain: "Mobile Development",
    techStack: {
      languages: ["JavaScript"],
      frameworks: ["React Native"],
      databases: ["Firebase"],
      cloud: ["Google Cloud (GCP)"],
      devTools: ["Git"],
    },
    difficulty: "Beginner",
    timeCommitment: "< 1 week (Mini)",
    skillsToLearn: ["Real-time Systems", "Frontend Design"],
    projectType: "Mobile App",
    soloOrTeam: "Suitable for Solo",
    openSourceFriendly: ["Has open-source starter"],
  },
];

const filterOptions = {
  domain: [
    "Software Engineering",
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Machine Learning / AI",
    "Cybersecurity",
    "DevOps / Cloud",
    "Game Development",
    "Embedded / IoT",
    "Blockchain / Web3",
    "AR/VR",
    "NLP / CV",
    "UI/UX",
  ],
  techStack: {
    languages: [
      "Python",
      "JavaScript",
      "Java",
      "C++",
      "TypeScript",
      "Go",
      "Rust",
      "Swift",
      "Kotlin",
    ],
    frameworks: [
      "React",
      "Angular",
      "Vue.js",
      "Node.js",
      "Express.js",
      "Django",
      "Flask",
      "Spring Boot",
      "TensorFlow",
      "PyTorch",
      ".NET",
    ],
    databases: [
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "Firebase",
      "Redis",
      "SQLite",
    ],
    cloud: ["AWS", "Azure", "Google Cloud (GCP)"],
    devTools: [
      "Docker",
      "Kubernetes",
      "Git",
      "GitHub Actions",
      "Jenkins",
      "Terraform",
    ],
  },
  difficulty: ["Beginner", "Intermediate", "Advanced"],
  timeCommitment: [
    "< 1 week (Mini)",
    "1–2 weeks",
    "1 month",
    "Long-term / Capstone",
  ],
  skillsToLearn: [
    "API Integration",
    "Database Design",
    "Algorithms",
    "Real-time Systems",
    "Deployment & DevOps",
    "Frontend Design",
    "ML Model Training",
    "Data Visualization",
    "System Design",
    "Security",
    "CI/CD",
    "Testing",
  ],
  projectType: [
    "Web App",
    "Mobile App",
    "Script / CLI Tool",
    "End-to-End Pipeline",
    "Game / Simulation",
    "API-only backend",
    "Dataset Analysis",
    "Automation Bot",
  ],
  soloOrTeam: ["Suitable for Solo", "Designed for Team Collaboration"],
  openSourceFriendly: [
    "Has open-source starter",
    "Contribute to existing repo",
    "From curated OS list",
  ],
};

const ProjectFilters = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    domain: [],
    techStack_languages: [],
    techStack_frameworks: [],
    techStack_databases: [],
    techStack_cloud: [],
    techStack_devTools: [],
    difficulty: "",
    timeCommitment: "",
    skillsToLearn: [],
    projectType: [],
    soloOrTeam: "",
    openSourceFriendly: [],
  });

  const [filteredProjects, setFilteredProjects] = useState(dummyProjects);

  console.log(selectedFilters);

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const handleMultiSelect = (category, value) => {
    setSelectedFilters((prev) => {
      const currentSelection = prev[category] || [];
      if (currentSelection.includes(value)) {
        return {
          ...prev,
          [category]: currentSelection.filter((item) => item !== value),
        };
      } else {
        return { ...prev, [category]: [...currentSelection, value] };
      }
    });
  };

  const handleSingleSelect = (category, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: prev[category] === value ? "" : value,
    }));
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      domain: [],
      techStack_languages: [],
      techStack_frameworks: [],
      techStack_databases: [],
      techStack_cloud: [],
      techStack_devTools: [],
      difficulty: "",
      timeCommitment: "",
      skillsToLearn: [],
      projectType: [],
      soloOrTeam: "",
      openSourceFriendly: [],
    });

    setFilteredProjects(dummyProjects);
    setShowMobileFilters(false);
    console.log("All filters cleared");
  };

  const applyFilters = () => {
    console.log("Applied Filters:", selectedFilters);
    const filtered = dummyProjects.filter((project) => {
      const matchesDomain =
        selectedFilters.domain.length === 0 ||
        selectedFilters.domain.includes(project.domain);

      const matchesTechStack = Object.keys(selectedFilters)
        .filter((key) => key.startsWith("techStack_"))
        .every((key) => {
          const techCategory = key.split("_")[1];
          return (
            selectedFilters[key].length === 0 ||
            selectedFilters[key].some((tech) =>
              project.techStack[techCategory]?.includes(tech)
            )
          );
        });

      const matchesDifficulty =
        !selectedFilters.difficulty ||
        selectedFilters.difficulty === project.difficulty;

      const matchesTimeCommitment =
        !selectedFilters.timeCommitment ||
        selectedFilters.timeCommitment === project.timeCommitment;

      const matchesSkillsToLearn =
        selectedFilters.skillsToLearn.length === 0 ||
        selectedFilters.skillsToLearn.every((skill) =>
          project.skillsToLearn.includes(skill)
        );

      const matchesProjectType =
        selectedFilters.projectType.length === 0 ||
        selectedFilters.projectType.includes(project.projectType);

      const matchesSoloOrTeam =
        !selectedFilters.soloOrTeam ||
        selectedFilters.soloOrTeam === project.soloOrTeam;

      const matchesOpenSourceFriendly =
        selectedFilters.openSourceFriendly.length === 0 ||
        selectedFilters.openSourceFriendly.every((osOption) =>
          project.openSourceFriendly.includes(osOption)
        );

      return (
        matchesDomain &&
        matchesTechStack &&
        matchesDifficulty &&
        matchesTimeCommitment &&
        matchesSkillsToLearn &&
        matchesProjectType &&
        matchesSoloOrTeam &&
        matchesOpenSourceFriendly
      );
    });

    console.log("Filtered Projects:", filtered);
    setFilteredProjects(filtered);
    setShowMobileFilters(false);
  };

  const activeFilterCount = Object.values(selectedFilters).reduce(
    (count, value) => {
      if (Array.isArray(value)) return count + value.length;
      if (typeof value === "string" && value !== "") return count + 1;
      return count;
    },
    0
  );

  const renderFilterSection = (
    title,
    categoryKey,
    options,
    type = "multi",
    subCategory = false
  ) => {
    const currentSelection =
      selectedFilters[categoryKey] || (type === "single" ? "" : []);
    const onSelect = type === "single" ? handleSingleSelect : handleMultiSelect;

    return (
      <div
        className={`mb-6 p-3 rounded-lg bg-orange-100 border-2 border-gray-700/50 pl-3 ${
          subCategory ? "ml-3 mt-1 border-l-2 border-gray-700/50 pl-3" : ""
        }`}
      >
        <h3
          className={`text-md font-semibold mb-2 ${
            subCategory ? "text-amber-950" : "text-amber-950"
          }`}
        >
          {title}
        </h3>
        <div className="flex flex-wrap">
          {options.map((option) => (
            <Chip
              key={option}
              label={option}
              value={option}
              isSelected={
                type === "single"
                  ? currentSelection === option
                  : currentSelection.includes(option)
              }
              onSelect={(val) => onSelect(categoryKey, val)}
              type={type === "single" ? "radio" : "checkbox"}
            />
          ))}
        </div>
      </div>
    );
  };

  const FilterPanelContent = () => (
    <>
      <div className="flex justify-between items-center mb-6 md:hidden p-4 bg-gray-850 z-10">
        <h2 className="text-xl font-semibold text-amber-950">Filters</h2>
        <button
          onClick={() => setShowMobileFilters(false)}
          className="text-lime-950 hover:text-white"
        >
          <X size={24} />
        </button>
      </div>
      <div className="p-4 pb-0 md:pt-2">
        {" "}
        {/* Added md:pt-2 for consistent desktop padding */}
        {renderFilterSection(
          "🧩 Domain / Field of Interest",
          "domain",
          filterOptions.domain
        )}
        <div className="mb-6 p-3 rounded-lg bg-orange-100 border-2 border-gray-700/50 pl-3">
          <h3 className="text-md font-semibold mb-2 text-amber-950">
            🔧 Preferred Tech Stack / Tools
          </h3>
          {renderFilterSection(
            "Programming Language",
            "techStack_languages",
            filterOptions.techStack.languages,
            "multi",
            true
          )}
          {renderFilterSection(
            "Frameworks",
            "techStack_frameworks",
            filterOptions.techStack.frameworks,
            "multi",
            true
          )}
          {renderFilterSection(
            "Databases",
            "techStack_databases",
            filterOptions.techStack.databases,
            "multi",
            true
          )}
          {renderFilterSection(
            "Cloud Platforms",
            "techStack_cloud",
            filterOptions.techStack.cloud,
            "multi",
            true
          )}
          {renderFilterSection(
            "Dev Tools",
            "techStack_devTools",
            filterOptions.techStack.devTools,
            "multi",
            true
          )}
        </div>
        {renderFilterSection(
          "🎯 Difficulty Level",
          "difficulty",
          filterOptions.difficulty,
          "single"
        )}
        {renderFilterSection(
          "⏳ Time Commitment",
          "timeCommitment",
          filterOptions.timeCommitment,
          "single"
        )}
        {renderFilterSection(
          "🧠 Skills You Want to Learn / Practice",
          "skillsToLearn",
          filterOptions.skillsToLearn
        )}
        {renderFilterSection(
          "📦 Project Type / Format",
          "projectType",
          filterOptions.projectType
        )}
        {renderFilterSection(
          "👨‍👩‍👧‍👦 Solo vs. Team Project",
          "soloOrTeam",
          filterOptions.soloOrTeam,
          "single"
        )}
        {renderFilterSection(
          "🆓 Open-Source Friendly",
          "openSourceFriendly",
          filterOptions.openSourceFriendly
        )}
      </div>
      {/* Action Buttons - Sticky within the scrollable filter panel */}
      <div className="sticky bottom-0 bg-gray-850 md:bg-gray-800/60 backdrop-blur-sm p-4 border-t border-gray-700/50">
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <button
            onClick={applyFilters}
            className="flex-1 bg-lime-950 hover:bg-amber-700 text-white font-semibold py-2.5 px-5 rounded-lg shadow-md transition duration-150 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
          >
            Apply Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </button>
          <button
            onClick={clearAllFilters}
            className="flex-1 bg-gray-300 text-black font-semibold py-2.5 px-5 rounded-lg shadow-md transition duration-150 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75"
          >
            <RotateCcw size={16} className="inline mr-1.5" /> Clear All
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex flex-col h-screen bg-orange-50 text-white">
      <Navbar />
      <div></div>
      {/* Main content area: Flex container for sidebar and project list */}
      <div className="flex flex-1 overflow-hidden mt-20">
        {/* Desktop Filter Panel - always visible and scrollable */}
        <aside className="hidden md:block w-72 lg:w-80 xl:w-96 h-full overflow-y-auto bg-transparent border-r scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800/50">
          <FilterPanelContent />
        </aside>

        {/* Mobile Filter Panel - Slides in */}
        {showMobileFilters && (
          <div
            id="filter-panel-mobile"
            className="fixed inset-0 z-30 bg-orange-100 backdrop-blur-sm md:hidden"
            onClick={() => setShowMobileFilters(false)} // Close on overlay click
          >
            <aside
              className="fixed top-0 left-0 h-full w-full max-w-xs sm:max-w-sm shadow-xl overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800/50"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside panel
            >
              <FilterPanelContent />
            </aside>
          </div>
        )}

        {/* Projects Area - takes remaining space and is scrollable */}
        <main className="flex-1 h-full overflow-y-auto p-4 md:p-6 lg:p-8 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-850">
          <h1 className="text-2xl md:text-3xl font-bold mb-1 text-amber-800">
            Discover Your Next Project
          </h1>
          <p className="text-lime-950 mb-6 text-sm md:text-base">
            Use the filters to narrow down project ideas based on your
            interests, skills, and goals.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.title}
                className="bg-orange-100 p-5 rounded-xl shadow-lg hover:shadow-amber-100 transition-shadow duration-300 flex flex-col"
              >
                <h3 className="text-lg font-semibold text-amber-800 mb-2">
                  {project.title}
                </h3>
                <p className="text-lime-950 text-xs mb-1">
                  <strong>Domain:</strong> {project.domain}
                </p>
                <p className="text-lime-950 text-xs mb-1">
                  <strong>Difficulty:</strong> {project.difficulty}
                </p>
                <p className="text-lime-950 text-xs mb-1">
                  <strong>Time Commitment:</strong> {project.timeCommitment}
                </p>
                <p className="text-lime-950 text-xs mb-2">
                  <strong>Tech Stack:</strong>{" "}
                  {Object.values(project.techStack).flat().join(", ")}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.skillsToLearn.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-semibold bg-lime-800 text-white px-2 py-2 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <button className="w-full mt-auto bg-lime-800 bg-gradient-to-r hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 text-sm">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProjectFilters;
