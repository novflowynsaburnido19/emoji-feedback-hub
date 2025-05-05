import { jsPDF } from 'jspdf';
import { Feedback } from '@/types/feedback';

// Map emoji ratings to text representation
const emojiToText = (rating: string): string => {
  switch (rating) {
    case 'very_satisfied': return 'Very Satisfied';
    case 'satisfied': return 'Satisfied';
    case 'neutral': return 'Neutral';
    case 'dissatisfied': return 'Dissatisfied';
    case 'very_dissatisfied': return 'Very Dissatisfied';
    default: return 'Unknown';
  }
};

// Generate PDF with Rating, Timestamp, and Comment in one table
export const generatePDF = (feedback: Feedback[]): void => {
  if (!feedback || feedback.length === 0) {
    return; // Simply return if no feedback is available, without a toast notification
  }

  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.setFont("helvetica", "normal");

  // Title of the document
  doc.text("Feedback Report", 20, 20);
  doc.setFontSize(12);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);

  // Adding table headers for Rating, Timestamp, and Comment
  const headers = ['Rating', 'Timestamp', 'Comment'];
  const startY = 40;
  const headerX = [20, 60, 120]; // X positions for the three columns
  const rowHeight = 12; // Row height for the table
  const maxCommentWidth = 150; // Width for comments column

  // Draw the table headers
  doc.text(headers[0], headerX[0], startY);
  doc.text(headers[1], headerX[1], startY);
  doc.text(headers[2], headerX[2], startY);

  // Draw a line under the headers
  doc.setLineWidth(0.5);
  doc.line(20, startY + 2, 190, startY + 2);

  let y = startY + rowHeight + 5; // Start from the next line after headers

  // Draw Rating, Timestamp, and Comment table rows
  feedback.forEach((item) => {
    if (y > 250) {
      doc.addPage();  // Add a new page if the content exceeds page space
      y = 20; // Reset y position after new page
    }

    // Add Rating and Timestamp data in rows
    doc.text(emojiToText(item.emoji), headerX[0], y);
    doc.text(item.timestamp, headerX[1], y);

    // Use splitTextToSize for wrapping comments to fit within the available width
    const commentLines = doc.splitTextToSize(item.comment || '(No comment)', maxCommentWidth);
    commentLines.forEach((line, index) => {
      doc.text(line, headerX[2], y + (index * rowHeight));
    });

    // Move to the next row after the comment (depending on how many lines it took)
    y += rowHeight * (commentLines.length + 1);
  });

  // Format the current date to be used in the filename (e.g., "2025-04-24")
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0]; // Get date in "YYYY-MM-DD" format

  // Save the PDF with the current date in the filename
  doc.save(`USTP-Registrar-feedback-${formattedDate}.pdf`);
};

// Filter feedback by date range
export const filterFeedbackByDate = (feedback: Feedback[], filter: string): Feedback[] => {
  const now = Date.now();
  const msInDay = 86400000;

  const ranges: Record<string, number> = {
    day: now - msInDay,
    week: now - msInDay * 7,
    month: now - msInDay * 30,
    year: now - msInDay * 365,
  };

  if (filter === 'all') return feedback;

  return feedback.filter(item => {
    const timestamp = new Date(item.timestamp).getTime();
    return timestamp >= ranges[filter];
  });
};
