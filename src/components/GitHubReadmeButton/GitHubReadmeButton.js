import React, { useEffect, useState } from "react";

import GithubReadme from "../GitHubReadme/GitHubReadme";

import "./GitHubReadmeButton.css";

export const GitHubReadmeButton = ({
  repo,
  branch = "main",
  fileName = "README.md",
  buttonText = "View README",
  ...otherProps
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const showReadme = () => {
    setIsVisible(true);
  };

  // doing this as a fuction since arrow functions should not be used as JSX
  // properties.
  // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md
  function closeHandler() {
    setIsVisible(false);
  }

  useEffect(() => {
    const handleEsc = e => {
      if (e.keyCode === 27) {
        setIsVisible(false);
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <>
      <button
        className={`github-button ${otherProps.className}`}
        onClick={showReadme}>
        {buttonText}
      </button>
      {isVisible && (
        <GithubReadme
          repo={repo}
          branch={branch}
          filename={fileName}
          closeHandler={closeHandler}></GithubReadme>
      )}
    </>
  );
};
