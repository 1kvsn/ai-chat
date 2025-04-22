import { FormEvent } from "react";

interface ChatInputFormProps {
  onSubmit: (e: FormEvent) => Promise<void>;
  input: string;
  setInput: (value: string) => void;
  isLoading: boolean;
}

export const ChatInputForm = ({
  onSubmit,
  input,
  setInput,
  isLoading,
}: ChatInputFormProps) => (
  <form
    onSubmit={onSubmit}
    className="p-4 border-t border-gray-200 bg-white flex gap-2 items-center"
  >
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Type your message..."
      className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-500 font-medium bg-white shadow-inner"
      disabled={isLoading}
    />
    <button
      type="submit"
      disabled={isLoading || !input.trim()}
      className={`bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors ${
        isLoading || !input.trim()
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-blue-700"
      }`}
    >
      {isLoading ? "Sending..." : "Send"}
    </button>
  </form>
);
