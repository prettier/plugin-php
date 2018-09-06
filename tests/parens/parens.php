<?php
include 'foo.php' . ($test ? 'foo' : 'bar');
include ($test ? 'foo' : 'bar');
