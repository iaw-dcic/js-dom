
/**
 * Agrega o elimina del pedido, segun corresponda
 * @param {Event} event
 */
function actualizarPedido(event) {
    
    // obtengo el elemento que genero el evento
    var target = event.target;
    
    // si el click NO se hizo sobre el input, tengo que actualizarlo
    var actualizarInput = target.tagName !== 'INPUT';

    // obtengo el elemento de la fila
    while (target.tagName !== "TR") {
        target = target.parentNode;
    }
    
    // obtengo el checkbox correspondiente
    var check = target.getElementsByTagName('INPUT')[0];
    
    if (actualizarInput) // actualizo el estado del checkbox, si corresponde
        check.checked = !check.checked;
    
    //marco la fila como seleccionada o no, según corresponda
    target.setAttribute("class", check.checked ? "selected" : "");

    //recalculo el total
    var total = computarTotal();
    
    document.getElementById("total").firstChild.data = total + ".00";
}

/**
 * Calcula el valor del pedido
 */
function computarTotal() {
    var total = 0.0;
    var i = 0;

    //obtengo el elemento tabla
    var tabla = document.getElementById("tabla");

    //obtengo todos los elementos checkbox
    var checkBoxs = tabla.getElementsByTagName('INPUT');

    for (i = 0; i < checkBoxs.length; i++) {

        //si esta seleccionado
        if (checkBoxs[i].checked) {

            // obtengo la fila
            var fila = checkBoxs[i].parentNode.parentNode;

            // obtengo la tercer columna de la fila
            var precio = fila.getElementsByTagName('TD')[2];

            // el texto del elemento precio contiene el valor de la pizza
            total += parseFloat(precio.firstChild.data);
        }
    }
    return total;
}
