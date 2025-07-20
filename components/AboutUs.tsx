
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/Card';
import { IconLightbulb, IconShieldCheck, IconUsers } from './icons';

const teamMembers = [
  {
    name: 'Eleanor Vance',
    title: 'Founder & CEO',
    imageUrl: 'https://images.unsplash.com/photo-1569496736555-47c448d556f7?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Marcus Holloway',
    title: 'Head of AI Development',
    imageUrl: 'https://images.unsplash.com/photo-1672748341520-6a839e6c05bb?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Anya Sharma',
    title: 'Lead Talent Strategist',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1663089278745-395adad0c773?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'David Chen',
    title: 'Chief Operating Officer',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1661921241545-bacf0946e374?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const AboutUs = () => {
  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl md:text-4xl font-extrabold text-primary">The Future of Talent Acquisition</CardTitle>
        <CardDescription className="max-w-3xl mx-auto text-lg">
          TalentFlow AI was founded on the belief that the hiring process should be smarter, faster, and more human-centric. We leverage cutting-edge artificial intelligence to bridge the gap between exceptional talent and innovative companies.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-12">
        {/* Our Values Section */}
        <section>
          <h3 className="text-2xl font-bold text-center mb-6 text-primary">Our Core Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-primary text-primary-foreground rounded-full p-4 mb-3">
                <IconLightbulb className="h-8 w-8" />
              </div>
              <h4 className="font-semibold text-lg">Innovation</h4>
              <p className="text-muted-foreground">We relentlessly pursue technological advancements to redefine recruitment and deliver unparalleled results.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary text-primary-foreground rounded-full p-4 mb-3">
                <IconShieldCheck className="h-8 w-8" />
              </div>
              <h4 className="font-semibold text-lg">Integrity</h4>
              <p className="text-muted-foreground">We operate with unwavering honesty, transparency, and respect for our clients and candidates.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary text-primary-foreground rounded-full p-4 mb-3">
                <IconUsers className="h-8 w-8" />
              </div>
              <h4 className="font-semibold text-lg">Partnership</h4>
              <p className="text-muted-foreground">We build lasting relationships, acting as a true extension of your team to achieve shared success.</p>
            </div>
          </div>
        </section>

        {/* Meet the Team Section */}
        <section>
          <h3 className="text-2xl font-bold text-center mb-6 text-primary">Meet Our Team</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="text-center">
                <img
                  src={member.imageUrl}
                  alt={`Portrait of ${member.name}`}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-lg"
                />
                <h4 className="font-semibold text-lg">{member.name}</h4>
                <p className="text-primary font-medium">{member.title}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="bg-slate-50 p-8 rounded-lg">
          <blockquote className="text-center text-muted-foreground italic text-lg">
            “TalentFlow AI didn't just find us a candidate; they found us the perfect team member. The AI matching was incredibly accurate, and the process was faster than we ever thought possible.”
          </blockquote>
          <footer className="text-center mt-4 font-semibold text-primary">
            - Sarah Johnson, CTO at Innovate Inc.
          </footer>
        </section>
      </CardContent>
    </Card>
  );
};

export default AboutUs;
