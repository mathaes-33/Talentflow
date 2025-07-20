import React, { useState, useCallback } from 'react';
import Button from './ui/Button';
import Textarea from './ui/Textarea';
import Label from './ui/Label';
import ProfileDisplay from './ProfileDisplay';
import MatchingJobs from './MatchingJobs';
import FormW4 from './FormW4';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/Card';
import { IconBot, IconSearch, IconSparkles, IconFileText } from './icons';
import { parseResume, findMatchingJobs } from '../services/geminiService';
import type { ParsedResume, Job, Application } from '../types';

interface ResumeParserProps {
  onApply: (job: Job) => void;
  applications: Application[];
}

const ResumeParser: React.FC<ResumeParserProps> = ({ onApply, applications }) => {
  const [resumeText, setResumeText] = useState('');
  const [parsedData, setParsedData] = useState<ParsedResume | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);

  const [matchingJobs, setMatchingJobs] = useState<Job[] | null>(null);
  const [isFindingJobs, setIsFindingJobs] = useState(false);
  const [jobsError, setJobsError] = useState<string | null>(null);
  
  const [showW4Form, setShowW4Form] = useState(false);

  const handleAnalyze = useCallback(async () => {
    if (!resumeText.trim()) {
      setParseError('Please paste your resume text into the box.');
      return;
    }
    setIsParsing(true);
    setParseError(null);
    setParsedData(null);
    setMatchingJobs(null); 
    setJobsError(null);
    setShowW4Form(false);
    try {
      const data = await parseResume(resumeText);
      setParsedData(data);
    } catch (err) {
      setParseError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsParsing(false);
    }
  }, [resumeText]);

  const handleFindJobs = useCallback(async () => {
    if (!parsedData) return;

    setIsFindingJobs(true);
    setJobsError(null);
    setMatchingJobs(null);
    try {
        const jobs = await findMatchingJobs(parsedData);
        setMatchingJobs(jobs);
    } catch(err) {
        setJobsError(err instanceof Error ? err.message : 'An unknown error occurred while finding jobs.');
    } finally {
        setIsFindingJobs(false);
    }
  }, [parsedData]);


  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="bg-primary p-3 rounded-full">
              <IconSearch className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <CardTitle>AI-Powered Resume Analysis</CardTitle>
              <CardDescription>Paste your resume below to get started. Our AI will do the heavy lifting.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="resume-text">Your Resume</Label>
                <Textarea
                  id="resume-text"
                  placeholder="Paste the full text of your resume here..."
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  disabled={isParsing}
                />
              </div>
              <Button onClick={handleAnalyze} disabled={isParsing || !resumeText}>
                {isParsing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <IconBot className="mr-2 h-4 w-4" /> Analyze with AI
                  </>
                )}
              </Button>
              {parseError && <p className="text-sm text-destructive font-medium">{parseError}</p>}
            </div>
             <div className="hidden lg:flex justify-center items-center">
                <img 
                  src="https://images.unsplash.com/photo-1742485245028-d757da6f632d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Person working on a laptop in a modern workspace" 
                  className="rounded-lg shadow-md object-cover h-full max-h-[250px] w-full"
                />
              </div>
          </div>
        </CardContent>
      </Card>
      
      {parsedData && (
        <div className="animate-fade-in space-y-8">
           <ProfileDisplay data={parsedData} />
            <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                    <CardTitle className="mb-2">Ready for the Next Step?</CardTitle>
                    <CardDescription className="mb-4 max-w-prose">
                        Now that your profile is ready, let our AI find job opportunities that perfectly match your skills and experience.
                    </CardDescription>
                    <Button onClick={handleFindJobs} disabled={isFindingJobs} className="text-lg px-8 py-6 h-auto">
                         {isFindingJobs ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Finding Jobs...
                            </>
                            ) : (
                            <>
                                <IconSparkles className="mr-2 h-5 w-5" /> Find Matching Jobs with AI
                            </>
                        )}
                    </Button>
                    {jobsError && <p className="mt-4 text-sm text-destructive font-medium">{jobsError}</p>}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="bg-primary p-3 rounded-full">
                            <IconFileText className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div>
                            <CardTitle>Streamline Your Onboarding</CardTitle>
                            <CardDescription>Auto-fill standard employment forms with your new profile data.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Button onClick={() => setShowW4Form(true)} disabled={showW4Form}>
                        {showW4Form ? 'Form Generated Below' : 'Preview Pre-filled W-4 Form'}
                    </Button>
                </CardContent>
            </Card>

            {showW4Form && <FormW4 profile={parsedData} />}
        </div>
      )}
      
      {matchingJobs && <MatchingJobs jobs={matchingJobs} onApply={onApply} applications={applications} />}
    </div>
  );
};

export default ResumeParser;