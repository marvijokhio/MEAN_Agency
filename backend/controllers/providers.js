const providers = require('../models/providers')

//list
module.exports.list = function(req, res){
    res.render('providers/providers-list', {title: 'Service Providers' , providers: providers})
}
//details
module.exports.details = function(req, res){
    let id = req.params.id
    let provider = providers.find(provider => provider.id == id)
    res.render('providers/providers-details', {
            id : id , 
            title : 'Service Providers Details' , 
            company : provider.company
        })
}
//edit form
module.exports.edit = function(req, res){
    let id = req.params.id
    let provider = providers.find(provider => provider.id == id)
    res.render('providers/providers-edit', {
            id : id , 
            title : 'Edit' , 
            provider : provider
        })
}

//Update provider
module.exports.update = function(req, res){
    let id = req.params.id
    let provider = providers.find(provider => provider.id == id)
    provider.firstname = req.body.firstname
    provider.lastname = req.body.lastname
    provider.position = req.body.position
    provider.company.company_name = req.body.company_name
    provider.company.address = req.body.address
    provider.company.address2 = req.body.address2
    provider.company.email = req.body.email
    provider.company.phone = req.body.phone
    provider.company.city = req.body.city
    provider.company.postal_code = req.body.postal_code
    provider.company.state = req.body.state
    provider.company.description = req.body.description
    provider.company.tagline = req.body.tagline

    res.render('providers/providers-update', {
            id : id , 
            title : 'Update'
        })
}

//Add form
module.exports.addform = function(req, res){
    res.render('providers/providers-add-form', {
            title : 'Add' 
        })
}

//Add Provider
module.exports.add = function(req, res){
    // create a random id between 100000 and 999999 becuase its a json example data
    let min = 100000
    let max = 999999
    let id = Math.floor(Math.random() * (max-min) + min)
    // create a new provider object
    let provider = {
        id: id,
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        position : req.body.position,
        company: {
            company_name : req.body.company_name,
            address : req.body.address,
            address2 : req.body.address2,
            email : req.body.email,
            phone : req.body.phone,
            city : req.body.city,
            postal_code : req.body.postal_code,
            state : req.body.state,
            description : req.body.description,
            tagline : req.body.tagline
        }
    }

    //Add new provider to list
    providers.push(provider)
    res.render('providers/providers-add', {
            title : 'Added'
        })
}


//delete provider
module.exports.delete = function(req, res){
    let id = req.params.id    
    let provider = providers.find(provider => provider.id == id)
    let company_n = provider.company.company_name
    let index = providers.indexOf(provider)

    providers.splice(index, 1)
    res.render('providers/providers-delete', {
            title : 'Deleted',
            company : company_n
        })
}