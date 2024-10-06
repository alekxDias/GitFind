import { useState } from "react";
import { Header } from "../../components/Header";
import "./styles.css";
import Fundo1 from "../../assets/Fundo1.png";
import ItemList from "../../components/ItemList";

function App() {
  const [user, setUser] = useState("");
  const [currentUser, setcurrentUser] = useState(null);
  const [repos, setrepos] = useState([]);
  const [visibleRepos, setVisibleRepos] = useState(5); // Quantidade de repositórios visíveis

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();

    if (newUser.name) {
      const { avatar_url, name, bio, login } = newUser;
      setcurrentUser({ avatar_url, name, bio, login });

      const reposData = await fetch(
        `https://api.github.com/users/${user}/repos`
      );
      const newRepos = await reposData.json();

      if (newRepos.length) {
        setrepos(newRepos);
      }
    }
  };

  // Função para carregar mais repositórios
  const handleLoadMore = () => {
    setVisibleRepos((prevVisibleRepos) => prevVisibleRepos + 5);
  };

  return (
    <div className="App">
      <Header />
      <div className="conteudo">
        <img src={Fundo1} className="background" alt="background app" />
        <div className="info">
          <input
            name="usuario"
            value={user}
            onChange={(event) => setUser(event.target.value)}
            placeholder="@username"
          />
          <button onClick={handleGetData}>Buscar</button>
          {currentUser ? (
            <div className="perfil">
              <img
                src={currentUser.avatar_url}
                className="profile"
                alt="profile"
              />
              <div>
                <h3>{currentUser.name}</h3>
                <span>@{currentUser.login}</span>
                <p>{currentUser.bio}</p>
              </div>
            </div>
          ) : null}
          {repos?.length ? (
            <div>
              <hr />
              <h4 className="repositorio">Repositórios</h4>
              {repos.slice(0, visibleRepos).map((repo) => (
                <ItemList
                  key={repo.id}
                  title={repo.name}
                  description={repo.description || "Sem descrição"}
                />
              ))}
              {visibleRepos < repos.length && (
                <button onClick={handleLoadMore}>Ler mais</button>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
