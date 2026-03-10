"use client";

import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-black border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-medium text-white mb-4">
              Zidan Mubarak
            </h3>
            <p className="text-neutral-400 max-w-sm leading-relaxed mb-6">
              AI/ML Engineer building intelligent solutions that make a
              difference. Based in Indonesia, working globally.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/zidanmubarak"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/zidan-mubarak"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:zidanmubarak00@gmail.com"
                className="text-neutral-500 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-medium text-white mb-4">Navigation</h4>
            <ul className="space-y-3">
              {["About", "Projects", "Dashboard", "Contact"].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-neutral-400 hover:text-white text-sm transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-medium text-white mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li>zidanmubarak00@gmail.com</li>
              <li>Indonesia</li>
              <li className="text-green-500">Available for work</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-neutral-500 text-sm">
            © {currentYear} Zidan Mubarak. All rights reserved.
          </p>
          <p className="text-neutral-600 text-sm">
            Built with Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
