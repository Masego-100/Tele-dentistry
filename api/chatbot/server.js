import express from 'express';
import cors from 'cors';
import * as fs from 'node:fs';
import {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
} from "@google/genai";

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve static files from 'public' directory

// Initialize Gemini AI
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "AIzaSyBOQfFdV3--LijypRM-7Gyj1WkjFR6dQuQ" });

// Chat endpoint to handle messages from frontend
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history, chatId } = req.body;
    
    console.log(`Received message in chat ${chatId}: ${message}`);
    
    // Convert chat history to Gemini's format if it exists
    let geminiHistory = [];
    
    if (history && history.length > 0) {
      // Process only the last few messages to stay within context limits
      const relevantHistory = history.slice(-10); // Keep last 10 messages
      
      for (const entry of relevantHistory) {
        if (entry.role === 'user') {
          geminiHistory.push({
            role: "user",
            parts: [{ text: entry.content }]
          });
        } else if (entry.role === 'assistant') {
          geminiHistory.push({
            role: "model",
            parts: [{ text: entry.content }]
          });
        }
      }
    }
    
    // Create or continue chat session
    const chat = ai.chats.create({
      model: "gemini-2.0-flash",
      history: geminiHistory.length > 0 ? geminiHistory : undefined,
    });
    
    // Send message to Gemini and stream the response
    const response = await chat.sendMessage({
      message: message,
    });
    
    // Return the response to the frontend
    return res.json({
      response: response.text,
      chatId: chatId
    });
  } catch (error) {
    console.error('Error processing chat message:', error);
    return res.status(500).json({ 
      error: 'Failed to process your message',
      details: error.message
    });
  }
});

// Optional: File upload endpoint for image processing
app.post('/api/upload', async (req, res) => {
  try {
    // Implementation for file uploads would go here
    // This would handle images that users might want to send to the AI
    res.json({ success: true, fileUrl: 'path/to/uploaded/file' });
  } catch (error) {
    res.status(500).json({ error: 'File upload failed' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Helper functions for different AI capabilities

// Function to process text-only queries
async function processTextQuery(text) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: text,
  });
  return response.text;
}

// Function to process images with text
async function processImageQuery(imageFile, prompt) {
  try {
    const uploadedFile = await ai.files.upload({
      file: imageFile,
      config: { mimeType: determineImageMimeType(imageFile) },
    });
    
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: createUserContent([
        createPartFromUri(uploadedFile.uri, uploadedFile.mimeType),
        prompt,
      ]),
    });
    
    return response.text;
  } catch (error) {
    console.error("Error processing image:", error);
    throw error;
  }
}

// Helper to determine image MIME type
function determineImageMimeType(filePath) {
  if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) {
    return 'image/jpeg';
  } else if (filePath.endsWith('.png')) {
    return 'image/png';
  } else if (filePath.endsWith('.gif')) {
    return 'image/gif';
  } else if (filePath.endsWith('.webp')) {
    return 'image/webp';
  } else {
    return 'application/octet-stream';
  }
}