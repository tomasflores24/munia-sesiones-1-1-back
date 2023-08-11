import express from "express"

const {app} =express

app.listen(3000, ()=>{
    console.log(`Aplicacion escuchando en el puerto ${3000}`)
})