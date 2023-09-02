import { PactV3, MatchersV3 } from '@pact-foundation/pact';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { ItemService } from '../../services/ItemService.js';
import { crearItemRequestBody, crearItemResponse, responseItemSearch, textoBusqueda } from '../PactResponses.js';
const { like } = MatchersV3;
describe('El API de Items', () => {

    let itemService;
    const provider = new PactV3({
        consumer: 'react-client',
        provider: 'restaurant-service'
    });

    describe('crear item', () => {
        it('retorna un id de producto ya creado', () => {
            //Arrange
            provider.given('crear item')
                .uponReceiving('un pedido para crear un item')
                .withRequest({
                    method: 'POST',
                    path: '/api/Item',
                    headers: {
                        'Accept': 'application/json'
                    },
                    body: crearItemRequestBody
                }).willRespondWith({
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: like(crearItemResponse)
                });
            return provider.executeTest(async mockServer => {
                // Act
                itemService = new ItemService(mockServer.url);
                return itemService.crearItem(crearItemRequestBody.codigo, crearItemRequestBody.nombre).then((response) => {
                    //Assert
                    expect(response).to.be.not.null;
                    expect(response).to.be.a.string;
                    expect(response).equal(crearItemResponse);
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
                    path: '/api/Item',
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
                itemService = new ItemService(mockServer.url);
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