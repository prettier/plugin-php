## Breaking change

This release introduces the new option `phpVersion`. Depending on the options you're using, the upgrade requires some changes to your configuration:

- `phpVersion`: This new option allows the plugin to produce output which is optimized for the PHP version you're running. The following values are supported:
  - `7.1`, `7.0`, `5.6`, `5.5`, `5.4`: Since our formatting doesn't change between these versions, all of them are equivalent. **This category is used by default.**
  - `7.2`: Print trailing commas in "use"
  - `7.3`, `7.4`: Print trailing commas in function calls, flexible heredoc/nowdoc printing
  - `5.3`, `5.2`, `5.1`, `5.0` and older: Don't force array shorthand notation

- `trailingCommaPHP`: All options except `none` and `all` have been removed. If you've been using a setting like `php7.2` before, change it to `all` and set `phpVersion` to `7.2`.

For more information please see #1280.

## Features

This release adds support for PHP 7.3 and 7.4 :tada: 

- feat: add phpVersion option (#1286)
- fix: remove extra linebreak in nowdoc (#1287)
- feat: deterministic printing of array shortform (#1289)
- fix: array entry byref printing (#1293)
- feat: numeric literal separator support (#1294)
- fix: remove extraneous open tag for inline nodes following comments (#1338, thanks @jodysimpson)
- fix: correctly handle right-associative ?? operator (#1345)
- feat: print flexible heredoc/nowdoc for PHP >= 7.3 (#1291)
- fix: Support static & return-typed arrow functions (#1362, thanks @adamaveray)
