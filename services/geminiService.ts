import type { ParsedResume, Job, JobAnalysis } from '../types';

const apiFunctionEndpoint = '/.netlify/functions/api';

async function callApi<T>(endpoint: string, payload: unknown): Promise<T> {
    try {
        const response = await fetch(apiFunctionEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ endpoint, payload }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `API call to endpoint '${endpoint}' failed`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error calling API endpoint '${endpoint}':`, error);
        if (error instanceof Error) {
            throw new Error(`Failed during API call. Error: ${error.message}`);
        }
        throw new Error("An unknown error occurred during the API call.");
    }
}

export const parseResume = async (resumeText: string): Promise<ParsedResume> => {
    return callApi<ParsedResume>('parseResume', { resumeText });
};

export const findMatchingJobs = async (profile: ParsedResume): Promise<Job[]> => {
    const jobs = await callApi<Omit<Job, 'id' | 'status' | 'analysis'>[]>('findMatchingJobs', { profile });
    return jobs.map((job) => ({
        ...job,
        id: Math.random().toString(36).substring(2, 9),
        status: 'approved',
        analysis: null,
    }));
};

export const analyzeJobDescription = async (jobInfo: {title: string, company: string, description: string}): Promise<JobAnalysis> => {
    return callApi<JobAnalysis>('analyzeJobDescription', { jobInfo });
};

export const findSimilarJobs = async (job: Omit<Job, 'id' | 'status' | 'analysis' | 'skills'>): Promise<Omit<Job, 'id' | 'status' | 'analysis'>[]> => {
    return callApi<Omit<Job, 'id' | 'status' | 'analysis'>[]>('findSimilarJobs', { job });
};

export const generateResourceContent = async (topic: string, audience: 'Job Seeker' | 'Employer'): Promise<string> => {
    const result = await callApi<{ content: string }>('generateResourceContent', { topic, audience });
    return result.content;
};
