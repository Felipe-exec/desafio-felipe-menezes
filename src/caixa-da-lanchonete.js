class CaixaDaLanchonete {
    constructor() {
        this.produtos = [
            { codigo: 'cafe', descricao: 'Café', valor: 3.00 },
            { codigo: 'chantily', descricao: 'Chantily (extra do Café)', valor: 1.50 },
            { codigo: 'suco', descricao: 'Suco Natural', valor: 6.20 },
            { codigo: 'sanduiche', descricao: 'Sanduíche', valor: 6.50 },
            { codigo: 'queijo', descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
            { codigo: 'salgado', descricao: 'Salgado', valor: 7.25 },
            { codigo: 'combo1', descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
            { codigo: 'combo2', descricao: '1 Café e 1 Sanduíche', valor: 7.50 },
        ];
    }

    //Solução que achei no stackoverflow: https://pt.stackoverflow.com/questions/181922/formatar-moeda-brasileira-em-javascript
    formatarValor(valor) {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }


    calcularValorDaCompra(metodoDePagamento, itens) {
        let metodoDePagamentoMinusculo = metodoDePagamento.toLowerCase();
    
        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }
    
        if (metodoDePagamentoMinusculo !== 'dinheiro' && metodoDePagamentoMinusculo !== 'credito' && metodoDePagamentoMinusculo !== 'debito') {
            return "Forma de pagamento inválida!";
        }
    
        let valorDoPedido = 0;
        for (const item of itens) {
            const [codigo, quantidade] = item.split(','); //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
            const produto = this.produtos.find(p => p.codigo === codigo);
            if (produto) {
                valorDoPedido += produto.valor * parseInt(quantidade);
            }
        }
    
        if (metodoDePagamentoMinusculo === 'dinheiro') {
            return this.formatarValor(valorDoPedido - valorDoPedido * 0.05);
        }
        if (metodoDePagamentoMinusculo === 'credito') {
            return this.formatarValor(valorDoPedido + valorDoPedido * 0.03);
        }
        if (metodoDePagamentoMinusculo === 'debito') {
            return this.formatarValor(valorDoPedido);
        }
    
        return "Forma de pagamento inválida!";
    }
}

export { CaixaDaLanchonete };
