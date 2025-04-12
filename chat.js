let chatHistory = [];

const chatContainer = document.getElementById("chatContainer");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

function addMessage(text, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender); // sender is 'user' or 'bot'
  messageDiv.textContent = text;
  chatContainer.appendChild(messageDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight; // Auto scroll to bottom
}

searchBtn.addEventListener("click", async () => {
  const input = searchInput.value.trim();
  if (!input) return;

  addMessage(input, "user"); // Show user message
  chatHistory.push({ role: "user", content: input });

  try {
    const response = await fetch("https://mental-health-backend-e7280bd7034e.herokuapp.com/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input, history: chatHistory }),
    });

    const data = await response.json();
    const aiResponse = data.response;

    addMessage(aiResponse, "bot"); // Show bot message
    chatHistory.push({ role: "assistant", content: aiResponse });
    searchInput.value = ""; // Clear input field
  } catch (error) {
    console.error("Error fetching from backend:", error);
    addMessage("Oops! Something went wrong.", "bot");
  }
});
