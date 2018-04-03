var pedido;
var pizzas;

$(function() {
    $.get("./data/pizzas.json", function(data, status) {
        pedido = recuperarPedido();
        pizzas = new Map(data.map((pizza) => [getId(pizza), pizza]));
        mostrarPizzas(ordenarPizzas(data));
        actualizarTotal(computarTotal());
    });
});

function ordenarPizzas(data) {
    var pizzas = new Object();
    $.each(data, function( index, pizza ) {
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

function onActualizarPedido(e) {
    var id = $(e.target).parents("tr").attr("id");

    //le cambio el estado
    actualizarEstado(id, actualizarPedido(id));

    guardarPedido(pedido);

    //recalculo el total
    actualizarTotal(computarTotal());
}

/**
 * Calcula el valor del pedido
 */
function computarTotal() {
    var total = 0.0;

    pedido.forEach(function(id){
        total += pizzas.get(id).precio;
    })
    return total;
}

function getId(pizza) {
    return pizza.nombre.replace(/\s/g, '');
}

function enPedido(id) {
    return pedido.has(id);
}

function actualizarPedido(id) {
    var enPedido = !pedido.has(id);
    if (enPedido) {
        pedido.add(id);
    } else {
        pedido.delete(id);
    }
    return enPedido;
}

