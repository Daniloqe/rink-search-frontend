import { useState } from "react";
import axios from "axios";
import "./index.css"; // Подключаем стили

export default function App() {
  const [zipcode, setZipcode] = useState("");
  const [radius, setRadius] = useState(10); // Радиус поиска по умолчанию 10 км
  const [rinks, setRinks] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setRinks([]);

    if (!zipcode) {
      setError("Введите почтовый индекс!");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:3001/rinks?zipcode=${zipcode}&radius=${radius}`
      );
      setRinks(response.data);
    } catch (err) {
      setError("Ошибка запроса. Проверьте подключение к серверу.");
    }
  };

  return (
    <div className="app-container">
      <div className="content-container">
        <h1>Поиск катков</h1>
        <p>Введите почтовый индекс и выберите радиус поиска.</p>

        <input
          type="text"
          value={zipcode}
          onChange={(e) => setZipcode(e.target.value)}
          placeholder="Введите индекс"
        />

        <select value={radius} onChange={(e) => setRadius(e.target.value)}>
          <option value="10">+10 км</option>
          <option value="25">+25 км</option>
          <option value="50">+50 км</option>
        </select>

        <button onClick={handleSearch}>Найти</button>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <ul>
          {rinks.map((rink) => (
            <li key={rink.id}>
              <h3>{rink.name}</h3>
              <p>Индекс: {rink.zipcode}</p>
              <p>Часы работы: {rink.schedule}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
