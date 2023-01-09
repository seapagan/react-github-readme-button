import React from "react";

import GitHubReadme from "./components/github-readme/GitHubReadme";

function App() {
  return (
    <div className="App">
      <GitHubReadme repo="seapagan/fastapi-template" branch="main" />
    </div>
  );
}

export default App;
