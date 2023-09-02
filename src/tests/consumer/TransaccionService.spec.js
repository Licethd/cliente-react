import { PactV3, MatchersV3 } from '@pact-foundation/pact';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { TransactionService } from '../../services/TransactionService.js';
import { crearTransaccionRequestBody, crearTransaccionResponse, textoBusqueda } from '../PactResponses.js';
const { like } = MatchersV3;
describe('El API de Transacciones', () => {

    let transaccionService;
    const provider = new PactV3({
        consumer: 'react-client',
        provider: 'restaurant-service'
    });

    describe('crear transaccion', () => {
        it('retorna un id de transaccion ya creada', () => {
            //Arrange
            provider.given('crear transaccion')
                .uponReceiving('un pedido para crear un transaccion')
                .withRequest({
                    method: 'POST',
                    path: '/api/Transaccion',
                    // headers: {
                    //     'Content-Type': 'application/json'
                    // },
                    body: crearTransaccionRequestBody
                }).willRespondWith({
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: like(crearTransaccionResponse)
                });
            return provider.executeTest(async mockServer => {
                // Act
                transaccionService = new TransactionService(mockServer.url);
                return transaccionService.crearTransaccion(crearTransaccionRequestBody.items, crearTransaccionRequestBody.tipo)
                .then((response) => {
                    // Assert
                    expect(response).to.be.not.null;
                    expect(response).to.be.a.string;
                    expect(response).equal(crearTransaccionResponse);
                });
            });
        });
    });
});