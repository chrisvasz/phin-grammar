import XCTest
import SwiftTreeSitter
import TreeSitterPhin

final class TreeSitterPhinTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_phin())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Phin grammar")
    }
}
