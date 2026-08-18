const form = document.getElementById("form");
const output = document.getElementById("output");

if (form !== null) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const comment = document.getElementById("textarea").value;
    const rating = document.querySelector('input[name="rating"]:checked');

    if (rating === null) {
      output.textContent = "Please select a rating.";
      return;
    }
    const ratingValue = rating.value;

    try {
      const response = await fetch("http://localhost:5000/api/feedback",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            rating: ratingValue,
            comment
          })
        }
      );

      const data = await response.json();
      output.textContent = data.message;
      form.reset();
    } 
    
    catch (error) {
      console.error(error);
      output.textContent = "Something went wrong!";
    }
  });
}


const allFeedback = document.getElementById("allFeedback");

if (allFeedback !== null) {
  showFeedback();
}

async function showFeedback() {
  try {
    const response = await fetch("http://localhost:5000/api/feedback");
    const feedbacks = await response.json();
    allFeedback.innerHTML = "";

    feedbacks.forEach((feedback) => {allFeedback.innerHTML += `<div class="feedBack-list"><h3>${feedback.name}</h3><p>Rating: ${feedback.rating}/5</p><p>${feedback.comment}</p></div>`;
    });

  } 
  
  catch (error) {
    feedback.innerHTML = `There is an Error: ${error}`;
    console.log(error);
  }
}