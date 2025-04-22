/**
 * Process a line from the streaming response
 * Extracts content from lines that start with "0:" (data chunks)
 */
export const processStreamLine = (line: string): string | null => {
  if (!line.startsWith("0:")) return null;

  try {
    // Extract content (removing the "0:" prefix)
    const content = line.substring(2);
    // Remove surrounding quotes if they exist
    return content.startsWith('"') && content.endsWith('"')
      ? JSON.parse(content)
      : content;
  } catch (error) {
    console.error("Error parsing stream line:", error);
    return null;
  }
};