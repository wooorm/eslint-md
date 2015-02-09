# eslint-md [![Build Status](https://img.shields.io/travis/wooorm/eslint-md.svg?style=flat)](https://travis-ci.org/wooorm/eslint-md) [![Coverage Status](https://img.shields.io/coveralls/wooorm/eslint-md.svg?style=flat)](https://coveralls.io/r/wooorm/eslint-md?branch=master)

Lint JavaScript in markdown code blocks with [ESLint](https://github.com/eslint/eslint).

**eslint-md** works exactly like **eslint** (such as supporting `.eslintrc` and `.eslintignore`), but lints the JavaScript code in Markdown code blocks (with a `js` or `javascript` code flag).

- **eslint-md**\([1](http://en.wikipedia.org/wiki/Man_page#Manual_sections)\) functions like ESLint’s [Command Line Interface](http://eslint.org/docs/command-line-interface/);
- **eslint-md**\([3](http://en.wikipedia.org/wiki/Man_page#Manual_sections)\) functions like ESLint’s [Node.js API](http://eslint.org/docs/developer-guide/nodejs-api.html).

![Example Screenshot](https://raw.github.com/wooorm/eslint-md/master/screenshot.png)

## Installation

[npm](https://docs.npmjs.com/cli/install):

```bash
$ npm install eslint-md
```

You probably want the CLI:

```bash
$ npm install --global eslint-md
```

## Usage

Refer to [ESLint’s docs](http://eslint.org/docs/) for more information regarding its functioning.

```text
Usage: eslint-md [options] file.md [file.md] [dir]

Lint JavaScript in markdown code-blocks with ESLint.

Options:

  -h, --help                  Show help
  -c, --config path::String   Use configuration from this file
  --rulesdir [path::String]   Use additional rules from this directory
  -f, --format String         Use a specific output format - default: stylish
  -v, --version               Outputs the version number
  --reset                     Set all default rules to off - default: false
  --no-eslintrc               Disable use of configuration from .eslintrc
  --env [String]              Specify environments
  --ext [String]              Specify Markdown file extensions - default: .md, .markd, .markdown
  --plugin [String]           Specify plugins
  --global [String]           Define global variables
  --rule Object               Specify rules
  --ignore-path path::String  Specify path of ignore file
  --no-ignore                 Disable use of .eslintignore
  --no-color                  Disable color in piped output
  -o, --output-file path::String  Specify file to write report to
  --quiet                     Report errors only - default: false
  --stdin                     Lint code provided on <STDIN> - default: false

# All ESLint features, such as `.eslintrc` and `.eslintignore` work!

Example:

# Pass all markdown files through eslint with options
$ eslint-md . --rule no-alert:false --global alert
# Readme.md
#   12:19  error  Missing semicolon                semi
# 
# ✖ 1 problem (1 error, 0 warnings)
```

## License

[MIT](LICENSE) © [Titus Wormer](http://wooorm.com)
