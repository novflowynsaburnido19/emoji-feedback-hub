
import { FC } from 'react';
import Header from '@/components/Header';
import FeedbackForm from '@/components/FeedbackForm';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle } from 'lucide-react';

const Index: FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-white">
      <Header showAdminLink={true} />
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="text-center mb-8 max-w-2xl mx-auto animate-fade-in">
          <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-3 mb-4">
            <MessageCircle className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
            We Value Your Feedback
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Please take a moment to share your experience with the Registrar's Office today.
            Your feedback helps us improve our services.
          </p>
        </div>
        
        <Card className="bg-card shadow-lg border-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 z-0"></div>
          <CardContent className="p-6 relative z-10">
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
