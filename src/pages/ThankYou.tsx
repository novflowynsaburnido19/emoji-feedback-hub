
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { Smile } from 'lucide-react';

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
    <div className="min-h-screen flex flex-col">
      <Header showAdminLink={false} title="Thank You!" />
      
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="text-accent animate-pulse-scale mb-8">
          <Smile size={80} />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
          Thank You For Your Feedback!
        </h1>
        
        <p className="text-lg max-w-md mb-8 text-muted-foreground">
          Your opinion matters to us and helps us improve our services.
        </p>
        
        <Button onClick={() => navigate('/')} variant="outline" size="lg">
          Submit Another Response
        </Button>
      </main>
      
      <footer className="bg-muted py-4 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} University Registrar's Office. All rights reserved.
      </footer>
    </div>
  );
};

export default ThankYou;
