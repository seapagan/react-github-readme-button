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
    fetch(readmeURL, { cache: "no-store" })
      .then(res => res.text())
      .then(data => {
        setReadme(data);
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
