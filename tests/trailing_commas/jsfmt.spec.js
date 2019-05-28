run_spec(__dirname, ["php"]);
run_spec(__dirname, ["php"], { trailingCommaPHP: "php5" });
run_spec(__dirname, ["php"], { trailingCommaPHP: "php7.2" });
run_spec(__dirname, ["php"], { trailingCommaPHP: "all" });
run_spec(__dirname, ["php"], { trailingComma: "all" });
