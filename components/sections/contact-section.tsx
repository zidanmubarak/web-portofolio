"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Mail,
  Linkedin,
  Github,
  Instagram,
  Coffee,
  Clock,
  MapPin,
  Calendar,
  MessageCircle,
  Globe
} from 'lucide-react';

const socialLinks = [
  {
    name: "Email",
    icon: Mail,
    color: "bg-green-600 hover:bg-green-700",
    href: "mailto:zidan@example.com"
  },
  {
    name: "LinkedIn", 
    icon: Linkedin,
    color: "bg-blue-600 hover:bg-blue-700",
    href: "https://linkedin.com/in/zidanmubarak"
  },
  {
    name: "GitHub",
    icon: Github,
    color: "bg-gray-800 hover:bg-gray-900",
    href: "https://github.com/zidanmubarak"
  },
  {
    name: "Instagram",
    icon: Instagram, 
    color: "bg-pink-600 hover:bg-pink-700",
    href: "https://instagram.com/zidanmubarak"
  },
  {
    name: "Sponsor",
    icon: Coffee,
    color: "bg-purple-600 hover:bg-purple-700",
    href: "https://github.com/sponsors/zidanmubarak"
  }
];

const availability = [
  {
    day: "Monday - Friday",
    time: "9:00 AM - 6:00 PM",
    status: "available"
  },
  {
    day: "Saturday", 
    time: "By appointment",
    status: "limited"
  },
  {
    day: "Sunday",
    time: "Closed",
    status: "unavailable"
  }
];

export function ContactSection() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Asia/Jakarta'
    });
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
              Let's <span className="gradient-text">Connect</span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto">
              Ready to collaborate on an exciting AI project? Let's build something amazing together!
            </p>
          </div>

          {/* Connect With Me Section */}
          <div className="mb-12 sm:mb-16">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">Connect With Me</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.div
                    key={social.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      className={`w-full h-20 sm:h-24 flex flex-col items-center justify-center space-y-2 sm:space-y-3 ${social.color} shadow-lg hover:shadow-xl transition-all duration-300`}
                      asChild
                    >
                      <a href={social.href} target="_blank" rel="noopener noreferrer">
                        <Icon className="h-6 w-6 sm:h-8 sm:w-8" />
                        <span className="text-xs sm:text-sm font-medium">{social.name}</span>
                      </a>
                    </Button>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Availability Section */}
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-white text-lg sm:text-xl">
                  <Clock className="mr-3 h-5 sm:h-6 w-5 sm:w-6 text-blue-400" />
                  Availability
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                {availability.map((schedule, index) => (
                  <motion.div 
                    key={schedule.day} 
                    className="flex items-center justify-between p-3 sm:p-4 rounded-xl bg-slate-800/30 border border-slate-700/30"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <span className="text-slate-300 font-medium text-sm sm:text-lg">{schedule.day}</span>
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                      <span className="text-slate-400 text-xs sm:text-base">{schedule.time}</span>
                      <Badge 
                        variant="secondary"
                        className={`text-xs sm:text-sm ${
                          schedule.status === 'available' 
                            ? 'bg-green-500/20 text-green-400 border-green-500/30'
                            : schedule.status === 'limited'
                            ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' 
                            : 'bg-red-500/20 text-red-400 border-red-500/30'
                        }`}
                      >
                        {schedule.status === 'available' ? '✓ Open' : 
                         schedule.status === 'limited' ? '⏰ Limited' : '✕ Closed'}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
                
                <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                  <div className="flex items-start space-x-4">
                    <MessageCircle className="h-5 sm:h-6 w-5 sm:w-6 text-blue-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-blue-400 font-medium text-base sm:text-lg">Response Time</p>
                      <p className="text-slate-300 text-sm sm:text-lg">I typically respond within 12-24 hours.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location Section */}
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-white text-lg sm:text-xl">
                  <MapPin className="mr-3 h-5 sm:h-6 w-5 sm:w-6 text-green-400" />
                  Find Me
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6 sm:space-y-8">
                  <div className="flex items-start space-x-4 sm:space-x-6">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                      <MapPin className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-2 text-base sm:text-lg">Location</h4>
                      <p className="text-slate-400 text-sm sm:text-lg">Indonesia</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 sm:space-x-6">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                      <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-2 text-base sm:text-lg">Current Time</h4>
                      <p className="text-slate-400 text-sm sm:text-base">Jakarta Time (WIB)</p>
                      <p className="text-green-400 font-mono text-base sm:text-xl mt-1">{formatTime(currentTime)}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 sm:space-x-6">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                      <Globe className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-2 text-base sm:text-lg">Remote Work</h4>
                      <p className="text-slate-400 text-sm sm:text-lg">Available for remote collaboration worldwide</p>
                      <Badge className="mt-3 bg-green-500/20 text-green-400 border-green-500/30 px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm">
                        🌍 Open to opportunities
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mt-12 sm:mt-16 text-center">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 h-16 sm:h-20 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                asChild
              >
                <a href="mailto:zidan@example.com">
                  <Mail className="mr-2 sm:mr-3 h-5 sm:h-6 w-5 sm:w-6" />
                  Send Email
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-slate-600 text-slate-300 hover:bg-slate-800 h-16 sm:h-20 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Calendar className="mr-2 sm:mr-3 h-5 sm:h-6 w-5 sm:w-6" />
                Schedule Meeting
              </Button>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 h-16 sm:h-20 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                asChild
              >
                <a href="https://github.com/sponsors/zidanmubarak" target="_blank" rel="noopener noreferrer">
                  <Coffee className="mr-2 sm:mr-3 h-5 sm:h-6 w-5 sm:w-6" />
                  Buy Me Coffee
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}