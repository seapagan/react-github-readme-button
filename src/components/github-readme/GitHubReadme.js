import React, { useEffect, useState } from "react";

import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { marked } from "marked";

import "github-markdown-css/github-markdown-light.css";
import "./GitHubReadme.scss";

const GitHubReadme = ({ repo, branch = "main", filename = "README.md" }) => {
  const readmeURL = `https://raw.githubusercontent.com/${repo}/${branch}/${filename}`;

  const [readme, setReadme] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  marked.setOptions({
    highlight: function (code, lang) {
      const hljs = require("highlight.js");
      const language = hljs.getLanguage(lang) ? lang : "plaintext";

      return hljs.highlight(code, { language }).value;
    },
    gfm: true,
    langPrefix: "hljs language-",
  });

  useEffect(() => {
    const markdownError = message => {
      return `# Error\n${message}`;
    };

    fetch(readmeURL, { cache: "no-store" })
      .then(res => {
        if (res.ok) {
          return res.text();
        } else {
          let message;
          switch (res.status) {
            case 400:
              message =
                "Sorry that repository name is invalid.\n" +
                "It should be in the format `username/repository`.";
              break;
            case 404:
              message =
                "Sorry, That repository __does not exist__ " +
                `(${res.statusText})`;
              break;
            default:
              message =
                "This operation failed with a status " +
                `${res.status} __${res.statusText} __`;
          }

          return markdownError(message);
        }
      })
      .then(data => {
        setReadme(data);
      })
      .catch(res => {
        return (
          `Error ${res.status} (${res.statusText}) ` +
          "while performing this operation"
        );
      });
  }, [readmeURL]);

  useEffect(() => {
    setMarkdown(marked(readme || ""));
  }, [readme]);

  return (
    <div className="modal-wrapper">
      <article className="content-wrapper">
        <header>
          <a
            href={"https://github.com/" + repo}
            target="_blank"
            rel="noreferrer">
            {repo}
          </a>
          <span className="close-button">&#10060;</span>
        </header>
        <div className="markdown-body">
          {parse(DOMPurify.sanitize(markdown))}
        </div>
      </article>
    </div>
  );
};

export default GitHubReadme;
