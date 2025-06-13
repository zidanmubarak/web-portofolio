"use client";

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
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Building,
  Clock,
  Users
} from 'lucide-react';
import { useState } from 'react';

const experienceItems = [
  {
    id: 1,
    company: "Copilot ID",
    logo: "🤖",
    position: "Founder",
    type: "Current",
    duration: "Jan 2023 - Present",
    workType: "Full-time",
    location: "Hybrid • Yogyakarta, Indonesia",
    description: "Living that AI life, building with Django, TensorFlow, PyTorch, and more—full-stack geek mode!",
    achievements: [
      "Built and deployed 15+ AI-powered web applications using Django and modern ML frameworks",
      "Developed custom neural networks from scratch achieving 95%+ accuracy on various datasets",
      "Led a team of 5 developers in creating scalable AI solutions for enterprise clients",
      "Implemented MLOps pipelines reducing model deployment time by 70%"
    ],
    skills: ["Python", "Django", "TensorFlow", "PyTorch", "React", "PostgreSQL"]
  },
  {
    id: 2,
    company: "IKA-PPIM 2021",
    logo: "🎓",
    position: "Chief Secretary",
    type: "Current",
    duration: "Sep 2021 - Present",
    workType: "Part-time",
    location: "Remote • Surakarta, Indonesia",
    description: "Managing organizational operations and coordinating between different departments for alumni association activities.",
    achievements: [
      "Streamlined communication processes improving efficiency by 40%",
      "Organized 10+ virtual events with 500+ participants each",
      "Implemented digital documentation system reducing paperwork by 80%"
    ],
    skills: ["Leadership", "Project Management", "Communication", "Event Planning"]
  }
];

const educationItems = [
  {
    id: 1,
    institution: "Universitas Teknologi Yogyakarta",
    logo: "🏛️",
    degree: "Informatics in Intelligence Systems (S.Kom.)",
    duration: "Sep 2021 - Aug 2025",
    location: "Sleman, Special Region of Yogyakarta",
    description: "Specialized in Artificial Intelligence and Machine Learning with focus on intelligent systems development.",
    achievements: [
      "Got down with algorithms and object-oriented coding—nailed the basics!",
      "Built slick web in hands-on courses.",
      "Dived into Big Data and analytics—crunching numbers like a pro.",
      "Leveled up with Machine Learning and played with AR tech.",
      "Mastered data structures, algorithms, and neural nets—brainy stuff!"
    ],
    gpa: "3.8/4.0",
    relevantCourses: ["Machine Learning", "Deep Learning", "Data Structures", "Algorithms", "Web Development", "Database Systems"]
  },
  {
    id: 2,
    institution: "MAS Al Mukmin Ngruki",
    logo: "🎓",
    degree: "Senior High School (Natural Science)",
    duration: "2018 - 2021",
    location: "Surakarta, Central Java",
    description: "Focused on Mathematics and Natural Sciences with strong foundation in analytical thinking.",
    achievements: [
      "Graduated with honors in Mathematics and Physics",
      "Active member of Computer Club and Science Olympiad team",
      "Led school programming competition team to regional finals"
    ],
    gpa: "3.9/4.0"
  }
];

const certificationItems = [
  {
    id: 1,
    title: "Crafting Slick REST APIs with Django",
    issuer: "LinkedIn Learning",
    logo: "💼",
    date: "Dec 2024",
    credentialId: "ABC123XYZ",
    description: "Comprehensive course on building professional REST APIs using Django REST Framework.",
    achievements: [
      "Built REST APIs with Django REST Framework like a pro, following best practices",
      "Nailed serializers, filtering, pagination, and router setups",
      "Deployed secure APIs with full authentication and authorization"
    ],
    skills: ["Django", "REST API", "Python", "Authentication", "API Design"],
    credentialUrl: "https://linkedin.com/learning/certificates/abc123"
  },
  {
    id: 2,
    title: "Applied Machine Learning",
    issuer: "Dicoding Indonesia",
    logo: "🎯",
    date: "Dec 2024",
    credentialId: "DICODING-ML-2024",
    description: "Advanced machine learning course covering practical implementation of ML algorithms and deployment strategies.",
    achievements: [
      "Implemented various ML algorithms from scratch using Python",
      "Built end-to-end ML pipelines with data preprocessing and model evaluation",
      "Deployed ML models to production using cloud platforms"
    ],
    skills: ["Machine Learning", "Python", "TensorFlow", "Model Deployment", "Data Science"],
    credentialUrl: "https://dicoding.com/certificates/xyz789"
  },
  {
    id: 3,
    title: "AWS Machine Learning Specialty",
    issuer: "Amazon Web Services",
    logo: "☁️",
    date: "Nov 2024",
    credentialId: "AWS-MLS-2024-001",
    description: "Professional certification demonstrating expertise in building, training, and deploying ML models on AWS.",
    achievements: [
      "Mastered AWS ML services including SageMaker, Rekognition, and Comprehend",
      "Implemented scalable ML solutions using AWS infrastructure",
      "Optimized ML workflows for cost-effectiveness and performance"
    ],
    skills: ["AWS", "SageMaker", "Cloud ML", "MLOps", "Scalable Systems"],
    credentialUrl: "https://aws.amazon.com/verification/abc123"
  }
];

