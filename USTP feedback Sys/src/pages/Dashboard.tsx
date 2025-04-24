import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Feedback } from '@/types/feedback';
import { getFeedbackList, getFeedbackStats, clearAllFeedback } from '@/services/feedbackService';
import { generatePDF } from '@/utils/pdfExport';
import { toast } from 'sonner';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

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

export function Dashboard() {
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    counts: {} as Record<string, number>,
    percentages: {} as Record<string, number>,
  });

  // Fetch feedback list and stats
  const loadData = async () => {
    try {
      const list = await getFeedbackList();
      const feedbackStats = await getFeedbackStats();
      setFeedbackList(list);
      setStats(feedbackStats);
    } catch (error) {
      toast.error('Failed to load feedback data');
    }
  };

  // Clear all feedback from the database
  const handleClearData = async () => {
    try {
      await clearAllFeedback();
      await loadData();
      toast.success('Feedback cleared successfully');
    } catch (error) {
      toast.error('Failed to clear feedback');
    }
  };

  // Handle PDF export
  const handleExportPDF = () => {
    try {
      if (feedbackList.length === 0) {
        toast.error('No feedback available to export');
        return;
      }
      generatePDF(feedbackList);
      toast.success('PDF exported successfully');
    } catch (error) {
      toast.error('Error exporting PDF');
      console.error(error);
    }
  };

  // Load feedback data on component mount
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold">Feedback Dashboard</h1>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/">Back to Form</Link>
          </Button>
        </div>
      </header>
      <main className="flex-1 container mx-auto py-8 px-4">
        {/* Export and Clear Options */}
        <div className="flex justify-between items-center mb-6">
          <div className="space-x-2">
            <Button variant="destructive" size="sm" onClick={handleClearData} disabled={feedbackList.length === 0}>
              Clear All Data
            </Button>
            <Button variant="outline" onClick={handleExportPDF} disabled={feedbackList.length === 0}>
              Export to PDF
            </Button>
          </div>
        </div>

        {/* Feedback Summary Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Feedback Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Total Feedback: {stats.total || 0}</p>
            <div className="grid grid-cols-2 gap-4 mt-2">
              {Object.entries(stats.counts).length === 0 ? (
                <p>No feedback received yet.</p>
              ) : (
                Object.entries(stats.counts).map(([rating, count], index) => (
                  <div key={rating + index}> {/* Unique key for summary */}
                    <p>
                      {rating.replace('_', ' ').toUpperCase()}: {count} ({stats.percentages[rating]
                        ? stats.percentages[rating].toFixed(2)
                        : 0}%)
                    </p>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Feedback Distribution Chart */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Feedback Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={formatFeedbackForChart(stats)}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
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

        {/* All Responses Table Section */}
        <Card>
          <CardHeader>
            <CardTitle>All Responses</CardTitle>
          </CardHeader>
          <CardContent>
            {feedbackList.length === 0 ? (
              <p>No feedback available.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rating</TableHead>
                    <TableHead>Comment</TableHead>
                    <TableHead>Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {feedbackList.map((item, index) => (
                    <TableRow key={item.id || item.timestamp || index}> {/* Ensure unique key */}
                      <TableCell>{item.emoji}</TableCell>
                      <TableCell>{item.comment || 'N/A'}</TableCell>
                      <TableCell>{item.timestamp}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
