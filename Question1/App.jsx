import React, { useState, useEffect } from "react";
import './App.css';
// Utility to generate unique short links
const generateShortLink = (existingLinks) => {
  let shortLink;
  do {
    shortLink = Math.random().toString(36).substring(2, 8); // 6 char short link
  } while (existingLinks.includes(shortLink));
  return shortLink;
};

// Placeholder for logging middleware function - replace with your middleware logic
const logEvent = (event) => {
  // Your custom logging middleware call here
  console.log("Logging event:", event); // remove this console call in production
};

const App = () => {
  const [url, setUrl] = useState("");
  const [validity, setValidity] = useState(30); // Default validity 30 minutes
  const [shortLinks, setShortLinks] = useState([]);
  const [analytics, setAnalytics] = useState({ total: 0 });

  const handleShorten = () => {
    if (!url) return;

    const shortLink = generateShortLink(shortLinks.map((item) => item.short));
    const expiry = new Date(Date.now() + validity * 60000); // validity to ms

    const newEntry = { originalUrl: url, short: shortLink, expiry };

    setShortLinks((prev) => [...prev, newEntry]);
    setUrl("");
    setValidity(30); // reset validity to default

    // Log the shortening event
    logEvent({ action: "shorten", shortLink, originalUrl: url, timestamp: new Date() });

    // Update analytics
    setAnalytics((prev) => ({ ...prev, total: prev.total + 1 }));
  };

  useEffect(() => {
    // Periodic cleanup for expired short links
    const interval = setInterval(() => {
      setShortLinks((links) => links.filter((link) => link.expiry > new Date()));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>React URL Shortener</h2>

      <input
        placeholder="Enter URL to shorten"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: "300px" }}
      />

      <input
        type="number"
        min="1"
        placeholder="Validity in minutes (default 30)"
        value={validity}
        onChange={(e) => setValidity(Number(e.target.value))}
        style={{ width: "150px", marginLeft: 10 }}
      />

      <button onClick={handleShorten} style={{ marginLeft: 10 }}>
        Shorten
      </button>

      <h3>Shortened URLs</h3>
      <ul>
        {shortLinks.map(({ short, originalUrl, expiry }) => (
          <li key={short}>
            <a href={originalUrl} target="_blank" rel="noopener noreferrer">
              {short}
            </a>{" "}
            (expires at: {expiry.toLocaleTimeString()})
          </li>
        ))}
      </ul>

      <h3>Analytics</h3>
      <div>Total URLs shortened: {analytics.total}</div>
    </div>
  );
};

export default App;
