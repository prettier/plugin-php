run_spec(import.meta, ["php"], { phpVersion: "7.0" });
run_spec(import.meta, ["php"], { trailingCommaPHP: true, phpVersion: "5.0" });
run_spec(import.meta, ["php"], { trailingCommaPHP: true, phpVersion: "7.2" });
run_spec(import.meta, ["php"], { trailingCommaPHP: true, phpVersion: "7.3" });
run_spec(import.meta, ["php"], {
  trailingCommaPHP: false,
  phpVersion: "7.0",
  trailingComma: "all",
});
