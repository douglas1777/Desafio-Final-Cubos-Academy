/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
  const [{ count }] = await knex('produtos').count('* as count')

  if (!Number.isInteger(count) || count > 0) return

  return await knex('produtos').insert([
    {
      id: 3,
      descricao: 'mouse',
      quantidade_estoque: '4',
      valor: 3000,
      categoria_id: 2,
      produto_imagem: null,
    },
    {
      id: 4,
      descricao: 'mouse',
      quantidade_estoque: '4',
      valor: 3000,
      categoria_id: 2,
      produto_imagem:
        'https://sdioilofaevysatctgzg.supabase.co/storage/v1/object/public/imagem/teste/75f534c9-d6a8-4c76-814b-ee8c2d08ca88',
    },
    {
      id: 5,
      descricao: 'mouse',
      quantidade_estoque: '4',
      valor: 3000,
      categoria_id: 2,
      produto_imagem: null,
    },
    {
      id: 6,
      descricao: 'mouse',
      quantidade_estoque: '4',
      valor: 3000,
      categoria_id: 2,
      produto_imagem: null,
    },
    {
      id: 7,
      descricao: '4',
      quantidade_estoque: '4',
      valor: 3000,
      categoria_id: 2,
      produto_imagem: null,
    },
    {
      id: 8,
      descricao: 'mouse',
      quantidade_estoque: '4',
      valor: 3000,
      categoria_id: 2,
      produto_imagem: null,
    },
    {
      id: 9,
      descricao: 'desert eagle',
      quantidade_estoque: '10',
      valor: 50,
      categoria_id: 1,
      produto_imagem: null,
    },
    {
      id: 11,
      descricao: 'rifle AK-47',
      quantidade_estoque: '20',
      valor: 100,
      categoria_id: 3,
      produto_imagem:
        'https://sdioilofaevysatctgzg.supabase.co/storage/v1/object/public/imagem/teste/9d0decbe-7c59-45dd-bd38-ecc4476dcbc6',
    },
    {
      id: 13,
      descricao: 'Motorola moto g9 plus',
      quantidade_estoque: '100',
      valor: 15000,
      categoria_id: 2,
      produto_imagem: null,
    },
    {
      id: 14,
      descricao: 'radio',
      quantidade_estoque: '1',
      valor: 33000,
      categoria_id: 2,
      produto_imagem:
        'https://sdioilofaevysatctgzg.supabase.co/storage/v1/object/public/imagem/teste/d843d1f4-01e8-4a9f-b03e-00c8b3a8aa16',
    },
  ])
}