export function AboutSection() {
  const [expandedItems, setExpandedItems] = useState<{[key: string]: boolean}>({});

  const toggleExpanded = (type: string, id: number) => {
    const key = `${type}-${id}`;
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <div className="min-h-screen py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              My <span className="gradient-text">Journey</span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto">
              From curious student to AI/ML engineer - here's my story of growth, learning, and innovation.
            </p>
          </div>

          <Tabs defaultValue="intro" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-slate-900/50 border border-slate-700 p-1 rounded-xl">
              <TabsTrigger value="intro" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm">
                Introduction
              </TabsTrigger>
              <TabsTrigger value="experiences" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm">
                Experience
              </TabsTrigger>
              <TabsTrigger value="educations" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm">
                Education
              </TabsTrigger>
              <TabsTrigger value="certifications" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm">
                Certifications
              </TabsTrigger>
            </TabsList>

            <TabsContent value="intro">
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm shadow-xl">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex flex-col lg:flex-row items-start space-y-6 lg:space-y-0 lg:space-x-6">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-lg mx-auto lg:mx-0 flex-shrink-0">
                      Z
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl sm:text-3xl font-bold gradient-text mb-4 sm:mb-6 text-center lg:text-left">Hello, I'm Zidan! 👋</h3>
                      <div className="space-y-4 sm:space-y-6 text-slate-300 leading-relaxed text-base sm:text-lg">
                        <p>
                          I'm a passionate AI/ML engineer and full-stack developer based in Indonesia. My journey in technology 
                          started with curiosity about how machines can learn and make intelligent decisions, which led me to 
                          specialize in artificial intelligence and machine learning.
                        </p>
                        <p>
                          With expertise in Python, TensorFlow, PyTorch, and modern web technologies, I build end-to-end 
                          solutions that bridge the gap between complex AI algorithms and user-friendly applications. 
                          I believe in the power of technology to solve real-world problems and make a positive impact.
                        </p>
                        <p>
                          When I'm not coding, you'll find me exploring the latest research papers, contributing to open-source 
                          projects, or sharing knowledge with the developer community. I'm always excited to collaborate on 
                          innovative projects that push the boundaries of what's possible with AI.
                        </p>
                        <p>
                          My goal is to democratize AI technology and make it accessible to everyone. Whether it's building 
                          intelligent chatbots, computer vision applications, or predictive models, I'm passionate about 
                          creating solutions that make a difference.
                        </p>
                      </div>
                      
                      <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 text-sm sm:text-lg text-slate-400">
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-4 sm:h-5 w-4 sm:w-5 text-blue-400" />
                          Indonesia
                        </div>
                        <div className="flex items-center">
                          <Zap className="mr-2 h-4 sm:h-5 w-4 sm:w-5 text-green-400" />
                          Available for projects
                        </div>
                      </div>

                      <div className="mt-6 sm:mt-8">
                        <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
                          <Download className="mr-2 h-4 w-4" />
                          Download CV
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experiences">
              <motion.div 
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">Professional Experience</h3>
                {experienceItems.map((item) => {
                  const isExpanded = expandedItems[`experience-${item.id}`];
                  return (
                    <motion.div key={item.id} variants={itemVariants}>
                      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/50 transition-all duration-300 shadow-xl">
                        <CardContent className="p-6 sm:p-8">
                          <div className="flex items-start space-x-4 sm:space-x-6">
                            {/* Company Logo */}
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-800 rounded-xl flex items-center justify-center text-2xl sm:text-3xl flex-shrink-0 shadow-lg">
                              {item.logo}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              {/* Header */}
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                                <div>
                                  <h4 className="text-xl sm:text-2xl font-bold text-white mb-1">{item.position}</h4>
                                  <p className="text-lg text-blue-400 font-medium mb-2">{item.company}</p>
                                </div>
                                <div className="flex flex-col sm:items-end space-y-2">
                                  <Badge 
                                    variant="secondary" 
                                    className={`text-sm px-3 py-1 ${
                                      item.type === 'Current' 
                                        ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                                        : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                                    }`}
                                  >
                                    • {item.type}
                                  </Badge>
                                </div>
                              </div>

                              {/* Meta Information */}
                              <div className="flex flex-wrap gap-4 text-sm text-slate-400 mb-4">
                                <div className="flex items-center">
                                  <Calendar className="mr-2 h-4 w-4" />
                                  {item.duration}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="mr-2 h-4 w-4" />
                                  {item.workType}
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="mr-2 h-4 w-4" />
                                  {item.location}
                                </div>
                              </div>

                              {/* Description */}
                              <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-4">
                                {item.description}
                              </p>

                              {/* Skills */}
                              <div className="flex flex-wrap gap-2 mb-4">
                                {item.skills.map((skill) => (
                                  <Badge key={skill} variant="outline" className="text-xs bg-slate-800/50 text-slate-300 border-slate-600">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>

                              {/* Expandable Achievements */}
                              <div className="border-t border-slate-700/50 pt-4">
                                <Button
                                  variant="ghost"
                                  onClick={() => toggleExpanded('experience', item.id)}
                                  className="text-blue-400 hover:text-blue-300 p-0 h-auto font-medium"
                                >
                                  {isExpanded ? 'Hide Achievements' : 'Show Achievements'}
                                  {isExpanded ? (
                                    <ChevronUp className="ml-2 h-4 w-4" />
                                  ) : (
                                    <ChevronDown className="ml-2 h-4 w-4" />
                                  )}
                                </Button>

                                {isExpanded && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-4 space-y-2"
                                  >
                                    {item.achievements.map((achievement, index) => (
                                      <div key={index} className="flex items-start space-x-3">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                                        <p className="text-slate-300 text-sm sm:text-base">{achievement}</p>
                                      </div>
                                    ))}
                                  </motion.div>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
            </TabsContent>

            <TabsContent value="educations">
              <motion.div 
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">Educational Background</h3>
                {educationItems.map((item) => {
                  const isExpanded = expandedItems[`education-${item.id}`];
                  return (
                    <motion.div key={item.id} variants={itemVariants}>
                      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/50 transition-all duration-300 shadow-xl">
                        <CardContent className="p-6 sm:p-8">
                          <div className="flex items-start space-x-4 sm:space-x-6">
                            {/* Institution Logo */}
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-800 rounded-xl flex items-center justify-center text-2xl sm:text-3xl flex-shrink-0 shadow-lg">
                              {item.logo}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              {/* Header */}
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                                <div>
                                  <h4 className="text-xl sm:text-2xl font-bold text-white mb-1">{item.degree}</h4>
                                  <p className="text-lg text-blue-400 font-medium mb-2">{item.institution}</p>
                                </div>
                                <Badge variant="secondary" className="text-sm px-3 py-1 bg-blue-500/20 text-blue-400 border-blue-500/30 w-fit">
                                  {item.duration}
                                </Badge>
                              </div>

                              {/* Meta Information */}
                              <div className="flex flex-wrap gap-4 text-sm text-slate-400 mb-4">
                                <div className="flex items-center">
                                  <MapPin className="mr-2 h-4 w-4" />
                                  {item.location}
                                </div>
                                {item.gpa && (
                                  <div className="flex items-center">
                                    <Award className="mr-2 h-4 w-4" />
                                    GPA: {item.gpa}
                                  </div>
                                )}
                              </div>

                              {/* Description */}
                              <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-4">
                                {item.description}
                              </p>

                              {/* Expandable Achievements */}
                              <div className="border-t border-slate-700/50 pt-4">
                                <Button
                                  variant="ghost"
                                  onClick={() => toggleExpanded('education', item.id)}
                                  className="text-blue-400 hover:text-blue-300 p-0 h-auto font-medium"
                                >
                                  {isExpanded ? 'Hide Achievements' : 'Show Achievements'}
                                  {isExpanded ? (
                                    <ChevronUp className="ml-2 h-4 w-4" />
                                  ) : (
                                    <ChevronDown className="ml-2 h-4 w-4" />
                                  )}
                                </Button>

                                {isExpanded && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-4 space-y-2"
                                  >
                                    {item.achievements.map((achievement, index) => (
                                      <div key={index} className="flex items-start space-x-3">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                                        <p className="text-slate-300 text-sm sm:text-base">{achievement}</p>
                                      </div>
                                    ))}
                                  </motion.div>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
            </TabsContent>

            <TabsContent value="certifications">
              <motion.div 
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">Certifications & Training</h3>
                  <Button
                    variant="outline"
                    className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
                    asChild
                  >
                    <a href="https://linkedin.com/in/zidanmubarak" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View on LinkedIn
                    </a>
                  </Button>
                </div>

                {certificationItems.map((item) => {
                  const isExpanded = expandedItems[`certification-${item.id}`];
                  return (
                    <motion.div key={item.id} variants={itemVariants}>
                      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/50 transition-all duration-300 shadow-xl">
                        <CardContent className="p-6 sm:p-8">
                          <div className="flex items-start space-x-4 sm:space-x-6">
                            {/* Issuer Logo */}
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-800 rounded-xl flex items-center justify-center text-2xl sm:text-3xl flex-shrink-0 shadow-lg">
                              {item.logo}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              {/* Header */}
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                                <div>
                                  <h4 className="text-xl sm:text-2xl font-bold text-white mb-1">{item.title}</h4>
                                  <p className="text-lg text-blue-400 font-medium mb-2">{item.issuer}</p>
                                </div>
                                <Badge variant="secondary" className="text-sm px-3 py-1 bg-green-500/20 text-green-400 border-green-500/30 w-fit">
                                  {item.date}
                                </Badge>
                              </div>

                              {/* Meta Information */}
                              <div className="flex flex-wrap gap-4 text-sm text-slate-400 mb-4">
                                <div className="flex items-center">
                                  <Award className="mr-2 h-4 w-4" />
                                  ID: {item.credentialId}
                                </div>
                              </div>

                              {/* Description */}
                              <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-4">
                                {item.description}
                              </p>

                              {/* Skills */}
                              <div className="flex flex-wrap gap-2 mb-4">
                                {item.skills.map((skill) => (
                                  <Badge key={skill} variant="outline" className="text-xs bg-slate-800/50 text-slate-300 border-slate-600">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>

                              {/* Actions and Expandable Content */}
                              <div className="border-t border-slate-700/50 pt-4 space-y-4">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                  <Button
                                    variant="ghost"
                                    onClick={() => toggleExpanded('certification', item.id)}
                                    className="text-blue-400 hover:text-blue-300 p-0 h-auto font-medium"
                                  >
                                    {isExpanded ? 'Hide Achievements' : 'Show Achievements'}
                                    {isExpanded ? (
                                      <ChevronUp className="ml-2 h-4 w-4" />
                                    ) : (
                                      <ChevronDown className="ml-2 h-4 w-4" />
                                    )}
                                  </Button>
                                  
                                  <Button
                                    size="sm"
                                    className="bg-blue-600 hover:bg-blue-700"
                                    asChild
                                  >
                                    <a href={item.credentialUrl} target="_blank" rel="noopener noreferrer">
                                      <ExternalLink className="mr-2 h-3 w-3" />
                                      View Credential
                                    </a>
                                  </Button>
                                </div>

                                {isExpanded && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-2"
                                  >
                                    {item.achievements.map((achievement, index) => (
                                      <div key={index} className="flex items-start space-x-3">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                                        <p className="text-slate-300 text-sm sm:text-base">{achievement}</p>
                                      </div>
                                    ))}
                                  </motion.div>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
            </TabsContent>
          </Tabs>

          {/* Support Section */}
          <Card className="mt-12 sm:mt-16 bg-gradient-to-r from-pink-500/20 to-violet-500/20 border-pink-500/30 backdrop-blur-sm shadow-xl">
            <CardContent className="p-8 sm:p-10 text-center">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Support My Work</h3>
              <p className="text-slate-300 mb-6 sm:mb-8 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                Help me continue creating innovative AI solutions and sharing knowledge with the developer community!
              </p>
              <Button 
                className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                asChild
              >
                <a href="https://github.com/sponsors/zidanmubarak" target="_blank" rel="noopener noreferrer">
                  <Coffee className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
                  Sponsor My Work
                </a>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}