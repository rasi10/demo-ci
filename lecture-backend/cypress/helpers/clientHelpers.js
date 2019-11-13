const clientBaseEnpoint = 'http://rbt-course:8080/hotel-rest/webresources/client/'
const faker = require('faker')

function createRandomClientData(){
    const fakeEmail = faker.internet.email()
    const fakerSocialSecurityNumber = faker.random.number(10000000)
    const fakeName = faker.name.firstName()

    const clientJsonObject = {                                
        "name": fakeName,
        "createDate": 1451617200000,
        "email": fakeEmail,
        "gender": "M",
        "socialSecurityNumber": fakerSocialSecurityNumber                
    }

    return clientJsonObject
}



function getAllClients(cy, responseStatus){
    cy.request(clientBaseEnpoint).its('status').should('eq',responseStatus)
}


function createANewClient(cy, responseStatus){
        const clientJsonObject = createRandomClientData()
        console.log(clientJsonObject)

        cy.request({
            method: 'POST',
            url:clientBaseEnpoint, 
            headers:{
                'Accept-Encoding':'gzip, deflate, br',
                'Content-Type':'application/json',
                'Accept':'application/json'
            },

            body:clientJsonObject
        }).then((response =>{
            expect(response.status).to.eq(responseStatus)
        }))

        // Make an assertion to see that the client is added in the database
        cy.request(clientBaseEnpoint).then((response =>{
            const responseAsString = JSON.stringify(response)                 
            expect(responseAsString).to.have.string(clientJsonObject.socialSecurityNumber)     
        }))
}

module.exports = {
    getAllClients, 
    createANewClient
}