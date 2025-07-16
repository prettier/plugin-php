<div align="center">
<img alt="Prettier"
  src="https://raw.githubusercontent.com/prettier/prettier-logo/master/images/prettier-icon-light.png">
<img alt="PHP" height="180" hspace="25" vspace="15"
  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/PHP-logo.svg/500px-PHP-logo.svg.png">
</div>

<h2 align="center">Prettier PHP Plugin</h2>

<p align="center">
  <a href="https://github.com/prettier/plugin-php/actions?query=branch%3Amain">
    <img alt="CI Status" src="https://img.shields.io/github/actions/workflow/status/prettier/plugin-php/nodejs.yml?style=flat-square&label=CI&branch=main">
  </a>
  <a href="https://www.npmjs.com/package/@prettier/plugin-php">
    <img alt="npm version" src="https://img.shields.io/npm/v/@prettier/plugin-php.svg?style=flat-square">
  </a>
  <a href="https://codecov.io/gh/prettier/plugin-php">
    <img alt="Coverage Status" src="https://img.shields.io/codecov/c/github/prettier/plugin-php.svg?style=flat-square">
  </a>
  <!-- <a href="https://www.npmjs.com/package/@prettier/plugin-php">
    <img alt="monthly downloads" src="https://img.shields.io/npm/dm/@prettier/plugin-php.svg?style=flat-square">
  </a> -->
  <a href="https://github.com/prettier/prettier#badge">
    <img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square">
  </a>
  <a href="https://x.com/intent/follow?screen_name=PrettierCode">
    <img alt="Follow Prettier on X" src="https://img.shields.io/badge/%40PrettierCode-9f9f9f?style=flat-square&logo=x&labelColor=555">
  </a>
</p>

## Intro

Prettier is an opinionated code formatter. It enforces a consistent style by parsing your code and re-printing it with its own rules that take the maximum line length into account, wrapping code when necessary.

This plugin adds support for the PHP language to Prettier.

> [!NOTE]
>
> This plugin uses PSR / PER as guidance when making formatting decisions, but does not aim to be fully PSR / PER compliant. The idea is to stay reasonably close to how Prettier for JS works.

### Can this be used in production?

We're considering the plugin to be stable when pure PHP files are formatted. Formatting of files that contain mixed PHP and HTML is still considered unstable - please see [open issues with the tag "inline"](https://github.com/prettier/plugin-php/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc+label%3Ainline) for details.

If you want to use the plugin in production, we recommend limiting its scope to pure PHP files.

### Input

```php
<?php
array_map(function($arg1,$arg2) use ( $var1, $var2 ) {
    return $arg1+$arg2/($var+$var2);
}, array("complex"=>"code","with"=>
    function() {return "inconsistent";}
,"formatting"=>"is", "hard" => "to", "maintain"=>true));
```

### Output

```php
<?php

array_map(
    function ($arg1, $arg2) use ($var1, $var2) {
        return $arg1 + $arg2 / ($var + $var2);
    },
    [
        "complex" => "code",
        "with" => function () {
            return "inconsistent";
        },
        "formatting" => "is",
        "hard" => "to",
        "maintain" => true,
    ]
);
```

## Playground

