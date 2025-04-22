// Define types for better readability and maintenance
export type MessageRole = "user" | "assistant";

export interface Message {
  role: MessageRole;
  content: string;
}

// API constants to avoid magic strings
export const API_URL = "http://localhost:3001/chat";
export const ERROR_MESSAGE = "Sorry, I encountered an error. Please try again.";
