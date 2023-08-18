run_spec(import.meta, ["markdown"], {
  plugins: global.STANDALONE ? ["prettier/parser-markdown"] : [],
  proseWrap: "always",
  tabWidth: 4,
});