You can give the plugin a try in our [playground](https://loilo.github.io/prettier-php-playground/)!

## Install

yarn:

```bash
yarn add --dev prettier @prettier/plugin-php
# or globally (pending https://github.com/prettier/prettier/issues/15141)
yarn global add prettier @prettier/plugin-php
```

npm:

```bash
npm install --save-dev prettier @prettier/plugin-php
# or globally (pending https://github.com/prettier/prettier/issues/15141)
npm install --global prettier @prettier/plugin-php
```

### Activate the plugin

Create or modify your [prettier configuration file](https://prettier.io/docs/en/configuration) to activate the plugin:

```json
{
  "plugins": ["@prettier/plugin-php"]
}
```

## Use

### With Node.js

If you installed prettier as a local dependency, you can add prettier as a script in your `package.json`,

```json
{
  "scripts": {
    "prettier": "prettier"
  }
}
```

and then run it via

```bash
yarn run prettier path/to/file.php --write
# or
npm run prettier -- path/to/file.php --write
```

If you installed globally, run

```bash
prettier path/to/file.php --write
```

### In the Browser

This package exposes a `standalone.js` that can be used alongside Prettier's own `standalone.js` to make the PHP plugin work in browsers without a compile step.

First, grab both standalone scripts from an npm CDN like [unpkg](https://unpkg.com/):

```html
<script src="https://unpkg.com/prettier/standalone.js"></script>
<script src="https://unpkg.com/@prettier/plugin-php/standalone.js"></script>
```

Then use Prettier with PHP, just like this:

```js
await prettier.format(YOUR_CODE, {
  plugins: prettierPlugins,
  parser: "php",
});
```

See this code in action [in this basic demo](https://jsbin.com/butoruw/edit?html,output).

### With Bundlers

Bundlers like webpack, Rollup or browserify automatically recognize how to handle the PHP plugin. Remember that even when using a bundler, you still have to use the standalone builds:

```js
import prettier from "prettier/standalone";
import * as prettierPluginPhp from "@prettier/plugin-php/standalone";

await prettier.format(YOUR_CODE, {
  plugins: [prettierPluginPhp],
  parser: "php",
});
```

## Configuration

Prettier for PHP supports the following options. We recommend that all users set the `phpVersion` option.

| Name               | Default     | Description                                                                                                                                                                                                                                 |
| ------------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `phpVersion`       | `"auto"` \* | Allows specifying the PHP version you're using. (See Notes Below)                                                                                                                                                                           |
| `printWidth`       | `80`        | Same as in Prettier ([see prettier docs](https://prettier.io/docs/en/options.html#print-width))                                                                                                                                             |
| `tabWidth`         | `4`         | Same as in Prettier ([see prettier docs](https://prettier.io/docs/en/options.html#tab-width)), The default is `4` based on the `PSR-2` coding standard.                                                                                     |
| `useTabs`          | `false`     | Same as in Prettier ([see prettier docs](https://prettier.io/docs/en/options.html#tabs))                                                                                                                                                    |
| `singleQuote`      | `false`     | If set to `"true"`, strings that use double quotes but do not rely on the features they add, will be reformatted. Example: `"foo" -> 'foo'`, `"foo $bar" -> "foo $bar"`.                                                                    |
| `trailingCommaPHP` | `true`      | If set to `true`, trailing commas will be added wherever possible. <br> If set to `false`, no trailing commas are printed.                                                                                                                  |
| `braceStyle`       | `"per-cs"`  | If set to `"per-cs"`, prettier will move open brace for code blocks (classes, functions and methods) onto new line. <br> If set to `"1tbs"`, prettier will move open brace for code blocks (classes, functions and methods) onto same line. |
| `requirePragma`    | `false`     | Same as in Prettier ([see prettier docs](https://prettier.io/docs/en/options.html#require-pragma))                                                                                                                                          |
| `insertPragma`     | `false`     | Same as in Prettier ([see prettier docs](https://prettier.io/docs/en/options.html#insert-pragma))                                                                                                                                           |

### \* `phpVersion` Configuration Notes :

The default setting `auto`, attempts to auto-detect your supported php versions from a `composer.json` with in the
current directory or any parent directory, the plugin will use a minimum supported php version from
`{"require":{"php":"..."}}` to set the phpVersion. If not found or not able to be parsed, it will default to latest
supported PHP version.

You set the `phpVersion` to `composer` and this will only use the `composer.json` file to determine the php
version, prettier will crash if the PHP cannot be determined.

You can also set the `phpVersion` to a specific version, such as `7.4`, `8.0`, `8.1`, `8.2`, or `8.3`.

**Please Note:** If the phpVersion is not set correctly for your environment, this plugin will produce code that could
be incompatible with your PHP runtime. For example, if you are using PHP 7.4, but the plugin is set to PHP 8.3, it will
produce code that uses features not available in PHP 7.4.

## Ignoring code

A comment `// prettier-ignore` will exclude the next node in the abstract syntax tree from formatting.

For example:

```php
matrix(
  1, 0, 0,
  0, 1, 0,
  0, 0, 1
);

// prettier-ignore
matrix(
  1, 0, 0,
  0, 1, 0,
  0, 0, 1
);
```

will be transformed to

```php
matrix(1, 0, 0, 0, 1, 0, 0, 0, 1);

// prettier-ignore
matrix(
  1, 0, 0,
  0, 1, 0,
  0, 0, 1
)
```

## Editor integration

### Visual Studio Code

The official [prettier plugin for vscode](https://github.com/prettier/prettier-vscode) supports plugins since Version 1.10.0. To enable it, install the extension and make sure the plugin is installed _locally_ (in your project folder).

Visual Studio Code may not recognise the document selectors provided by this plugin, and so you can add php to your document selectors by adding the following line to `.vscode/settings.json`:

```json
  "prettier.documentSelectors": [
    "**/*.{js,jsx,ts,tsx,vue,html,css,scss,less,json,md,mdx,graphql,yaml,yml,php}"
  ]
```

You may also need to declare php as the parser in your prettier config file:

```json
{
  "parser": "php",
  "plugins": ["@prettier/plugin-php"]
}
```

See (this issue)[https://github.com/prettier/plugin-php/issues/1730] for more discussion around potential VS Code solutions.

### PhpStorm / IntelliJ / Jetbrains IDE

- Install prettier and plugin locally `yarn add -D prettier @prettier/plugin-php`
- Open Settings (File, Settings)
- Go to Plugins Section, Select Marketplace, Search for Prettier, Install Plugin, Restart IDE
- Open Settings, Search for Prettier, select Prettier in left settings navigation
- Check prettier package has auto-detected, should be something like `myproject/node_modules/prettier`
- Update Run for Files to include .php, eg: `{**/*,*}.{js,ts,jsx,tsx,php,json,scss,vue,md}`
- Tick the On Save button, if you want your files formatting updated on file save
- Clock OK to save settings

_Note: Just pressing save does not reformat your current file unless the file has been modified in some way,
alternatively you can use the Prettier shortcut Ctrl+Alt+Shift+P_

### Sublime Text

Sublime Text support is available through Package Control and the [JsPrettier](https://packagecontrol.io/packages/JsPrettier) plugin.

### Vim

The official [prettier plugin for vim](https://github.com/prettier/vim-prettier) has built-in support for plugin-php since 1.0.

### Nova

The [Prettier⁺ Extension](https://extensions.panic.com/extensions/stonerl/stonerl.prettier/) has built-in support for plugin-php.

#### ALE

The linting plugin ALE has built-in support for prettier and its plugins. Just add prettier to your [list of fixers](https://github.com/w0rp/ale#2ii-fixing). For example:

```vim
let g:ale_fixers={
  \'javascript': ['prettier'],
  \'json': ['prettier'],
  \'php': ['prettier'],
\}
```

#### Custom

Alternatively, adding the following to `.vimrc` will define a custom command `:PrettierPhp` that runs the plugin while preserving the cursor position and run it on save.

```vim
" Prettier for PHP
function PrettierPhpCursor()
  let save_pos = getpos(".")
  %! prettier --stdin --parser=php
  call setpos('.', save_pos)
endfunction
" define custom command
command PrettierPhp call PrettierPhpCursor()
" format on save
autocmd BufwritePre *.php PrettierPhp
```

## Integration for other tools

### PHP-CS-Fixer

See `docs/recipes/php-cs-fixer` for integration help, code can also be found in https://gist.github.com/Billz95/9d5fad3af728b88540fa831b73261733

## Contributing

If you're interested in contributing to the development of Prettier for PHP, you can follow the [CONTRIBUTING guide from Prettier](https://github.com/prettier/prettier/blob/master/CONTRIBUTING.md), as it all applies to this repository too.

To test it out on a PHP file:

- Clone this repository.
- Run `yarn`.
- Create a file called `test.php`.
- Run `yarn prettier test.php` to check the output.

## Maintainers

<table>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/czosel">
          <img width="150" height="150" src="https://github.com/czosel.png?v=3&s=150">
          </br>
          Christian Zosel
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/evilebottnawi">
          <img width="150" height="150" src="https://github.com/evilebottnawi.png?v=3&s=150">
          </br>
          Evilebot Tnawi
        </a>
      </td>
    </tr>
  <tbody>
</table>
