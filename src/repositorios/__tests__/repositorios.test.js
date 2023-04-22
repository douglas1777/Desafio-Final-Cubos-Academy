const knexTest = require('../../config/conexaoTest')

beforeEach(async () => {
    await knexTest('usuarios').del();
});

afterEach(async () => {
    await knexTest('usuarios').del();
});

afterAll(async () => {
    await knexTest.destroy();
})

test('consultaUsuario retorna o usuário correto', async () => {

    const usuario = { nome: 'luci', email: 'luci@gmail.com', senha: '123456' };

    const [usuarioInserido] = await knexTest('usuarios').insert(usuario).returning('*');

    const consultaUsuario = async (emailOuId) => {
        if (typeof emailOuId === "string") {
            return await knexTest("usuarios").where({ email: emailOuId }).first();
        }
        return await knexTest("usuarios").where({ id: emailOuId }).first();
    };

    expect(await consultaUsuario(usuarioInserido.id)).toEqual(usuarioInserido);
});


test('retorna os dados do usuario cadastrado no banco de dados', async () => {

    const usuario = { nome: 'luci', email: 'luci@gmail.com', senha: '123456' };

    const salvarUsuario = async (usuario) => {
        return await knexTest("usuarios").insert(usuario).returning("*");
    };

    const [usuarioCadastrado] = await salvarUsuario(usuario)

    expect(usuarioCadastrado).toEqual({ ...usuario, id: usuarioCadastrado.id })
});


test('atualiza os dados do usuario cadastrado no banco de dados', async () => {

    const usuario = { nome: 'luci', email: 'luci@gmail.com', senha: '123456' };

    const usuarioAtualizado = { nome: 'lilitth', email: 'lilitth@gmail.com', senha: '654321' }

    const [usuarioInserido] = await knexTest('usuarios').insert(usuario).returning('*');

    const atualizarUsuario = async (usuario, email) => {
        return await knexTest("usuarios").update(usuario).where({ email });
    };

    expect(await atualizarUsuario(usuarioAtualizado, usuarioInserido.email)).toBe(1)
});


