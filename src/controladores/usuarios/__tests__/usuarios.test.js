const { consultaUsuario } = require('../../../repositorios/usuarios');
const { StatusCodes } = require('http-status-codes');
const { detalharUsuario } = require('../usuarios');


test('deve retornar o usuário encontrado com status 200', async () => {
    const usuarioEncontrado = {
        id: 1,
        nome: 'João',
        email: 'joao@teste.com',
    };

    const req = {
        usuario: usuarioEncontrado.id,
    };

    consultaUsuario.mockResolvedValue(usuarioEncontrado);

    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };

    await detalharUsuario(req, res);

    expect(consultaUsuario).toHaveBeenCalledWith(usuarioEncontrado.id);
    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(res.json).toHaveBeenCalledWith(usuarioEncontrado);
});


test('deve retornar um objeto de erro com status 404 se o usuário não for encontrado', async () => {
    const usuarioEncontrado = null;

    const req = {
        usuario: 1,
    };

    consultaUsuario.mockResolvedValue(usuarioEncontrado);

    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };

    await detalharUsuario(req, res);

    expect(consultaUsuario).toHaveBeenCalledWith(req.usuario);
    expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
    expect(res.json).toHaveBeenCalledWith({ erro: 'Usuário não encontrado' });
});
