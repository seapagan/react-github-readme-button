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
          placeholder="Enter a repository as username/repository"
          value={repoName}
          onChange={e => setRepoName(e.target.value)}
        />
        <button type="submit" onClick={apply}>
          Set the README
        </button>
      </form>
      <p>Current Repository is set to {searchRepo}</p>
      Click this to view:{" "}
      <GitHubReadmeButton
        className="button-style"
        repo={searchRepo}
        branch="main"
      />{" "}
      (ESC Closes the popup)
    </div>
  );
}

export default App;
