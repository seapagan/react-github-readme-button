# react-github-readme-button <!-- omit in toc -->

A React component to display the README from a specific repository in a modal
popup with all Markdown translated and using the correct GitHub styling.

[![NPM Version](https://shields.io/npm/v/react-github-readme-button)](https://www.npmjs.com/package/react-github-readme-button)
[![CodeQL](https://github.com/seapagan/react-github-readme-button/actions/workflows/codeql.yml/badge.svg)](https://github.com/seapagan/react-github-readme-button/actions/workflows/codeql.yml)

- [Installation](#installation)
- [How to use](#how-to-use)
  - [Pre / Post Hooks](#pre--post-hooks)
- [Example Web app](#example-web-app)
  - [Example app Limitations](#example-app-limitations)
- [Contributing](#contributing)
  - [Using the test Application](#using-the-test-application)
  - [Hacking on the component](#hacking-on-the-component)
- [TODO List](#todo-list)
- [Current Bugs](#current-bugs)

It even properly shows GitHub emojis like `:tada:` :tada:

Relative file links ([README.md](README.md)) and folders ([src/](src)) should
work properly too, though files and folders should NOT have a preceeding
forward-slash:

**Wrong**:

```markdown
[file.py](/file.py)
[folder](/folder)
```

**Correct**:

```markdown
[file.py](file.py)
[folder](folder)
```

## Installation

```console
npm install react-github-readme-button
```

or

```console
yarn add react-github-readme-button
```

## How to use

```javascript
import { GitHubReadmeButton } from react-github-readme-button

<GitHubReadmeButton
  repo="seapagan/react-github-readme-button" // required
  branch="main" // optional, defaults to 'main'
  fileName="README.md" // optional, defaults to 'README.md'
  className="button-style" // optional but recommended, style the button
  buttonText = "View README" // Button text, optional, defaults to 'View README'
  preDisplayHook={handlePreDisplayHook} // See below
  postDisplayHook={handlePostDisplayHook} // See below
/>
```

### Pre / Post Hooks

The 2 hooks `preDisplayHook` and `postDisplayHook` are called just before the
README is rendered and just after it is removed respectively. These were
primarily designed to pause timers used in a Carousel system but can do any
processing you need. See the Example Web app for a usage example.

## Example Web app

An example app is available at
<https://seapagan.github.io/react-github-readme-button/> or from a local clone
of the repository on <http://localhost:3000>. This uses the  local code of the
component, so is good to use during development.

### Example app Limitations

- only fetches README.md
- only fetches from the `main` branch.

The component has the ability to fetch from any branch and any name however. If
these are not specified it defaults to the most common `README.md` and the
`main` branch

## Contributing

Contributions to this project, especially Bug Reports or fixes are very welcome.

1. Fork it
2. Install the development dependencies (`npm install` or `yarn install`)
3. Create your feature branch (`git checkout -b my-new-feature`)
4. Commit your changes (`git commit -am 'Add some feature'`)
5. Push to the branch (`git push origin my-new-feature`)
6. Create a new Pull Request

### Using the test Application

Run `npm install` or `yarn install` to install all required dependencies.
Run`npm start` or `yarn start` from the project root which will serve up a test
React app on <http://localhost:3000>

### Hacking on the component

All the actual component code is in the [components](src/components/) directory.

## TODO List

See the [TODO](TODO.md) list for future plans.

## Current Bugs

See [BUGS.md](BUGS.md)
