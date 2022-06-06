function pizzaCulturas(arrayCulturas) {
    try {
        const contagemCulturas = arrayCulturas.reduce(function (object, item) {
            if (!object[item]) {
                object[item] = 1;
            } else {
                object[item]++;
            }
            return object;
        }, {});

        const pizzaCulturas = [];
        for (var index in contagemCulturas) {
            if (contagemCulturas.hasOwnProperty(index)) {
                pizzaCulturas.push({ id: index, value: contagemCulturas[index] });
            }
        }
        return pizzaCulturas;
    } catch (error) {
        console.log("** Error pizzaCulturas **");
        console.log(error);
    }
}
module.exports = pizzaCulturas;