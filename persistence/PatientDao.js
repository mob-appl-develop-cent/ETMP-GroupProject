const TABLE = "patients";
function PatientDao(connection) {
    this._connection = connection;
}

PatientDao.prototype.save = function (patient, callback) {
    this._connection.db(TABLE).insert(patient, callback);
};

module.exports = function () {
    return PatientDao;
};