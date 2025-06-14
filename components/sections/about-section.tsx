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
  School
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
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">Professional Experience</h3>
                  <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                    <Briefcase className="mr-2 h-4 w-4" />
                    {experienceItems.length} positions
                  </Badge>
                </div>

                {experienceItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/50 transition-all duration-300 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-slate-800 flex items-center justify-center">
                            <Building className="h-6 w-6 text-blue-400" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="text-xl font-bold text-white mb-1">{item.position}</h4>
                                <p className="text-blue-400 font-medium">{item.company}</p>
                              </div>
                              <div className="flex flex-col items-end space-y-2">
                                <Badge 
                                  variant="secondary" 
                                  className={`${item.current ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-slate-700/50 text-slate-300'}`}
                                >
                                  {item.current ? '• Current' : item.duration.split(' - ')[1]}
                                </Badge>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleExpanded('experience', item.id)}
                                  className="text-slate-400 hover:text-white p-1"
                                >
                                  {expandedExperience === item.id ? (
                                    <>Hide Details <ChevronUp className="ml-1 h-4 w-4" /></>
                                  ) : (
                                    <>View Details <ChevronDown className="ml-1 h-4 w-4" /></>
                                  )}
                                </Button>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-4">
                              <div className="flex items-center">
                                <Calendar className="mr-1 h-4 w-4" />
                                {item.duration}
                              </div>
                              <div className="flex items-center">
                                <Clock className="mr-1 h-4 w-4" />
                                {item.type}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="mr-1 h-4 w-4" />
                                {item.location}
                              </div>
                            </div>

                            {expandedExperience === item.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="border-t border-slate-700 pt-4"
                              >
                                <h5 className="text-white font-semibold mb-3">Key Responsibilities</h5>
                                <ul className="space-y-2">
                                  {item.responsibilities.map((responsibility, idx) => (
                                    <li key={idx} className="flex items-start text-slate-300">
                                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                      {responsibility}
                                    </li>
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
              </div>
            </TabsContent>

            <TabsContent value="educations">
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">Educational Background</h3>
                  <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                    <GraduationCap className="mr-2 h-4 w-4" />
                    {educationItems.length} degrees
                  </Badge>
                </div>

                {educationItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/50 transition-all duration-300 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-slate-800 flex items-center justify-center">
                            <School className="h-6 w-6 text-green-400" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="text-xl font-bold text-white mb-1">{item.degree}</h4>
                                <p className="text-green-400 font-medium">{item.institution}</p>
                              </div>
                              <div className="flex flex-col items-end space-y-2">
                                <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                                  {item.duration}
                                </Badge>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleExpanded('education', item.id)}
                                  className="text-slate-400 hover:text-white p-1"
                                >
                                  {expandedEducation === item.id ? (
                                    <>Hide Achievements <ChevronUp className="ml-1 h-4 w-4" /></>
                                  ) : (
                                    <>Show Achievements <ChevronDown className="ml-1 h-4 w-4" /></>
                                  )}
                                </Button>
                              </div>
                            </div>
                            
                            <div className="flex items-center text-sm text-slate-400 mb-4">
                              <MapPin className="mr-1 h-4 w-4" />
                              {item.location}
                            </div>

                            {expandedEducation === item.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="border-t border-slate-700 pt-4"
                              >
                                <ul className="space-y-2">
                                  {item.achievements.map((achievement, idx) => (
                                    <li key={idx} className="flex items-start text-slate-300">
                                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                      {achievement}
                                    </li>
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
              </div>
            </TabsContent>

            <TabsContent value="certifications">
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">Certifications & Training</h3>
                  <Button 
                    variant="outline" 
                    className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                    asChild
                  >
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View on LinkedIn
                    </a>
                  </Button>
                </div>

                <Card className="bg-blue-500/10 border-blue-500/30 backdrop-blur-sm mb-6">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                        <Award className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-blue-400 font-medium">View All Certifications</p>
                        <p className="text-sm text-slate-400">See my complete certification portfolio on LinkedIn</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {certificationItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/50 transition-all duration-300 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-slate-800 flex items-center justify-center">
                            <Award className="h-6 w-6 text-purple-400" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="text-xl font-bold text-white mb-1">{item.name}</h4>
                                <p className="text-purple-400 font-medium">{item.issuer}</p>
                              </div>
                              <div className="flex flex-col items-end space-y-2">
                                <Badge variant="secondary" className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                                  {item.date}
                                </Badge>
                                <div className="flex space-x-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => toggleExpanded('certification', item.id)}
                                    className="text-slate-400 hover:text-white p-1"
                                  >
                                    {expandedCertification === item.id ? (
                                      <>Hide Achievements <ChevronUp className="ml-1 h-4 w-4" /></>
                                    ) : (
                                      <>Show Achievements <ChevronDown className="ml-1 h-4 w-4" /></>
                                    )}
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
                                    asChild
                                  >
                                    <a href={item.credentialUrl} target="_blank" rel="noopener noreferrer">
                                      <ExternalLink className="mr-1 h-3 w-3" />
                                      View Credential
                                    </a>
                                  </Button>
                                </div>
                              </div>
                            </div>

                            {expandedCertification === item.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="border-t border-slate-700 pt-4"
                              >
                                <ul className="space-y-2">
                                  {item.skills.map((skill, idx) => (
                                    <li key={idx} className="flex items-start text-slate-300">
                                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                      {skill}
                                    </li>
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
              </div>
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