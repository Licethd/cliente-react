import axios from "axios"
export class ItemService {
    constructor(endpoint) {
        this.endpoint = endpoint;
        if (!endpoint) {
            endpoint = 'http://localhost:7007';
        }
    }
    crearItem = (codigo, nombre) => {
        console.log('endpoint: ', this.endpoint + '/api/Item');

        return new Promise((resolve, reject) => {
            axios.post(this.endpoint + '/api/Item', {
                codigo,
                nombre
            },{
                headers: {
                    'Accept': 'application/json'
                }
            }).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                console.log('error: ' + error);
                reject(error);
            });
        });
    }
    buscarPorNombre = (texto) => {
        return new Promise((resolve, reject) => {
            axios.get(this.endpoint + '/api/Item', {
                params: {
                    searchTerm: texto
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