module.exports = function (app) {
    /*app.get('/pagamentos', function(req, res){
        console.log('Recebida requisicao de teste na porta 3000.')
        res.send('OK.');
    });*/
    const Patient = require('../models/patient.model');

    app.post('/mongo', function (req, res) {


        var patient = new Patient({
            first_name: req.body.first_name,
            last_name: req.body.last_name
        });
        console.log('processando uma requisicao de um novo pagamento');

        //console.log(app.persistence);
        //console.log(app.persistence.connectionFactory());
        //var connection = app.persistence.connectionFactory();
        //var pagamentoDao = new app.persistence.PatientDao(connection);
        //patient.save()
        patient.save(function (err) {
            if (err) {
                console.log(err);
                return;
            }
            res.send('Product Created successfully')
        });

        /*pagamentoDao.salvar(pagamento, function (erro, resultado) {
            if (erro) {
                console.log('Erro ao inserir no banco:' + erro);
                res.status(500).send(erro);
            } else {
                console.log('pagamento criado');
                res.location('/pagamentos/pagamento/' +
                    resultado.insertId);

                res.status(201).json(pagamento);
            }
        });*/

    });
};
