const express = require("express");
const fs = require('fs');
const servidorcito = express();
let paginaError;
fs.readFile("404.html", "utf-8", (err, data)=>{
    paginaError = data;
});
function funcionCallback() {
    console.log("Servidor iniciado");
}
servidorcito.listen(5500, funcionCallback);
const series = [
    {nombre: "got", archivo: "got.html"},
    {nombre: "randm", archivo: "randm.html"},
    {nombre: "lost", archivo: "lost.html"},
    {nombre: "dark", archivo: "dark.html"},
]
function funcionDelaRutaSeries(peticion, respuesta) {
    console.log(peticion.params.nombreSerie, peticion.query);
    // Primero encontramos si la serie existe
    const serieEncontrada = series.find((element)=>{
        return element.nombre === peticion.params.nombreSerie
    });
    if(serieEncontrada) {
        fs.readFile("series/" + serieEncontrada.archivo, "utf-8", (err, data)=>{
            if(err) {
                respuesta.statusCode = 404;
                respuesta.send(paginaError);
            } else {
                respuesta.statusCode = 200;
                respuesta.json(data);
            }
        });
    } else {
        respuesta.statusCode = 404;
        respuesta.send(paginaError);
    }
}
servidorcito.get('/series/:nombreSerie', funcionDelaRutaSeries);
//servidorcito.get('/acamica/:curso/alumnos', funcionDelaRutaSeries);