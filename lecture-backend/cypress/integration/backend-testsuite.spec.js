
import * as clientHelpers from '../helpers/clientHelpers'

describe('Backend test suite', function(){

    it('Retrieve all Clients and assert the status code - GET /webresources/client', function(){        
        clientHelpers.getAllClients(cy, 200)
    })
    
   
    it.only('Create a new client and assert status code and data - POST /webresources/client',function(){
        clientHelpers.createANewClient(cy, 204)
    })

})