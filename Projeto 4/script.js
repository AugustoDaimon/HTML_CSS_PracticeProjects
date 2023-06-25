// Create an object with the form data
const formData = {
    name: "John Doe",
    email: "johndoe@example.com",
    message: "Hello, I'm submitting the form using an API.",
  };
  
  // Make a POST request to the Google Form URL
  fetch("https://docs.google.com/forms/d/e/FORM_ID/formResponse", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(formData).toString(),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Form submitted successfully!");
      } else {
        console.error("Error submitting the form.");
      }
    })
    .catch((error) => {
      console.error("Error submitting the form:", error);
    });