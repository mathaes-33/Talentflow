import React from 'react';
import type { Job, Application } from '../types';
import Button from './ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from './ui/Card';
import { IconBuilding, IconMapPin, IconSparkles } from './icons';

interface MatchingJobsProps {
  jobs: Job[];
  onApply: (job: Job) => void;
  applications: Application[];
}

const MatchingJobs: React.FC<MatchingJobsProps> = ({ jobs, onApply, applications }) => {
  const appliedJobIds = new Set(applications.map(app => app.job.id));

  return (
    <div className="mt-8 animate-fade-in">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-primary flex items-center justify-center gap-2">
                <IconSparkles className="h-8 w-8 text-amber-500" />
                AI-Powered Job Matches
            </h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                Based on your profile, here are some job opportunities we think you'll love.
            </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => {
                const isApplied = appliedJobIds.has(job.id);
                return (
                    <Card key={job.id} className="flex flex-col text-left">
                        <CardHeader>
                            <CardTitle className="text-xl">{job.jobTitle}</CardTitle>
                            <div className="text-sm text-muted-foreground flex flex-col gap-1 pt-1">
                                <span className="flex items-center gap-1.5"><IconBuilding className="h-4 w-4" /> {job.company}</span>
                                <span className="flex items-center gap-1.5"><IconMapPin className="h-4 w-4" /> {job.location}</span>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow flex flex-col">
                            <p className="text-sm text-muted-foreground mb-4 flex-grow">{job.description}</p>
                            <div>
                                <h4 className="font-semibold text-sm mb-2">Key Skills</h4>
                                <div className="flex flex-wrap gap-2">
                                    {job.skills.map((skill, i) => (
                                        <span key={i} className="bg-secondary text-secondary-foreground text-xs font-medium px-2.5 py-1 rounded-full">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                onClick={() => onApply(job)}
                                disabled={isApplied}
                                variant={isApplied ? "secondary" : "primary"}
                                className="w-full"
                            >
                                {isApplied ? 'Applied' : 'Apply Now'}
                            </Button>
                        </CardFooter>
                    </Card>
                )
            })}
        </div>
    </div>
  );
};

export default MatchingJobs;