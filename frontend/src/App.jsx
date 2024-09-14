import React, { useState,useEffect } from "react";
import axios from "axios";

function App() {
  const [aa, setSelectedFile] = useState([]);
  const [url, seturl] = useState("");
useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://task-36-multer-server.vercel.app/url", {
          withCredentials: true,
        });
        seturl(res.data);
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
const res=await axios.post("https://task-36-multer-server.vercel.app/upload", {aa}, {
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
      {url && <p>{url}</p>}
    </div>
  );
}

export default App;
