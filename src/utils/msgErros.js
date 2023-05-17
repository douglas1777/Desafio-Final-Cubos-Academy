module.exports = {
  erro_interno: { mensagem: 'Erro interno do servidor' },
  erro_login: { mensagem: 'Usuário e/ou senha inválido(s)' },
  erro_usuario_nao_encontrado: { mensagem: 'Usuário não encontrado' },
  erro_usuario_existe: {
    mensagem: 'Já existe usuário cadastrado com o e-mail informado',
  },

  erro_cliente_nao_encontrado: { mensagem: 'Cliente não encontrado' },
  erro_categoria_nao_encontrada: { mensagem: 'Categoria não encontrada' },
  erro_produto_nao_encontrado: { mensagem: 'Produto não encontrado' },
  erro_produto_pedido: {
    mensagem: 'O produto não pode ser excluído pois está presente em um pedido',
  },
  erro_sem_estoque: {
    mensagem:
      'A quantidade de produto solicitada está acima do volume em estoque',
  },
  erro_imagem_nao_encontrada: {
    mensagem: 'A imagem não foi encontrada',
  },
  erro_imagem_obrigatoria: {
    mensagem: 'É obrigatório fornecer a imagem em formato multipart form',
  },

  erro_imagem_tipo: {
    mensagem: 'O arquivo enviado deve ser do tipo imagem.',
  },
}
