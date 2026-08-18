const button = document.querySelector("button");
const input = document.getElementById("question");
const output = document.getElementById("answer");

button.addEventListener("click", async function () {
  const question = input.value;

  if (question === "") {
    output.innerText = "Please enter a question.";
    return;
  }

  try {
    output.innerText = "Loading...";

    const response = await fetch("http://localhost:5000/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    const data = await response.json();

    output.innerText = data.output || "No answer received.";
  }

  catch (error) {
    output.innerText = "Something went wrong!";

  }
});