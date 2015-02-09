'use strict';

var originalOptions = require('eslint/lib/options');
var pack = require('../package.json');

var originalParse = originalOptions.parse;
var originalHelp = originalOptions.generateHelp;

var EXTENSIONS = ['.md', '.markd', '.markdown'];

var options = Object.create(originalOptions);

/**
 * Prettifies and rewrites `help`.  See eslint/lib/options.js.
 * Defers to ESLint’s optionator’s `help`, prettifies output,
 * replaces `JavaScript` references with `Markdown`,
 * adds an example, etc.
 *
 * @return {string}
 */
function help() {
    var value = originalHelp.apply(originalOptions, arguments);

    value = value
        .replace(/^eslint/m, 'eslint-md')
        .replace(/default: \.js/, 'default: ' + EXTENSIONS.join(', '))
        .replace(/\.js/g, '.md')
        .replace(/JavaScript file/, 'Markdown file')
        .split('\n');

    value[0] = 'Usage: ' + value[0];

    value.splice(1, 0,
        '',
        pack.description + '.'
    );

    value.splice(5, 0, '');

    value.push(
        '',
        '# All ESLint features, such as `.eslintrc` and ' +
        '`.eslintignore` work!',
        '',
        'Example:',
        '',
        '# Pass all markdown files through eslint with options',
        '$ eslint-md . --rule no-alert:false --global alert',
        '# Readme.md',
        '#   12:19  error  Missing semicolon                semi',
        '# ',
        '# ✖ 1 problem (1 error, 0 warnings)'
    );

    return '\n  ' + value.join('\n  ') + '\n';
}

/**
 * Parses options.  See eslint/lib/options.js.
 * Simply defers to ESLint’s optionator, but replaces
 * JavaScript extensions with Markdown extensions.
 *
 * @return {Object}
 */
function parse() {
    var result = originalParse.apply(originalOptions, arguments);

    result.ext = EXTENSIONS.concat();

    return result;
}

options.generateHelp = help;
options.parse = parse;

module.exports = options;
