import { useState, useRef, useEffect } from "react";
import { Message, MessageRole, API_URL, ERROR_MESSAGE } from "../types";
import { processStreamLine } from "../utils/streamUtils";

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMessage = (role: MessageRole, content: string) => {
    setMessages((prev) => [...prev, { role, content }]);
  };

  // Update the assistant's message in real-time
  const updateLastMessage = (content: string) => {
    setMessages((prev) => {
      const newMessages = [...prev];
      if (newMessages.length > 0) {
        newMessages[newMessages.length - 1].content = content;
      }
      return newMessages;
    });
  };

  // Handle streaming response processing
  const handleStreamingResponse = async (response: Response) => {
    const reader = response.body?.getReader();
    if (!reader) return;

    const decoder = new TextDecoder();
    let assistantResponse = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      // Process the chunk
      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split("\n").filter((line) => line.trim() !== "");

      for (const line of lines) {
        const content = processStreamLine(line);
        if (content) {
          assistantResponse += content;
          updateLastMessage(assistantResponse);
        }
      }
    }
  };

  // Function to handle API calls
  const fetchChatResponse = async (prompt: string) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Add initial empty assistant message
    addMessage("assistant", "");
    await handleStreamingResponse(response);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    // Add user message and prepare for response
    addMessage("user", trimmedInput);
    setInput("");
    setIsLoading(true);

    try {
      await fetchChatResponse(trimmedInput);
    } catch (error) {
      console.error("Error fetching from chat API:", error);
      addMessage("assistant", ERROR_MESSAGE);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    input,
    setInput,
    isLoading,
    messagesEndRef,
    handleSubmit,
  };
};
