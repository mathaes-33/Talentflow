
import React from 'react';
import type { User } from 'netlify-identity-widget';
import { IconWind } from './icons';
import Auth from './Auth';

interface HeaderProps {
  user: User | null;
  isAdmin: boolean;
}

const Header: React.FC<HeaderProps> = ({ user, isAdmin }) => {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <a href="/" className="flex items-center gap-2 font-bold text-lg">
          <IconWind className="h-6 w-6 text-primary" />
          <span>TalentFlow AI</span>
        </a>
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <a href="#parser-section" onClick={(e) => { e.preventDefault(); scrollToSection('parser-section'); }} className="transition-colors hover:text-primary">For Job Seekers</a>
            <a href="#tracking-section" onClick={(e) => { e.preventDefault(); scrollToSection('tracking-section'); }} className="transition-colors hover:text-primary">My Applications</a>
            <a href="#employer-section" onClick={(e) => { e.preventDefault(); scrollToSection('employer-section'); }} className="transition-colors hover:text-primary">For Employers</a>
            {isAdmin && <a href="#admin-section" onClick={(e) => { e.preventDefault(); scrollToSection('admin-section'); }} className="transition-colors hover:text-primary">Admin</a>}
            <a href="#resources-section" onClick={(e) => { e.preventDefault(); scrollToSection('resources-section'); }} className="transition-colors hover:text-primary">Resources</a>
            <a href="#about-section" onClick={(e) => { e.preventDefault(); scrollToSection('about-section'); }} className="transition-colors hover:text-primary">About Us</a>
            <a href="#contact-section" onClick={(e) => { e.preventDefault(); scrollToSection('contact-section'); }} className="transition-colors hover:text-primary">Contact Us</a>
          </nav>
          <Auth user={user} />
        </div>
        <button className="md:hidden text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
