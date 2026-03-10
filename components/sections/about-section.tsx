"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Briefcase,
  Award,
  Calendar,
  MapPin,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from "lucide-react";

const experienceItems = [
  {
    id: 1,
    company: "Coding Camp powered by DBS Foundation",
    position: "Machine Learning Engineer Cohort",
    duration: "Feb 2025 - Present",
    location: "Remote • Bandung, Indonesia",
    current: true,
    responsibilities: [
      "Building AI solutions with Django, TensorFlow, PyTorch",
      "Leading a team of developers in creating innovative AI solutions",
      "Architecting scalable machine learning systems for production",
    ],
  },
  {
    id: 2,
    company: "Badan Pengelolaan Keuangan Aceh (BPKA)",
    position: "Data Management & Analysis",
    duration: "Jan 2025 - Mar 2025",
    location: "Onsite • Banda Aceh, Indonesia",
    current: false,
    responsibilities: [
      "Digitizing and processing financial data using spreadsheets",
      "Preparing internal documentation and reports",
      "Supporting financial data reporting activities",
    ],
  },
];

const educationItems = [
  {
    id: 1,
    institution: "Ar-Raniry State Islamic University",
    degree: "Information Technology (S.Kom.)",
    duration: "Sep 2022 - Aug 2026",
    location: "Banda Aceh, Aceh",
    current: true,
  },
  {
    id: 2,
    institution: "MAS Tgk. Chiek Oemar Diyan",
    degree: "Senior High School (Natural Science)",
    duration: "2019 - 2022",
    location: "Aceh Besar, Aceh",
    current: false,
  },
];

const certificationItems = [
  {
    id: 1,
    name: "Applied Machine Learning",
    issuer: "Dicoding Indonesia",
    date: "May 2025",
    credentialUrl: "https://www.dicoding.com/certificates/1RXYEGQ3KZVM",
  },
  {
    id: 2,
    name: "Learn Data Processing Fundamentals",
    issuer: "Dicoding Indonesia",
    date: "May 2025",
    credentialUrl: "https://www.dicoding.com/certificates/JLX1964EGP72",
  },
];

export function AboutSection() {
  const [expandedExperience, setExpandedExperience] = useState<number | null>(null);

  return (
    <section className="py-24 lg:py-32 bg-black">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-white mb-6">
            About
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl leading-relaxed">
            I'm a machine learning engineer based in Indonesia, focused on building
            practical ML solutions that solve real problems. I work with Python,
            TensorFlow, and PyTorch to create classification systems, recommendation
            engines, and computer vision applications.
          </p>
        </motion.div>

        {/* Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-8">
            <Briefcase className="w-5 h-5 text-neutral-500" />
            <h3 className="text-xl font-medium text-white">Experience</h3>
          </div>

          <div className="space-y-6">
            {experienceItems.map((item) => (
              <div
                key={item.id}
                className="group p-6 rounded-xl border border-neutral-800 hover:border-neutral-700 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-lg font-medium text-white">
                        {item.position}
                      </h4>
                      {item.current && (
                        <span className="px-2 py-0.5 text-xs font-medium text-green-400 bg-green-500/10 rounded-full">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-neutral-400 mb-3">{item.company}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {item.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {item.location}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      setExpandedExperience(
                        expandedExperience === item.id ? null : item.id
                      )
                    }
                    className="text-neutral-500 hover:text-white transition-colors p-2"
                  >
                    {expandedExperience === item.id ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {expandedExperience === item.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-4 pt-4 border-t border-neutral-800"
                  >
                    <ul className="space-y-2">
                      {item.responsibilities.map((resp, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-sm text-neutral-400"
                        >
                          <span className="w-1 h-1 bg-neutral-600 rounded-full mt-2 flex-shrink-0" />
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap className="w-5 h-5 text-neutral-500" />
            <h3 className="text-xl font-medium text-white">Education</h3>
          </div>

          <div className="space-y-6">
            {educationItems.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-xl border border-neutral-800 hover:border-neutral-700 transition-colors"
              >
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-lg font-medium text-white">{item.degree}</h4>
                  {item.current && (
                    <span className="px-2 py-0.5 text-xs font-medium text-green-400 bg-green-500/10 rounded-full">
                      Current
                    </span>
                  )}
                </div>
                <p className="text-neutral-400 mb-3">{item.institution}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {item.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {item.location}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Certifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-8">
            <Award className="w-5 h-5 text-neutral-500" />
            <h3 className="text-xl font-medium text-white">Certifications</h3>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {certificationItems.map((item) => (
              <a
                key={item.id}
                href={item.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 rounded-xl border border-neutral-800 hover:border-neutral-700 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-lg font-medium text-white mb-1 group-hover:text-neutral-300 transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-neutral-400 text-sm mb-2">{item.issuer}</p>
                    <p className="text-neutral-500 text-sm">{item.date}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-neutral-600 group-hover:text-neutral-400 transition-colors flex-shrink-0" />
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
