import axios from "axios"
export class TripulanteService {
    constructor(endpoint) {
        this.endpoint = endpoint;
        if (!endpoint) {
            endpoint = 'http://localhost:8080';
        }
    }
    crearTripulante = (Nombre, Apellido, EmailAddress,Estado,Tipo ,HorasVuelo,NroMillas,KeyCargo) => {
        console.log('endpoint: ', this.endpoint + '/api/tripulante/registro');

        return new Promise((resolve, reject) => {
            axios.post(this.endpoint + '/api/tripulante/registro', {
                Nombre,
                Apellido,
                EmailAddress,
                Estado,
                Tipo ,
                HorasVuelo,
                NroMillas,
                KeyCargo
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
            axios.get(this.endpoint + '/api/tripulante/registro', {
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