run_spec(__dirname, ["markdown"], {
  plugins: global.STANDALONE ? [require("prettier/parser-markdown")] : [],
  proseWrap: "always",
  tabWidth: 4,
});
