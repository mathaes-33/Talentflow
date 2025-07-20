
import React, { useState, useCallback } from 'react';
import Button from './ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { generateResourceContent } from '../services/geminiService';
import { IconSparkles } from './icons';

interface ResourceContentProps {
  title: string;
  description: string;
  audience: 'Job Seeker' | 'Employer';
}

const ResourceContent: React.FC<ResourceContentProps> = ({ title, description, audience }) => {
  const [content, setContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateContent = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const generatedContent = await generateResourceContent(title, audience);
      setContent(generatedContent);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [title, audience]);

  return (
    <Card className="bg-slate-50/50">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent>
        {!content && (
          <Button onClick={handleGenerateContent} disabled={isLoading} variant="secondary">
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : (
              <>
                <IconSparkles className="mr-2 h-4 w-4" /> Get AI Advice
              </>
            )}
          </Button>
        )}
        
        {error && <p className="mt-4 text-sm text-destructive font-medium">{error}</p>}

        {content && (
          <div className="mt-4 prose prose-sm max-w-none text-muted-foreground whitespace-pre-wrap animate-fade-in">
            {content}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResourceContent;
