# Assignment 2 - Vue app - Automated development process.

Name: Yue Wang

Student No.:  20082242

## Overview. 

...... this assignment is the test of vue app by using e2e testing. All the test passed successfully, but  I failed to deploy it to heroku, so when doing the test, please do remember to run the web API on localhost:3000. 

## E2E Testing.

. . . .  The output generated locally from running bookings.spec.js. 
    
    Manage Bookings page
    ✓ allows a booking to be deleted (3023ms)
    ✓ allows a booking to be edited (2186ms)

    Book page
    ✓ allows a valid booking to be submitted (2352ms)
    ✓ shows error messages for incomplete form fields (302ms)
    ✓ should turn to the list page (352ms)
    
    5 passing (8s)
    (Results)
    ┌────────────────────────────────┐
    │ Tests:        5                │
    │ Passing:      5                │
    │ Failing:      0                │
    │ Pending:      0                │
    │ Skipped:      0                │
    │ Screenshots:  0                │
    │ Video:        true             │
    │ Duration:     8 seconds        │
    │ Spec Ran:     bookings.spec.js │
    └────────────────────────────────┘

    Spec                                    Tests  Pass…  Fail…  Pend…  Skip… 
    ┌────────────────────────────────────────────────────────────────────────────┐
    │ ✔ bookings.spec.js                00:08      5      5      -      -      - │
    └────────────────────────────────────────────────────────────────────────────┘
     All specs passed!                 00:08      5      5      -      -      -  


The command to produce this is in the following:

     $ npx cypress run --spec cypress/integration/bookings.spec.js

## Continuous Integration.

. . . .  URL of the Travis build page for the Vue app:

    https://travis-ci.org/Hinnn/bookingvueSPA

## Automated Deployment.

. . . .  The URL of the auto-deployed Vue app: 

    http://hotelbooking.surge.sh/

## Extra features.

. . . . I have tested about the methods of get, post, delete and put. Besides, the home page, sign up page and edit, delete, add booking page are all tested. 

## Appendix.

. . . .  A listing of the output generated from running locally all of my spec test files

     $ npx cypress run
     

    Spec                                    Tests  Pass…  Fail…  Pend…  Skip… 
    ┌────────────────────────────────────────────────────────────────────────────┐
    │ ✔ bookings.spec.js                00:08      5      5      -      -      - │
    ├────────────────────────────────────────────────────────────────────────────┤
    │ ✔ home-page.spec.js               00:02      3      3      -      -      - │
    ├────────────────────────────────────────────────────────────────────────────┤
    │ ✔ signup-page.spec.js             00:03      2      2      -      -      - │
    └────────────────────────────────────────────────────────────────────────────┘
    All specs passed!                 00:14     10     10      -      -      -  
