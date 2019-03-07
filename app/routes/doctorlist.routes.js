module.exports = function (app) {
    var doctorlist = require('../controllers/doctorlist.controllers');
    //Create a New doctorlist
    app.post('/api/doctorlist', doctorlist.create)

    //Retrieve all doctorlists
    app.get('/api/doctorlist', doctorlist.findAll)

    // Retrieve a search doctorlists
    app.get('/api/doctorlist/search/?', doctorlist.search);

    // Retrieve a single doctorlists by Id
    app.get('/api/doctorlist/:doctorlistId', doctorlist.findOne);

    

}