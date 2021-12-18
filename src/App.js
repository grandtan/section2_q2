import "./styles.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [result, setResult] = useState([]);
  const [name, setName] = useState("");
  const [found, setFound] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const url = "https://api.publicapis.org/categories";
    axios
      .get(url)
      .then((response) => {
        setResult(response.data);
        setFound(response.data);
      })
      .catch((error) => console.log(error));
  };

  const handleOnChange = (e) => {
    console.log("render xxx");
    const keyword = e.target.value;
    if (keyword !== "") {
      const results = result.filter((item) =>
        item.toLowerCase().startsWith(keyword.toLowerCase())
      );
      setFound(results);
    } else setFound(result);
    setName(keyword);
  };

  return (
    <div className="App">
      <input
        type="search"
        value={name}
        onChange={handleOnChange}
        className="input"
        placeholder="Filter"
      />
      <table>
        <thead>
          <th>
            <h1>categories</h1>
          </th>
        </thead>
        <tbody>
          {found && found.length > 0 ? (
            found.map((item) => (
              <tr>
                <td>{item}</td>
              </tr>
            ))
          ) : (
            <h1>No results found</h1>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default App;
