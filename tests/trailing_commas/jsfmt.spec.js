run_spec(__dirname, ["php"]);
run_spec(__dirname, ["php"], { trailingCommaPHP: true, phpVersion: "5.0" });
run_spec(__dirname, ["php"], { trailingCommaPHP: true, phpVersion: "7.2" });
run_spec(__dirname, ["php"], { trailingCommaPHP: true, phpVersion: "7.3" });
run_spec(__dirname, ["php"], {
  trailingCommaPHP: false,
  trailingComma: "all",
});
