import React, { useState, useEffect } from "react";
import api from "./services/api"
import "./styles.css";

function App() {
  const [repo, setRepo] = useState([])

  useEffect(() => {
    api.get("repositories")
    .then(res =>
      setRepo(res.data)
    )
  }, [])

  async function handleAddRepository() {
    const response = await api.post("repositories",{
      title:"teste1",
      url:"http://teste.com",
      techs:"nodejs,reactjs,html,css"
    })
    const repositories = response.data
    setRepo([...repo,repositories])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    const edit = repo.filter(rep => rep.id !== id)
    setRepo(edit)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repo && repo.map(res =>
          <li key={res.id}>{res.title}
            <button onClick={() => handleRemoveRepository(res.id)}>
              Remover
          </button>
          </li>)}
      </ul>

      <button onClick={handleAddRepository}>
        Adicionar</button>
    </div>
  );
}

export default App;
