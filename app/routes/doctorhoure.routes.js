module.exports = function (app) {
    var doctorhoure = require('../controllers/doctorhoure.controller');
    //Create a New doctorhoure
    app.post('/api/doctorhoure', doctorhoure.create)

    //Retrieve all doctorhoures
    app.get('/api/doctorhoure', doctorhoure.findAll)

    // Retrieve a search doctorhoure
    app.get('/api/doctorhoure/search/?', doctorhoure.search);

    // Retrieve a single doctorhoure by Id
    app.get('/api/doctorhoure/:doctorhoureId', doctorhoure.findOne);    

}