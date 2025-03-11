import { ChangeEvent, useState } from "react";
import { createShortURl } from "./api/url";

function App() {
  // useState
  const [showInput, setShowInput] = useState(true);
  const [originalURL, setOriginalURL] = useState("");
  const [shortURL, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  // Functions
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setOriginalURL(e.target.value);
  };

  const isValidURL = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleCreateShort = () => {
    const trimmedURL = originalURL.trim();
    setOriginalURL(trimmedURL);

    // Check if input is empty
    if (trimmedURL.length === 0) {
      setError("Enter a Long URL!");
      return;
    }

    // Check if URL is invalid
    if (!isValidURL(trimmedURL)) {
      setError("Invalid URL!");
      return;
    }

    createShortURl(trimmedURL)
      .then((short) => setShortUrl(short.shortURL))
      .catch((err) => console.error("Error: ", err));

    setShowInput(false);
  };

  const handleRestBtn = () => {
    setShowInput(true);
    setOriginalURL("");
    setShortUrl("");
    setError("");
  };

  const handleCoptBtn = () => {
    // New Add
    navigator.clipboard.writeText(shortURL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  return (
    <div className="container">
      <h1>Short URL</h1>
      <div className="input-box">
        {showInput ? (
          <>
            <input
              value={originalURL}
              onChange={handleChangeInput}
              type="text"
              placeholder="Enter a long URL ..."
            />
            <button onClick={handleCreateShort}>Shorten URL</button>
            {error && <p className="error">{error}</p>}
          </>
        ) : (
          <>
            <input type="text" value={shortURL} readOnly />
            <button onClick={handleCoptBtn}>
              {copied ? "Copied!" : "Copy URL"}
            </button>
          </>
        )}
      </div>
      {!showInput && (
        <div className="orginal-link">
          <p>
            <span>Original URL: </span>
            {originalURL}
          </p>
          <button onClick={handleRestBtn}>Shorten anther Link</button>
        </div>
      )}
    </div>
  );
}

export default App;
