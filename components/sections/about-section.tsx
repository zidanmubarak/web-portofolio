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
  Download
} from 'lucide-react';

const timelineItems = [
  {
    year: "2024",
    title: "AI/ML Innovation Journey",
    type: "milestone",
    description: "Focused on developing cutting-edge AI solutions, contributing to open-source ML projects, and building intelligent systems that solve real-world problems.",
    icon: Brain
  },
  {
    year: "2023", 
    title: "Bachelor's in Computer Science",
    type: "education",
    description: "Specialized in Artificial Intelligence and Machine Learning, with focus on deep learning, neural networks, and data science applications.",
    icon: GraduationCap
  },
  {
    year: "2023",
    title: "Machine Learning Certification",
    type: "certification",
    description: "Completed comprehensive training in TensorFlow, PyTorch, and advanced ML algorithms with practical project implementations.",
    icon: Code
  },
  {
    year: "2022",
    title: "Full Stack Developer",
    type: "experience", 
    description: "Built scalable web applications using modern frameworks, integrated AI/ML models into production systems.",
    icon: Briefcase
  }
];

export function AboutSection() {
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

                      {/* Download CV Button */}
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
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">Professional Experience</h3>
                {timelineItems.filter(item => item.type === 'experience' || item.type === 'milestone').map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm card-hover shadow-lg">
                        <CardContent className="p-6 sm:p-8">
                          <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                              <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4">
                                <h4 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-0">{item.title}</h4>
                                <Badge variant="secondary" className="text-sm sm:text-lg px-3 sm:px-4 py-1 sm:py-2 w-fit">{item.year}</Badge>
                              </div>
                              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">{item.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="educations">
              <div className="space-y-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">Educational Background</h3>
                {timelineItems.filter(item => item.type === 'education').map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm card-hover shadow-lg">
                        <CardContent className="p-6 sm:p-8">
                          <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                              <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4">
                                <h4 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-0">{item.title}</h4>
                                <Badge variant="secondary" className="text-sm sm:text-lg px-3 sm:px-4 py-1 sm:py-2 w-fit">{item.year}</Badge>
                              </div>
                              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">{item.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="certifications">
              <div className="space-y-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">Certifications & Training</h3>
                {timelineItems.filter(item => item.type === 'certification').map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm card-hover shadow-lg">
                        <CardContent className="p-6 sm:p-8">
                          <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                              <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4">
                                <h4 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-0">{item.title}</h4>
                                <Badge variant="secondary" className="text-sm sm:text-lg px-3 sm:px-4 py-1 sm:py-2 w-fit">{item.year}</Badge>
                              </div>
                              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">{item.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
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