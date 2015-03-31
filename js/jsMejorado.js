var jsonPizzas;

$(function() {
    var pizzas = ordenarPizzas();
    mostrarPizzas(pizzas);
});

function ordenarPizzas() {
    var index;

    var pizzas = new Object();
    for (index = 0; index < jsonPizzas.length; ++index) {
        var pizza = jsonPizzas[index];
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

function mostrarPizzas(pizzas) {
    var index;

    for (var tipo in pizzas) {
        agregarSubTitulo(tipo);
        var pizzasPorTipo = pizzas[tipo];
        for (index = 0; index < pizzasPorTipo.length; ++index) {
            agregarPizza(pizzasPorTipo[index]);
        }
    }
}

function agregarSubTitulo(subtitulo) {
    var th = document.createElement('th');
    th.setAttribute("colspan", "3");
    th.innerHTML = subtitulo;
    var row = document.getElementById("tabla").insertRow(-1);
    row.appendChild(th);
}

function agregarPizza(pizza) {
    var row = document.getElementById("tabla").insertRow(-1);
    var input = document.createElement('input');
    input.setAttribute("type", "checkbox");
    row.insertCell(0).appendChild(input);
    row.insertCell(1).innerHTML = pizza.nombre;
    row.insertCell(2).innerHTML = pizza.precio;
    row.setAttribute("id", pizza.id);
    row.setAttribute("onclick", "actualizarPedido(event)");
}

function actualizarPedido(e) {
    var target = e.target;
    while (target.tagName !== "TR") {
        target = target.parentNode;
    }
    var id = target.getAttribute("id");
    
    var pizza = jsonPizzas[id];
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

    for (index = 0; index < jsonPizzas.length; ++index) {
        var pizza = jsonPizzas[index];
        if (pizza.enPedido) {
            total += pizza.precio;
        }
    }
    return total;
}

function actualizarEstado(id, valor) {
    //obtengo el elemento que genero el evento
    var fila = document.getElementById(id);
    
    // obtengo el checkbox correspondiente
    var check = fila.getElementsByTagName('INPUT')[0];

    // actualizo el estado del checkbox
    check.checked = valor;

    //marco la fila como seleccionada o no, según corresponda
    fila.setAttribute("class", valor ? "selected" : "");
}

function actualizarTotal(total) {
    document.getElementById('total').innerHTML = total+".00";
}