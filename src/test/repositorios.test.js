// const knexTest = require('../config/conexaoTest')
// const usuario = { nome: 'luci', email: 'luci@gmail.com', senha: '123456' }

// beforeEach(async () => {
//   await knexTest('usuarios').del()
// })

// afterEach(async () => {
//   await knexTest('usuarios').del()
// })

// afterAll(async () => {
//   await knexTest.destroy()
// })

// describe('manipular usuario', () => {
//   test('consultaUsuario retorna o usuário correto', async () => {
//     const [usuarioInserido] = await knexTest('usuarios')
//       .insert(usuario)
//       .returning(['id', 'nome', 'email'])

//     const consultaUsuario = async (emailOuId) => {
//       if (typeof emailOuId === 'string') {
//         return await knexTest('usuarios').where({ email: emailOuId }).first()
//       }
//       return await knexTest('usuarios').where({ id: emailOuId }).first()
//     }
//     const { senha: _, ...usuarioConsultado } = await consultaUsuario(
//       usuarioInserido.id
//     )

//     expect(usuarioConsultado).toEqual({
//       id: usuarioInserido.id,
//       nome: 'luci',
//       email: 'luci@gmail.com',
//     })
//   })

//   test('cadastraUsuario retorna um erro', async () => {
//     const usuarioErrado = { nome: 'usuario', senha: '1234' }

//     try {
//       await knexTest('usuarios')
//         .insert(usuarioErrado)
//         .returning(['id', 'nome', 'email'])
//     } catch (error) {
//       expect(error).toHaveProperty('message')
//     }
//   })

//   test('consultaUsuario retorna um erro', async () => {
//     await knexTest('usuarios')
//       .insert(usuario)
//       .returning(['id', 'nome', 'email'])

//     const consultaUsuario = async (emailOuId) => {
//       if (typeof emailOuId === 'string') {
//         return await knexTest('usuarios').where({ email: emailOuId }).first()
//       }
//       return await knexTest('usuarios').where({ id: emailOuId }).first()
//     }
//     expect(await consultaUsuario(9999)).toBeUndefined()
//   })

//   test('salva os dados do usuario no banco de dados', async () => {
//     const salvarUsuario = async (usuario) => {
//       return await knexTest('usuarios')
//         .insert(usuario)
//         .returning(['id', 'nome', 'email'])
//     }

//     const [usuarioCadastrado] = await salvarUsuario(usuario)

//     expect(usuarioCadastrado).toEqual({
//       nome: 'luci',
//       email: 'luci@gmail.com',
//       id: usuarioCadastrado.id,
//     })
//   })

//   test('atualiza os dados do usuario cadastrado no banco de dados', async () => {
//     const usuarioAtualizado = {
//       nome: 'lilitth',
//       email: 'lilitth@gmail.com',
//       senha: '654321',
//     }

//     const [usuarioInserido] = await knexTest('usuarios')
//       .insert(usuario)
//       .returning('id')

//     const atualizarUsuario = async (usuario, id) => {
//       return await knexTest('usuarios').update(usuario).where({ id })
//     }

//     expect(await atualizarUsuario(usuarioAtualizado, usuarioInserido.id)).toBe(
//       1
//     )
//   })
// })
