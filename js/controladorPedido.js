var pedido;

$(function() {
    var ajax = new AJAXInteraction("./data/pizzas.json", function(data) {
        pedido = data;
        mostrarPizzas(ordenarPizzas(data));
    });
    ajax.doGet();
});

function ordenarPizzas(data) {
    var index;

    var pizzas = new Object();
    for (index = 0; index < data.length; ++index) {
        var pizza = data[index];
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
    }
    return pizzas;
}

function actualizarPedido(e) {
    var target = e.target;
    while (target.tagName !== "TR") {
        target = target.parentNode;
    }
    var id = target.getAttribute("id");
    
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

    for (index = 0; index < pedido.length; ++index) {
        var pizza = pedido[index];
        if (pizza.enPedido) {
            total += pizza.precio;
        }
    }
    return total;
}