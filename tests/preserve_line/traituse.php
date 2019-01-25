<?php

class Aliased_Talker {


    use A, B {


        B::smallTalk insteadof A;


        A::bigTalk insteadof B;

        B::smallTalk insteadof A;
        A::bigTalk insteadof B;

        B::bigTalk as talk;

        // Comment
        B::smallTalk insteadof A;

        // Comment
        B::smallTalk insteadof A; // Comment
        // Comment

        // Comment

        B::smallTalk insteadof A;


    }

    use C {
        C::smallTalk insteadof A;
    }

    use D {
        // Comment
        D::smallTalk insteadof A;
        // Comment
    }



    use D {


    }

    use E {

        E::smallTalk insteadof A;

    }

    use F {
        // Comment
        F::smallTalk insteadof A;
        // Comment
    }


}
