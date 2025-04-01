
import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { Feedback, EmojiRating } from '@/types/feedback';
import { getFeedbackList, getFeedbackStats, clearAllFeedback } from '@/services/feedbackService';
import { useToast } from '@/components/ui/use-toast';
import { Smile, Meh, Frown, Angry, Trash2 } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

// Helper to get emoji based on rating
const getEmojiIcon = (rating: EmojiRating) => {
  switch (rating) {
    case 'very_satisfied':
      return <Smile className="w-6 h-6 text-green-500" strokeWidth={2} />;
    case 'satisfied':
      return <Smile className="w-6 h-6 text-green-400" strokeWidth={1.5} />;
    case 'neutral':
      return <Meh className="w-6 h-6 text-gray-400" />;
    case 'dissatisfied':
      return <Frown className="w-6 h-6 text-orange-400" />;
    case 'very_dissatisfied':
      return <Angry className="w-6 h-6 text-red-500" />;
  }
};

// Helper to format feedback for the chart
const formatFeedbackForChart = (stats: ReturnType<typeof getFeedbackStats>) => {
  return [
    { name: 'Very Satisfied', value: stats.counts.very_satisfied || 0, fill: '#10B981' },
    { name: 'Satisfied', value: stats.counts.satisfied || 0, fill: '#34D399' },
    { name: 'Neutral', value: stats.counts.neutral || 0, fill: '#9CA3AF' },
    { name: 'Dissatisfied', value: stats.counts.dissatisfied || 0, fill: '#FB923C' },
    { name: 'Very Dissatisfied', value: stats.counts.very_dissatisfied || 0, fill: '#EF4444' },
  ];
};

// Helper to format date
const formatDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleString();
};

const Dashboard: FC = () => {
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [stats, setStats] = useState<ReturnType<typeof getFeedbackStats>>(
    { total: 0, counts: {}, percentages: {} }
  );
  const { toast } = useToast();
  
  // Load feedback data
  const loadData = () => {
    const list = getFeedbackList();
    setFeedbackList(list);
    setStats(getFeedbackStats());
  };
  
  // Load on mount
  useEffect(() => {
    loadData();
  }, []);
  
  // Handle clearing all feedback
  const handleClearData = () => {
    if (window.confirm('Are you sure you want to delete all feedback data? This cannot be undone.')) {
      clearAllFeedback();
      loadData();
      toast({
        title: "Data cleared",
        description: "All feedback data has been deleted"
      });
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header showAdminLink={false} title="Feedback Dashboard" />
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="space-x-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">Back to Form</Link>
            </Button>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={handleClearData}
              disabled={feedbackList.length === 0}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All Data
            </Button>
          </div>
        </div>
        
        {feedbackList.length === 0 ? (
          <Card className="p-8 text-center">
            <CardContent>
              <p className="text-muted-foreground">No feedback data available yet.</p>
              <Button variant="outline" className="mt-4" asChild>
                <Link to="/">Go to Feedback Form</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue="summary">
            <TabsList className="mb-6">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="data">All Responses</TabsTrigger>
            </TabsList>
            
            <TabsContent value="summary">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                <Card className="lg:col-span-1">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Total Responses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold">{stats.total}</p>
                  </CardContent>
                </Card>
                
                {['very_satisfied', 'satisfied', 'neutral', 'dissatisfied'].map((rating) => (
                  <Card key={rating} className="lg:col-span-1">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        {getEmojiIcon(rating as EmojiRating)}
                        <span className="ml-2">{rating.replace('_', ' ')}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-baseline">
                        <p className="text-3xl font-bold">{stats.counts[rating as EmojiRating] || 0}</p>
                        <p className="text-sm text-muted-foreground">
                          {stats.percentages[rating as EmojiRating] || 0}%
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Feedback Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={formatFeedbackForChart(stats)} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" name="Responses" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="data">
              <Card>
                <CardHeader>
                  <CardTitle>All Feedback Responses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md overflow-hidden">
                    <table className="min-w-full divide-y divide-border">
                      <thead className="bg-muted">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Rating
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Comment
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Date/Time
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-card divide-y divide-border">
                        {feedbackList.map((item) => (
                          <tr key={item.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                {getEmojiIcon(item.rating)}
                                <span className="ml-2 capitalize">{item.rating.replace('_', ' ')}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              {item.comment ? (
                                <span>{item.comment}</span>
                              ) : (
                                <span className="text-muted-foreground italic">No comment</span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                              {formatDate(item.timestamp)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </main>
      
      <footer className="bg-muted py-4 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} University Registrar's Office. All rights reserved.
      </footer>
    </div>
  );
};

export default Dashboard;
