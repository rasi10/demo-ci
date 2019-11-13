describe('Test suite', function() {
    it('Login and logout', function(){
        cy.log('Just testing the setup')
        cy.visit('http://rbt-course:8080/hotel/faces/login/login.xhtml')

        // index/login page
        cy.contains('Please, login!')
        cy.get('#login').type('jp')
        cy.get('#senha').type('1010')        
        cy.get('#loginBtn').click()
        
        // dashboard
        cy.contains('Hotel Accommodadion')        
        cy.get('.fa-caret-down').click()
        cy.get('.dropdown-menu > li > a').click()

        // login
        cy.contains('Please, login!')
    })
    
})
