"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  GraduationCap,
  Award,
  Briefcase,
  Code,
  Coffee,
  MapPin,
  Calendar,
  Brain,
  Zap,
  Download,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Building,
  School,
  Clock,
  User,
  Star,
  Target,
  Sparkles,
} from "lucide-react";

const experienceItems = [
  {
    id: 1,
    company: "Coding Camp powered by DBS Foundation",
    logo: "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=100",
    position: "Machine Learning Engineer Cohort",
    duration: "Feb 2025 - Present",
    type: "Internship",
    location: "Remote • Bandung, Indonesia",
    current: true,
    responsibilities: [
      "Living that AI life, building with Django, TensorFlow, PyTorch, and more—full-stack geek mode!",
      "Leading a team of developers in creating innovative AI solutions",
      "Architecting scalable machine learning systems for production environments",
    ],
  },
  {
    id: 2,
    company: "Badan Pengelolaan Keuangan Aceh (BPKA)",
    logo: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100",
    position: "Data Management & Analysis",
    duration: "Jan 2025 - Mar 2025",
    type: "Internship",
    location: "Onsite • Banda Aceh, Indonesia",
    current: false,
    responsibilities: [
      "Assist in the process of digitizing and processing financial data using spreadsheets and analysis tools.",
      "Prepare internal documentation and daily operational activity reports.",
      "Support the team in administrative activities and reporting financial data.",
    ],
  },
];

const educationItems = [
  {
    id: 1,
    institution: "Ar-Raniry State Islamic University",
    logo: "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=100",
    degree: "Information Technology (S.Kom.)",
    duration: "Sep 2022 - Aug 2026",
    location: "Banda Aceh, Aceh",
    achievements: [
      "Got down with algorithms and object-oriented coding—nailed the basics!",
      "Built slick web in hands-on courses.",
      "Dived into Big Data and analytics—crunching numbers like a pro.",
      "Leveled up with Machine Learning and played with AR tech.",
      "Mastered data structures, algorithms, and neural nets—brainy stuff!",
    ],
  },
  {
    id: 2,
    institution: "MAS Tgk. Chiek Oemar Diyan",
    logo: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=100",
    degree: "Senior High School (Natural Science)",
    duration: "2019 - 2022",
    location: "Aceh Besar, Aceh",
    achievements: [
      "Focused on Mathematics, Physics, Chemistry, and Biology",
      "Developed strong analytical and problem-solving skills",
      "Participated in science competitions and research projects",
    ],
  },
];

const certificationItems = [
  {
    id: 1,
    name: "Applied Machine Learning",
    issuer: "Dicoding Indonesia",
    logo: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=100",
    date: "May 2025",
    credentialUrl: "https://www.dicoding.com/certificates/1RXYEGQ3KZVM",
    skills: [
      "Machine Learning System Design",
      "Developing a Machine Learning Project",
      "First Case Study on Predictive Analytics",
      "Second Case Study on Sentiment Analysis",
      "Third Case Study on Computer Vision",
      "Fourth Case Study on Recommendation Systems",
    ],
  },
  {
    id: 2,
    name: "Learn Data Processing Fundamentals",
    issuer: "Dicoding Indonesia",
    logo: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=100",
    date: "May 2025",
    credentialUrl: "https://www.dicoding.com/certificates/JLX1964EGP72",
    skills: [
      "Software Engineering with Python",
      "Data Repository",
      "ETL Pipelines: Extract",
      "ETL Pipelines: Transform and Load",
      "Automation with Python",
    ],
  },
];

