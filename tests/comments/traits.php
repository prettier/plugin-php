<?php

class ImplementingClass {
    /* Comment */
    /* Comment */ use /* Comment */ testTrait /* Comment */, /* Comment */ otherTrait /* Comment */;
    /* Comment */ use /* Comment */ testTrait /* Comment */, /* Comment */ implementingTrait /* Comment */ { /* Comment */
        /* Comment */ A/* Comment */::/* Comment */ testFunction /* Comment */ insteadof /* Comment */ C /* Comment */ ; /* Comment */
        /* Comment */ B/* Comment */::/* Comment */ someOtherTestFunction /* Comment */ as /* Comment */ aliasedFunctionName /* Comment */; /* Comment */
        /* Comment */ C/* Comment */::/* Comment */ testFunction /* Comment */ as  /* Comment */ private /* Comment */ testVisibility /* Comment */;
    }
}
