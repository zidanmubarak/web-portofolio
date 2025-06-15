"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Sparkles
} from 'lucide-react';

const experienceItems = [
  {
    id: 1,
    company: "Copilot ID",
    logo: "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=100",
    position: "Founder",
    duration: "Jan 2023 - Present",
    type: "Full-time",
    location: "Hybrid • Yogyakarta, Indonesia",
    current: true,
    responsibilities: [
      "Living that AI life, building with Django, TensorFlow, PyTorch, and more—full-stack geek mode!",
      "Leading a team of developers in creating innovative AI solutions",
      "Architecting scalable machine learning systems for production environments"
    ]
  },
  {
    id: 2,
    company: "IKA-PPIM 2021",
    logo: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100",
    position: "Chief Secretary",
    duration: "Sep 2021 - Present",
    type: "Part-time",
    location: "Remote • Surakarta, Indonesia",
    current: true,
    responsibilities: [
      "Managing organizational documentation and communications",
      "Coordinating between different departments and stakeholders",
      "Organizing events and meetings for the alumni association"
    ]
  }
];

const educationItems = [
  {
    id: 1,
    institution: "Universitas Teknologi Yogyakarta",
    logo: "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=100",
    degree: "Informatics in Intelligence Systems (S.Kom.)",
    duration: "Sep 2021 - Aug 2025",
    location: "Sleman, Special Region of Yogyakarta",
    achievements: [
      "Got down with algorithms and object-oriented coding—nailed the basics!",
      "Built slick web in hands-on courses.",
      "Dived into Big Data and analytics—crunching numbers like a pro.",
      "Leveled up with Machine Learning and played with AR tech.",
      "Mastered data structures, algorithms, and neural nets—brainy stuff!"
    ]
  },
  {
    id: 2,
    institution: "MAS Al Mukmin Ngruki",
    logo: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=100",
    degree: "Senior High School (Natural Science)",
    duration: "2018 - 2021",
    location: "Surakarta, Central Java",
    achievements: [
      "Focused on Mathematics, Physics, Chemistry, and Biology",
      "Developed strong analytical and problem-solving skills",
      "Participated in science competitions and research projects"
    ]
  }
];

const certificationItems = [
  {
    id: 1,
    name: "Crafting Slick REST APIs with Django",
    issuer: "LinkedIn Learning",
    logo: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=100",
    date: "Dec 2024",
    credentialUrl: "#",
    skills: [
      "Built REST APIs with Django REST Framework like a pro, following best practices",
      "Nailed serializers, filtering, pagination, and router setups",
      "Deployed secure APIs with full authentication and authorization"
    ]
  },
  {
    id: 2,
    name: "Applied Machine Learning",
    issuer: "Dicoding Indonesia",
    logo: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=100",
    date: "Dec 2024",
    credentialUrl: "#",
    skills: [
      "Implemented advanced machine learning algorithms",
      "Built end-to-end ML pipelines from data preprocessing to deployment",
      "Optimized model performance using various techniques"
    ]
  }
];

