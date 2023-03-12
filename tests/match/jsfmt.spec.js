run_spec(__dirname, ["php"], {
  trailingCommaPHP: false,
  phpVersion: "8.0",
});
run_spec(__dirname, ["php"], {
  trailingCommaPHP: true,
  phpVersion: "8.0",
});
