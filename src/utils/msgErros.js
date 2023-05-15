module.exports = {
  erro_interno: { mensagem: 'Erro interno do servidor' },
  erro_login: { mensagem: 'Usuário e/ou senha inválido(s)' },
  erro_usuario_nao_encontrado: { mensagem: 'Usuário não encontrado' },
  erro_usuario_existe: {
    mensagem: 'Já existe usuário cadastrado com o e-mail informado',
  },

  erro_cliente_nao_encontrado: { mensagem: 'Cliente não encontrado' },
  erro_id_cliente_nao_encontrado: {
    mensagem: 'Cliente não encontrado no banco de dados',
  },
  erro_categoria_nao_encontrada: { mensagem: 'Categoria não encontrada' },
  erro_produto_nao_encontrado: { mensagem: 'Produto não encontrado' },
  erro_sem_estoque: {
    mensagem:
      'A quantidade de produto solicitada está acima do volume em estoque',
  },
}
