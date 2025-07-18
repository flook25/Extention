document.getElementById("save").addEventListener("click", () => {
  const term = document.getElementById("term").value;
  const definition = document.getElementById("definition").value;

  if (term && definition) {
    fetch("http://localhost:3000/api/terms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ term, definition }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("Term saved successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to save term.");
      });
  } else {
    alert("Please enter both term and definition.");
  }
});