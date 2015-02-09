'use strict';

var mdast = require('mdast');
var eslint = require('eslint/lib/eslint');
var concat = [].concat;

var visit;
var visitAll;

var eslintmd = Object.create(eslint);

/**
 * Visit `node`.  Returns zero or more JavaScript
 * code blocks.
 *
 * @param {Node} node
 * @return {Array.<Node>} - Zero or more JavaScript code blocks
 */
visit = function (node) {
    if (node.type === 'code' && /^(javascript|js)$/i.test(node.lang)) {
        return [node];
    } else if ('children' in node) {
        return visitAll(node.children);
    } else {
        return [];
    }
};

/**
 * Visit all `children`.  Returns a single nested
 * array.
 *
 * @param {Array.<Node>} children
 * @return {Array.<Node>} - JavaScript code blocks
 */
visitAll = function (children) {
    return concat.apply([], children.map(visit));
};

/**
 * Update the position in ESLint messages with the original
 * location in a Markdown code block.
 *
 * @param {Array.<Object>} messages
 * @param {Object} position
 */
function updatePosition(messages, position) {
    messages.forEach(function (message) {
        message.column += position.column;
        message.line += position.line;

        /*
         * mdast uses `1`-based columns, whereas eslint
         * uses `0`-based.
         */

        message.column--;
    });

    return messages;
}

/**
 * Resets eslint.  See eslint/lib/eslint.js `api.reset`:
 */
function reset() {
    eslint.reset();
}

/**
 * Very `text`.  See eslint/lib/eslint.js `api.verify`:
 *
 * @param {string} text - The Markdown text to verify.
 * @param {Object} config - An object whose keys specify
 *   the rules to use.
 * @param {string=} filename - The optional filename of
 *   the file being checked.
 *   If this is not set, the filename will default
 *   to '<input>' in the rule context.
 * @param {boolean=} saveState - Indicates if the state
 *   from the last run should be saved.
 *   Mostly useful for testing purposes.
 * @return {Object[]} - The results as an array of
 *   messages or null if no messages.
 */
function verify(text, config, filename, saveState) {
    var code = visit(mdast.parse(text));
    var allMessages = [];

    code.forEach(function (node) {
        var value = node.value + '\n';
        var messages = eslint.verify(value, config, filename, saveState);

        updatePosition(messages, node.position.start);

        allMessages = allMessages.concat(messages);
    });

    return allMessages;
}

eslintmd.verify = verify;
eslintmd.reset = reset;

module.exports = eslintmd;
