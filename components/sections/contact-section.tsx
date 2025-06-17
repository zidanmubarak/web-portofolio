"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  Globe,
  Send,
  User,
  MessageSquare,
  Sparkles,
  ArrowUpRight,
  Phone,
  Video,
  Zap,
  Heart,
  Star,
  CheckCircle,
} from "lucide-react";

const socialLinks = [
  {
    name: "Email",
    icon: Mail,
    color:
      "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700",
    href: "mailto:zidanmubarak00@gmail.com",
    description: "Drop me a line anytime",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    color:
      "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
    href: "https://www.linkedin.com/in/zidan-mubarak/",
    description: "Let's connect",
  },
  {
    name: "GitHub",
    icon: Github,
    color:
      "bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900",
    href: "https://github.com/zidanmubarak",
    description: "Check out my code",
  },
  {
    name: "Instagram",
    icon: Instagram,
    color:
      "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700",
    href: "https://instagram.com/zidanmubarakk._",
    description: "Follow my journey",
  },
  {
    name: "Sponsor",
    icon: Coffee,
    color:
      "bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700",
    href: "https://github.com/sponsors/zidanmubarak",
    description: "Support my work",
  },
];

const availability = [
  {
    day: "Monday - Friday",
    time: "9:00 AM - 6:00 PM",
    status: "available",
    description: "Best time for meetings",
  },
  {
    day: "Saturday",
    time: "By appointment",
    status: "limited",
    description: "Weekend consultations",
  },
  {
    day: "Sunday",
    time: "Closed",
    status: "unavailable",
    description: "Rest day",
  },
];

const contactMethods = [
  {
    title: "Quick Chat",
    description: "For quick questions and discussions",
    icon: MessageCircle,
    color: "from-blue-500 to-cyan-500",
    action: "Start Chat",
    href: "mailto:zidanmubarak00@gmail.com",
  },
  {
    title: "Video Call",
    description: "Schedule a video meeting",
    icon: Video,
    color: "from-purple-500 to-pink-500",
    action: "Schedule Call",
    href: "https://calendly.com/zidanmubarak00/30min",
  },
  {
    title: "Project Inquiry",
    description: "Discuss your project needs",
    icon: Zap,
    color: "from-green-500 to-emerald-500",
    action: "Send Inquiry",
    href: "mailto:zidanmubarak00@gmail.com",
  },
];

