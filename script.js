document.getElementById("submitBtn").addEventListener("click", async () => {
    const userInput = document.getElementById("userInput").value;
    const outputDiv = document.getElementById("output");

    if (!userInput) {
        outputDiv.textContent = "Please enter text to process.";
        return;
    }

    try {
        const response = await fetch("https://api.openai.com/v1/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer YOUR_OPENAI_API_KEY`, // Replace with your OpenAI API key
            },
            body: JSON.stringify({
                model: "text-davinci-003", // Or any other supported model
                prompt: `Improve the following text for a professional tone: ${userInput}`,
                max_tokens: 500,
            }),
        });

        const data = await response.json();
        if (data.choices && data.choices.length > 0) {
            outputDiv.textContent = data.choices[0].text.trim();
        } else {
            outputDiv.textContent = "Error: No response from OpenAI.";
        }
    } catch (error) {
        console.error("Error communicating with OpenAI API:", error);
        outputDiv.textContent = "Error: Unable to process the text.";
    }
});
