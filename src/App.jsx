import './App.css'
import { useState } from "react";
import axios from "axios";
import Select from 'react-select';

function App() {
  const [input, setInput] = useState("");
  const [selections, setSelections] = useState([]);
  const [response, setResponse] = useState({});
  const [GETresponse, setGETResponse] = useState({});
  const [GETerror, setGETError] = useState("");
  const [error, setError] = useState("");

  document.title = "21BCE5119";

  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_lowercase_alphabet', label: 'Highest lowercase alphabet' }
  ];

  const validateJSON = (input) => {
    try {
      JSON.parse(input);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

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
        "https://bajaj-finserv-be.onrender.com/bfhl",
        payload
      );
      setResponse(result.data);
      alert("Data fetched successfully!");
    } catch (error) {
      setError(
        "Failed to fetch data from the server. Please check the server connection."
      );
      console.error("Error fetching data:", error);
    }
  };

    const handleGET = async () => {
      try {
        const result = await axios.get(
          "https://bajaj-finserv-be.onrender.com/bfhl",
        );
        setGETResponse(result.data);
      } catch (error) {
        setGETError(
          "Failed to fetch data from the server. Please check the server connection."
        );
        console.error("Error fetching data:", error);
      }
    };

  const handleSelectChange = (selectedOptions) => {
    setSelections(selectedOptions);
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
        <h2 style={{color: "black"}}>POST</h2>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder='Enter JSON, e.g., { "data": ["A","C","z"] }'
        />
        <button onClick={handleSubmit}>Submit</button>
        {error && <p style={{ color: "red" }}>{error}</p>}

        {Object.keys(response).length > 0 && (
          <div style={{paddingTop: "20px"}}>
            <Select
              options={options}
              isMulti
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleSelectChange}
            />
            
            <b style={{color: "black"}}>Filtered Response:</b>
            {selections.map((option) => (
              response[option.value] && <p key={option.value}>{option.label}: {response[option.value].length ? response[option.value].join(', ') : "{}"}</p>
            ))}
          </div>
        )}

        {selections.includes("alphabets") && response.alphabets && (
          <p>Alphabets: {response.alphabets.join(", ")}</p>
        )}
        {selections.includes("numbers") && response.numbers && (
          <p>Numbers: {response.numbers.join(", ")}</p>
        )}
        {selections.includes("highest") && response.highest_lowercase_alphabet	 && (
          <p>Highest Lowercase: {response.highest_lowercase_alphabet	}</p>
        )}

        <div style={{paddingTop: "20px"}}>
          <h2 style={{color: "black"}}>GET</h2>
          <button onClick={handleGET}>GET</button>
          {GETerror && <p style={{ color: "red" }}>{GETerror}</p>}

          {Object.keys(GETresponse).length > 0 && (
            <p>operation_code: {GETresponse.operation_code}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
