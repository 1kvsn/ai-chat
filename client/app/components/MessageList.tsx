import React from "react";
import { Message } from "../types";
import { MessageBubble } from "./MessageBubble";

interface MessageListProps {
  messages: Message[];
  messagesEndRef: React.MutableRefObject<HTMLDivElement | null>;
}

export const MessageList = ({ messages, messagesEndRef }: MessageListProps) => {
  if (messages.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        <p className="text-center">Send a message to start chatting</p>
      </div>
    );
  }

  return (
    <>
      {messages.map((message, index) => (
        <MessageBubble key={index} message={message} />
      ))}
      <div ref={messagesEndRef} />
    </>
  );
};
