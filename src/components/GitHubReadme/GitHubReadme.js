import React, { useEffect, useState } from "react";

import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { marked } from "marked";

import { emojis } from "./emojiList";
import { markedEmoji } from "./markedEmoji";

import "github-markdown-css/github-markdown-light.css";
import "./GitHubReadme.css";

const GitHubReadme = ({
  repo,
  branch = "main",
  fileName = "README.md",
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
    baseUrl: `https://github.com/${repo}/blob/${branch}/`,
  });

  const renderer = {
    // we override the image renderer for local images as they require a
    // different base url than eg local links.
    image(href, title, text) {
      // don't mangle external images
      if (href.includes("http")) return false;

      return `
        <img src="https://github.com/${repo}/raw/${branch}/${href}" />
      `;
    },
  };

  marked.use({ renderer });
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
          <div className="modal-header">
            <a
              href={"https://github.com/" + encodeURI(repo)}
              target="_blank"
              rel="noreferrer">
              {repo}
            </a>
            <span className="close-button" onClick={closeHandler}>
              &#10060;
            </span>
          </div>
          <div className="markdown-body">
            {parse(DOMPurify.sanitize(markdown))}
          </div>
        </article>
      </div>
    </>
  );
};

export default GitHubReadme;
