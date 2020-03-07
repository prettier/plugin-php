# Contributing to Prettier for PHP

To get up and running, install the dependencies and run the tests:

```bash
yarn
yarn test

# format a single file
yarn prettier path/to/file.php`

# run a single test
yarn test tests/{folder of your choice}
```

Here's what you need to know about the tests:

* The tests use [Jest](https://facebook.github.io/jest/) snapshots.
* You can make changes and run `jest -u` (or `yarn test -u`) to update the snapshots. Then run `git diff` to take a look at what changed. Always update the snapshots when opening a PR.
* You can run `AST_COMPARE=1 yarn test` for a more robust test run. That formats each file, re-parses it, and compares the new AST with the original one and makes sure they are semantically equivalent.

Run `yarn lint --fix` to automatically format files.

If you can, take look at [commands.md](https://github.com/prettier/prettier/blob/master/commands.md) and check out [Wadler's paper](http://homepages.inf.ed.ac.uk/wadler/papers/prettier/prettier.pdf) to understand how Prettier works.

## Debugging

### VScode

Add the following configuration to `.vscode/launch.json`:

```json
{
    "type": "node",
    "request": "launch",
    "name": "Prettify test.php",
    "skipFiles": [
        "<node_internals>/**"
    ],
    "program": "${workspaceRoot}/node_modules/.bin/prettier",
    "args": ["--plugin=.", "--parser=php", "foo.php"],
    "cwd": "${workspaceRoot}",
    "outputCapture": "std"
}
```

Afterwards, paste some PHP code into `test.php`, add a breakpoint, and start the debugger.

### Browser

```
node --inspect-brk node_modules/.bin/jest --runInBand tests/{folder of your choice}/`
```

Details about debugging in the Browser can be found in the [Jest troubleshooting docs](https://jestjs.io/docs/en/troubleshooting).
