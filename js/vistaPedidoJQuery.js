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
    var subtitulo = $("<th></th>").attr("colspan", "3").text(subtitulo);
    $("#tabla").append($("<tr></tr>").append(subtitulo));
}

function agregarPizza(pizza) {
    var row = $("<tr></tr>").attr("id", pizza.id);
    row.append($("<td></td").append($("<input>").attr("type", "checkbox")));
    row.append($("<td></td").text(pizza.nombre));
    row.append($("<td></td").text(pizza.precio));
    row.click(actualizarPedido);
    $("#tabla").append(row);
}

function actualizarTotal(total) {
    $("#total").text(total+".00");
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
