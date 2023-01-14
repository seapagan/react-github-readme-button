# react-github-readme-button

This is ongoing development for a component to display the README from a
provided repository, which will be shown in a modal popup with all Markdown
translated and using the correct GitHub styling.

At the moment I'm still working on the component so this is a test app that
allows you to enter any repository (in the form `username/repository`, without
the GitHub url) and it will then properly display the README.

Test Emoji: :rocket:

## TEST Web app

A test app is available at <https://seapagan.github.io/react-github-readme-button/>

### Limitations

- only fetches README.md
- only fetches from the `main` branch.

The component has the ability to fetch from any branch and any name however. If
these are not specified it defaults to the most common `README.md` and the
`main` branch

## TODO List

This is a work in progress which will eventually result in an installable React
component. See the [TODO](TODO.md) for what is remaining.

## Current Bugs

See [BUGS.md](BUGS.md)
