# eslint-md(1) -- Lint JavaScript in markdown code-blocks

## SYNOPSIS

`eslint-md` [options] file.md [file.md] [dir]

## DESCRIPTION

**eslint-md** lints JavaScript in markdown code-blocks with ESLint.

Logs verbose debugging information when `$DEBUG` is set to `"eslint:*"`.

Options are as follows:

* `-h`, `--help`: Show help;
* `-c`, `--config` _path::String_: Use configuration from this file;
* `--rulesdir` [_path::String_]: Use additional rules from this directory;
* `-f`, `--format` _String_: Use a specific output format - default: stylish;
* `-v`, `--version`: Outputs the version number;
* `--reset`: Set all default rules to off - default: false;
* `--no-eslintrc`: Disable use of configuration from .eslintrc;
* `--env` [_String_]: Specify environments;
* `--ext` [_String_]: Specify Markdown file extensions - default: .md, .markd, .markdown;
* `--plugin` [_String_]: Specify plugins;
* `--global` [_String_]: Define global variables;
* `--rule` _Object_: Specify rules;
* `--ignore-path` _path::String_: Specify path of ignore file;
* `--no-ignore`: Disable use of .eslintignore;
* `--no-color`: Disable color in piped output;
* `-o`, `--output-file` _path::String_: Specify file to write report to;
* `--quiet`: Report errors only - default: false;
* `--stdin`: Lint code provided on <STDIN> - default: false.

## BUGS

<<https://github.com/wooorm/eslint-md/issues>>

## AUTHOR

Written by Titus Wormer <<tituswormer@gmail.com>>
