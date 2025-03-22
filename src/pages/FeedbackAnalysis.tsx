import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TextField,
  Button
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  FilterList as FilterListIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  RemoveCircle as RemoveCircleIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';

// Note: In a real application, you would use a proper charting library like Chart.js,
// React-vis, or Recharts. For this example, we're creating simple mock visualizations.

const FeedbackAnalysis: React.FC = () => {
  const navigate = useNavigate();
  const [course, setCourse] = useState<string>('all');
  const [assignment, setAssignment] = useState<string>('all');
  const [startDate, setStartDate] = useState<string>('2023-03-01');
  const [endDate, setEndDate] = useState<string>('2023-03-31');

  const menuItems = [
    {
      text: 'Back to Dashboard',
      icon: <ArrowBackIcon />,
      onClick: () => navigate('/dashboard/teacher')
    }
  ];

  // Mock data for sentiment distribution
  const sentimentData = {
    positive: 65,
    neutral: 25,
    negative: 10
  };

  // Mock data for feedback trends (last 7 days)
  const trendDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });

  const trendData = [
    { day: trendDates[0], positive: 12, neutral: 5, negative: 3 },
    { day: trendDates[1], positive: 15, neutral: 6, negative: 2 },
    { day: trendDates[2], positive: 10, neutral: 8, negative: 4 },
    { day: trendDates[3], positive: 18, neutral: 7, negative: 1 },
    { day: trendDates[4], positive: 14, neutral: 4, negative: 2 },
    { day: trendDates[5], positive: 16, neutral: 6, negative: 3 },
    { day: trendDates[6], positive: 20, neutral: 5, negative: 2 }
  ];

  // Mock data for individual feedback entries
  const feedbackEntries = [
    { id: 1, student: 'John Doe', course: 'Introduction to AI', assignment: 'Project 1', feedback: 'The lecture was clear and informative. I really enjoyed the examples provided.', sentiment: 'Positive', score: 0.87 },
    { id: 2, student: 'Jane Smith', course: 'Introduction to AI', assignment: 'Project 1', feedback: 'Instructions could have been clearer, but overall the content was good.', sentiment: 'Neutral', score: 0.52 },
    { id: 3, student: 'Bob Johnson', course: 'Machine Learning Basics', assignment: 'Assignment 2', feedback: 'The material was too advanced and I struggled to follow along.', sentiment: 'Negative', score: 0.23 },
    { id: 4, student: 'Alice Williams', course: 'Machine Learning Basics', assignment: 'Quiz 1', feedback: 'Great quiz! It really helped me understand the concepts.', sentiment: 'Positive', score: 0.92 },
    { id: 5, student: 'Mike Brown', course: 'Data Structures', assignment: 'Homework 3', feedback: 'The assignment was challenging but very rewarding once completed.', sentiment: 'Positive', score: 0.78 }
  ];

  // Get mock courses and assignments for filters
  const courses = ['Introduction to AI', 'Machine Learning Basics', 'Data Structures'];
  const assignments = ['Project 1', 'Assignment 2', 'Quiz 1', 'Homework 3'];

  // Calculate the total feedback count
  const totalFeedback = sentimentData.positive + sentimentData.neutral + sentimentData.negative;

  // Filter feedback entries based on selected filters
  const filteredFeedback = feedbackEntries.filter(entry => 
    (course === 'all' || entry.course === course) &&
    (assignment === 'all' || entry.assignment === assignment)
    // In a real application, you would also filter by date range
  );

  return (
    <DashboardLayout title="Feedback Analysis" menuItems={menuItems}>
      <Container maxWidth="xl">
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Feedback Analysis
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Analyze student feedback and assignments using Azure Text Analytics.
          </Typography>

          {/* Filters */}
          <Paper elevation={1} sx={{ p: 2, mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <FilterListIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Filters</Typography>
            </Box>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Course</InputLabel>
                  <Select
                    value={course}
                    label="Course"
                    onChange={(e) => setCourse(e.target.value)}
                  >
                    <MenuItem value="all">All Courses</MenuItem>
                    {courses.map((c, i) => (
                      <MenuItem key={i} value={c}>{c}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Assignment</InputLabel>
                  <Select
                    value={assignment}
                    label="Assignment"
                    onChange={(e) => setAssignment(e.target.value)}
                  >
                    <MenuItem value="all">All Assignments</MenuItem>
                    {assignments.map((a, i) => (
                      <MenuItem key={i} value={a}>{a}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="Start Date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  fullWidth
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="End Date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  fullWidth
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="contained" size="small">
                Apply Filters
              </Button>
            </Box>
          </Paper>

          {/* Sentiment Analysis Section */}
          <Typography variant="h5" gutterBottom>
            Sentiment Analysis
          </Typography>
          
          <Grid container spacing={4} sx={{ mb: 4 }}>
            {/* Sentiment Distribution */}
            <Grid item xs={12} md={6}>
              <Paper elevation={1} sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" align="center" gutterBottom>
                  Sentiment Distribution
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                  {/* Simple mock pie chart representation */}
                  <Box sx={{ display: 'flex', position: 'relative', width: 200, height: 200 }}>
                    <Box sx={{ 
                      position: 'absolute',
                      width: 200,
                      height: 200,
                      borderRadius: '50%',
                      background: `conic-gradient(
                        #4caf50 0% ${sentimentData.positive}%, 
                        #2196f3 ${sentimentData.positive}% ${sentimentData.positive + sentimentData.neutral}%, 
                        #f44336 ${sentimentData.positive + sentimentData.neutral}% 100%
                      )`
                    }} />
                    <Box sx={{ 
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      bgcolor: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column'
                    }}>
                      <Typography variant="h6">{totalFeedback}</Typography>
                      <Typography variant="caption">Total</Typography>
                    </Box>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: 16, height: 16, bgcolor: '#4caf50', mr: 1, borderRadius: 1 }} />
                    <Typography variant="body2">Positive ({sentimentData.positive}%)</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: 16, height: 16, bgcolor: '#2196f3', mr: 1, borderRadius: 1 }} />
                    <Typography variant="body2">Neutral ({sentimentData.neutral}%)</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: 16, height: 16, bgcolor: '#f44336', mr: 1, borderRadius: 1 }} />
                    <Typography variant="body2">Negative ({sentimentData.negative}%)</Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
            
            {/* Key Metrics */}
            <Grid item xs={12} md={6}>
              <Paper elevation={1} sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" align="center" gutterBottom>
                  Key Metrics
                </Typography>
                
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={6}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e8f5e9' }}>
                      <Typography variant="h4" color="success.main" sx={{ mb: 1 }}>
                        0.75
                      </Typography>
                      <Typography variant="body2">
                        Average Sentiment Score
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e3f2fd' }}>
                      <Typography variant="h4" color="primary" sx={{ mb: 1 }}>
                        {totalFeedback}
                      </Typography>
                      <Typography variant="body2">
                        Total Feedback Count
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
                
                <Typography variant="subtitle2" gutterBottom>
                  Sentiment by Course
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" sx={{ width: 200 }}>Introduction to AI</Typography>
                    <Box sx={{ flex: 1, height: 8, borderRadius: 4, bgcolor: '#f5f5f5', overflow: 'hidden' }}>
                      <Box sx={{ width: '80%', height: '100%', bgcolor: '#4caf50' }} />
                    </Box>
                    <Typography variant="body2" sx={{ ml: 1 }}>80%</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" sx={{ width: 200 }}>Machine Learning Basics</Typography>
                    <Box sx={{ flex: 1, height: 8, borderRadius: 4, bgcolor: '#f5f5f5', overflow: 'hidden' }}>
                      <Box sx={{ width: '65%', height: '100%', bgcolor: '#4caf50' }} />
                    </Box>
                    <Typography variant="body2" sx={{ ml: 1 }}>65%</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ width: 200 }}>Data Structures</Typography>
                    <Box sx={{ flex: 1, height: 8, borderRadius: 4, bgcolor: '#f5f5f5', overflow: 'hidden' }}>
                      <Box sx={{ width: '70%', height: '100%', bgcolor: '#4caf50' }} />
                    </Box>
                    <Typography variant="body2" sx={{ ml: 1 }}>70%</Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>

          {/* Feedback Trends Section */}
          <Typography variant="h5" gutterBottom>
            Feedback Trends
          </Typography>
          
          <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" align="center" gutterBottom>
              Sentiment Trends (Last 7 Days)
            </Typography>
            
            <Box sx={{ height: 250, px: 2, py: 4, position: 'relative' }}>
              {/* X-axis labels */}
              <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, display: 'flex', justifyContent: 'space-between' }}>
                {trendData.map((item, index) => (
                  <Typography key={index} variant="caption" sx={{ transform: 'translateX(-50%)' }}>
                    {item.day}
                  </Typography>
                ))}
              </Box>
              
              {/* Y-axis grid lines */}
              {[0, 25, 50, 75, 100].map((value, index) => (
                <Box 
                  key={index} 
                  sx={{ 
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: `${value * 2}px`,
                    borderBottom: index > 0 ? '1px dashed rgba(0,0,0,0.1)' : 'none'
                  }}
                />
              ))}
              
              {/* Bars for each day */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', height: '100%', position: 'relative' }}>
                {trendData.map((item, index) => {
                  const posHeight = (item.positive / 25) * 100;
                  const neuHeight = (item.neutral / 25) * 100;
                  const negHeight = (item.negative / 25) * 100;
                  
                  return (
                    <Box key={index} sx={{ display: 'flex', flexDirection: 'column-reverse', width: 40, alignItems: 'center' }}>
                      <Box sx={{ width: '60%', height: `${posHeight}px`, bgcolor: '#4caf50', borderTopLeftRadius: 2, borderTopRightRadius: 2 }} />
                      <Box sx={{ width: '60%', height: `${neuHeight}px`, bgcolor: '#2196f3' }} />
                      <Box sx={{ width: '60%', height: `${negHeight}px`, bgcolor: '#f44336' }} />
                    </Box>
                  );
                })}
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mx: 2 }}>
                <Box sx={{ width: 16, height: 16, bgcolor: '#4caf50', mr: 1, borderRadius: 1 }} />
                <Typography variant="body2">Positive</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mx: 2 }}>
                <Box sx={{ width: 16, height: 16, bgcolor: '#2196f3', mr: 1, borderRadius: 1 }} />
                <Typography variant="body2">Neutral</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mx: 2 }}>
                <Box sx={{ width: 16, height: 16, bgcolor: '#f44336', mr: 1, borderRadius: 1 }} />
                <Typography variant="body2">Negative</Typography>
              </Box>
            </Box>
          </Paper>

          {/* Feedback List Section */}
          <Typography variant="h5" gutterBottom>
            Individual Feedback
          </Typography>
          
          <Paper elevation={1} sx={{ p: 3 }}>
            <TableContainer>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Student</TableCell>
                    <TableCell>Course</TableCell>
                    <TableCell>Assignment</TableCell>
                    <TableCell>Feedback</TableCell>
                    <TableCell>Sentiment</TableCell>
                    <TableCell align="right">Score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredFeedback.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>{entry.student}</TableCell>
                      <TableCell>{entry.course}</TableCell>
                      <TableCell>{entry.assignment}</TableCell>
                      <TableCell>{entry.feedback}</TableCell>
                      <TableCell>
                        <Chip
                          icon={
                            entry.sentiment === 'Positive' ? <ThumbUpIcon fontSize="small" /> :
                            entry.sentiment === 'Negative' ? <ThumbDownIcon fontSize="small" /> :
                            <RemoveCircleIcon fontSize="small" />
                          }
                          label={entry.sentiment}
                          color={
                            entry.sentiment === 'Positive' ? 'success' :
                            entry.sentiment === 'Negative' ? 'error' :
                            'info'
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="right">{entry.score.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Paper>
      </Container>
    </DashboardLayout>
  );
};

export default FeedbackAnalysis; 