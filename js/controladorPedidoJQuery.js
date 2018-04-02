var pedido;

$(function() {
    $.get("./data/pizzas.json", function(data, status) {
        pedido = data;
        mostrarPizzas(ordenarPizzas(data));
    });
});

function ordenarPizzas(data) {
    var pizzas = new Object();
    $.each(data, function( index, pizza ) {
        pizza.id = index;
        pizza.enPedido = false;
        var pizzasPorTipo;
        if (pizzas.hasOwnProperty(pizza.tipo))
            pizzasPorTipo = pizzas[pizza.tipo];
        else {
            pizzasPorTipo = new Array();
            pizzas[pizza.tipo] = pizzasPorTipo;
        }
        pizzasPorTipo[pizzasPorTipo.length] = pizza;
    });
    return pizzas;
}

function actualizarPedido(e) {
    var id = $(e.target).parents("tr").attr("id");
    var pizza = pedido[id];
    pizza.enPedido = !pizza.enPedido;

    //le cambio el estado
    actualizarEstado(id, pizza.enPedido);

    //recalculo el total
    actualizarTotal(computarTotal());
}

/**
 * Calcula el valor del pedido
 */
function computarTotal() {
    var total = 0.0;

    $.each(pedido, function(index, pizza){
        if (pizza.enPedido) {
            total += pizza.precio;
        }
    })
    return total;
}