const Log = async (stack, level, pkg, message) => {
  const API_URL = "http://20.244.56.144/evaluation-service/logs";
  
  const AUTH_TOKEN = "YOUR_AUTH_TOKEN";

  const logData = {
    stack,
    level,
    pkg,
    message,
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${AUTH_TOKEN}`, // Don't forget this!
      },
      body: JSON.stringify(logData),
    });

    if (!response.ok) {
      // Log an error to the browser console if the API call fails
      console.error("Failed to send log to the server:", response.statusText);
      return;
    }

    const result = await response.json();
    console.log("Log created successfully:", result.logID);
  } catch (error) {
    console.error("Error sending log:", error);
  }
};

export default Log;