# Current Bug List

- ~~Does not show local repository images from the readme. Probably need to parse
  any `img` tags and prepend the correct root path which will be :
  <https://github.com/{user}/{repo}/raw/main/{current-img-src}>~~
- ~~local relative file links to not have the correct base url to the relevant
  project~~
- ~~GitHub emojis will not be displayed, this will also be fixed shortly.~~
- ~~package needs `sass` package installed by end developer, fix this by
  compiling all SCSS to CSS at build time.~~ [FIXED] by switching to CSS as it's
  trivial code.
- the filename is case-sensitive - `readme.md` is not the same as `README.md`
