module.exports = {
  rootDir: ".",
  testEnvironment: "node",
  testRegex: ".spec.js$",
  coverageDirectory: "./coverage",
  coveragePathIgnorePatterns: ["/node_modules/"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleDirectories: ["node_modules", "src"],
  verbose: false,
  silent: false,
}
