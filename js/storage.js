
function guardarPedido(pedido) {
    window.localStorage.setItem("pedido", JSON.stringify(Array.from(pedido.values())));
}

function recuperarPedido() {
    var result = window.localStorage.getItem("pedido");
    return (result != undefined) ? new Set(JSON.parse(result)) : new Set();
}