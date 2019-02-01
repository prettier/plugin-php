# Prettier integration to php-cs-fixer

  This recipe uses `prettier/plugin-php` as a Fixer for `php-cs-fixer`.

  `prettier` will be executed at the very beginning before the other fixers are
  applied, such that the `php-cs-fixer` user's configurations is respected.

## Useful Configurations
  
### Priority

  If you would like `prettier` to execute last, which means you prefer to use
  `php-cs-fixer` to complement the current missing features of `prettier`, you
  can decrease the priority value of this fixer by decreasing the value returned
  by `getPriority` function to something like `-999`

### Configure Prettier's setting

   If you would like to add configuration settings for `prettier` to this Fixer,
   you can modify the `exec` line in `applyFix` function.

   For example,
   ```diff
     - exec("yarn exec -- prettier --write $tmpFile");
     + exec("yarn exec -- prettier --write --brace-style=1tbs $tmpFile");
   ```
   will allow you to change the `braceStyle` for this fixer

## Possible Improvement
  - the configuration can be modified from `php-cs-fixer` configuration
  - autoloading
