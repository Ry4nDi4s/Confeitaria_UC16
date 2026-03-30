const criarProduto = (produto) => {
  if (produto.preco <= 0) {
    return { erro: "Preço deve ser maior que zero" };
  }
  if (produto.quantidade < 0) {
    return { erro: "Quantidade não pode ser negativa" };
  }

  const novoProduto = {
    id: nextId++,
    ...produto,
  };
  produtos.push(novoProduto);
  return novoProduto;
};

const listarProdutos = () => {
  return produtos;
};

const atualizarProduto = (id, dados) => {
  if (dados.preco && dados.preco <= 0) {
    return { erro: "Preço deve ser maior que zero" };
  }
  if (dados.quantidade && dados.quantidade < 0) {
    return { erro: "Quantidade não pode ser negativa" };
  }

  const index = produtos.findIndex((p) => p.id === id);
  if (index === -1) return { erro: "Produto não encontrado" };

  produtos[index] = { ...produtos[index], ...dados };
  return produtos[index];
};

const deletarProduto = (id) => {
  const index = produtos.findIndex((p) => p.id === id);
  if (index === -1) return { erro: "Produto não encontrado" };

  produtos.splice(index, 1);
  return { sucesso: true };
};

beforeEach(() => {
  produtos = [];
  nextId = 1;
});

describe("Sistema de Produtos", () => {
  test("Criar docinho e bolo com sucesso", () => {
    const docinho = criarProduto({
      nome: "Brigadeiro",
      categoria: "docinho",
      preco: 3.5,
      quantidade: 100,
    });

    const bolo = criarProduto({
      nome: "Bolo de Chocolate",
      categoria: "bolo",
      preco: 45.9,
      quantidade: 10,
    });

    expect(docinho.nome).toBe("Brigadeiro");
    expect(docinho.categoria).toBe("docinho");
    expect(bolo.nome).toBe("Bolo de Chocolate");
    expect(bolo.categoria).toBe("bolo");
    expect(produtos.length).toBe(2);
  });

  test("Validar preço e quantidade", () => {
    const precoNegativo = criarProduto({
      nome: "Brigadeiro",
      categoria: "docinho",
      preco: -5.0,
      quantidade: 100,
    });
    expect(precoNegativo.erro).toBe("Preço deve ser maior que zero");

    const quantidadeNegativa = criarProduto({
      nome: "Brigadeiro",
      categoria: "docinho",
      preco: 3.5,
      quantidade: -10,
    });
    expect(quantidadeNegativa.erro).toBe("Quantidade não pode ser negativa");

    const valido = criarProduto({
      nome: "Brigadeiro",
      categoria: "docinho",
      preco: 3.5,
      quantidade: 100,
    });
    expect(valido.erro).toBeUndefined();
    expect(valido.preco).toBe(3.5);
    expect(valido.quantidade).toBe(100);
  });

  test("Listar produtos cadastrados", () => {
    // Criar produtos
    criarProduto({
      nome: "Brigadeiro",
      categoria: "docinho",
      preco: 3.5,
      quantidade: 100,
    });
    criarProduto({
      nome: "Beijinho",
      categoria: "docinho",
      preco: 3.0,
      quantidade: 80,
    });
    criarProduto({
      nome: "Bolo de Chocolate",
      categoria: "bolo",
      preco: 45.9,
      quantidade: 10,
    });

    const lista = listarProdutos();

    expect(lista.length).toBe(3);
    expect(lista[0].nome).toBe("Brigadeiro");
    expect(lista[1].nome).toBe("Beijinho");
    expect(lista[2].nome).toBe("Bolo de Chocolate");
  });

  test("Atualizar produto com sucesso", () => {
    const produto = criarProduto({
      nome: "Brigadeiro",
      categoria: "docinho",
      preco: 3.5,
      quantidade: 100,
    });

    const atualizado = atualizarProduto(produto.id, {
      nome: "Brigadeiro Gourmet",
      preco: 5.0,
      quantidade: 150,
    });

    expect(atualizado.nome).toBe("Brigadeiro Gourmet");
    expect(atualizado.preco).toBe(5.0);
    expect(atualizado.quantidade).toBe(150);
    expect(atualizado.categoria).toBe("docinho"); // Mantém categoria
  });

  test("Excluir produto com sucesso", () => {
    // Criar produtos
    const produto1 = criarProduto({
      nome: "Brigadeiro",
      categoria: "docinho",
      preco: 3.5,
      quantidade: 100,
    });
    const produto2 = criarProduto({
      nome: "Beijinho",
      categoria: "docinho",
      preco: 3.0,
      quantidade: 80,
    });

    expect(produtos.length).toBe(2);

    const resultado = deletarProduto(produto1.id);

    expect(resultado.sucesso).toBe(true);
    expect(produtos.length).toBe(1);
    expect(produtos[0].nome).toBe("Beijinho");
  });
});
