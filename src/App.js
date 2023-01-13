import React, { useState } from "react";

import GitHubReadmeButton from "./components/GitHubReadmeButton/GitHubReadmeButton";

import "./App.scss";

function App() {
  const [repoName, setRepoName] = useState("");
  const [searchRepo, setSearchRepo] = useState(
    "seapagan/react-github-readme-view"
    // "seapagan/fastapi-template"
    // ""
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
          placeholder="Enter username/repository"
          value={repoName}
          onChange={e => setRepoName(e.target.value)}
        />
        <button type="submit" onClick={apply}>
          Set
        </button>
      </form>
      <p className="current-repo">
        Repository: <span className="repo-name">{searchRepo}</span>
      </p>
      <div className="click-message">
        Click this to{" "}
        <GitHubReadmeButton className="button-style" repo={searchRepo} /> (ESC
        Closes the popup)
      </div>
    </div>
  );
}

export default App;
