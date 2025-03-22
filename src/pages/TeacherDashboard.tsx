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
  IconButton,
  Chip,
  LinearProgress,
  Container
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  CloudUpload as CloudUploadIcon,
  PeopleAlt as PeopleAltIcon,
  Assessment as AssessmentIcon,
  LibraryBooks as LibraryBooksIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Chat as ChatIcon,
  Upload as UploadIcon,
  Analytics as AnalyticsIcon,
  School as SchoolIcon,
  Assignment as AssignmentIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';

const TeacherDashboard: React.FC = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      text: 'Dashboard',
      icon: <DashboardIcon />,
      onClick: () => console.log('Dashboard clicked')
    },
    {
      text: 'Upload Lectures',
      icon: <CloudUploadIcon />,
      onClick: () => navigate('/lecture-upload')
    },
    {
      text: 'Students',
      icon: <PeopleAltIcon />,
      onClick: () => console.log('Students clicked')
    },
    {
      text: 'Feedback Analysis',
      icon: <AssessmentIcon />,
      onClick: () => navigate('/feedback-analysis')
    },
    {
      text: 'Lecture Materials',
      icon: <LibraryBooksIcon />,
      onClick: () => console.log('Lecture Materials clicked')
    }
  ];

  // Mock data for recent lectures
  const recentLectures = [
    { id: 1, title: 'Introduction to AI', date: '2023-03-15', views: 32 },
    { id: 2, title: 'Machine Learning Basics', date: '2023-03-12', views: 28 },
    { id: 3, title: 'Data Structures', date: '2023-03-08', views: 45 }
  ];

  // Mock data for student feedback
  const studentFeedback = [
    { id: 1, course: 'Introduction to AI', sentiment: 'Positive', score: 0.8 },
    { id: 2, course: 'Machine Learning Basics', sentiment: 'Neutral', score: 0.5 },
    { id: 3, course: 'Data Structures', sentiment: 'Positive', score: 0.7 }
  ];

  const dashboardItems = [
    {
      title: 'Assignments',
      description: 'Create and manage assignments for your students.',
      icon: <AssignmentIcon fontSize="large" color="primary" />,
      action: 'Manage Assignments',
      onClick: () => console.log('Manage assignments clicked')
    },
    {
      title: 'Lecture Upload',
      description: 'Upload lecture recordings for automatic transcription.',
      icon: <UploadIcon fontSize="large" color="primary" />,
      action: 'Upload Lectures',
      onClick: () => navigate('/lecture-upload')
    },
    {
      title: 'Feedback Analysis',
      description: 'Analyze student feedback using Azure AI.',
      icon: <AnalyticsIcon fontSize="large" color="primary" />,
      action: 'View Feedback',
      onClick: () => navigate('/feedback-analysis')
    },
    {
      title: 'Lecture Materials',
      description: 'Search and manage lecture notes, videos, and transcripts.',
      icon: <SearchIcon fontSize="large" color="primary" />,
      action: 'Search Materials',
      onClick: () => navigate('/lecture-search')
    }
  ];

  return (
    <DashboardLayout title="Teacher Dashboard" menuItems={menuItems}>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          {/* Dashboard items grid */}
          {dashboardItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={6} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6
                  }
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  {item.icon}
                </Box>
                <Typography variant="h5" component="div" gutterBottom align="center">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph align="center" sx={{ flexGrow: 1 }}>
                  {item.description}
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={item.onClick}
                  fullWidth
                >
                  {item.action}
                </Button>
              </Paper>
            </Grid>
          ))}

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
                        secondary={`Uploaded on: ${lecture.date} • ${lecture.views} views`}
                      />
                      <Box>
                        <IconButton size="small" color="primary">
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="primary">
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </ListItem>
                    <Divider component="li" />
                  </React.Fragment>
                ))}
              </List>
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Button variant="contained">Manage All Lectures</Button>
              </Box>
            </Paper>
          </Grid>

          {/* Student Feedback */}
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  Student Feedback Sentiment Analysis
                </Typography>
                <Button 
                  variant="contained" 
                  startIcon={<AssessmentIcon />}
                  onClick={() => navigate('/feedback-analysis')}
                >
                  View Complete Analysis
                </Button>
              </Box>
              <Grid container spacing={2}>
                {studentFeedback.map((feedback) => (
                  <Grid item xs={12} md={4} key={feedback.id}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {feedback.course}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Chip 
                            label={feedback.sentiment} 
                            color={
                              feedback.sentiment === 'Positive' 
                                ? 'success' 
                                : feedback.sentiment === 'Neutral' 
                                  ? 'info' 
                                  : 'error'
                            }
                            size="small"
                            sx={{ mr: 1 }}
                          />
                          <Typography variant="body2">
                            Score: {feedback.score.toFixed(2)}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Sentiment trend:
                        </Typography>
                        <LinearProgress 
                          variant="determinate" 
                          value={feedback.score * 100} 
                          color={
                            feedback.sentiment === 'Positive' 
                              ? 'success' 
                              : feedback.sentiment === 'Neutral' 
                                ? 'info' 
                                : 'error'
                          }
                          sx={{ height: 10, borderRadius: 5 }}
                        />
                      </CardContent>
                      <CardActions>
                        <Button size="small">View Details</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </DashboardLayout>
  );
};

export default TeacherDashboard; 