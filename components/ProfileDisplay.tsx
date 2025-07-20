
import React from 'react';
import type { ParsedResume, Experience, Education } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { IconUser, IconMail, IconPhone, IconBriefcase, IconGraduationCap, IconHome } from './icons';

interface ProfileDisplayProps {
  data: ParsedResume;
}

const ProfileDisplay: React.FC<ProfileDisplayProps> = ({ data }) => {
  return (
    <Card className="w-full mx-auto bg-slate-50 border-t-4 border-primary">
      <CardHeader>
        <div className="text-center">
            <CardTitle className="text-3xl text-primary">{data.fullName}</CardTitle>
            <div className="mt-2 flex justify-center items-center flex-wrap gap-x-4 gap-y-2 text-muted-foreground text-sm">
                {data.email && <span className="flex items-center gap-1.5"><IconMail className="h-4 w-4" /> {data.email}</span>}
                {data.phone && <span className="flex items-center gap-1.5"><IconPhone className="h-4 w-4" /> {data.phone}</span>}
                {data.address && <span className="flex items-center gap-1.5"><IconHome className="h-4 w-4" /> {data.address}</span>}
            </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Summary Section */}
        <section>
          <h2 className="text-xl font-bold text-primary flex items-center gap-2 mb-2">
            <IconUser className="h-5 w-5" /> Professional Summary
          </h2>
          <p className="text-muted-foreground">{data.summary}</p>
        </section>

        {/* Skills Section */}
        {data.skills && data.skills.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-primary mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span key={index} className="bg-secondary text-secondary-foreground text-sm font-medium px-3 py-1 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Experience Section */}
        {data.experience && data.experience.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-primary flex items-center gap-2 mb-4">
                <IconBriefcase className="h-5 w-5" /> Work Experience
            </h2>
            <div className="space-y-4 border-l-2 border-slate-200 pl-4">
              {data.experience.map((exp, index) => (
                <div key={index} className="relative">
                  <div className="absolute -left-[26px] top-1 h-3 w-3 rounded-full bg-primary"></div>
                  <h3 className="font-semibold text-lg">{exp.jobTitle}</h3>
                  <p className="font-medium text-primary">{exp.company} - {exp.location}</p>
                  <p className="text-xs text-muted-foreground mb-2">{exp.dates}</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {exp.responsibilities.map((resp, i) => <li key={i}>{resp}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education Section */}
        {data.education && data.education.length > 0 && (
          <section>
             <h2 className="text-xl font-bold text-primary flex items-center gap-2 mb-4">
                <IconGraduationCap className="h-5 w-5" /> Education
            </h2>
             <div className="space-y-3">
                {data.education.map((edu, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg border">
                        <h3 className="font-semibold">{edu.degree}</h3>
                        <p className="text-muted-foreground">{edu.institution}, {edu.location}</p>
                        <p className="text-sm text-muted-foreground">Graduated: {edu.graduationYear}</p>
                    </div>
                ))}
             </div>
          </section>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileDisplay;
