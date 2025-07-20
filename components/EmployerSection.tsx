import React, { useState, useCallback } from 'react';
import Button from './ui/Button';
import Textarea from './ui/Textarea';
import Label from './ui/Label';
import Input from './ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/Card';
import { IconClipboardEdit, IconBuilding2, IconSparkles } from './icons';
import { analyzeJobDescription } from '../services/geminiService';
import type { Job, JobAnalysis } from '../types';

interface EmployerSectionProps {
  onJobSubmit: (job: Job) => void;
}

const EmployerSection: React.FC<EmployerSectionProps> = ({ onJobSubmit }) => {
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  
  const [analysis, setAnalysis] = useState<JobAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [jobSubmitted, setJobSubmitted] = useState(false);

  const resetForm = () => {
    setJobTitle('');
    setCompanyName('');
    setLocation('');
    setDescription('');
    setAnalysis(null);
    setJobSubmitted(false);
  }

  const handleAnalyzeJob = useCallback(async () => {
    if (!jobTitle.trim() || !companyName.trim() || !description.trim()) {
      setAnalysisError('Please fill out the Job Title, Company Name, and Description fields.');
      return;
    }
    setIsAnalyzing(true);
    setAnalysisError(null);
    setAnalysis(null);
    setJobSubmitted(false);

    try {
      const analysisData = await analyzeJobDescription({
        title: jobTitle,
        company: companyName,
        description: description,
      });
      setAnalysis(analysisData);

      const newJob: Job = {
        id: new Date().toISOString() + Math.random(),
        jobTitle,
        company: companyName,
        location,
        description,
        status: 'pending',
        skills: analysisData.suggestedSkills,
        analysis: analysisData,
      };

      onJobSubmit(newJob);
      setJobSubmitted(true);
      
      // Clear form after a delay to show success
      setTimeout(() => {
        resetForm();
      }, 5000);

    } catch (err) {
      setAnalysisError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsAnalyzing(false);
    }
  }, [jobTitle, companyName, location, description, onJobSubmit]);

  const canSubmit = jobTitle && companyName && description;

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="bg-primary p-3 rounded-full">
              <IconBuilding2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <CardTitle>Post a Job Opening</CardTitle>
              <CardDescription>Fill out the form below. Our AI will analyze it and submit it for review.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="job-title">Job Title</Label>
                            <Input id="job-title" placeholder="e.g., Senior Frontend Developer" value={jobTitle} onChange={e => setJobTitle(e.target.value)} disabled={isAnalyzing} />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="company-name">Company Name</Label>
                            <Input id="company-name" placeholder="e.g., Acme Corporation" value={companyName} onChange={e => setCompanyName(e.target.value)} disabled={isAnalyzing} />
                        </div>
                        <div className="space-y-1.5 col-span-full">
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" placeholder="e.g., San Francisco, CA or Remote" value={location} onChange={e => setLocation(e.target.value)} disabled={isAnalyzing} />
                        </div>
                    </div>
                    <div className="grid w-full gap-1.5">
                        <Label htmlFor="job-description">Job Description</Label>
                        <Textarea
                        id="job-description"
                        placeholder="Paste the full text of the job description here..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        disabled={isAnalyzing}
                        className="min-h-[250px]"
                        />
                    </div>
                    <Button onClick={handleAnalyzeJob} disabled={isAnalyzing || !canSubmit}>
                        {isAnalyzing ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Analyzing...
                        </>
                        ) : (
                        <>
                            <IconClipboardEdit className="mr-2 h-4 w-4" /> Analyze & Submit Job
                        </>
                        )}
                    </Button>
                    {analysisError && <p className="text-sm text-destructive font-medium">{analysisError}</p>}
                </div>
                <div className="hidden lg:flex justify-center items-center p-4">
                    <img 
                        src="https://plus.unsplash.com/premium_photo-1661959522250-4d4d89165b66?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                        alt="Team of professionals collaborating in a modern office"
                        className="rounded-lg shadow-md object-cover w-full h-full max-h-[450px]"
                    />
                </div>
            </div>
        </CardContent>
      </Card>
      
      {jobSubmitted && analysis && (
        <Card className="animate-fade-in bg-slate-50 border-t-4 border-green-500">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="bg-green-500 p-3 rounded-full">
                        <IconSparkles className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                        <CardTitle className="text-green-600">Job Submitted Successfully!</CardTitle>
                        <CardDescription>Your job is now pending review. Here are the AI insights we generated. This form will reset shortly.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <section>
                    <h3 className="font-semibold text-lg mb-2">Suggested Category</h3>
                    <p className="bg-secondary text-secondary-foreground text-base font-medium px-4 py-2 rounded-md inline-block">
                        {analysis.suggestedCategory}
                    </p>
                </section>
                <section>
                    <h3 className="font-semibold text-lg mb-2">Suggested Skills</h3>
                    <div className="flex flex-wrap gap-2">
                        {analysis.suggestedSkills.map((skill, index) => (
                            <span key={index} className="bg-secondary text-secondary-foreground text-sm font-medium px-3 py-1 rounded-full">
                                {skill}
                            </span>
                        ))}
                    </div>
                </section>
                <section>
                    <h3 className="font-semibold text-lg mb-2">Clarity & Appeal Feedback</h3>
                    <div className="border-l-4 border-primary/50 pl-4">
                        <p className="text-muted-foreground italic">{analysis.clarityFeedback}</p>
                    </div>
                </section>
            </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EmployerSection;