export function AboutSection() {
  const [expandedExperience, setExpandedExperience] = useState<number | null>(
    null
  );
  const [expandedEducation, setExpandedEducation] = useState<number | null>(
    null
  );
  const [expandedCertification, setExpandedCertification] = useState<
    number | null
  >(null);

  const toggleExpanded = (
    type: "experience" | "education" | "certification",
    id: number
  ) => {
    if (type === "experience") {
      setExpandedExperience(expandedExperience === id ? null : id);
    } else if (type === "education") {
      setExpandedEducation(expandedEducation === id ? null : id);
    } else {
      setExpandedCertification(expandedCertification === id ? null : id);
    }
  };

  return (
    <div className="min-h-screen py-20 lg:py-32 relative overflow-hidden bg-slate-950">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Header Section */}
          <div className="text-center mb-16 sm:mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-8 shadow-2xl"
            >
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 animate-pulse" />
              <span className="text-blue-400 font-medium text-sm sm:text-base">
                My Professional Journey
              </span>
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400 animate-pulse" />
            </motion.div>

            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              My{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Journey
              </span>
            </motion.h2>

            <motion.p
              className="text-lg sm:text-xl lg:text-2xl text-slate-300 max-w-4xl mx-auto font-light leading-relaxed px-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              From curious student to AI/ML engineer - here's my story of
              growth, learning, and innovation.
            </motion.p>
          </div>

          {/* Modern Tabs Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Tabs defaultValue="intro" className="space-y-8 sm:space-y-12">
              {/* Modern Tab Navigation */}
              <div className="flex justify-center px-2">
                <TabsList className="grid grid-cols-2 lg:grid-cols-4 bg-white/5 backdrop-blur-xl border border-white/10 p-1 sm:p-2 rounded-2xl shadow-2xl w-full max-w-md lg:max-w-none">
                  <TabsTrigger
                    value="intro"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-cyan-500/20 data-[state=active]:text-white data-[state=active]:backdrop-blur-xl data-[state=active]:border data-[state=active]:border-white/20 rounded-xl px-3 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-1 sm:gap-2 justify-center"
                  >
                    <User className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Introduction</span>
                    <span className="sm:hidden">Intro</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="experiences"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500/20 data-[state=active]:to-emerald-500/20 data-[state=active]:text-white data-[state=active]:backdrop-blur-xl data-[state=active]:border data-[state=active]:border-white/20 rounded-xl px-3 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-1 sm:gap-2 justify-center"
                  >
                    <Briefcase className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Experience</span>
                    <span className="sm:hidden">Work</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="educations"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/20 data-[state=active]:to-violet-500/20 data-[state=active]:text-white data-[state=active]:backdrop-blur-xl data-[state=active]:border data-[state=active]:border-white/20 rounded-xl px-3 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-1 sm:gap-2 justify-center"
                  >
                    <GraduationCap className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Education</span>
                    <span className="sm:hidden">Study</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="certifications"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500/20 data-[state=active]:to-pink-500/20 data-[state=active]:text-white data-[state=active]:backdrop-blur-xl data-[state=active]:border data-[state=active]:border-white/20 rounded-xl px-3 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-1 sm:gap-2 justify-center"
                  >
                    <Award className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Certifications</span>
                    <span className="sm:hidden">Certs</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Tab Contents */}
              <TabsContent value="intro" className="mt-8 sm:mt-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl overflow-hidden hover:bg-white/8 transition-all duration-500">
                    <CardContent className="p-6 sm:p-8 lg:p-12">
                      <div className="flex flex-col lg:flex-row items-start space-y-6 sm:space-y-8 lg:space-y-0 lg:space-x-8">
                        {/* Avatar Section */}
                        <motion.div
                          className="flex-shrink-0 mx-auto lg:mx-0"
                          whileHover={{ scale: 1.05, rotate: 2 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="relative">
                            <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10">
                              <img
                                src="/profil.jpeg"
                                alt="Zidan Mubarak"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  // Fallback jika gambar tidak ditemukan
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = "none";
                                  const parent = target.parentElement;
                                  if (parent) {
                                    parent.innerHTML = `
                                      <div class="w-full h-full bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 flex items-center justify-center text-white text-2xl sm:text-4xl lg:text-5xl font-bold">
                                        Z
                                      </div>
                                    `;
                                  }
                                }}
                              />
                            </div>
                            <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full border-2 sm:border-4 border-slate-900 animate-pulse shadow-lg"></div>
                            <div className="absolute -top-1 -left-1 sm:-top-2 sm:-left-2 w-4 h-4 sm:w-6 sm:h-6 bg-blue-400 rounded-full animate-bounce"></div>
                            <div className="absolute top-2 -right-2 sm:top-4 sm:-right-4 w-3 h-3 sm:w-4 sm:h-4 bg-pink-400 rounded-full animate-pulse"></div>
                          </div>
                        </motion.div>

                        {/* Content Section */}
                        <div className="flex-1 text-center lg:text-left">
                          <motion.h3
                            className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                          >
                            Hello, I'm{" "}
                            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                              Zidan!
                            </span>{" "}
                            <motion.span
                              animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 3,
                              }}
                              className="inline-block"
                            >
                              👋
                            </motion.span>
                          </motion.h3>

                          <div className="space-y-4 sm:space-y-6 text-slate-300 leading-relaxed text-base sm:text-lg">
                            <motion.p
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, delay: 0.3 }}
                            >
                              I'm a passionate AI/ML engineer and full-stack
                              developer based in Indonesia. My journey in
                              technology started with curiosity about how
                              machines can learn and make intelligent decisions,
                              which led me to specialize in artificial
                              intelligence and machine learning.
                            </motion.p>

                            <motion.p
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, delay: 0.4 }}
                            >
                              With expertise in Python, TensorFlow, PyTorch, and
                              modern web technologies, I build end-to-end
                              solutions that bridge the gap between complex AI
                              algorithms and user-friendly applications. I
                              believe in the power of technology to solve
                              real-world problems and make a positive impact.
                            </motion.p>

                            <motion.p
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, delay: 0.5 }}
                            >
                              When I'm not coding, you'll find me exploring the
                              latest research papers, contributing to
                              open-source projects, or sharing knowledge with
                              the developer community. I'm always excited to
                              collaborate on innovative projects that push the
                              boundaries of what's possible with AI.
                            </motion.p>

                            <motion.p
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, delay: 0.6 }}
                            >
                              My goal is to democratize AI technology and make
                              it accessible to everyone. Whether it's building
                              intelligent chatbots, computer vision
                              applications, or predictive models, I'm passionate
                              about creating solutions that make a difference.
                            </motion.p>
                          </div>

                          {/* Stats & Info */}
                          <motion.div
                            className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-6 lg:space-x-8 text-slate-400 text-sm sm:text-base"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                          >
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
                              <span>Indonesia</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 animate-pulse" />
                              <span>Available for projects</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Target className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />
                              <span>Remote Worldwide</span>
                            </div>
                          </motion.div>

                          {/* CTA Button */}
                          <motion.div
                            className="mt-8 sm:mt-10"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                          >
                            <Button
                              className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 hover:from-blue-600 hover:via-purple-700 hover:to-pink-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                              size="lg"
                            >
                              <Download className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                              Download CV
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="experiences" className="mt-8 sm:mt-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6 sm:space-y-8"
                >
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                      Professional{" "}
                      <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                        Experience
                      </span>
                    </h3>
                    <Badge className="bg-white/10 backdrop-blur-xl text-green-400 border border-white/20 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-sm sm:text-base w-fit">
                      <Briefcase className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      {experienceItems.length} positions
                    </Badge>
                  </div>

                  {/* Experience Items */}
                  {experienceItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2, duration: 0.6 }}
                    >
                      <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl overflow-hidden hover:bg-white/8 hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
                        <CardContent className="p-6 sm:p-8">
                          <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                            {/* Company Logo */}
                            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg mx-auto sm:mx-0">
                              <Building className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                            </div>

                            <div className="flex-1 min-w-0">
                              {/* Header */}
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 space-y-3 sm:space-y-0">
                                <div className="text-center sm:text-left">
                                  <h4 className="text-xl sm:text-2xl font-bold text-white mb-2">
                                    {item.position}
                                  </h4>
                                  <p className="text-blue-400 font-semibold text-base sm:text-lg">
                                    {item.company}
                                  </p>
                                </div>
                                <div className="flex flex-col items-center sm:items-end space-y-2 sm:space-y-3">
                                  <Badge
                                    className={`${
                                      item.current
                                        ? "bg-green-500/20 backdrop-blur-xl text-green-400 border border-green-500/30"
                                        : "bg-white/10 backdrop-blur-xl text-slate-300 border border-white/20"
                                    } px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm`}
                                  >
                                    {item.current
                                      ? "• Current"
                                      : "Former Position"}
                                  </Badge>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      toggleExpanded("experience", item.id)
                                    }
                                    className="text-slate-400 hover:text-white hover:bg-white/10 rounded-xl px-3 sm:px-4 py-1 sm:py-2 backdrop-blur-xl text-xs sm:text-sm"
                                  >
                                    {expandedExperience === item.id ? (
                                      <>
                                        Hide Details{" "}
                                        <ChevronUp className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                                      </>
                                    ) : (
                                      <>
                                        View Details{" "}
                                        <ChevronDown className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                                      </>
                                    )}
                                  </Button>
                                </div>
                              </div>

                              {/* Meta Information */}
                              <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-6 text-slate-400 mb-6 text-sm sm:text-base">
                                <div className="flex items-center justify-center sm:justify-start">
                                  <Calendar className="mr-2 h-3 w-3 sm:h-4 sm:w-4 text-blue-400" />
                                  {item.duration}
                                </div>
                                <div className="flex items-center justify-center sm:justify-start">
                                  <Clock className="mr-2 h-3 w-3 sm:h-4 sm:w-4 text-green-400" />
                                  {item.type}
                                </div>
                                <div className="flex items-center justify-center sm:justify-start">
                                  <MapPin className="mr-2 h-3 w-3 sm:h-4 sm:w-4 text-purple-400" />
                                  {item.location}
                                </div>
                              </div>

                              {/* Expanded Content */}
                              {expandedExperience === item.id && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="border-t border-white/10 pt-4 sm:pt-6"
                                >
                                  <h5 className="text-white font-semibold mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
                                    <Star className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
                                    Key Responsibilities
                                  </h5>
                                  <ul className="space-y-2 sm:space-y-3">
                                    {item.responsibilities.map(
                                      (responsibility, idx) => (
                                        <motion.li
                                          key={idx}
                                          className="flex items-start text-slate-300 text-sm sm:text-base"
                                          initial={{ opacity: 0, x: -20 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{ delay: idx * 0.1 }}
                                        >
                                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mt-2 mr-3 sm:mr-4 flex-shrink-0"></div>
                                          {responsibility}
                                        </motion.li>
                                      )
                                    )}
                                  </ul>
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>

              <TabsContent value="educations" className="mt-8 sm:mt-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6 sm:space-y-8"
                >
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                      Educational{" "}
                      <span className="bg-gradient-to-r from-purple-400 to-violet-500 bg-clip-text text-transparent">
                        Background
                      </span>
                    </h3>
                    <Badge className="bg-white/10 backdrop-blur-xl text-purple-400 border border-white/20 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-sm sm:text-base w-fit">
                      <GraduationCap className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      {educationItems.length} degrees
                    </Badge>
                  </div>

                  {/* Education Items */}
                  {educationItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2, duration: 0.6 }}
                    >
                      <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl overflow-hidden hover:bg-white/8 hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
                        <CardContent className="p-6 sm:p-8">
                          <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                            {/* Institution Logo */}
                            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg mx-auto sm:mx-0">
                              <School className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                            </div>

                            <div className="flex-1 min-w-0">
                              {/* Header */}
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 space-y-3 sm:space-y-0">
                                <div className="text-center sm:text-left">
                                  <h4 className="text-xl sm:text-2xl font-bold text-white mb-2">
                                    {item.degree}
                                  </h4>
                                  <p className="text-purple-400 font-semibold text-base sm:text-lg">
                                    {item.institution}
                                  </p>
                                </div>
                                <div className="flex flex-col items-center sm:items-end space-y-2 sm:space-y-3">
                                  <Badge className="bg-white/10 backdrop-blur-xl text-blue-400 border border-white/20 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm">
                                    {item.duration}
                                  </Badge>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      toggleExpanded("education", item.id)
                                    }
                                    className="text-slate-400 hover:text-white hover:bg-white/10 rounded-xl px-3 sm:px-4 py-1 sm:py-2 backdrop-blur-xl text-xs sm:text-sm"
                                  >
                                    {expandedEducation === item.id ? (
                                      <>
                                        Hide Achievements{" "}
                                        <ChevronUp className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                                      </>
                                    ) : (
                                      <>
                                        Show Achievements{" "}
                                        <ChevronDown className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                                      </>
                                    )}
                                  </Button>
                                </div>
                              </div>

                              {/* Location */}
                              <div className="flex items-center justify-center sm:justify-start text-slate-400 mb-6 text-sm sm:text-base">
                                <MapPin className="mr-2 h-3 w-3 sm:h-4 sm:w-4 text-purple-400" />
                                {item.location}
                              </div>

                              {/* Expanded Content */}
                              {expandedEducation === item.id && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="border-t border-white/10 pt-4 sm:pt-6"
                                >
                                  <h5 className="text-white font-semibold mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
                                    <Star className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
                                    Key Achievements
                                  </h5>
                                  <ul className="space-y-2 sm:space-y-3">
                                    {item.achievements.map(
                                      (achievement, idx) => (
                                        <motion.li
                                          key={idx}
                                          className="flex items-start text-slate-300 text-sm sm:text-base"
                                          initial={{ opacity: 0, x: -20 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{ delay: idx * 0.1 }}
                                        >
                                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mt-2 mr-3 sm:mr-4 flex-shrink-0"></div>
                                          {achievement}
                                        </motion.li>
                                      )
                                    )}
                                  </ul>
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>

              <TabsContent value="certifications" className="mt-8 sm:mt-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6 sm:space-y-8"
                >
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                      Certifications &{" "}
                      <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
                        Training
                      </span>
                    </h3>
                    <Button
                      variant="outline"
                      className="border-white/20 text-blue-400 hover:bg-white/10 rounded-full px-4 sm:px-6 py-2 sm:py-3 backdrop-blur-xl text-sm sm:text-base w-fit"
                      asChild
                    >
                      <a
                        href="https://www.linkedin.com/in/zidan-mubarak/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                        View on LinkedIn
                      </a>
                    </Button>
                  </div>

                  {/* LinkedIn CTA Card */}
                  <Card className="bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-blue-500/10 backdrop-blur-xl border border-blue-500/30 rounded-3xl mb-6 sm:mb-8">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                          <Award className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </div>
                        <div>
                          <p className="text-blue-400 font-semibold text-base sm:text-lg">
                            View All Certifications
                          </p>
                          <p className="text-slate-400 text-sm sm:text-base">
                            See my complete certification portfolio on LinkedIn
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Certification Items */}
                  {certificationItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2, duration: 0.6 }}
                    >
                      <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl overflow-hidden hover:bg-white/8 hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
                        <CardContent className="p-6 sm:p-8">
                          <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                            {/* Certification Logo */}
                            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center shadow-lg mx-auto sm:mx-0">
                              <Award className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                            </div>

                            <div className="flex-1 min-w-0">
                              {/* Header */}
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 space-y-3 sm:space-y-0">
                                <div className="text-center sm:text-left">
                                  <h4 className="text-xl sm:text-2xl font-bold text-white mb-2">
                                    {item.name}
                                  </h4>
                                  <p className="text-orange-400 font-semibold text-base sm:text-lg">
                                    {item.issuer}
                                  </p>
                                </div>
                                <div className="flex flex-col items-center sm:items-end space-y-2 sm:space-y-3">
                                  <Badge className="bg-white/10 backdrop-blur-xl text-orange-400 border border-white/20 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm">
                                    {item.date}
                                  </Badge>
                                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() =>
                                        toggleExpanded("certification", item.id)
                                      }
                                      className="text-slate-400 hover:text-white hover:bg-white/10 rounded-xl px-3 sm:px-4 py-1 sm:py-2 backdrop-blur-xl text-xs sm:text-sm"
                                    >
                                      {expandedCertification === item.id ? (
                                        <>
                                          Hide Skills{" "}
                                          <ChevronUp className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                                        </>
                                      ) : (
                                        <>
                                          Show Skills{" "}
                                          <ChevronDown className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                                        </>
                                      )}
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="border-white/20 text-orange-400 hover:bg-white/10 rounded-xl px-3 sm:px-4 py-1 sm:py-2 backdrop-blur-xl text-xs sm:text-sm"
                                      asChild
                                    >
                                      <a
                                        href={item.credentialUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <ExternalLink className="mr-1 sm:mr-2 h-3 w-3 sm:h-3 sm:w-3" />
                                        View Credential
                                      </a>
                                    </Button>
                                  </div>
                                </div>
                              </div>

                              {/* Expanded Content */}
                              {expandedCertification === item.id && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="border-t border-white/10 pt-4 sm:pt-6"
                                >
                                  <h5 className="text-white font-semibold mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
                                    <Star className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
                                    Skills Acquired
                                  </h5>
                                  <ul className="space-y-2 sm:space-y-3">
                                    {item.skills.map((skill, idx) => (
                                      <motion.li
                                        key={idx}
                                        className="flex items-start text-slate-300 text-sm sm:text-base"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                      >
                                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full mt-2 mr-3 sm:mr-4 flex-shrink-0"></div>
                                        {skill}
                                      </motion.li>
                                    ))}
                                  </ul>
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Support Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-16 sm:mt-20"
          >
            <Card className="bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-violet-500/10 backdrop-blur-xl border border-pink-500/30 shadow-2xl rounded-3xl overflow-hidden relative group">
              {/* Background gradient border effect */}
              <div
                className="absolute inset-0 rounded-3xl p-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(45deg, #ec4899, #8b5cf6, #a855f7)",
                }}
              ></div>
              <CardContent className="p-8 sm:p-12 text-center relative z-10 bg-slate-950 rounded-[calc(1.5rem-1px)]">
                <motion.div
                  whileHover={{ scale: 1.01 }} /* Reduced scale on hover */
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 flex items-center justify-center gap-3">
                    <Brain className="h-8 w-8 sm:h-10 sm:w-10 text-blue-400 flex-shrink-0 animate-pulse" />
                    <em className="bg-gradient-to-r from-pink-400 via-purple-500 to-violet-500 bg-clip-text text-transparent">
                      "Artificial intelligence is not a substitute for human
                      intelligence; it is a tool to amplify human creativity and
                      ingenuity."
                    </em>
                    <Sparkles className="h-8 w-8 sm:h-10 sm:w-10 text-yellow-400 flex-shrink-0 animate-pulse" />
                  </h3>
                  <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed px-4">
                    — Fei-Fei Li
                  </p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
