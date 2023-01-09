import React, { useState } from "react";

import GitHubReadme from "./components/github-readme/GitHubReadme";

function App() {
  const [repoName, setRepoName] = useState("");
  const [searchRepo, setSearchRepo] = useState("");

  const apply = e => {
    e.preventDefault();
    if (!repoName) return;
    setSearchRepo(repoName);
  };

  return (
    <div className="App">
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
      {searchRepo && <GitHubReadme repo={searchRepo} branch="main" />}
    </div>
  );
}

export default App;
