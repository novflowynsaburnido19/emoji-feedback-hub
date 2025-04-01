
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { Smile, ArrowLeft, MessageCircle } from 'lucide-react';

const ThankYou: FC = () => {
  const navigate = useNavigate();
  
  // Auto-redirect to home after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 10000);
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-white">
      <Header showAdminLink={false} title="Thank You!" />
      
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-accent/20 animate-pulse-scale"></div>
          <div className="relative text-accent p-8 bg-white rounded-full shadow-md">
            <Smile size={80} fill="#FFD23F" strokeWidth={1.5} />
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-4 text-primary">
          Thank You For Your Feedback!
        </h1>
        
        <p className="text-lg max-w-md mb-8 text-muted-foreground">
          Your opinion matters to us and helps us improve our services.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            onClick={() => navigate('/')} 
            variant="outline" 
            size="lg"
            className="rounded-full px-6 flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Button>
          
          <Button
            onClick={() => navigate('/')}
            size="lg"
            className="rounded-full px-6 flex items-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            Submit Another Response
          </Button>
        </div>
      </main>
      
      <footer className="bg-muted py-4 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} University Registrar's Office. All rights reserved.
      </footer>
    </div>
  );
};

export default ThankYou;
