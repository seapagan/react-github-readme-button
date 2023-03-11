import React, { useState } from "react";

// eslint-disable-next-line
import { GitHubReadmeButton } from "./components/GitHubReadmeButton/GitHubReadmeButton";

import "./App.scss";

function App() {
  const [repoName, setRepoName] = useState("");
  const [searchRepo, setSearchRepo] = useState(
    "seapagan/react-github-readme-button"
    // "seapagan/fastapi-template"
    // ""
  );

  const apply = e => {
    e.preventDefault();
    if (!repoName) return;
    setSearchRepo(repoName.toLowerCase());
  };

  const handlePreDisplayHook = e => {
    console.log("Pre-display Hook Fired!!");
  };

  const handlePostDisplayHook = e => {
    console.log("Post-display Hook Fired!!");
  };

  return (
    <div className="app">
      <form autoComplete="off">
        <input
          autoComplete="false"
          name="hidden"
          type="text"
          style={{ display: "none" }}
        />
        <input
          type="text"
          autoFocus={true}
          placeholder="Enter username/repository"
          value={repoName}
          style={{ cursor: "text" }}
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
        <GitHubReadmeButton
          className="button-style"
          repo={searchRepo}
          preDisplayHook={handlePreDisplayHook}
          postDisplayHook={handlePostDisplayHook}
        />{" "}
        (ESC Closes the popup)
      </div>
    </div>
  );
}

export default App;
