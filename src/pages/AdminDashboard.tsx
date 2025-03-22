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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Divider,
  Chip
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  PeopleAlt as PeopleAltIcon,
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  School as SchoolIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';
import DashboardLayout from '../components/DashboardLayout';

const AdminDashboard: React.FC = () => {
  const menuItems = [
    {
      text: 'Dashboard',
      icon: <DashboardIcon />,
      onClick: () => console.log('Dashboard clicked')
    },
    {
      text: 'User Management',
      icon: <PeopleAltIcon />,
      onClick: () => console.log('User Management clicked')
    },
    {
      text: 'Analytics',
      icon: <BarChartIcon />,
      onClick: () => console.log('Analytics clicked')
    },
    {
      text: 'Courses',
      icon: <SchoolIcon />,
      onClick: () => console.log('Courses clicked')
    },
    {
      text: 'Settings',
      icon: <SettingsIcon />,
      onClick: () => console.log('Settings clicked')
    }
  ];

  // Mock data for users
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Student', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Teacher', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Student', status: 'Inactive' },
    { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'Teacher', status: 'Active' },
    { id: 5, name: 'Mike Brown', email: 'mike@example.com', role: 'Student', status: 'Active' }
  ];

  // Mock data for platform usage
  const platformUsage = [
    { id: 1, metric: 'Active Users', value: 245, change: '+12%', color: '#e3f2fd' },
    { id: 2, metric: 'Lectures Uploaded', value: 128, change: '+5%', color: '#e8f5e9' },
    { id: 3, metric: 'Storage Used', value: '1.2 TB', change: '+8%', color: '#fff8e1' },
    { id: 4, metric: 'API Calls', value: '25K', change: '+15%', color: '#ede7f6' }
  ];

  return (
    <DashboardLayout title="Admin Dashboard" menuItems={menuItems}>
      <Typography variant="h4" gutterBottom>
        Admin Control Panel
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
        Monitor and manage platform usage and users
      </Typography>

      <Grid container spacing={3}>
        {/* Platform Usage Stats */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {platformUsage.map((stat) => (
              <Grid item xs={12} sm={6} md={3} key={stat.id}>
                <Paper sx={{ p: 2, textAlign: 'center', bgcolor: stat.color }}>
                  <Typography variant="h4" sx={{ mb: 1 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.metric}
                  </Typography>
                  <Typography variant="caption" color="success.main">
                    {stat.change}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* User Management */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                User Management
              </Typography>
              <Button variant="contained" startIcon={<PeopleAltIcon />}>
                Add New User
              </Button>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="user management table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell component="th" scope="row">
                        {user.name}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Chip 
                          label={user.role} 
                          color={user.role === 'Teacher' ? 'primary' : 'default'} 
                          size="small" 
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          icon={user.status === 'Active' ? <CheckCircleIcon /> : <CancelIcon />}
                          label={user.status} 
                          color={user.status === 'Active' ? 'success' : 'error'}
                          size="small" 
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton size="small" color="primary">
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Button variant="outlined">View All Users</Button>
            </Box>
          </Paper>
        </Grid>

        {/* System Health */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                System Health
              </Typography>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Azure Speech-to-Text</TableCell>
                    <TableCell>
                      <Chip label="Operational" color="success" size="small" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Azure Text Analytics</TableCell>
                    <TableCell>
                      <Chip label="Operational" color="success" size="small" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Azure Cognitive Search</TableCell>
                    <TableCell>
                      <Chip label="Operational" color="success" size="small" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Azure Bot Service</TableCell>
                    <TableCell>
                      <Chip label="Operational" color="success" size="small" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Database</TableCell>
                    <TableCell>
                      <Chip label="Operational" color="success" size="small" />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardActions>
              <Button size="small">View Detailed Status</Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Recent Activities */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Activities
              </Typography>
              <Box sx={{ mb: 2 }}>
                {[
                  { time: '2 hours ago', event: 'User Jane Smith uploaded a new lecture' },
                  { time: '3 hours ago', event: 'User John Doe joined the platform' },
                  { time: '5 hours ago', event: 'System backup completed successfully' },
                  { time: '1 day ago', event: 'Platform maintenance performed' },
                  { time: '2 days ago', event: 'New course "Advanced AI" was created' }
                ].map((activity, index) => (
                  <Box key={index} sx={{ mb: 1.5 }}>
                    <Typography variant="body2" component="span" fontWeight="bold">
                      {activity.time}:
                    </Typography>
                    <Typography variant="body2" component="span" sx={{ ml: 1 }}>
                      {activity.event}
                    </Typography>
                    {index < 4 && <Divider sx={{ mt: 1 }} />}
                  </Box>
                ))}
              </Box>
            </CardContent>
            <CardActions>
              <Button size="small">View All Activities</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default AdminDashboard; 