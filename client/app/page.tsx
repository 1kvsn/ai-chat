"use client";

import { MessageList } from "./components/MessageList";
import { ChatInputForm } from "./components/ChatInputForm";
import { useChat } from "./hooks/useChat";

export default function Home() {
  const { messages, input, setInput, isLoading, messagesEndRef, handleSubmit } =
    useChat();

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <MessageList messages={messages} messagesEndRef={messagesEndRef} />
      </div>

      <ChatInputForm
        onSubmit={handleSubmit}
        input={input}
        setInput={setInput}
        isLoading={isLoading}
      />
    </div>
  );
}
