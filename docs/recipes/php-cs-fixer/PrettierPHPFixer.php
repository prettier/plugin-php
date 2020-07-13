<?php

use PhpCsFixer\Fixer\FixerInterface;
use PhpCsFixer\Tokenizer\Tokens;
use Symfony\Component\Filesystem\Filesystem;

/**
 * Fixer for using prettier-php to fix.
 */
final class PrettierPHPFixer implements FixerInterface {
    /**
     * {@inheritdoc}
     */
    public function getPriority() {
        // Allow prettier to pre-process the code before php-cs-fixer
        return 999;
    }

    /**
     * {@inheritdoc}
     */
    public function isCandidate(Tokens $tokens) {
        return true;
    }

    /**
     * {@inheritdoc}
     */
    public function isRisky() {
        return false;
    }

    /**
     * {@inheritdoc}
     */
    public function fix(SplFileInfo $file, Tokens $tokens) {
        if (
            0 < $tokens->count() &&
            $this->isCandidate($tokens) &&
            $this->supports($file)
        ) {
            $this->applyFix($file, $tokens);
        }
    }

    /**
     * {@inheritdoc}
     */
    public function getName() {
        return 'Prettier/php';
    }

    /**
     * {@inheritdoc}
     */
    public function supports(SplFileInfo $file) {
        return true;
    }

    /**
     * @param SplFileInfo $file
     * @param Tokens      $tokens
     */
    private function applyFix(SplFileInfo $file, Tokens $tokens): void
    {
        exec("yarn exec -- prettier $file", $prettierOutput);
        $code = implode(PHP_EOL, $prettierOutput);
        $tokens->setCode($code);
    }
}
