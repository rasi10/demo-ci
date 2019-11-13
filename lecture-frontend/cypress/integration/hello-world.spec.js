describe('Hello world project', function(){
    before(() => {
      cy.log('before the whole test suite')
      cy.log('Prepare database')
    })   

    beforeEach(() => {
      cy.log('before each test case')
      cy.log('peform login')
    })
    
    afterEach(() => {
      cy.log('After each test case')
      cy.log('perform logout')
    })
    
    after(() => {
      cy.log('After the whole test suite')
      cy.log('Clean database')
    }) 

    it('Open google page', function(){          
        cy.visit('https://www.google.com/')
        cy.get('.gLFyf').type('rafael')
    })

    it('Open google page', function(){          
        cy.visit('https://www.google.com/')
        cy.get('.gLFyf').type('rafael')
    })

})