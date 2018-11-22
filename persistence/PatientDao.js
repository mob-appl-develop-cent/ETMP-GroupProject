const Patient = require('../models/patient.model');

function PatientDao(connection) {
    this._connection = connection;
}
PatientDao.prototype.salvar = function (patient, callback) {
    console.log('aquiiiiii');
    let _patient = new Patient(
        {
            first_name: patient.first_name,
            last_name: patient.last_name
        }
    );
    _patient.save(function (err) {

    });

    product.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Product Created successfully')
    })
};

PatientDao.prototype.salva = function(pagamento,callback) {
    this._connection.query('INSERT INTO pagamentos SET ?', pagamento, callback);
};


module.exports = function(){
    return PatientDao;
};
