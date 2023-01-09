# react-github-readme-preview

This is ongoing development for a component to display the README from a
provided repository, which will be shown in a modal popup with all Markdown
translated and using the correct GitHub styling.

At the moment I'm still workinbg on the component so this is a test app that
allows you to enter any repository (in the form `username/repository`, without
the GitHub url) and it will then properly display the README.

## Current Limitations of the test web interface

- only fetches README.md
- only fetches from the `main` branch.
- no modal popup, just displayed to screen while I finalize the conversion and
  formatting.

The component has the ability to fetch from any branch and any name however. If
these are not specified it defaults to the most common `README.md` and the
`main` branch

## Current Bugs

Currently the component has the following bugs/limitations

- it will not properly display any images in the README. This will be worked on
  shortly, it just needs all `img` tags to be prefixed with the GitHub raw path.
- GitHub emojis will not be displayed, this will also be fixed shortly.
