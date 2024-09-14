import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [aa, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [urls, setUrls] = useState([]); // State to store URLs

  // Fetch URLs from backend on component mount
  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const res = await axios.get("http://localhost:8080/urls", {
          withCredentials: true,
        });
        setUrls(res.data); // Set the fetched URLs into state
      } catch (err) {
        console.error("Error fetching URLs:", err);
      }
    };

    fetchUrls();
  }, []); // Empty array ensures this runs once on mount

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!aa) {
      setMessage("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("aa", aa); // Append the selected file

    try {
      const res = await axios.post("http://localhost:8080/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data === 1) {
        setMessage("File uploaded successfully!");
        // Refetch the URLs after a successful upload
        const updatedUrls = await axios.get("http://localhost:8080/urls", {
          withCredentials: true,
        });
        setUrls(updatedUrls.data); // Update the URLs state with the new data
      } else {
        setMessage("Failed to upload file from backend");
      }
    } catch (err) {
      console.error("Error uploading file:", err);
      setMessage("Failed to upload file.");
    }
  };

  return (
    <div className="App">
      <h1>File Upload</h1>
      <form encType="multipart/form-data" onSubmit={handleUpload}>
        <input type="file" name="aa" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}

      <h2>Uploaded URLs</h2>
      <ul>
        {urls.length > 0 ? (
          urls.map((url, index) => (
            <li key={index}>
              <a href={url} target="_blank" rel="noopener noreferrer">
                {url}
              </a>
            </li>
          ))
        ) : (
          <p>No URLs uploaded yet.</p>
        )}
      </ul>
    </div>
  );
}

export default App;
