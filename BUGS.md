# Current Bug List

- Does not show local repository images from the readme. Probably need to parse
  any `img` tags and prepend the correct root path which will be :
  <https://github.com/{user}/{repo}/blob/main/{current-img-src}?raw=true>