export function AboutSection() {
  const [expandedExperience, setExpandedExperience] = useState<number | null>(null);
  const [expandedEducation, setExpandedEducation] = useState<number | null>(null);
  const [expandedCertification, setExpandedCertification] = useState<number | null>(null);

  const toggleExpanded = (type: 'experience' | 'education' | 'certification', id: number) => {
    if (type === 'experience') {
      setExpandedExperience(expandedExperience === id ? null : id);
    } else if (type === 'education') {
      setExpandedEducation(expandedEducation === id ? null : id);
    } else {
      setExpandedCertification(expandedCertification === id ? null : id);
    }
  };

  return (
    <div className="min-h-screen py-16 sm:py-20 lg:py-24 relative overflow-hidden">
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
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-lg border border-blue-500/20 rounded-full px-6 py-3 mb-8"
            >
              <Sparkles className="h-5 w-5 text-blue-400 animate-pulse" />
              <span className="text-blue-400 font-medium">My Professional Journey</span>
              <Sparkles className="h-5 w-5 text-purple-400 animate-pulse" />
            </motion.div>

            <motion.h2 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
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
              className="text-xl sm:text-2xl text-slate-300 max-w-4xl mx-auto font-light leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              From curious student to AI/ML engineer - here's my story of growth, learning, and innovation.
            </motion.p>
          </div>

          {/* Modern Tabs Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Tabs defaultValue="intro" className="space-y-12">
              {/* Modern Tab Navigation */}
              <div className="flex justify-center">
                <TabsList className="grid grid-cols-2 lg:grid-cols-4 bg-gradient-to-r from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 p-2 rounded-2xl shadow-2xl min-w-fit">
                  <TabsTrigger 
                    value="intro" 
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white rounded-xl px-6 py-3 text-sm font-medium transition-all duration-300 flex items-center gap-2 min-w-[120px] justify-center"
                  >
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">Introduction</span>
                    <span className="sm:hidden">Intro</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="experiences" 
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white rounded-xl px-6 py-3 text-sm font-medium transition-all duration-300 flex items-center gap-2 min-w-[120px] justify-center"
                  >
                    <Briefcase className="h-4 w-4" />
                    <span className="hidden sm:inline">Experience</span>
                    <span className="sm:hidden">Work</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="educations" 
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-violet-500 data-[state=active]:text-white rounded-xl px-6 py-3 text-sm font-medium transition-all duration-300 flex items-center gap-2 min-w-[120px] justify-center"
                  >
                    <GraduationCap className="h-4 w-4" />
                    <span className="hidden sm:inline">Education</span>
                    <span className="sm:hidden">Study</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="certifications" 
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-xl px-6 py-3 text-sm font-medium transition-all duration-300 flex items-center gap-2 min-w-[120px] justify-center"
                  >
                    <Award className="h-4 w-4" />
                    <span className="hidden sm:inline">Certifications</span>
                    <span className="sm:hidden">Certs</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Tab Contents */}
              <TabsContent value="intro" className="mt-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="bg-gradient-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 border border-slate-700/50 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden">
                    <CardContent className="p-8 sm:p-12">
                      <div className="flex flex-col lg:flex-row items-start space-y-8 lg:space-y-0 lg:space-x-8">
                        {/* Avatar Section */}
                        <motion.div 
                          className="flex-shrink-0 mx-auto lg:mx-0"
                          whileHover={{ scale: 1.05, rotate: 2 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="relative">
                            <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-3xl flex items-center justify-center text-white text-4xl sm:text-5xl font-bold shadow-2xl">
                              Z
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-slate-900 animate-pulse shadow-lg"></div>
                            <div className="absolute -top-2 -left-2 w-6 h-6 bg-blue-400 rounded-full animate-bounce"></div>
                            <div className="absolute top-4 -right-4 w-4 h-4 bg-pink-400 rounded-full animate-pulse"></div>
                          </div>
                        </motion.div>

                        {/* Content Section */}
                        <div className="flex-1 text-center lg:text-left">
                          <motion.h3 
                            className="text-3xl sm:text-4xl font-bold mb-6"
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
                              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                              className="inline-block"
                            >
                              👋
                            </motion.span>
                          </motion.h3>
                          
                          <div className="space-y-6 text-slate-300 leading-relaxed text-lg">
                            <motion.p
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, delay: 0.3 }}
                            >
                              I'm a passionate AI/ML engineer and full-stack developer based in Indonesia. My journey in technology 
                              started with curiosity about how machines can learn and make intelligent decisions, which led me to 
                              specialize in artificial intelligence and machine learning.
                            </motion.p>
                            
                            <motion.p
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, delay: 0.4 }}
                            >
                              With expertise in Python, TensorFlow, PyTorch, and modern web technologies, I build end-to-end 
                              solutions that bridge the gap between complex AI algorithms and user-friendly applications. 
                              I believe in the power of technology to solve real-world problems and make a positive impact.
                            </motion.p>
                            
                            <motion.p
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, delay: 0.5 }}
                            >
                              When I'm not coding, you'll find me exploring the latest research papers, contributing to open-source 
                              projects, or sharing knowledge with the developer community. I'm always excited to collaborate on 
                              innovative projects that push the boundaries of what's possible with AI.
                            </motion.p>
                            
                            <motion.p
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, delay: 0.6 }}
                            >
                              My goal is to democratize AI technology and make it accessible to everyone. Whether it's building 
                              intelligent chatbots, computer vision applications, or predictive models, I'm passionate about 
                              creating solutions that make a difference.
                            </motion.p>
                          </div>
                          
                          {/* Stats & Info */}
                          <motion.div 
                            className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-8 text-slate-400"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                          >
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-5 w-5 text-blue-400" />
                              <span>Indonesia</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Zap className="h-5 w-5 text-green-400 animate-pulse" />
                              <span>Available for projects</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Target className="h-5 w-5 text-purple-400" />
                              <span>Remote Worldwide</span>
                            </div>
                          </motion.div>

                          {/* CTA Button */}
                          <motion.div 
                            className="mt-10"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                          >
                            <Button 
                              className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 hover:from-blue-600 hover:via-purple-700 hover:to-pink-600 text-white px-8 py-4 text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
                              size="lg"
                            >
                              <Download className="mr-2 h-5 w-5" />
                              Download CV
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="experiences" className="mt-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-8"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-3xl sm:text-4xl font-bold text-white">
                      Professional{" "}
                      <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                        Experience
                      </span>
                    </h3>
                    <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border-green-500/30 px-4 py-2 rounded-full">
                      <Briefcase className="mr-2 h-4 w-4" />
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
                      <Card className="bg-gradient-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 border border-slate-700/50 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
                        <CardContent className="p-8">
                          <div className="flex items-start space-x-6">
                            {/* Company Logo */}
                            <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                              <Building className="h-8 w-8 text-white" />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              {/* Header */}
                              <div className="flex items-start justify-between mb-4">
                                <div>
                                  <h4 className="text-2xl font-bold text-white mb-2">{item.position}</h4>
                                  <p className="text-blue-400 font-semibold text-lg">{item.company}</p>
                                </div>
                                <div className="flex flex-col items-end space-y-3">
                                  <Badge 
                                    className={`${item.current ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border-green-500/30' : 'bg-slate-700/50 text-slate-300 border-slate-600/50'} px-4 py-2 rounded-full`}
                                  >
                                    {item.current ? '• Current Position' : 'Former Position'}
                                  </Badge>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => toggleExpanded('experience', item.id)}
                                    className="text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-xl px-4 py-2"
                                  >
                                    {expandedExperience === item.id ? (
                                      <>Hide Details <ChevronUp className="ml-2 h-4 w-4" /></>
                                    ) : (
                                      <>View Details <ChevronDown className="ml-2 h-4 w-4" /></>
                                    )}
                                  </Button>
                                </div>
                              </div>
                              
                              {/* Meta Information */}
                              <div className="flex flex-wrap items-center gap-6 text-slate-400 mb-6">
                                <div className="flex items-center">
                                  <Calendar className="mr-2 h-4 w-4 text-blue-400" />
                                  {item.duration}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="mr-2 h-4 w-4 text-green-400" />
                                  {item.type}
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="mr-2 h-4 w-4 text-purple-400" />
                                  {item.location}
                                </div>
                              </div>

                              {/* Expanded Content */}
                              {expandedExperience === item.id && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="border-t border-slate-700/50 pt-6"
                                >
                                  <h5 className="text-white font-semibold mb-4 flex items-center">
                                    <Star className="mr-2 h-5 w-5 text-yellow-400" />
                                    Key Responsibilities
                                  </h5>
                                  <ul className="space-y-3">
                                    {item.responsibilities.map((responsibility, idx) => (
                                      <motion.li 
                                        key={idx} 
                                        className="flex items-start text-slate-300"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                      >
                                        <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                                        {responsibility}
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

              <TabsContent value="educations" className="mt-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-8"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-3xl sm:text-4xl font-bold text-white">
                      Educational{" "}
                      <span className="bg-gradient-to-r from-purple-400 to-violet-500 bg-clip-text text-transparent">
                        Background
                      </span>
                    </h3>
                    <Badge className="bg-gradient-to-r from-purple-500/20 to-violet-500/20 text-purple-400 border-purple-500/30 px-4 py-2 rounded-full">
                      <GraduationCap className="mr-2 h-4 w-4" />
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
                      <Card className="bg-gradient-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 border border-slate-700/50 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
                        <CardContent className="p-8">
                          <div className="flex items-start space-x-6">
                            {/* Institution Logo */}
                            <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                              <School className="h-8 w-8 text-white" />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              {/* Header */}
                              <div className="flex items-start justify-between mb-4">
                                <div>
                                  <h4 className="text-2xl font-bold text-white mb-2">{item.degree}</h4>
                                  <p className="text-purple-400 font-semibold text-lg">{item.institution}</p>
                                </div>
                                <div className="flex flex-col items-end space-y-3">
                                  <Badge className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 border-blue-500/30 px-4 py-2 rounded-full">
                                    {item.duration}
                                  </Badge>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => toggleExpanded('education', item.id)}
                                    className="text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-xl px-4 py-2"
                                  >
                                    {expandedEducation === item.id ? (
                                      <>Hide Achievements <ChevronUp className="ml-2 h-4 w-4" /></>
                                    ) : (
                                      <>Show Achievements <ChevronDown className="ml-2 h-4 w-4" /></>
                                    )}
                                  </Button>
                                </div>
                              </div>
                              
                              {/* Location */}
                              <div className="flex items-center text-slate-400 mb-6">
                                <MapPin className="mr-2 h-4 w-4 text-purple-400" />
                                {item.location}
                              </div>

                              {/* Expanded Content */}
                              {expandedEducation === item.id && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="border-t border-slate-700/50 pt-6"
                                >
                                  <h5 className="text-white font-semibold mb-4 flex items-center">
                                    <Star className="mr-2 h-5 w-5 text-yellow-400" />
                                    Key Achievements
                                  </h5>
                                  <ul className="space-y-3">
                                    {item.achievements.map((achievement, idx) => (
                                      <motion.li 
                                        key={idx} 
                                        className="flex items-start text-slate-300"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                      >
                                        <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                                        {achievement}
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

              <TabsContent value="certifications" className="mt-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-8"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-3xl sm:text-4xl font-bold text-white">
                      Certifications &{" "}
                      <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
                        Training
                      </span>
                    </h3>
                    <Button 
                      variant="outline" 
                      className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10 rounded-full px-6 py-3"
                      asChild
                    >
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View on LinkedIn
                      </a>
                    </Button>
                  </div>

                  {/* LinkedIn CTA Card */}
                  <Card className="bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-blue-500/10 border border-blue-500/30 backdrop-blur-xl rounded-3xl mb-8">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                          <Award className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="text-blue-400 font-semibold text-lg">View All Certifications</p>
                          <p className="text-slate-400">See my complete certification portfolio on LinkedIn</p>
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
                      <Card className="bg-gradient-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 border border-slate-700/50 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
                        <CardContent className="p-8">
                          <div className="flex items-start space-x-6">
                            {/* Certification Logo */}
                            <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center shadow-lg">
                              <Award className="h-8 w-8 text-white" />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              {/* Header */}
                              <div className="flex items-start justify-between mb-4">
                                <div>
                                  <h4 className="text-2xl font-bold text-white mb-2">{item.name}</h4>
                                  <p className="text-orange-400 font-semibold text-lg">{item.issuer}</p>
                                </div>
                                <div className="flex flex-col items-end space-y-3">
                                  <Badge className="bg-gradient-to-r from-orange-500/20 to-pink-500/20 text-orange-400 border-orange-500/30 px-4 py-2 rounded-full">
                                    {item.date}
                                  </Badge>
                                  <div className="flex space-x-2">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => toggleExpanded('certification', item.id)}
                                      className="text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-xl px-4 py-2"
                                    >
                                      {expandedCertification === item.id ? (
                                        <>Hide Skills <ChevronUp className="ml-2 h-4 w-4" /></>
                                      ) : (
                                        <>Show Skills <ChevronDown className="ml-2 h-4 w-4" /></>
                                      )}
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10 rounded-xl px-4 py-2"
                                      asChild
                                    >
                                      <a href={item.credentialUrl} target="_blank" rel="noopener noreferrer">
                                        <ExternalLink className="mr-2 h-3 w-3" />
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
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="border-t border-slate-700/50 pt-6"
                                >
                                  <h5 className="text-white font-semibold mb-4 flex items-center">
                                    <Star className="mr-2 h-5 w-5 text-yellow-400" />
                                    Skills Acquired
                                  </h5>
                                  <ul className="space-y-3">
                                    {item.skills.map((skill, idx) => (
                                      <motion.li 
                                        key={idx} 
                                        className="flex items-start text-slate-300"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                      >
                                        <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
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
            className="mt-20"
          >
            <Card className="bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-violet-500/10 border border-pink-500/30 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden">
              <CardContent className="p-12 text-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                    Support My{" "}
                    <span className="bg-gradient-to-r from-pink-400 via-purple-500 to-violet-500 bg-clip-text text-transparent">
                      Work
                    </span>
                  </h3>
                  <p className="text-slate-300 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                    Help me continue creating innovative AI solutions and sharing knowledge with the developer community!
                  </p>
                  <Button 
                    className="bg-gradient-to-r from-pink-500 via-purple-600 to-violet-500 hover:from-pink-600 hover:via-purple-700 hover:to-violet-600 text-white px-12 py-4 text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
                    size="lg"
                    asChild
                  >
                    <a href="https://github.com/sponsors/zidanmubarak" target="_blank" rel="noopener noreferrer">
                      <Coffee className="mr-3 h-6 w-6" />
                      Sponsor My Work
                    </a>
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}