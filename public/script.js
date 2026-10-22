
const form = document.getElementById("question-form");
const questionInput = document.getElementById("question");
const answerElement = document.getElementById("answer");
const submitButton = document.getElementById("submit-btn");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const question = questionInput.value.trim();
  if (!question) return;
  submitButton.disabled = true;
  answerElement.textContent = "Thinking...";
  try {
    const response = await fetch("/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Something went wrong.");
    }
    answerElement.textContent = data.answer;
  } catch (error) {
    answerElement.textContent = error.message;
  } finally {
    submitButton.disabled = false;
  }
});
