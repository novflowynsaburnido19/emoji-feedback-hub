
import jsPDF from 'jspdf';
import { format, subDays, subWeeks, subMonths, subYears, isAfter } from 'date-fns';
import { Feedback, EmojiRating } from '@/types/feedback';

// Map emoji ratings to text representation for PDF
const emojiToText = (rating: EmojiRating): string => {
  switch (rating) {
    case 'very_satisfied': return '😁 Very Satisfied';
    case 'satisfied': return '🙂 Satisfied';
    case 'neutral': return '😐 Neutral';
    case 'dissatisfied': return '🙁 Dissatisfied';
    case 'very_dissatisfied': return '😠 Very Dissatisfied';
  }
};

// Filter feedback by date range
export const filterFeedbackByDate = (
  feedback: Feedback[], 
  filterType: 'all' | 'day' | 'week' | 'month' | 'year'
): Feedback[] => {
  if (filterType === 'all') return feedback;
  
  const now = new Date();
  const cutoffDate = 
    filterType === 'day' ? subDays(now, 1) :
    filterType === 'week' ? subWeeks(now, 1) :
    filterType === 'month' ? subMonths(now, 1) :
    subYears(now, 1);
  
  return feedback.filter(item => isAfter(new Date(item.timestamp), cutoffDate));
};

// Generate PDF report
export const generatePDF = (feedback: Feedback[], filterType: 'all' | 'day' | 'week' | 'month' | 'year'): void => {
  const filteredFeedback = filterFeedbackByDate(feedback, filterType);
  const doc = new jsPDF();
  
  // Add title and current date
  const currentDate = format(new Date(), 'MMMM d, yyyy');
  const title = `Registrar's Office Feedback Report - ${currentDate}`;
  doc.setFontSize(16);
  doc.text(title, 20, 20);
  
  // Add filter information
  doc.setFontSize(12);
  const filterText = filterType === 'all' 
    ? 'All Time' 
    : `Last ${filterType.charAt(0).toUpperCase() + filterType.slice(1)}`;
  doc.text(`Period: ${filterText}`, 20, 30);
  doc.text(`Total Responses: ${filteredFeedback.length}`, 20, 40);
  
  // Column headers
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Date', 20, 55);
  doc.text('Rating', 80, 55);
  doc.text('Comment', 140, 55);
  
  // Separator line
  doc.line(20, 58, 190, 58);
  
  // Add feedback items
  doc.setFont('helvetica', 'normal');
  let y = 65;
  
  filteredFeedback.forEach((item, index) => {
    // Check if we need a new page
    if (y > 270) {
      doc.addPage();
      // Reset y position and redraw headers on new page
      y = 20;
      doc.setFont('helvetica', 'bold');
      doc.text('Date', 20, y);
      doc.text('Rating', 80, y);
      doc.text('Comment', 140, y);
      doc.line(20, y + 3, 190, y + 3);
      doc.setFont('helvetica', 'normal');
      y += 10;
    }
    
    const date = format(new Date(item.timestamp), 'MM/dd/yyyy HH:mm');
    const rating = emojiToText(item.rating);
    const comment = item.comment || '(No comment)';
    
    // Truncate comment if too long
    const truncatedComment = comment.length > 25 ? comment.substring(0, 22) + '...' : comment;
    
    doc.text(date, 20, y);
    doc.text(rating, 80, y);
    doc.text(truncatedComment, 140, y);
    
    y += 8;
  });
  
  // Save the PDF
  doc.save(`registrar-feedback-${filterType}-${format(new Date(), 'yyyy-MM-dd')}.pdf`);
};
