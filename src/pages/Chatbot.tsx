import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Container,
  TextField,
  Button,
  Avatar,
  IconButton,
  Chip,
  Divider,
  CircularProgress,
  Grid
} from '@mui/material';
import {
  Send as SendIcon,
  ArrowBack as ArrowBackIcon,
  School as SchoolIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';

// Message interface
interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// FAQ interface
interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const Chatbot: React.FC = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Hi there! I\'m your Smart Classroom Assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const menuItems = [
    {
      text: 'Back to Dashboard',
      icon: <ArrowBackIcon />,
      onClick: () => navigate(-1)
    }
  ];

  // Mock FAQs
  const faqs: FAQ[] = [
    { 
      id: 1, 
      question: 'Course Schedule', 
      answer: 'Your courses are scheduled as follows:\n- Introduction to AI: Monday & Wednesday, 10:00 AM\n- Machine Learning Basics: Tuesday & Thursday, 2:00 PM\n- Data Structures: Friday, 1:00 PM'
    },
    { 
      id: 2, 
      question: 'Assignment Deadlines', 
      answer: 'Your upcoming assignment deadlines are:\n- AI Project 1: March 25\n- ML Assignment 2: April 3\n- Data Structures Homework: March 30'
    },
    { 
      id: 3, 
      question: 'Exam Dates', 
      answer: 'Your upcoming exam dates are:\n- Midterm: April 15\n- Final: May 20\n- Quiz 2: March 31'
    },
    { 
      id: 4, 
      question: 'Office Hours', 
      answer: 'Office hours for your professors:\n- Dr. Smith: Mon/Wed 2-4 PM\n- Dr. Johnson: Tue/Thu 1-3 PM\n- Dr. Williams: Friday 10 AM - 12 PM'
    }
  ];

  // Scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle sending a message
  const handleSendMessage = () => {
    if (input.trim() === '') return;
    
    // Add user message
    const newMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate bot response after 1-2 seconds
    setTimeout(() => {
      let responseText = "I'm not sure I understand. Could you please rephrase your question?";
      
      // Very simple keyword matching for demo purposes
      // In a real application, this would use Azure Language Understanding (LUIS) or similar
      const lowerInput = input.toLowerCase();
      
      if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
        responseText = "Hello! How can I assist you with your studies today?";
      } else if (lowerInput.includes('course') || lowerInput.includes('class')) {
        responseText = "You're currently enrolled in Introduction to AI, Machine Learning Basics, and Data Structures. Which course would you like information about?";
      } else if (lowerInput.includes('assignment') || lowerInput.includes('homework')) {
        responseText = "Your next assignment due is the AI Project 1, due on March 25. Would you like to see all upcoming assignments?";
      } else if (lowerInput.includes('exam') || lowerInput.includes('test')) {
        responseText = "Your next exam is the midterm on April 15. Would you like tips on how to prepare?";
      } else if (lowerInput.includes('office') || lowerInput.includes('professor')) {
        responseText = "Office hours for your professors are available on different days. Would you like me to list them all?";
      } else if (lowerInput.includes('thank')) {
        responseText = "You're welcome! Is there anything else I can help you with?";
      }
      
      const botResponse: Message = {
        id: messages.length + 2,
        text: responseText,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, Math.random() * 1000 + 1000); // Random delay between 1-2 seconds
  };

  // Handle pressing Enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Handle clicking on a FAQ chip
  const handleFAQClick = (faq: FAQ) => {
    // Add user question
    const userQuestion: Message = {
      id: messages.length + 1,
      text: faq.question,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userQuestion]);
    setIsTyping(true);
    
    // Simulate bot response after 1 second
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: faq.answer,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <DashboardLayout title="Chatbot Assistant" menuItems={menuItems}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 0, mb: 4, height: 'calc(100vh - 200px)', display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white', borderTopLeftRadius: 4, borderTopRightRadius: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
                <SchoolIcon />
              </Avatar>
              <Box>
                <Typography variant="h6">
                  Chatbot Assistant
                </Typography>
                <Typography variant="caption">
                  Powered by Azure AI
                </Typography>
              </Box>
            </Box>
          </Box>
          
          {/* FAQ Chips */}
          <Box sx={{ p: 2, bgcolor: 'background.default' }}>
            <Typography variant="subtitle2" gutterBottom>
              Frequently Asked Questions:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {faqs.map((faq) => (
                <Chip
                  key={faq.id}
                  label={faq.question}
                  onClick={() => handleFAQClick(faq)}
                  variant="outlined"
                  sx={{ mb: 1 }}
                />
              ))}
            </Box>
          </Box>
          
          <Divider />
          
          {/* Messages Area */}
          <Box sx={{ p: 2, flexGrow: 1, overflow: 'auto', bgcolor: '#f5f5f5' }}>
            {messages.map((message) => (
              <Box
                key={message.id}
                sx={{
                  display: 'flex',
                  justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  mb: 2
                }}
              >
                {message.sender === 'bot' && (
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32, mr: 1 }}>
                    <SchoolIcon sx={{ fontSize: 18 }} />
                  </Avatar>
                )}
                
                <Box
                  sx={{
                    maxWidth: '70%',
                    p: 2,
                    borderRadius: 2,
                    bgcolor: message.sender === 'user' ? 'primary.main' : 'white',
                    color: message.sender === 'user' ? 'white' : 'text.primary',
                    boxShadow: 1,
                    position: 'relative',
                    '&::after': message.sender === 'user' ? {
                      content: '""',
                      position: 'absolute',
                      right: 0,
                      top: 10,
                      width: 0,
                      height: 0,
                      border: '8px solid transparent',
                      borderLeftColor: 'primary.main',
                      borderRight: 0,
                      marginRight: -8
                    } : {}
                  }}
                >
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                    {message.text}
                  </Typography>
                  <Typography variant="caption" sx={{ display: 'block', mt: 1, opacity: 0.7, textAlign: 'right' }}>
                    {formatTime(message.timestamp)}
                  </Typography>
                </Box>
                
                {message.sender === 'user' && (
                  <Avatar sx={{ bgcolor: 'secondary.main', width: 32, height: 32, ml: 1 }}>
                    {/* Display user initial or icon here */}
                    U
                  </Avatar>
                )}
              </Box>
            ))}
            
            {/* Bot Typing Indicator */}
            {isTyping && (
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32, mr: 1 }}>
                  <SchoolIcon sx={{ fontSize: 18 }} />
                </Avatar>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: 'white',
                    boxShadow: 1
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ mr: 1 }}>Typing</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          bgcolor: 'text.secondary',
                          mx: 0.5,
                          animation: 'pulse 1s infinite',
                          animationDelay: '0s'
                        }}
                      />
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          bgcolor: 'text.secondary',
                          mx: 0.5,
                          animation: 'pulse 1s infinite',
                          animationDelay: '0.2s'
                        }}
                      />
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          bgcolor: 'text.secondary',
                          mx: 0.5,
                          animation: 'pulse 1s infinite',
                          animationDelay: '0.4s'
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            )}
            
            <div ref={messagesEndRef} />
          </Box>
          
          <Divider />
          
          {/* Input Area */}
          <Box sx={{ p: 2, bgcolor: 'background.paper', display: 'flex', alignItems: 'center' }}>
            <TextField
              fullWidth
              placeholder="Type your message here..."
              variant="outlined"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              size="small"
              autoFocus
              sx={{ mr: 1 }}
            />
            <IconButton
              color="primary"
              onClick={handleSendMessage}
              disabled={input.trim() === '' || isTyping}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
        
        {/* Disclaimer */}
        <Typography variant="caption" color="text.secondary" align="center" sx={{ display: 'block', mb: 4 }}>
          This chatbot uses Azure AI services to provide intelligent assistance. Your conversations may be analyzed to improve the service.
        </Typography>
      </Container>
    </DashboardLayout>
  );
};

export default Chatbot; 