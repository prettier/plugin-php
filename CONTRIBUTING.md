# Contributing to Prettier for PHP

To get up and running, install the dependencies and run the tests:

```bash
yarn
yarn test
```

Run `yarn prettier path/to/file.php` to format a single file.

Here's what you need to know about the tests:

* The tests use [Jest](https://facebook.github.io/jest/) snapshots.
* You can make changes and run `jest -u` (or `yarn test -u`) to update the snapshots. Then run `git diff` to take a look at what changed. Always update the snapshots when opening a PR.
* You can run `AST_COMPARE=1 yarn test` for a more robust test run. That formats each file, re-parses it, and compares the new AST with the original one and makes sure they are semantically equivalent.
* If you would like to debug prettier locally, you can either debug it in node or the browser. The easiest way to debug it in the browser is to run the interactive `docs` REPL locally. The easiest way to debug it in node, is to create a local test file and run it in an editor like VS Code.

Run `yarn lint --fix` to automatically format files.

If you can, take look at [commands.md](https://github.com/prettier/prettier/blob/master/commands.md) and check out [Wadler's paper](http://homepages.inf.ed.ac.uk/wadler/papers/prettier/prettier.pdf) to understand how Prettier works.
