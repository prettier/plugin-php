run_spec(import.meta, ["markdown"], {
  plugins: global.STANDALONE ? [require("prettier/parser-markdown")] : [],
  proseWrap: "always",
  tabWidth: 4,
});
