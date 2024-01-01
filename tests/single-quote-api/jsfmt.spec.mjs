import prettier from "prettier/standalone";
import * as prettierPluginPhp from "../../src/index.mjs";

test(`singleQuote`, async () => {
  const input = `<?php echo link_to_route("frontend.users.user.show", $users["name"], $users['_id']); ?>`;
  const result = await prettier.format(input, {
    plugins: [prettierPluginPhp],
    singleQuote: true,
    parser: "php",
  });

  const expected = `<?php echo link_to_route(
    'frontend.users.user.show',
    $users['name'],
    $users['_id']
); ?>
`;

  expect(result).toEqual(expected);
});
