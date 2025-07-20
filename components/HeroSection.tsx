import React from 'react';
import Button from './ui/Button';

const HeroSection = () => {
  const scrollToParser = () => {
    document.getElementById('parser-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToEmployer = () => {
    document.getElementById('employer-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-primary">
        Unlock Your Career Potential with AI
      </h1>
      <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
        Stop manually filling out applications. Paste your resume and let our AI build your professional profile instantly, matching you with the perfect job opportunities.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button onClick={scrollToParser} className="text-lg px-8 py-6 w-full sm:w-auto h-auto">
          Analyze Your Resume Now
        </Button>
        <Button onClick={scrollToEmployer} variant="secondary" className="text-lg px-8 py-6 w-full sm:w-auto h-auto">
          Hire Talent
        </Button>
      </div>
      <div className="mt-12">
        <img
          src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=869&auto=format=fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="A robot hand and a human hand about to connect, symbolizing AI and human collaboration"
          className="rounded-lg shadow-xl object-cover w-full h-64 md:h-96"
        />
      </div>
    </section>
  );
};

export default HeroSection;