export function ContactSection() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Set initial time only on client side
    setCurrentTime(new Date());

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Asia/Jakarta",
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSubmitted(false); // Reset submitted state on new submission attempt

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        const errorData = await response.json();
        console.error("Gagal mengirim pesan:", errorData.message);
        alert(
          `Gagal mengirim pesan: ${errorData.message || "Terjadi kesalahan."}`
        );
      }
    } catch (error) {
      console.error("Kesalahan jaringan atau server:", error);
      alert("Gagal mengirim pesan. Silakan coba lagi nanti.");
    } finally {
      setIsSubmitting(false);
      // Reset form after 3 seconds if successfully submitted
      if (isSubmitted) {
        setTimeout(() => {
          setIsSubmitted(false);
        }, 3000);
      }
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
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Header Section */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-lg border border-blue-500/20 rounded-full px-6 py-3 mb-8"
            >
              <MessageCircle className="h-5 w-5 text-blue-400 animate-pulse" />
              <span className="text-blue-400 font-medium">Let's Connect</span>
              <Sparkles className="h-5 w-5 text-purple-400 animate-pulse" />
            </motion.div>

            <motion.h2
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Get In{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Touch
              </span>
            </motion.h2>

            <motion.p
              className="text-xl sm:text-2xl text-slate-300 max-w-4xl mx-auto font-light leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Ready to collaborate on an exciting project? Let's build something
              amazing together and bring your ideas to life.
            </motion.p>
          </div>

          {/* Contact Methods */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group"
                >
                  <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl overflow-hidden h-full transition-all duration-500 hover:bg-white/8 hover:shadow-3xl">
                    <CardContent className="p-8 text-center">
                      <div
                        className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${method.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">
                        {method.title}
                      </h3>
                      <p className="text-slate-400 mb-6 leading-relaxed">
                        {method.description}
                      </p>
                      <Button
                        className={`w-full bg-gradient-to-r ${method.color} hover:scale-105 transition-all duration-300 rounded-xl shadow-lg`}
                        asChild
                      >
                        <a
                          href={method.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {method.action}
                          <ArrowUpRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-white flex items-center gap-3">
                    <Send className="h-8 w-8 text-blue-400" />
                    Send Message
                  </CardTitle>
                  <p className="text-slate-400 text-lg">
                    Fill out the form below and I'll get back to you within 24
                    hours.
                  </p>
                </CardHeader>
                <CardContent className="p-8">
                  <AnimatePresence mode="wait">
                    {!isSubmitted ? (
                      <motion.form
                        key="form"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        onSubmit={handleSubmit}
                        className="space-y-6"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                              <User className="h-4 w-4 text-blue-400" />
                              Name
                            </label>
                            <Input
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="Your full name"
                              className="bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 rounded-xl focus:border-blue-500/50 focus:ring-blue-500/20"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                              <Mail className="h-4 w-4 text-green-400" />
                              Email
                            </label>
                            <Input
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="your.email@example.com"
                              className="bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 rounded-xl focus:border-blue-500/50 focus:ring-blue-500/20"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                            <MessageSquare className="h-4 w-4 text-purple-400" />
                            Subject
                          </label>
                          <Input
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            placeholder="What's this about?"
                            className="bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 rounded-xl focus:border-blue-500/50 focus:ring-blue-500/20"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                            <MessageCircle className="h-4 w-4 text-yellow-400" />
                            Message
                          </label>
                          <Textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Tell me about your project, ideas, or just say hello!"
                            rows={6}
                            className="bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 rounded-xl focus:border-blue-500/50 focus:ring-blue-500/20 resize-none"
                            required
                          />
                        </div>

                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 hover:from-blue-600 hover:via-purple-700 hover:to-pink-600 text-white py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <div className="flex items-center gap-3">
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Sending Message...
                            </div>
                          ) : (
                            <div className="flex items-center gap-3">
                              <Send className="h-5 w-5" />
                              Send Message
                              <ArrowUpRight className="h-4 w-4" />
                            </div>
                          )}
                        </Button>
                      </motion.form>
                    ) : (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12"
                      >
                        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-10 w-10 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">
                          Message Sent Successfully!
                        </h3>
                        <p className="text-slate-400 text-lg">
                          Thank you for reaching out. I'll get back to you
                          within 24 hours.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info & Availability */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Availability Card */}
              <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white flex items-center gap-3">
                    <Clock className="h-6 w-6 text-blue-400" />
                    Availability
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {availability.map((schedule, index) => (
                    <motion.div
                      key={schedule.day}
                      className="flex items-center justify-between p-4 rounded-2xl bg-slate-800/30 border border-slate-700/30 hover:bg-slate-700/30 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-white font-semibold text-lg">
                            {schedule.day}
                          </span>
                          <Badge
                            className={`text-xs ${
                              schedule.status === "available"
                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                : schedule.status === "limited"
                                ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                : "bg-red-500/20 text-red-400 border-red-500/30"
                            }`}
                          >
                            {schedule.status === "available"
                              ? "✓ Open"
                              : schedule.status === "limited"
                              ? "⏰ Limited"
                              : "✕ Closed"}
                          </Badge>
                        </div>
                        <p className="text-slate-400 text-sm">
                          {schedule.time}
                        </p>
                        <p className="text-slate-500 text-xs mt-1">
                          {schedule.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}

                  <div className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl">
                    <div className="flex items-start space-x-4">
                      <MessageCircle className="h-6 w-6 text-blue-400 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-blue-400 font-semibold text-lg">
                          Response Time
                        </p>
                        <p className="text-slate-300 text-base">
                          I typically respond within 12-24 hours during business
                          days.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Location & Time Card */}
              <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white flex items-center gap-3">
                    <MapPin className="h-6 w-6 text-green-400" />
                    Location & Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div className="flex items-start space-x-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                        <MapPin className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-2 text-xl">
                          Location
                        </h4>
                        <p className="text-slate-400 text-lg">Indonesia 🇮🇩</p>
                        <p className="text-slate-500 text-sm mt-1">
                          Available for remote work worldwide
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                        <Clock className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-2 text-xl">
                          Current Time
                        </h4>
                        <p className="text-slate-400 text-base">
                          Jakarta Time (WIB)
                        </p>
                        <p className="text-green-400 font-mono text-xl mt-2 font-bold">
                          {currentTime
                            ? formatTime(currentTime)
                            : "Loading time..."}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                        <Globe className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-2 text-xl">
                          Remote Work
                        </h4>
                        <p className="text-slate-400 text-base mb-3">
                          Available for remote collaboration worldwide
                        </p>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-4 py-2">
                          🌍 Open to opportunities
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Social Links Section */}
          <motion.div
            className="mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-white mb-4">
                Connect With Me
              </h3>
              <p className="text-slate-400 text-lg">
                Choose your preferred way to get in touch
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
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
                    className="group"
                  >
                    <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl overflow-hidden h-full transition-all duration-500 hover:bg-white/8 hover:shadow-3xl">
                      <CardContent className="p-6 text-center">
                        <div
                          className={`w-16 h-16 mx-auto mb-4 rounded-2xl ${social.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                        >
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <h4 className="text-white font-semibold text-lg mb-2">
                          {social.name}
                        </h4>
                        <p className="text-slate-400 text-sm mb-4">
                          {social.description}
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-slate-600/50 text-slate-300 hover:bg-slate-800/50 hover:text-white hover:border-blue-500/30 rounded-xl transition-all duration-300"
                          asChild
                        >
                          <a
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Connect
                            <ArrowUpRight className="ml-2 h-3 w-3" />
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            viewport={{ once: true }}
            className="text-center mt-20"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 shadow-2xl">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Heart className="h-8 w-8 text-red-400 animate-pulse" />
                <Star className="h-6 w-6 text-yellow-400 animate-pulse" />
                <Heart className="h-8 w-8 text-red-400 animate-pulse" />
              </div>
              <h3 className="text-4xl font-bold text-white mb-6">
                Let's Create Something{" "}
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Amazing
                </span>
              </h3>
              <p className="text-slate-400 mb-8 text-xl max-w-3xl mx-auto leading-relaxed">
                Whether you have a groundbreaking idea, need technical
                expertise, or just want to chat about the latest in AI and
                technology, I'm here to help bring your vision to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 hover:from-blue-600 hover:via-purple-700 hover:to-pink-600 text-white px-10 py-5 text-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
                  asChild
                >
                  <a href="mailto:zidanmubarak00@gmail.com">
                    <Mail className="mr-3 h-6 w-6" />
                    Start a Conversation
                    <ArrowUpRight className="ml-3 h-5 w-5" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-600/50 text-slate-300 hover:bg-slate-800/50 hover:text-white hover:border-blue-500/30 px-10 py-5 text-xl rounded-2xl transition-all duration-300 hover:scale-105"
                  asChild
                >
                  <a
                    href="https://github.com/sponsors/zidanmubarak"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Coffee className="mr-3 h-6 w-6" />
                    Support My Work
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
