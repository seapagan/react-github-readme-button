/* -------------------------------------------------------------------------- */
/*         'marked-emoji' from https://github.com/UziTech/marked-emoji        */
/* -------------------------------------------------------------------------- */

// This is a slightly modified version of the above package, to allow
// adding a CSS class to the displayed emoji.

const defaultOptions = {
  // emojis: {}, required
  unicode: false,
};

export function markedEmoji(options) {
  options = {
    ...defaultOptions,
    ...options,
  };

  if (!options.emojis) {
    throw new Error("Must provide emojis to markedEmoji");
  }

  return {
    extensions: [
      {
        name: "emoji",
        level: "inline",
        start(src) {
          return src.indexOf(":");
        },
        tokenizer(src, tokens) {
          const rule = /^:(.+?):/;
          const match = rule.exec(src);
          if (!match) {
            return;
          }

          const name = match[1];
          const emoji = options.emojis[name];

          if (!emoji) {
            return;
          }

          return {
            type: "emoji",
            raw: match[0],
            name,
            emoji,
          };
        },
        renderer(token) {
          if (options.unicode) {
            return token.emoji;
          } else {
            return `<img class="gh-emoji" alt="${token.name}" src="${
              token.emoji
            }"${this.parser.options.xhtml ? " /" : ""}>`;
          }
        },
      },
    ],
  };
}
