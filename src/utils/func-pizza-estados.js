function pizzaEstados(arrayEstados) {
    try {
        let contagemEstados = arrayEstados.reduce(function (object, item) {
            if (!object[item]) {
                object[item] = 1;
            } else {
                object[item]++;
            }
            return object;
        }, {});

        let pizzaEstado = [];
        for (var index in contagemEstados) {
            if (contagemEstados.hasOwnProperty(index)) {
                pizzaEstado.push({ id: index, value: contagemEstados[index] });
            }
        }
        return pizzaEstado;
    } catch (error) {
        console.log("** Error pizzaEstados **");
        console.log(error);
    }
}
module.exports = pizzaEstados;