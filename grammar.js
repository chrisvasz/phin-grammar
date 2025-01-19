/**
 * @file Phin grammar for tree-sitter
 * @author Chris Vaszauskas
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check
//
const DEC_DIGITS = token(sep1(/[0-9]+/, /_+/));


module.exports = grammar({
  name: "phin",

  word: $ => $.identifier,

  rules: {
    source_file: $ => repeat(
      choice(
        $._expression,
        $._declaration,
      ),
    ),

    _declaration: $ => choice(
      $.function_declaration,
    ),

    _statement: $ => choice(
      $._expression_statement,
      $.return_statement,
    ),

    function_declaration: $ => seq(
      "fun",
      $.identifier,
      $.function_params,
      $.function_body,
    ),

    function_params: $ => seq(
      "(",
      optional(
        seq(
          sep1($._param, ","),
          optional(",") // Allow a trailing comma
        )
      ),
      ")"
    ),

    function_body: $ => choice(
      seq('=>', $._expression),
      $._block,
    ),

    _param: $ => seq(
      $.identifier,
    ),

    _block: $ => seq(
      "{",
      repeat($._statement),
      "}",
    ),

    _expression_statement: $ => $._expression,

    return_statement: $ => seq(
      "return",
      $._expression,
    ),

    _expression: $ => choice(
      $.int_literal,
      $.bool_literal,
      $.null_literal,
    ),

    int_literal: $ => token(seq(optional(/[1-9]/), DEC_DIGITS)),

    bool_literal: $ => choice("true", "false"),
    null_literal: $ => "null",

    identifier: $ => /[a-zA-Z_][a-zA-Z0-9_]*/,
  }
});

function sep1(rule, separator) {
  return seq(rule, repeat(seq(separator, rule)));
}
