import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

const App = () => {
  const [repositories, setRepositories] = useState([]);

  // When first rendering, list all repositories in the API
  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  const handleAddRepository = async () => {
    const response = await api.post("repositories", {
      title: `Novo repositório ${Date.now()}`,
      url: "github.com/static_repo",
      techs: ["ReactJS", "Node.js"],
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  };

  const handleRemoveRepository = async (id) => {
    await api.delete(`repositories/${id}`).then((response) => {
      const updateRepositories = repositories.filter(
        (repository) => repository.id !== id
      );
      setRepositories(updateRepositories);
    });
  };

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
};

export default App;
