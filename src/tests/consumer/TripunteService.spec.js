import { PactV3, MatchersV3 } from '@pact-foundation/pact';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { TripunteService } from '../../services/TripunteService';
import { crearTripulanteRequestBody, crearTripulanteResponse, responseItemSearch, textoBusqueda } from '../PactResponses.js';
const { like } = MatchersV3;
describe('El API de Tripulantes', () => {

    let itemService;
    const provider = new PactV3({
        consumer: 'react-tripulante',
        provider: 'tripulante-service'
    });

    describe('crear tripulante', () => {
        it('retorna un id de tripulante ya creado', () => {
            //Arrange
            provider.given('crear tripulante')
                .uponReceiving('solicitud para crear un tripulante')
                .withRequest({
                    method: 'POST',
                    path: '/api/tripulante/registro',
                    headers: {
                        'Accept': 'application/json'
                    },
                    body: crearTripulanteRequestBody
                }).willRespondWith({
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: like(crearTripulanteResponse)
                });
            return provider.executeTest(async mockServer => {
                // Act
                TripunteService = new TripunteService(mockServer.url);
                return TripunteService.crearTripulante(crearTripulanteRequestBody.Nombre, crearTripulanteRequestBody.Apellido, crearTripulanteRequestBody.EmailAddress, crearTripulanteRequestBody.Estado, crearTripulanteRequestBody.Tipo, crearTripulanteRequestBody.HorasVuelo, crearTripulanteRequestBody.NroMillas, crearTripulanteRequestBody.KeyCargo).then((response) => {
                    //Assert
                    expect(response).to.be.not.null;
                    expect(response).to.be.a.string;
                    expect(response).equal(crearTripulanteResponse);
                });
            });

        });
    });


    describe('buscar items', () => {
        it('retorna una lista de items encontrados', () => {
            //Arrange
            provider.given('realizar busqueda de items')
                .uponReceiving('un texto de busqueda')
                .withRequest({
                    method: 'GET',
                    path: '/api/tripulante/registro',
                    query: {
                        searchTerm: textoBusqueda
                    },
                }).willRespondWith({
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: like(responseItemSearch)
                });
            return provider.executeTest(async mockServer => {
                // Act
                itemService = new TripunteService(mockServer.url);
                return itemService.buscarPorNombre(textoBusqueda).then((response) => {
                    // Assert

                    expect(response).to.be.not.null;
                    expect(response).to.be.a.string;
                    expect(response).to.deep.equal(responseItemSearch);
                    expect(response).to.be.an('array');
                    expect(response).to.have.lengthOf(2);
                    const values = response.map((item) => item.nombre);
                    expect(values).to.include('asd');                    
                });
            });
        });
    });
});