import axios from "axios"
export class TransactionService {
    constructor(endpoint) {
        this.endpoint = endpoint;
        if (!endpoint) {
            endpoint = 'http://localhost:7007';
        }
    }
    crearTransaccion = (items, tipoEnviado) => {
        return new Promise((resolve, reject) => {
            axios.post(this.endpoint + '/api/Transaccion', {
                items, tipo: parseInt(tipoEnviado), crearYConfirmar: true
            },{
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                console.log('error: ' + error);
                reject(error);
            });
        });
    }
}