'use strict';

var eslintmd = require('..');
var assert = require('assert');
var options = require('../lib/options');

var verify = eslintmd.linter.verify;

var engine = new eslintmd.CLIEngine();

var config = engine.getConfigForFile(__filename);

/*
 * Tests.
 */

describe('eslintmd', function () {
    it('should be an `object`', function () {
        assert(typeof eslintmd === 'object');
    });
});

describe('eslintmd.cli', function () {
    it('should be an `object`', function () {
        assert(typeof eslintmd.cli === 'object');
    });
});

describe('eslintmd.CLIEngine()', function () {
    it('should be a `function`', function () {
        assert(typeof eslintmd.CLIEngine === 'function');
    });
});

describe('eslintmd.linter', function () {
    it('should be an `object`', function () {
        assert(typeof eslintmd.linter === 'object');
    });
});

describe('eslintmd.linter.verify(text, ...)', function () {
    it('should be a `function`', function () {
        assert(typeof verify === 'function');
    });

    it('should throw when invoked without `text`', function () {
        assert.throws(function () {
            verify();
        });
    });

    it('should not throw when invoked with text', function () {
        verify('# Some markdown');
    });

    it('should return an empty array when no code is found', function () {
        var result = verify('# Some markdown', config);

        assert(Array.isArray(result));
        assert(result.length === 0);
    });

    it('should return an empty array without config', function () {
        assert(verify('```js\nallert("hello")\n```').length === 0);
    });

    it('should not detect errors in code blocks without flag', function () {
        assert(verify('\talert("hello")', config).length === 0);
    });

    it('should detect code blocks with `js` flag', function () {
        assert(verify(
            '```js\n' +
            'alert("hello")\n' +
            '```', config
        ).length !== 0);
    });

    it('should detect code blocks with `javascript` flag', function () {
        assert(verify(
            '```javascript\n' +
            'alert("hello")\n' +
            '```', config
        ).length !== 0);
    });

    it('should detect code blocks with `javascript` flag', function () {
        assert(verify(
            '```javascript\n' +
            'alert("hello")\n' +
            '```', config
        ).length !== 0);
    });
});

describe('eslintmd.linter.reset()', function () {
    it('should be a `function`', function () {
        assert(typeof eslintmd.linter.reset === 'function');
    });

    it('should not throw when invoked', function () {
        eslintmd.linter.reset();
    });
});

describe('eslintmd/lib/options', function () {
    it('should be an `object`', function () {
        assert(typeof options === 'object');
    });
});

describe('eslintmd/lib/options.generateHelp()', function () {
    it('should be a `function`', function () {
        assert(typeof options.generateHelp === 'function');
    });

    it('should no throw when invoked', function () {
        options.generateHelp();
    });

    it('should contain `eslint-md`', function () {
        var help = options.generateHelp();

        assert(/eslint-md/.test(help));
    });

    it('should contain `markdown`', function () {
        var help = options.generateHelp();

        assert(/markdown/.test(help));
    });
});

describe('eslintmd/lib/options.parse(parameters)', function () {
    it('should be a `function`', function () {
        assert(typeof options.parse === 'function');
    });

    it('should throw when invoked without `parameters`', function () {
        assert.throws(function () {
            options.parse();
        });
    });

    it('should not throw when invoked with `parameters`', function () {
        options.parse('');
    });

    it('should return an object', function () {
        var result = options.parse('');

        assert(typeof result === 'object');
    });

    it('should return an object containing markdown extensions', function () {
        var result = options.parse('').ext;

        assert(Array.isArray(result));
        assert(result.indexOf('.md') !== -1);
        assert(result.indexOf('.markd') !== -1);
        assert(result.indexOf('.markdown') !== -1);
    });
});
