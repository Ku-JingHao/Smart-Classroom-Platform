import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Container,
  TextField,
  InputAdornment,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Drawer,
  useMediaQuery,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  Search as SearchIcon,
  ArrowBack as ArrowBackIcon,
  FilterList as FilterListIcon,
  PictureAsPdf as PdfIcon,
  Videocam as VideoIcon,
  Description as TranscriptIcon,
  Description,
  Download as DownloadIcon,
  Visibility as VisibilityIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';

// Type definition for lecture materials
interface LectureMaterial {
  id: number;
  title: string;
  type: 'PDF' | 'Video' | 'Transcript';
  date: string;
  course: string;
  description: string;
  thumbnail?: string;
}

const LectureSearch: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(!isMobile);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<string>('all');

  const menuItems = [
    {
      text: 'Back to Dashboard',
      icon: <ArrowBackIcon />,
      onClick: () => navigate(-1)
    }
  ];

  // Mock data for courses
  const courses = [
    'Introduction to AI',
    'Machine Learning Basics',
    'Data Structures',
    'Deep Learning Fundamentals',
    'Cognitive Computing'
  ];

  // Mock data for material types
  const materialTypes = ['PDF', 'Video', 'Transcript'];

  // Mock data for lecture materials
  const materials: LectureMaterial[] = [
    {
      id: 1,
      title: 'Introduction to Neural Networks',
      type: 'PDF',
      date: '2023-03-15',
      course: 'Introduction to AI',
      description: 'A comprehensive introduction to neural networks and their applications in AI.'
    },
    {
      id: 2,
      title: 'Machine Learning Algorithms Explained',
      type: 'Video',
      date: '2023-03-10',
      course: 'Machine Learning Basics',
      description: 'Visual explanations of common machine learning algorithms with examples.'
    },
    {
      id: 3,
      title: 'Deep Learning Lecture 1',
      type: 'Transcript',
      date: '2023-03-05',
      course: 'Deep Learning Fundamentals',
      description: 'Transcript of the first lecture on deep learning fundamentals.'
    },
    {
      id: 4,
      title: 'Data Structures: Trees and Graphs',
      type: 'PDF',
      date: '2023-02-28',
      course: 'Data Structures',
      description: 'Detailed explanation of tree and graph data structures with implementation examples.'
    },
    {
      id: 5,
      title: 'Introduction to Transformers',
      type: 'Video',
      date: '2023-02-20',
      course: 'Deep Learning Fundamentals',
      description: 'Video lecture covering transformer architecture and applications in NLP.'
    },
    {
      id: 6,
      title: 'Cognitive Computing Overview',
      type: 'Transcript',
      date: '2023-02-15',
      course: 'Cognitive Computing',
      description: 'Transcript of an overview lecture on cognitive computing and its applications.'
    },
    {
      id: 7,
      title: 'Machine Learning: Supervised vs Unsupervised',
      type: 'PDF',
      date: '2023-02-10',
      course: 'Machine Learning Basics',
      description: 'A comparison of supervised and unsupervised learning approaches in machine learning.'
    },
    {
      id: 8,
      title: 'Neural Network Lab Session',
      type: 'Video',
      date: '2023-02-05',
      course: 'Introduction to AI',
      description: 'Recorded lab session demonstrating neural network implementation in Python.'
    }
  ];

  // Filter function based on search query and filters
  const filteredMaterials = materials.filter((material) => {
    // Filter by search query
    const matchesQuery = searchQuery === '' || 
      material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.course.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by course
    const matchesCourse = selectedCourses.length === 0 || 
      selectedCourses.includes(material.course);
    
    // Filter by type
    const matchesType = selectedTypes.length === 0 || 
      selectedTypes.includes(material.type);
    
    // Filter by date range
    let matchesDate = true;
    const materialDate = new Date(material.date);
    const today = new Date();
    
    if (dateRange === 'week') {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(today.getDate() - 7);
      matchesDate = materialDate >= oneWeekAgo;
    } else if (dateRange === 'month') {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(today.getMonth() - 1);
      matchesDate = materialDate >= oneMonthAgo;
    } else if (dateRange === 'year') {
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(today.getFullYear() - 1);
      matchesDate = materialDate >= oneYearAgo;
    }
    
    return matchesQuery && matchesCourse && matchesType && matchesDate;
  });

  // Handle course filter change
  const handleCourseChange = (event: React.ChangeEvent<{ value: unknown }> | any) => {
    setSelectedCourses(event.target.value as string[]);
  };

  // Handle type filter change
  const handleTypeChange = (event: React.ChangeEvent<{ value: unknown }> | any) => {
    setSelectedTypes(event.target.value as string[]);
  };

  // Handle date range filter change
  const handleDateRangeChange = (event: React.ChangeEvent<{ value: unknown }> | any) => {
    setDateRange(event.target.value as string);
  };

  // Material type icon mapping
  const getMaterialIcon = (type: string) => {
    switch (type) {
      case 'PDF':
        return <PdfIcon color="error" />;
      case 'Video':
        return <VideoIcon color="primary" />;
      case 'Transcript':
        return <TranscriptIcon color="success" />;
      default:
        return <Description />;
    }
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCourses([]);
    setSelectedTypes([]);
    setDateRange('all');
    setSearchQuery('');
  };

  // Filter sidebar content
  const filterSidebar = (
    <Box sx={{ width: 250, p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Filters</Typography>
        {isMobile && (
          <IconButton onClick={() => setFilterDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>
      
      <Divider sx={{ mb: 2 }} />
      
      <Typography variant="subtitle2" gutterBottom>Date Range</Typography>
      <FormControl fullWidth size="small" sx={{ mb: 3 }}>
        <Select
          value={dateRange}
          onChange={handleDateRangeChange}
          displayEmpty
        >
          <MenuItem value="all">All Time</MenuItem>
          <MenuItem value="week">Last Week</MenuItem>
          <MenuItem value="month">Last Month</MenuItem>
          <MenuItem value="year">Last Year</MenuItem>
        </Select>
      </FormControl>
      
      <Typography variant="subtitle2" gutterBottom>Course</Typography>
      <FormControl fullWidth size="small" sx={{ mb: 3 }}>
        <Select
          multiple
          value={selectedCourses}
          onChange={handleCourseChange}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {(selected as string[]).map((value) => (
                <Chip key={value} label={value} size="small" />
              ))}
            </Box>
          )}
          displayEmpty
        >
          <MenuItem disabled value="">
            Select Courses
          </MenuItem>
          {courses.map((course) => (
            <MenuItem key={course} value={course}>
              {course}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <Typography variant="subtitle2" gutterBottom>Material Type</Typography>
      <FormControl fullWidth size="small" sx={{ mb: 3 }}>
        <Select
          multiple
          value={selectedTypes}
          onChange={handleTypeChange}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {(selected as string[]).map((value) => (
                <Chip key={value} label={value} size="small" />
              ))}
            </Box>
          )}
          displayEmpty
        >
          <MenuItem disabled value="">
            Select Types
          </MenuItem>
          {materialTypes.map((type) => (
            <MenuItem key={type} value={type}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                {getMaterialIcon(type)}
              </ListItemIcon>
              <ListItemText primary={type} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <Button 
        variant="outlined" 
        fullWidth 
        onClick={handleResetFilters}
        sx={{ mt: 2 }}
      >
        Reset Filters
      </Button>
    </Box>
  );

  return (
    <DashboardLayout title="Search Lecture Materials" menuItems={menuItems}>
      <Container maxWidth="xl">
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Search Lecture Materials
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Find lecture notes, videos, and transcriptions by keyword, date, or course.
          </Typography>
          
          <TextField
            fullWidth
            placeholder="Search by keyword, date, or course"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="outlined"
            sx={{ mb: 4 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: isMobile ? (
                <InputAdornment position="end">
                  <IconButton onClick={() => setFilterDrawerOpen(true)}>
                    <FilterListIcon />
                  </IconButton>
                </InputAdornment>
              ) : null
            }}
          />
          
          <Box sx={{ display: 'flex' }}>
            {/* Filter Sidebar */}
            {!isMobile ? (
              <Box sx={{ width: 250, mr: 2, flexShrink: 0 }}>
                {filterSidebar}
              </Box>
            ) : (
              <Drawer
                anchor="left"
                open={filterDrawerOpen}
                onClose={() => setFilterDrawerOpen(false)}
              >
                {filterSidebar}
              </Drawer>
            )}
            
            {/* Search Results */}
            <Box sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  {filteredMaterials.length} Results
                </Typography>
                {isMobile && (
                  <Button 
                    startIcon={<FilterListIcon />}
                    onClick={() => setFilterDrawerOpen(true)}
                  >
                    Filters
                  </Button>
                )}
              </Box>
              
              {filteredMaterials.length > 0 ? (
                <Grid container spacing={2}>
                  {filteredMaterials.map((material) => (
                    <Grid item xs={12} sm={6} md={4} key={material.id}>
                      <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            {getMaterialIcon(material.type)}
                            <Chip 
                              label={material.type} 
                              size="small" 
                              sx={{ ml: 1 }}
                              color={
                                material.type === 'PDF' ? 'error' :
                                material.type === 'Video' ? 'primary' :
                                'success'
                              }
                            />
                          </Box>
                          
                          <Typography variant="h6" component="div" gutterBottom>
                            {material.title}
                          </Typography>
                          
                          <Typography variant="body2" color="text.secondary" paragraph>
                            {material.description}
                          </Typography>
                          
                          <Box sx={{ mt: 1 }}>
                            <Typography variant="caption" display="block">
                              <strong>Course:</strong> {material.course}
                            </Typography>
                            <Typography variant="caption" display="block">
                              <strong>Date:</strong> {new Date(material.date).toLocaleDateString()}
                            </Typography>
                          </Box>
                        </CardContent>
                        
                        <CardActions>
                          <Button 
                            size="small" 
                            startIcon={<VisibilityIcon />}
                          >
                            View
                          </Button>
                          <Button 
                            size="small" 
                            startIcon={<DownloadIcon />}
                          >
                            Download
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="h6" color="text.secondary">
                    No results found
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Try adjusting your search or filters
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Paper>
      </Container>
    </DashboardLayout>
  );
};

export default LectureSearch; 