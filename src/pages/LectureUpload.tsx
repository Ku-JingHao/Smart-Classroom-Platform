import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Container,
  IconButton,
  Divider,
  Stack,
  TextField,
  Chip,
  CircularProgress
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  CloudUpload as CloudUploadIcon,
  Download as DownloadIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';

const supportedFormats = ['mp3', 'mp4', 'wav', 'mpeg', 'm4a'];

const LectureUpload: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcription, setTranscription] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedTranscription, setEditedTranscription] = useState('');

  const menuItems = [
    {
      text: 'Back to Dashboard',
      icon: <ArrowBackIcon />,
      onClick: () => navigate('/dashboard/teacher')
    }
  ];

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      const fileExtension = droppedFile.name.split('.').pop()?.toLowerCase() || '';
      
      if (supportedFormats.includes(fileExtension)) {
        setFile(droppedFile);
      } else {
        alert(`Unsupported file format. Please upload: ${supportedFormats.join(', ')}`);
      }
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase() || '';
      
      if (supportedFormats.includes(fileExtension)) {
        setFile(selectedFile);
      } else {
        alert(`Unsupported file format. Please upload: ${supportedFormats.join(', ')}`);
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setIsUploading(true);
    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsUploading(false);
    
    setIsTranscribing(true);
    // Simulate transcription process with Azure Speech-to-Text
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock transcription result
    const mockTranscription = `Welcome to today's lecture on Machine Learning fundamentals. Today we'll cover the basics of neural networks and how they form the foundation of deep learning systems. We'll start by understanding what neurons are and how they connect together to form networks capable of learning patterns from data. Then we'll explore activation functions and their importance in introducing non-linearity to our models. Finally, we'll discuss backpropagation, the algorithm that makes training of neural networks possible.`;
    
    setTranscription(mockTranscription);
    setEditedTranscription(mockTranscription);
    setIsTranscribing(false);
  };

  const handleDownloadTranscription = () => {
    const element = document.createElement('a');
    const file = new Blob([transcription], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `transcription-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleEditStart = () => {
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setEditedTranscription(transcription);
    setIsEditing(false);
  };

  const handleEditSave = () => {
    setTranscription(editedTranscription);
    setIsEditing(false);
  };

  return (
    <DashboardLayout title="Upload and Transcribe Lectures" menuItems={menuItems}>
      <Container maxWidth="xl">
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Upload and Transcribe Lectures
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Upload audio or video files to automatically generate transcriptions using Azure Speech-to-Text.
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, mt: 4 }}>
            {/* Upload Section */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" gutterBottom>
                Upload Section
              </Typography>
              <Paper
                variant="outlined"
                sx={{
                  p: 3,
                  border: isDragging ? '2px dashed #1976d2' : '2px dashed #ccc',
                  bgcolor: isDragging ? 'rgba(25, 118, 210, 0.04)' : 'transparent',
                  borderRadius: 2,
                  height: 300,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={handleUploadClick}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileInputChange}
                  accept={supportedFormats.map(format => `.${format}`).join(',')}
                />
                
                <CloudUploadIcon sx={{ fontSize: 64, color: isDragging ? 'primary.main' : 'text.secondary', mb: 2 }} />
                
                <Typography align="center" sx={{ mb: 2 }}>
                  {file ? file.name : 'Drag and drop your audio/video file here or click to browse'}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" align="center">
                  Supported formats: {supportedFormats.join(', ')}
                </Typography>
                
                {file && (
                  <Chip 
                    label={`${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB)`} 
                    onDelete={() => setFile(null)}
                    sx={{ mt: 2 }}
                  />
                )}
              </Paper>
              
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  onClick={handleUpload}
                  disabled={!file || isUploading || isTranscribing}
                  sx={{ width: '100%' }}
                >
                  {isUploading ? 'Uploading...' : 'Upload for Transcription'}
                </Button>
              </Box>
              
              {(isUploading || isTranscribing) && (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
                  <CircularProgress size={24} sx={{ mr: 1 }} />
                  <Typography>{isUploading ? 'Uploading file...' : 'Transcribing audio...'}</Typography>
                </Box>
              )}
            </Box>

            {/* Divider */}
            <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />
            <Divider sx={{ display: { xs: 'block', md: 'none' } }} />

            {/* Transcription Section */}
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  Transcription
                </Typography>
                <Stack direction="row" spacing={1}>
                  {transcription && !isEditing && (
                    <>
                      <Button 
                        startIcon={<DownloadIcon />}
                        variant="outlined"
                        size="small"
                        onClick={handleDownloadTranscription}
                      >
                        Download
                      </Button>
                      <Button 
                        startIcon={<EditIcon />}
                        variant="outlined"
                        size="small"
                        onClick={handleEditStart}
                      >
                        Edit
                      </Button>
                    </>
                  )}
                  {isEditing && (
                    <>
                      <Button 
                        startIcon={<SaveIcon />}
                        variant="contained"
                        size="small"
                        onClick={handleEditSave}
                      >
                        Save
                      </Button>
                      <Button 
                        startIcon={<CancelIcon />}
                        variant="outlined"
                        size="small"
                        onClick={handleEditCancel}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </Stack>
              </Box>
              
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  borderRadius: 2,
                  height: 300,
                  overflowY: 'auto',
                  bgcolor: isEditing ? 'rgba(0, 0, 0, 0.02)' : 'white'
                }}
              >
                {isTranscribing ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <CircularProgress size={40} sx={{ mr: 2 }} />
                    <Typography>Transcribing audio with Azure Speech-to-Text...</Typography>
                  </Box>
                ) : isEditing ? (
                  <TextField
                    multiline
                    fullWidth
                    variant="outlined"
                    value={editedTranscription}
                    onChange={(e) => setEditedTranscription(e.target.value)}
                    sx={{ height: '100%' }}
                    InputProps={{
                      sx: { height: '100%' }
                    }}
                  />
                ) : transcription ? (
                  <Typography variant="body1" paragraph>
                    {transcription}
                  </Typography>
                ) : (
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <Typography color="text.secondary">
                      Upload a file to see the transcription here
                    </Typography>
                  </Box>
                )}
              </Paper>
            </Box>
          </Box>
        </Paper>
      </Container>
    </DashboardLayout>
  );
};

export default LectureUpload; 