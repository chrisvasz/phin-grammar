package tree_sitter_phin_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_phin "github.com/chrisvasz/phin-grammar/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_phin.Language())
	if language == nil {
		t.Errorf("Error loading Phin grammar")
	}
}
