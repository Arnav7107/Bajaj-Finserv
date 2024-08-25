import './App.css'
import { useState } from "react";
import axios from "axios";

function App() {
  const [input, setInput] = useState("");
  const [selections, setSelections] = useState([]);
  const [response, setResponse] = useState({});
  const [error, setError] = useState("");

  document.title = "21BCE5119";

  // Validate JSON input
  const validateJSON = (input) => {
    try {
      JSON.parse(input);
      return true;
    } catch (e) {
      return false;
    }
  };

  // Handle text input changes
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // Handle submission
  const handleSubmit = async () => {
    if (!validateJSON(input)) {
      setError("Invalid JSON format. Please correct it and try again.");
      setResponse({});
      setSelections([]);
      return;
    }
    setError("");
    try {
      const payload = JSON.parse(input);
      const result = await axios.post(
        "http://localhost:5000/api/process",
        payload
      );
      setResponse(result.data);
    } catch (error) {
      setError(
        "Failed to fetch data from the server. Please check the server connection."
      );
      console.error("Error fetching data:", error);
    }
  };

  // Handle dropdown selection changes
  const handleSelectionChange = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelections(values);
  };

  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        justifyItems: "center",
        alignContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          justifyItems: "center",
          width: "100%",
        }}
      >
        <h1>{"21BCE5119"}</h1>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder='Enter JSON, e.g., { "data": ["A","C","z"] }'
        />
        <button onClick={handleSubmit}>Submit</button>
        {error && <p style={{ color: "red" }}>{error}</p>}

        {Object.keys(response).length > 0 && (
          <select multiple size="3" onChange={handleSelectionChange}>
            <option value="alphabets">Alphabets</option>
            <option value="numbers">Numbers</option>
            <option value="highest">Highest lowercase alphabet</option>
          </select>
        )}

        {selections.includes("alphabets") && response.alphabets && (
          <p>Alphabets: {response.alphabets.join(", ")}</p>
        )}
        {selections.includes("numbers") && response.numbers && (
          <p>Numbers: {response.numbers.join(", ")}</p>
        )}
        {selections.includes("highest") && response.highest && (
          <p>Highest Lowercase: {response.highest}</p>
        )}
      </div>
    </div>
  );
}

export default App;
