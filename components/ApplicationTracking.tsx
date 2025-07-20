import React from 'react';
import type { Application } from '../types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/Card';
import { IconClipboardList } from './icons';

interface ApplicationTrackingProps {
  applications: Application[];
}

const statusStyles: { [key in Application['status']]: string } = {
    Applied: 'bg-blue-100 text-blue-800',
    'Under Review': 'bg-yellow-100 text-yellow-800',
    Interview: 'bg-purple-100 text-purple-800',
    'Offer Extended': 'bg-green-100 text-green-800',
    Closed: 'bg-red-100 text-red-800',
};


const ApplicationTracking: React.FC<ApplicationTrackingProps> = ({ applications }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="bg-primary p-3 rounded-full">
            <IconClipboardList className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold text-primary">My Application Tracker</CardTitle>
            <CardDescription>Keep track of all your job applications in one place.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {applications.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">You haven't applied to any jobs yet.</p>
            <p className="text-muted-foreground">Find matching jobs above to get started!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <div key={app.job.id} className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 p-4 border rounded-lg bg-white shadow-sm">
                <div className="md:col-span-2">
                  <h4 className="font-bold text-lg text-primary">{app.job.jobTitle}</h4>
                  <p className="text-muted-foreground">{app.job.company}</p>
                </div>
                <div className="flex flex-col items-start md:items-end">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusStyles[app.status]}`}>
                    {app.status}
                  </span>
                   <p className="text-xs text-muted-foreground mt-2">Applied on: {app.appliedDate}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ApplicationTracking;