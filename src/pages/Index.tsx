
import { FC } from 'react';
import Header from '@/components/Header';
import FeedbackForm from '@/components/FeedbackForm';
import { Card, CardContent } from '@/components/ui/card';

const Index: FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header showAdminLink={true} />
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
            We Value Your Feedback
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Please take a moment to share your experience with the Registrar's Office today.
            Your feedback helps us improve our services.
          </p>
        </div>
        
        <Card className="bg-card shadow-lg">
          <CardContent className="p-6">
            <FeedbackForm />
          </CardContent>
        </Card>
      </main>
      
      <footer className="bg-muted py-4 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} University Registrar's Office. All rights reserved.
      </footer>
    </div>
  );
};

export default Index;
