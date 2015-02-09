#!/usr/bin/env bash

typeset -i tests=0

function it {
  let tests+=1;
  description="$1";
}

function assert {
  if test "$1" = "$2"; then
    printf "\033[32m.\033[0m";
  else
    printf "\033[31m\nFAIL: $description\033[0m: '$1' != '$2'\n";
    exit 1
  fi
}

function assertNot {
  if test "$1" != "$2"; then
    printf "\033[32m.\033[0m";
  else
    printf "\033[31m\nFAIL: $description\033[0m: '$1' = '$2'\n";
    exit 1
  fi
}

valid="test/fixtures/Valid.md"
invalid="test/fixtures/Invalid.md"
validInBrowser="test/fixtures/reset/Valid-in-browser.md"
validInNode="test/fixtures/reset/Valid-in-node.md"
validc="$(cat $valid)"
invalidc="$(cat $invalid)"
helpmessage="$(./bin/eslint-md --help)";

it "Should accept a file"
  result=`./bin/eslint-md "$valid"`
  printf "\$?: '$?'"
  assert "$?" "0"

it "Should fail on a file with errors"
  result=`./bin/eslint-md "$invalid"`
  assertNot "$?" "0"

it "Should NOT fail on a file with warning"
  result=`./bin/eslint-md --rule semi:[1] "$invalid"`
  assert "$?" "0"

it "Should show help without input"
  result=`./bin/eslint-md --help`
  assert "$?" "0"
  assert "$result" "$helpmessage"

it "Should show help on stdin with \`--stdin\`"
  result=`echo "$validc" | ./bin/eslint-md`
  assert "$?" "0"
  assert "$result" "$helpmessage"

it "Should accept \`--stdin\`"
  result=`echo "$validc" | ./bin/eslint-md --stdin`
  assert "$?" "0"

it "Should fail on stdin with errors"
  result=`echo "$invalidc" | ./bin/eslint-md --stdin`
  assertNot "$?" "0"

it "Should fail on an invalid file path"
  result=`./bin/eslint-md some-other-file.md 2> /dev/null`
  assertNot "$?" "0"

it "Should accept \`--version\`"
  result=`./bin/eslint-md --version`
  assert "$?" "0"

it "Should accept \`-v\`"
  result=`./bin/eslint-md -v`
  assert "$?" "0"

it "Should accept \`--help\`"
  result=`./bin/eslint-md --help`
  assert "$?" "0"
  assert "$result" "$helpmessage"

it "Should accept \`-h\`"
  result=`./bin/eslint-md -h`
  assert "$?" "0"
  assert "$result" "$helpmessage"

it "Should fail on unknown short options"
  result=`./bin/eslint-md -a 2> /dev/null`
  assertNot "$?" "0"

it "Should fail on unknown long options"
  result=`./bin/eslint-md --some-unknown-option 2> /dev/null`
  assertNot "$?" "0"

it "Should show help on \`--env\`"
  result=`./bin/eslint-md --env`
  assert "$?" "0"
  assert "$result" "$helpmessage"

it "Should show help on \`--env <invalid-environment>\`"
  result=`./bin/eslint-md --env unknown`
  assert "$?" "0"
  assert "$result" "$helpmessage"

it "Should accept \`--env <environment>\`"
  result=`./bin/eslint-md --env browser "$validInBrowser"`
  assert "$?" "0"

  result=`./bin/eslint-md --env node "$validInNode"`
  assert "$?" "0"

it "Should show help on \`--rule\`"
  result=`./bin/eslint-md --rule`
  assert "$?" "0"
  assert "$result" "$helpmessage"

it "Should fail on \`--rule <invalid-rule>\`"
  result=`./bin/eslint-md --rule unknown 2> /dev/null`
  assertNot "$?" "0"

it "Should accept \`--rule <rule>\`"
  result=`./bin/eslint-md --rule semi:false "$invalid"`
  assert "$?" "0"

it "Should not output warnings with \`--quiet\`"
  result=`./bin/eslint-md --quiet --rule semi:[1] "$invalid"`
  assert "$?" "0"
  assert "$result" ""

it "Should output errors with \`--quiet\`"
  result=`./bin/eslint-md --quiet "$invalid"`
  assert "$?" "1"
  assertNot "$result" ""

it "Should show help on \`--format\`"
  result=`./bin/eslint-md --format`
  assert "$?" "0"
  assert "$result" "$helpmessage"

it "Should show help on \`--format <invalid-format>\`"
  result=`./bin/eslint-md --format`
  assert "$?" "0"
  assert "$result" "$helpmessage"

it "Should accept \`--format <format>\`"
  result=`./bin/eslint-md --format compact "$invalid"`
  assertNot "$?" "0"
  alternate=`./bin/eslint-md "$invalid"`
  assertNot "$result" "$alternate"

it "Should accept \`-o <path>\`"
  `./bin/eslint-md -o out.txt "$invalid"`
  result=`cat out.txt`
  alternative=`./bin/eslint-md "$invalid"`
  rm out.txt
  assert "$result" "$alternative"

it "Should accept \`--output-file <path>\`"
  `./bin/eslint-md --output-file out.txt "$invalid"`
  result=`cat out.txt`
  alternative=`./bin/eslint-md "$invalid"`
  rm out.txt
  assert "$result" "$alternative"

it "Should ignore missing value for \`-o\`"
  `./bin/eslint-md "$valid" -o`
  assert "$?" "0"

it "Should ignore missing value for \`--output-file\`"
  `./bin/eslint-md "$valid" --output-file`
  assert "$?" "0"

printf "\033[32m\n(✓) Passed $tests tests without errors\033[0m\n";
