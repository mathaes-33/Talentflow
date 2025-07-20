
import React, { useState, useEffect } from 'react';
import netlifyIdentity from 'netlify-identity-widget';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ResumeParser from './components/ResumeParser';
import EmployerSection from './components/EmployerSection';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import ApplicationTracking from './components/ApplicationTracking';
import Resources from './components/Resources';
import type { Job, Application } from './types';

function App() {
  const [user, setUser] = useState<netlifyIdentity.User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    netlifyIdentity.init();
    const currentUser = netlifyIdentity.currentUser();
    if (currentUser) {
      setUser(currentUser);
      setIsAdmin(currentUser.app_metadata?.roles?.includes('admin') ?? false);
    }

    const handleLogin = (loggedInUser: netlifyIdentity.User) => {
      setUser(loggedInUser);
      setIsAdmin(loggedInUser.app_metadata?.roles?.includes('admin') ?? false);
      netlifyIdentity.close();
    };

    const handleLogout = () => {
      setUser(null);
      setIsAdmin(false);
    };

    netlifyIdentity.on('login', handleLogin);
    netlifyIdentity.on('logout', handleLogout);

    return () => {
      netlifyIdentity.off('login', handleLogin);
      netlifyIdentity.off('logout', handleLogout);
    };
  }, []);


  const handleJobSubmit = (newJob: Job) => {
    setJobs(prevJobs => [...prevJobs, newJob]);
  };

  const handleJobStatusUpdate = (jobId: string, status: 'approved' | 'rejected') => {
    setJobs(prevJobs => 
      prevJobs.map(job => 
        job.id === jobId ? { ...job, status } : job
      )
    );
  };

  const handleApplyForJob = (jobToApply: Job) => {
    if (applications.some(app => app.job.id === jobToApply.id)) return;

    const newApplication: Application = {
      job: jobToApply,
      status: 'Applied',
      appliedDate: new Date().toLocaleDateString(),
    };
    setApplications(prevApps => [newApplication, ...prevApps]);

    // Simulate status progression for demonstration
    setTimeout(() => {
      setApplications(prevApps =>
        prevApps.map(app =>
          app.job.id === jobToApply.id
            ? { ...app, status: 'Under Review' }
            : app
        )
      );
    }, 15000); // 15 seconds
  };


  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      <Header user={user} isAdmin={isAdmin} />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <HeroSection />
        <div id="parser-section" className="mt-16 scroll-mt-20">
          <ResumeParser onApply={handleApplyForJob} applications={applications} />
        </div>
        <div id="tracking-section" className="mt-16 scroll-mt-20">
          <ApplicationTracking applications={applications} />
        </div>
        <div id="employer-section" className="mt-16 scroll-mt-20">
          <EmployerSection onJobSubmit={handleJobSubmit} />
        </div>
         {isAdmin && (
            <div id="admin-section" className="mt-16 scroll-mt-20">
                <AdminDashboard jobs={jobs} onJobStatusUpdate={handleJobStatusUpdate} />
            </div>
         )}
        <div id="resources-section" className="mt-16 scroll-mt-20">
          <Resources />
        </div>
        <div id="about-section" className="mt-16 scroll-mt-20">
          <AboutUs />
        </div>
        <div id="contact-section" className="my-16 scroll-mt-20">
          <ContactUs />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
