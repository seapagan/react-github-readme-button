import React, { useEffect, useState } from "react";

import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { marked } from "marked";
import { markedEmoji } from "marked-emoji";

import { emojis } from "./emojis";

import "github-markdown-css/github-markdown-light.css";
import "./GitHubReadme.scss";

const GitHubReadme = ({
  repo,
  branch = "main",
  filename: fileName = "README.md",
  closeHandler,
}) => {
  const readmeURL = `https://raw.githubusercontent.com/${repo}/${branch}/${fileName}`;

  const [readme, setReadme] = useState("");
  const [markdown, setMarkdown] = useState("");

  marked.setOptions({
    highlight: function (code, lang) {
      const hljs = require("highlight.js");
      const language = hljs.getLanguage(lang) ? lang : "plaintext";

      return hljs.highlight(code, { language }).value;
    },
    gfm: true,
    langPrefix: "hljs language-",
  });

  marked.use(markedEmoji({ emojis, unicode: false }));

  useEffect(() => {
    if (repo === null || repo === "") return;

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
                `(${res.status})`;
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
  }, [readmeURL, repo]);

  useEffect(() => {
    setMarkdown(marked(readme || ""));
  }, [readme]);

  if (repo === "" || !repo) return;

  return (
    <>
      <div className="overlay"></div>
      <div className="modal-wrapper">
        <article className="content-wrapper">
          <header>
            <a
              href={"https://github.com/" + repo}
              target="_blank"
              rel="noreferrer">
              {repo}
            </a>
            <span className="close-button" onClick={closeHandler}>
              &#10060;
            </span>
          </header>
          <div className="markdown-body">
            {parse(DOMPurify.sanitize(markdown))}
          </div>
        </article>
      </div>
    </>
  );
};

export default GitHubReadme;
