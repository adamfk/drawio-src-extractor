# drawio-src-extractor

The makers of draw.io (jgraph) no longer publish the core library `mxGraph` of draw.io.
https://github.com/jgraph/mxgraph

Even though draw.io is open source, the core library `mxGraph` is only available in minified form.
https://stackoverflow.com/questions/74423905/where-can-i-get-mxclient-js-unminified-source-code

This is a pain for people that want to develop plugins for draw.io. The minified app.min.js is 7.5 MB and vscode intellisense doesn't really work with it.

This project splits the draw.io app.min.js file into a file per class so that vscode intellisense does work with it.

While the functions don't have any documentation or nice variable names, it at least allows us to detect some mxGraph breaking changes.

This script is really basic and has no tests.

There are still a fair number of files in the draw.io github repo that are un-minified. These should be used when possible.
