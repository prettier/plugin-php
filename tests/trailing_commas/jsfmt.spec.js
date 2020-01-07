run_spec(__dirname, ["php"]);
run_spec(__dirname, ["php"], { trailingCommaPHP: "all", phpVersion: "5.0" });
run_spec(__dirname, ["php"], { trailingCommaPHP: "all", phpVersion: "7.2" });
run_spec(__dirname, ["php"], { trailingCommaPHP: "all", phpVersion: "7.3" });
run_spec(__dirname, ["php"], {
  trailingCommaPHP: "none",
  trailingComma: "all"
});
