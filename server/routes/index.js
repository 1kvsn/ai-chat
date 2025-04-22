var express = require('express');
var router = express.Router();
const { streamText } = require("ai");
const { openai } = require("@ai-sdk/openai");

/* GET home page. */
router.get("/chat", function (req, res, next) {});

router.post("/chat", async function (req, res, next) {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const result = streamText({
      model: openai("gpt-4.1-nano"),
      system: "You are a helpful assistant.",
      prompt,
    });

    const streamResponse = await result.toDataStreamResponse();

    // Set headers for streaming
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Transfer-Encoding", "chunked");

    // Process the stream and send chunks to client
    const reader = streamResponse.body.getReader();

    async function processStream() {
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            res.end();
            break;
          }
          // Send chunk to client
          res.write(value);
        }
      } catch (error) {
        console.error("Stream processing error:", error);
        res.end();
      }
    }

    processStream();
  } catch (error) {
    console.error("Error in /chat endpoint:", error);
    res.status(500).json({ error: "An error occurred during the AI request" });
  }
});

module.exports = router;
