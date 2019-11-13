const faker = require('faker')

describe('Backend test suite', function(){
   
    it('GET request to retrieve all clients with status code assertion', function(){
        cy.request('http://rbt-course:8080/hotel-rest/webresources/client/').its('status').should('eq',200)
    })
    
   
    it('Create a client with a POST towards /webresources/client with help of faker',function(){
        const fakeEmail = faker.internet.email()
        const fakerSocialSecurityNumber = faker.random.number(10000000)
        const fakeName = faker.name.firstName()

        cy.request({
            method: 'POST',
            url:'http://rbt-course:8080/hotel-rest/webresources/client/', 
            headers:{
                'Accept-Encoding':'gzip, deflate, br',
                'Content-Type':'application/json',
                'Accept':'application/json'
            },

            body:{                                
                "name": fakeName,
                "createDate": 1451617200000,
                "email": fakeEmail,
                "gender": "M",
                "socialSecurityNumber": fakerSocialSecurityNumber                
            }
        }).then((response =>{
            expect(response.status).to.eq(204)
        }))

        // Make an assertion to see that the client is added in the database
        cy.request('http://rbt-course:8080/hotel-rest/webresources/client/').then((response =>{
            const responseAsString = JSON.stringify(response)                 
            expect(responseAsString).to.have.string(fakerSocialSecurityNumber)     
        }))
    })

  
    it('Create a client with a POST towards /webresources/client with help of faker2 and Delete it afterwards',function(){
        const fakeEmail = faker.internet.email()
        const fakerSocialSecurityNumber = faker.random.number(10000000)
        const fakeName = faker.name.firstName()

        cy.request({
            method: 'POST',
            url:'http://rbt-course:8080/hotel-rest/webresources/client/', 
            headers:{
                'Accept-Encoding':'gzip, deflate, br',
                'Content-Type':'application/json',
                'Accept':'application/json'
            },

            body:{                                
                "name": fakeName,
                "createDate": 1451617200000,
                "email": fakeEmail,
                "gender": "M",
                "socialSecurityNumber": fakerSocialSecurityNumber                
            }
        }).then((response =>{
            expect(response.status).to.eq(204)
        }))

        // Make an assertion to see that the client is added in the database
        cy.request('http://rbt-course:8080/hotel-rest/webresources/client/').then((response =>{
            const responseAsString = JSON.stringify(response)                 
            expect(responseAsString).to.have.string(fakerSocialSecurityNumber) 
            const idOfLastClient = response.body[response.body.length -1].id  

            cy.request({
                method: 'DELETE',
                url:`http://rbt-course:8080/hotel-rest/webresources/client/${idOfLastClient}`, 
                headers:{
                    'Accept-Encoding':'gzip, deflate, br',
                    'Content-Type':'application/json',
                    'Accept':'application/json'
                },            
            }).then((response =>{
                expect(response.status).to.eq(204)
                const responseAsString = JSON.stringify(response)
                expect(responseAsString).to.not.have.string(fakeEmail)
                expect(responseAsString).to.not.have.string(fakerSocialSecurityNumber)                
            }))
        }))
        

        
    })

    
})