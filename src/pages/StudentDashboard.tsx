import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  CardActions,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
  Divider,
  Chip
} from '@mui/material';
import {
  School as SchoolIcon,
  LibraryBooks as LibraryBooksIcon,
  Chat as ChatIcon,
  Search as SearchIcon,
  Feedback as FeedbackIcon,
  Assignment as AssignmentIcon,
  Grade as GradeIcon,
  DateRange as DateRangeIcon
} from '@mui/icons-material';
import DashboardLayout from '../components/DashboardLayout';
import { useNavigate } from 'react-router-dom';

const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      text: 'Dashboard',
      icon: <SchoolIcon />,
      onClick: () => console.log('Dashboard clicked')
    },
    {
      text: 'Lectures',
      icon: <LibraryBooksIcon />,
      onClick: () => console.log('Lectures clicked')
    },
    {
      text: 'Chatbot',
      icon: <ChatIcon />,
      onClick: () => navigate('/chatbot')
    },
    {
      text: 'Search',
      icon: <SearchIcon />,
      onClick: () => console.log('Search clicked')
    },
    {
      text: 'Feedback',
      icon: <FeedbackIcon />,
      onClick: () => console.log('Feedback clicked')
    }
  ];

  // Mock data for recent lectures
  const recentLectures = [
    { id: 1, title: 'Introduction to AI', date: '2023-03-15', duration: '60 min' },
    { id: 2, title: 'Machine Learning Basics', date: '2023-03-12', duration: '45 min' },
    { id: 3, title: 'Data Structures', date: '2023-03-08', duration: '75 min' }
  ];

  // Mock data for assignments
  const assignments = [
    { id: 1, title: 'AI Project Proposal', dueDate: '2023-03-25', status: 'Pending' },
    { id: 2, title: 'ML Algorithm Implementation', dueDate: '2023-04-05', status: 'Not Started' },
    { id: 3, title: 'Data Structures Quiz', dueDate: '2023-03-20', status: 'Completed' }
  ];

  return (
    <DashboardLayout title="Student Dashboard" menuItems={menuItems}>
      <Typography variant="h4" gutterBottom>
        Welcome, Student!
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
        Your learning journey at a glance
      </Typography>

      <Grid container spacing={3}>
        {/* Recent Lectures */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Recent Lectures
            </Typography>
            <List>
              {recentLectures.map((lecture) => (
                <React.Fragment key={lecture.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={lecture.title}
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="text.primary">
                            {lecture.date}
                          </Typography>
                          {` — ${lecture.duration}`}
                        </>
                      }
                    />
                    <Button variant="outlined" size="small">
                      View Transcript
                    </Button>
                  </ListItem>
                  <Divider component="li" />
                </React.Fragment>
              ))}
            </List>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Button variant="contained" onClick={() => navigate('/lecture-search')}>View All Lectures</Button>
            </Box>
          </Paper>
        </Grid>

        {/* Assignments */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Assignments
            </Typography>
            <List>
              {assignments.map((assignment) => (
                <React.Fragment key={assignment.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={assignment.title}
                      secondary={`Due: ${assignment.dueDate}`}
                    />
                    <Chip 
                      label={assignment.status} 
                      color={
                        assignment.status === 'Completed' 
                          ? 'success' 
                          : assignment.status === 'Pending' 
                            ? 'warning' 
                            : 'error'
                      }
                      size="small"
                    />
                  </ListItem>
                  <Divider component="li" />
                </React.Fragment>
              ))}
            </List>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Button variant="contained">View All Assignments</Button>
            </Box>
          </Paper>
        </Grid>

        {/* Lecture Search */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Search Lecture Materials
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Find lecture transcripts, videos, and other materials quickly.
              </Typography>
              <TextField
                fullWidth
                label="Search for lectures"
                variant="outlined"
                InputProps={{
                  endAdornment: <SearchIcon />
                }}
              />
            </CardContent>
            <CardActions>
              <Box sx={{ mt: 8, width: '100%', textAlign: 'center' }}>
                <Button variant="contained" onClick={() => navigate('/lecture-search')}>Advanced Search</Button>
              </Box>
            </CardActions>
          </Card>
        </Grid>

        {/* Chatbot */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom>
                AI Chatbot Assistant
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Get immediate answers to your questions about course materials.
              </Typography>
              <Paper variant="outlined" sx={{ p: 2, mb: 2, bgcolor: '#f5f5f5', minHeight: '100px' }}>
                <Typography variant="body2">
                  <b>AI Assistant:</b> Hello! How can I help you with your courses today?
                </Typography>
              </Paper>
            </CardContent>
            <CardActions>
              <Box sx={{ width: '100%', textAlign: 'center' }}>
                <Button variant="contained" startIcon={<ChatIcon />} onClick={() => navigate('/chatbot')}>
                  Start Chatting
                </Button>
              </Box>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default StudentDashboard; 