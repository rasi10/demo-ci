// Importing the index page
import * as indexPg from '../pages/index'

// Defining the test suite
describe('Test suite', function(){

    // First test case
    it('Perform login and logout', function(){
        cy.visit('http://rbt-course:8080/hotel/faces/login/login.xhtml')        
        indexPg.performLogin(cy)
    })

})