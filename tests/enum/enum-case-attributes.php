<?php

namespace App\Enums;

use App\Support\Attributes\Description;

enum SalutationEnum: string
{
    #[Description('Mr.')]
    case MR = 'mr';

    #[Description('Mrs.')]
    case MRS = 'mrs';

    #[Description('Miss')]
    case MISS = 'miss';
}
