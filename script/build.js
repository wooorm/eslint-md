'use strict';

var fs = require('fs');
var read = fs.readFileSync;
var write = fs.writeFileSync;

var EXPRESSION = /(")(\.\/)([^"]+)(")/g;

var DECLARATION = '/* This is an automatically generated ' +
    'script by `script/build.js` from `eslint`s source */\n';

/**
 * Replace references to eslint-local files
 * with eslint-md references, when *NOT* in
 * exceptions.
 *
 * @param {Array.<string>} exceptions
 * @param {string} value
 * @return {string}
 */
function replace(exceptions, value, external) {
    /**
     * Actual replacing.
     *
     * @param {string} $0 - Whole content.
     * @param {string} $1 - Initial quote.
     * @param {string} $2 - Path start (`./`).
     * @param {string} $3 - Path.
     * @param {string} $4 - Final quote.
     * @return {string}
     */
    function replacer($0, $1, $2, $3, $4) {
        if (exceptions.indexOf($3) !== -1) {
            return $0;
        }

        return $1 + (external ? 'eslint/' : $2) + 'lib/' + $3 + $4;
    }

    return value.replace(/(")(\.\/)([^"]+)(")/g, replacer);
}

/*
 * Move `bin/eslint`
 */

var bin = read('node_modules/eslint/bin/eslint.js', 'utf-8');

bin = bin.split('\n');
bin.splice(1, 0, DECLARATION);
bin = bin.join('\n');

write('bin/eslint-md', bin);

/*
 * Move `index.js`
 */

var index = read('node_modules/eslint/lib/api.js', 'utf-8');

index = replace([], index);

index = index.replace(EXPRESSION, function ($0, $1, $2, $3, $4) {
    if ($3 === 'lib/eslint') {
        return $1 + $2 + 'lib/eslint-md' + $4;
    }

    return $0;
});

write('index.js', DECLARATION + index);

/*
 * Move `cli.js`.
 */

var cli = read('node_modules/eslint/lib/cli.js', 'utf-8');

cli = replace(['cli-engine', 'options'], cli, true);

write('lib/cli.js', DECLARATION + cli);

/*
 * Move `cli-engine.js`.
 */

var engine = read('node_modules/eslint/lib/cli-engine.js', 'utf-8');

engine = replace(['eslint'], engine, true);

engine = engine.replace(EXPRESSION, function ($0, $1, $2, $3, $4) {
    return $1 + $2 + 'eslint-md' + $4;
});

write('lib/cli-engine.js', DECLARATION + engine);
