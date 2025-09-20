import React, { useState } from "react";
import "./App.css";

// Sample data with clicks info
const initialData = [
  {
    short: "abc123",
    originalUrl: "https://example.com",
    createdAt: new Date(Date.now() - 3600000), // 1 hour ago
    expiry: new Date(Date.now() + 1800000), // 30 mins from now
    clicks: [
      { timestamp: new Date(Date.now() - 3500000), source: "Google Search", location: "New York, USA" },
      { timestamp: new Date(Date.now() - 1000000), source: "Twitter", location: "California, USA" },
    ],
  },
];

const StatsPage = () => {
  const [urls, setUrls] = useState(initialData);

  const renderUrlStats = (url) => (
    <div key={url.short} style={{ marginBottom: 24, padding: 10, border: "1px solid #ccc", borderRadius: 6 }}>
      <div><b>Short URL:</b> <a href={url.originalUrl} target="_blank" rel="noopener noreferrer">{url.short}</a></div>
      <div><b>Original URL:</b> {url.originalUrl}</div>
      <div><b>Created At:</b> {url.createdAt.toLocaleString()}</div>
      <div><b>Expires At:</b> {url.expiry.toLocaleString()}</div>
      <div><b>Total Clicks:</b> {url.clicks.length}</div>
      <b>Click Details:</b>
      <ul>
        {url.clicks.map((click, idx) => (
          <li key={idx}>
            Timestamp: {click.timestamp.toLocaleString()}, Source: {click.source}, Location: {click.location}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div style={{ maxWidth: 700, margin: "32px auto", fontFamily: "Arial, sans-serif" }}>
      <h2>URL Shortener Statistics</h2>
      {urls.length === 0 ? (
        <div>No shortened URLs available.</div>
      ) : (
        urls.map(renderUrlStats)
      )}
    </div>
  );
};

export default StatsPage;
