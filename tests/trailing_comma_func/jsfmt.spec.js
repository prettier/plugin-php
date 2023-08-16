run_spec(import.meta, ["php"], {
  trailingComma: "all",
  trailingCommaPHP: false,
  phpVersion: "8.0",
});
run_spec(import.meta, ["php"], {
  trailingComma: "none",
  trailingCommaPHP: true,
  phpVersion: "8.0",
});
