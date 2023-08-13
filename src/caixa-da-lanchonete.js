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

    //https://pt.stackoverflow.com/questions/181922/formatar-moeda-brasileira-em-javascript
    //Uma solução alternativa (e mais fácil) ao toFixed() e que poderia ser usado em caso real! Veja:
    //formatarValor(valor) {
    //    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    //}

    calcularValorDaCompra(metodoDePagamento, itens) {
        let metodoDePagamentoMinusculo = metodoDePagamento.toLowerCase();
    
        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }
    
        if (metodoDePagamentoMinusculo !== 'dinheiro' && metodoDePagamentoMinusculo !== 'credito' && metodoDePagamentoMinusculo !== 'debito') {
            return "Forma de pagamento inválida!";
        }
    
        let valorDoPedido = 0;
        let pedido = "";
        let chantilyPedido = false;
        let queijoPedido = false;
        for (const item of itens) {
            const [codigo, quantidade] = item.split(',');
            const produto = this.produtos.find(p => p.codigo === codigo); //undefined é considerado um valor truthy em JavaScript. Loucura, não?

            if (quantidade == 0) {
                return "Quantidade inválida!";
            }

            if (produto !== undefined) {
                valorDoPedido += produto.valor * parseInt(quantidade);
                pedido += codigo;

                if (codigo === "chantily") {
                    chantilyPedido = true;
                }
                if (codigo === "queijo") {
                    queijoPedido = true;
                }
            } else {
                return "Item inválido!";
            }
        }
        
        if (pedido === "chantily" || pedido === "queijo") {
            return "Item extra não pode ser pedido sem o principal";
        }

        if (chantilyPedido == true && !pedido.includes("cafe") || queijoPedido == true && !pedido.includes("sanduiche")) {
            return "Item extra não pode ser pedido sem o principal";
        }

        if (metodoDePagamentoMinusculo === 'dinheiro') {
            const pagarEmDinheiro = valorDoPedido - valorDoPedido * 0.05;
            return "R$ " + pagarEmDinheiro.toFixed(2).replace('.', ',');
        }

        if (metodoDePagamentoMinusculo === 'credito') {
            const pagarEmCredito = valorDoPedido + valorDoPedido * 0.03;
            return "R$ " + pagarEmCredito.toFixed(2).replace('.', ',');
        }

        if (metodoDePagamentoMinusculo === 'debito') {
            const pagarEmDebito = valorDoPedido;
            return "R$ " + pagarEmDebito.toFixed(2).replace('.', ',');
        }
    
        return "Forma de pagamento inválida!";
    }
}

export { CaixaDaLanchonete };
