import React, { useState } from "react";

import GitHubReadme from "./components/github-readme/GitHubReadme";
import ModalBG from "./components/Modal/ModalBG";

import "./App.scss";

function App() {
  const [repoName, setRepoName] = useState("");
  const [searchRepo, setSearchRepo] = useState("seapagan/fastapi-template");

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
        <div>
          <ModalBG />
          <GitHubReadme repo={searchRepo} branch="main" />
        </div>
      )}
    </div>
  );
}

export default App;
