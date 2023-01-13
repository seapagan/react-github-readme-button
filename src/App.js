import React, { useState } from "react";

import GitHubReadme from "./components/github-readme/GitHubReadme";
import ModalOverlay from "./components/Modal/ModalOverlay";

import "./App.scss";

function App() {
  const [repoName, setRepoName] = useState("");
  const [searchRepo, setSearchRepo] = useState(
    // "seapagan/react-github-readme-view"
    // "seapagan/fastapi-template"
    ""
  );

  const apply = e => {
    e.preventDefault();
    if (!repoName) return;
    setSearchRepo(repoName);
  };

  return (
    <div className="app">
      <form>
        <input
          type="text"
          autoFocus={true}
          placeholder="Enter a repository as username/repository"
          value={repoName}
          onChange={e => setRepoName(e.target.value)}
        />
        <button type="submit" onClick={apply}>
          Get the README
        </button>
      </form>
      {searchRepo && (
        <section>
          <ModalOverlay />
          <GitHubReadme repo={searchRepo} branch="main" />
        </section>
      )}
    </div>
  );
}

export default App;
