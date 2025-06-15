"use client";

import { useState } from 'react';
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
  TrendingUp
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

const tabs = [
  {
    id: 'intro',
    label: 'Introduction',
    icon: User,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'experience',
    label: 'Experience',
    icon: Briefcase,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'education',
    label: 'Education',
    icon: GraduationCap,
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'certifications',
    label: 'Certifications',
    icon: Award,
    color: 'from-orange-500 to-red-500'
  }
];

export default function ModernAboutSection() {
  const [activeTab, setActiveTab] = useState('intro');
  const [expandedExperience, setExpandedExperience] = useState(null);
  const [expandedEducation, setExpandedEducation] = useState(null);
  const [expandedCertification, setExpandedCertification] = useState(null);

  const toggleExpanded = (type, id) => {
    if (type === 'experience') {
      setExpandedExperience(expandedExperience === id ? null : id);
    } else if (type === 'education') {
      setExpandedEducation(expandedEducation === id ? null : id);
    } else {
      setExpandedCertification(expandedCertification === id ? null : id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-4 py-2 rounded-full border border-blue-500/30 mb-6">
            <Star className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">My Professional Journey</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text mb-6">
            My <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Journey</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            From curious student to AI/ML engineer - here's my story of growth, learning, and innovation.
          </p>
        </div>

        {/* Modern Tab Navigation */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 p-2 bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group relative flex items-center gap-3 px-6 py-4 rounded-xl font-medium transition-all duration-300 w-full sm:w-auto ${
                    activeTab === tab.id
                      ? 'text-white shadow-lg transform scale-105'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  {activeTab === tab.id && (
                    <div className={`absolute inset-0 bg-gradient-to-r ${tab.color} rounded-xl opacity-90`} />
                  )}
                  <div className="relative flex items-center gap-3">
                    <Icon className="h-5 w-5" />
                    <span className="font-semibold">{tab.label}</span>
                  </div>
                  {activeTab === tab.id && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-lg" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="relative">
          {/* Introduction Tab */}
          {activeTab === 'intro' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-700/50 shadow-2xl overflow-hidden">
                <div className="p-8 sm:p-12">
                  <div className="flex flex-col lg:flex-row items-start gap-8">
                    {/* Avatar */}
                    <div className="relative group">
                      <div className="w-32 h-32 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-3xl flex items-center justify-center text-white text-4xl font-bold shadow-2xl group-hover:scale-105 transition-transform duration-300">
                        Z
                      </div>
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-6">
                      <div>
                        <h3 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent mb-2">
                          Hello, I'm Zidan! 👋
                        </h3>
                        <div className="flex items-center gap-4 text-slate-400">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-blue-400" />
                            <span>Indonesia</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            <span className="text-green-400">Available for projects</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4 text-slate-300 leading-relaxed">
                        <p>
                          I'm a passionate AI/ML engineer and full-stack developer based in Indonesia. My journey in technology 
                          started with curiosity about how machines can learn and make intelligent decisions, which led me to 
                          specialize in artificial intelligence and machine learning.
                        </p>
                        <p>
                          With expertise in Python, TensorFlow, PyTorch, and modern web technologies, I build end-to-end 
                          solutions that bridge the gap between complex AI algorithms and user-friendly applications.
                        </p>
                        <p>
                          My goal is to democratize AI technology and make it accessible to everyone. Whether it's building 
                          intelligent chatbots, computer vision applications, or predictive models, I'm passionate about 
                          creating solutions that make a difference.
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <button className="group flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6 py-3 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                          <Download className="h-5 w-5 group-hover:animate-bounce" />
                          Download CV
                        </button>
                        <button className="flex items-center gap-3 bg-slate-700/50 hover:bg-slate-600/50 px-6 py-3 rounded-xl font-semibold text-white border border-slate-600/50 hover:border-slate-500/50 transition-all duration-300">
                          <Code className="h-5 w-5" />
                          View Projects
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Experience Tab */}
          {activeTab === 'experience' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white">Professional Experience</h3>
                <div className="flex items-center gap-2 bg-purple-500/20 px-4 py-2 rounded-xl border border-purple-500/30">
                  <TrendingUp className="h-4 w-4 text-purple-400" />
                  <span className="text-purple-300 font-medium">{experienceItems.length} positions</span>
                </div>
              </div>

              {experienceItems.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <Building className="h-8 w-8 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-xl font-bold text-white mb-1">{item.position}</h4>
                            <p className="text-purple-400 font-semibold">{item.company}</p>
                          </div>
                          <div className="flex flex-col gap-2">
                            {item.current && (
                              <div className="flex items-center gap-2 bg-green-500/20 px-3 py-1 rounded-full border border-green-500/30">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                <span className="text-green-300 text-sm font-medium">Current</span>
                              </div>
                            )}
                            <button
                              onClick={() => toggleExpanded('experience', item.id)}
                              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                            >
                              {expandedExperience === item.id ? (
                                <>Hide Details <ChevronUp className="h-4 w-4" /></>
                              ) : (
                                <>View Details <ChevronDown className="h-4 w-4" /></>
                              )}
                            </button>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-slate-400 mb-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {item.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {item.type}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {item.location}
                          </div>
                        </div>

                        {expandedExperience === item.id && (
                          <div className="border-t border-slate-700/50 pt-4 animate-in slide-in-from-top duration-300">
                            <h5 className="text-white font-semibold mb-3">Key Responsibilities</h5>
                            <ul className="space-y-2">
                              {item.responsibilities.map((responsibility, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-slate-300">
                                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                                  {responsibility}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Education Tab */}
          {activeTab === 'education' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white">Educational Background</h3>
                <div className="flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-xl border border-green-500/30">
                  <GraduationCap className="h-4 w-4 text-green-400" />
                  <span className="text-green-300 font-medium">{educationItems.length} degrees</span>
                </div>
              </div>

              {educationItems.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <School className="h-8 w-8 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-xl font-bold text-white mb-1">{item.degree}</h4>
                            <p className="text-green-400 font-semibold">{item.institution}</p>
                            <p className="text-slate-400 text-sm mt-1">{item.location}</p>
                          </div>
                          <div className="flex flex-col gap-2">
                            <div className="bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/30">
                              <span className="text-blue-300 text-sm font-medium">{item.duration}</span>
                            </div>
                            <button
                              onClick={() => toggleExpanded('education', item.id)}
                              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                            >
                              {expandedEducation === item.id ? (
                                <>Hide Achievements <ChevronUp className="h-4 w-4" /></>
                              ) : (
                                <>Show Achievements <ChevronDown className="h-4 w-4" /></>
                              )}
                            </button>
                          </div>
                        </div>

                        {expandedEducation === item.id && (
                          <div className="border-t border-slate-700/50 pt-4 animate-in slide-in-from-top duration-300">
                            <ul className="space-y-2">
                              {item.achievements.map((achievement, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-slate-300">
                                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                                  {achievement}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Certifications Tab */}
          {activeTab === 'certifications' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white">Certifications & Training</h3>
                <button className="flex items-center gap-2 bg-orange-500/20 hover:bg-orange-500/30 px-4 py-2 rounded-xl border border-orange-500/30 hover:border-orange-500/50 transition-all duration-300 text-orange-300 hover:text-orange-200">
                  <ExternalLink className="h-4 w-4" />
                  View on LinkedIn
                </button>
              </div>

              {certificationItems.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <Award className="h-8 w-8 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-xl font-bold text-white mb-1">{item.name}</h4>
                            <p className="text-orange-400 font-semibold">{item.issuer}</p>
                          </div>
                          <div className="flex flex-col gap-2">
                            <div className="bg-purple-500/20 px-3 py-1 rounded-full border border-purple-500/30">
                              <span className="text-purple-300 text-sm font-medium">{item.date}</span>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => toggleExpanded('certification', item.id)}
                                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                              >
                                {expandedCertification === item.id ? (
                                  <>Hide <ChevronUp className="h-4 w-4" /></>
                                ) : (
                                  <>Show <ChevronDown className="h-4 w-4" /></>
                                )}
                              </button>
                              <button className="flex items-center gap-1 text-orange-400 hover:text-orange-300 transition-colors duration-200 text-sm">
                                <ExternalLink className="h-3 w-3" />
                                View
                              </button>
                            </div>
                          </div>
                        </div>

                        {expandedCertification === item.id && (
                          <div className="border-t border-slate-700/50 pt-4 animate-in slide-in-from-top duration-300">
                            <ul className="space-y-2">
                              {item.skills.map((skill, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-slate-300">
                                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                                  {skill}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Support Section */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-violet-500/10 backdrop-blur-xl rounded-3xl border border-pink-500/20 shadow-2xl overflow-hidden">
            <div className="p-8 sm:p-12 text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-violet-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Coffee className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent mb-4">
                  Support My Work
                </h3>
                <p className="text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed">
                  Help me continue creating innovative AI solutions and sharing knowledge with the developer community!
                </p>
              </div>
              <button className="group bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 px-8 py-4 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-3">
                  <Coffee className="h-5 w-5 group-hover:animate-bounce" />
                  <span>Sponsor My Work</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}