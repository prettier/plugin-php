<p align="center">
    :construction: Work in Progress! :construction:
</p>

<div align="center">
<img alt="Prettier"
  src="https://raw.githubusercontent.com/prettier/prettier-logo/master/images/prettier-icon-light.png">
<img alt="PHP" height="180" hspace="25" vspace="15"
  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/PHP-logo.svg/500px-PHP-logo.svg.png">
</div>

<h2 align="center">Prettier PHP Plugin</h2>

<p align="center">
  <a href="https://gitter.im/jlongster/prettier">
    <img alt="Gitter" src="https://img.shields.io/gitter/room/jlongster/prettier.svg?style=flat-square">
  </a>
  <a href="https://travis-ci.org/prettier/prettier-php">
    <img alt="Travis" src="https://img.shields.io/travis/prettier/prettier-php/master.svg?style=flat-square">
  </a>
  <a href="https://www.npmjs.com/package/@prettier/plugin-php">
    <img alt="npm version" src="https://img.shields.io/npm/v/@prettier/plugin-php.svg?style=flat-square">
  </a>
  <!-- <a href="https://www.npmjs.com/package/@prettier/plugin-php">
    <img alt="monthly downloads" src="https://img.shields.io/npm/dm/@prettier/plugin-php.svg?style=flat-square">
  </a> -->
  <a href="#badge">
    <img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square">
  </a>
  <a href="https://twitter.com/PrettierCode">
    <img alt="Follow+Prettier+on+Twitter" src="https://img.shields.io/twitter/follow/prettiercode.svg?label=follow+prettier&style=flat-square">
  </a>
</p>

## WORK IN PROGRESS

Please note that this plugin is currently in alpha stage and still under active development. We encourage everyone to try it and give feedback, but we don't recommend it for production use yet.

## Intro

Prettier is an opinionated code formatter. It enforces a consistent style by parsing your code and re-printing it with its own rules that take the maximum line length into account, wrapping code when necessary.

This plugin adds support for the PHP language to Prettier.

### Input

```php
array_map(function($arg1,$arg2) use ( $var1, $var2 ) {
    return $arg1+$arg2/($var+$var2);
}, array("complex"=>"code","with"=>"inconsistent","formatting"=>"is", "hard" => "to", "maintain"=>true));
```

### Output

```php
array_map(
    function ($arg1, $arg2) use ($var1, $var2) {
        return $arg1 + $arg2 / ($var + $var2);
    },
    array(
        "complex" => "code",
        "with" => "inconsistent",
        "formatting" => "is",
        "hard" => "to",
        "maintain" => true
    )
);
```

## Install

yarn:

```bash
yarn add --dev prettier @prettier/plugin-php
# or globally
yarn global add prettier @prettier/plugin-php
```

npm:

```bash
npm install --save-dev prettier @prettier/plugin-php
# or globally
npm install --global prettier @prettier/plugin-php
```

## Use

If you installed prettier as a local dependency, you can add prettier as a script in your `package.json`,

```json
"scripts": {
  "prettier": "prettier"
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

## Editor integration

### Atom

The official [prettier plugin for atom](https://github.com/prettier/prettier-atom) supports plugins.

### VScode

Regarding plugin support in the official plugin prettier-vscode see [this issue](https://github.com/prettier/prettier-vscode/issues/395).

Alternatively, install [Run on Save](https://marketplace.visualstudio.com/items?itemName=emeraldwalk.RunOnSave) and add the following section to your settings:

```json
"emeraldwalk.runonsave": {
  "commands": [
    {
      "match": "\\.php$",
        "cmd": "prettier ${file} --write"
    }
  ]
}
```

### Vim

Regarding plugin support in the official plugin vim-prettier see [this issue](https://github.com/prettier/vim-prettier/issues/119).

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
        <a href="https://github.com/mgrip">
          <img width="150" height="150" src="https://github.com/mgrip.png?v=3&s=150">
          </br>
          Mike Grip
        </a>
      </td>
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
