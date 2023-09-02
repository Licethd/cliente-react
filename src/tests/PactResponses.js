export const crearTripulanteResponse = '"6cc5f70e-ba09-4df7-a757-7adfe2d4a360"';
export const crearItemResponse = '"6cc5f70e-ba09-4df7-a757-7adfe2d4a360"';
export const crearTransaccionResponse = '"6cc5f70e-ba09-4df7-a757-7adfe2d4a360"';
export const crearTripulanteRequestBody = {
    Nombre: "Juanita",
	Apellido: "Torrez",
	EmailAddress: "juani@gmail.com",
	Estado: "1",
	Tipo: "AIRE",
	HorasVuelo: 300,
	NroMillas: 3556,
	KeyCargo: "7aeb23be-1fbc-40c0-bae9-eb87ce3c87a6"
};
export const crearItemRequestBody = {
    codigo: '123',
    nombre: 'item de prueba'
};
export const responseItemSearch = [
    {
        "itemId": "22ce4c2f-510f-4f9b-a6c1-40869a1181de",
        "nombre": "asdasd",
        "codigo": "asdasd",
        "stock": 0
    },
    {
        "itemId": "21fcfd5b-91c0-4cf3-a257-f4b93c1ef623",
        "nombre": "asd",
        "codigo": "dsa",
        "stock": 0
    }
];
export const textoBusqueda = 'asd';
export const crearTransaccionRequestBody = {
    "items": [
        {
            "id": "21fcfd5b-91c0-4cf3-a257-f4b93c1ef623",
            "costoUnitario": 10,
            "cantidad": 20
        }
    ],
    "tipo": 0,
    "crearYConfirmar": true
}