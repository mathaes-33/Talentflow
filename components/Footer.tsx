
import React from 'react';
import { IconWind } from './icons';

const Footer = () => {
  const scrollToContact = () => {
    document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <IconWind className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">TalentFlow AI</span>
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
            <a href="#contact-section" onClick={(e) => { e.preventDefault(); scrollToContact(); }} className="hover:text-primary">Contact Us</a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} TalentFlow AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
