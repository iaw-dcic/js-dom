function mostrarPizzas(pizzas) {
    var index;

    $.each(pizzas, function(tipo, pizzasPorTipo) {
        agregarSubTitulo(tipo);
        $.each(pizzasPorTipo, function(index, pizza) {
            agregarPizza(pizza);
        });
    });
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
    $('#'+id).prop("class", valor ? "selected" : "").find('input').prop('checked', valor);
}
