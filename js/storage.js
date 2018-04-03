
function guardarPedido(pedido) {
    localStorage.pedido = JSON.stringify(Array.from(pedido.values()));
}

function recuperarPedido() {
    var result = localStorage.pedido;
    return (result != undefined) ? new Set(JSON.parse(result)) : new Set();
}