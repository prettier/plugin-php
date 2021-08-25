run_spec(__dirname, ["php"], {
  trailingComma: "all",
  trailingCommaPHP: false,
  phpVersion: "8.0",
});
run_spec(__dirname, ["php"], {
  trailingComma: "none",
  trailingCommaPHP: true,
  phpVersion: "8.0",
});
