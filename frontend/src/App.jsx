import React, { useState,useEffect } from "react";
import axios from "axios";

function App() {
  const [aa, setSelectedFile] = useState([]);
  const [message, setMessage] = useState("");
useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/", {
          withCredentials: true,
        });
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
}, [])
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!aa) {
      setMessage("Please select a file first!");
      return;
    }

    

    try {
const res=await axios.post("http://localhost:8080/upload", {aa}, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data===1) {
        console.log(res.data);
        setMessage("File uploaded successfully!");
      }
  else{
    setMessage("Failed to upload file from backend");
  }
    } catch (err) {
      console.error(err);
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
    </div>
  );
}

export default App;
