const express = require("express");
const app = express();
const PORT = 3000;

const process_data = () => {

    let x = 100;

    return {
        resultado: x
    };
};

app.use(express.json());
	
app.post("/Aleatorie", function (req,res){
    console.log(req.body);
    res.send([Math.round(Math.random() * (req.body.numero-1)+1)]);
})
app.post("/IniciarJuego", function (req, res) {
    const numerosPorCarton=10;
	console.log(req.body)
	let cartones=[];
    let carton=[]; 
    for (let index = 0; index < req.body.numero; index++) {
        for (let index = 0; index < numerosPorCarton; index++) {
            carton.push(Math.round(Math.random() * (99-1)+1));
        }
        cartones.push(carton);
    }
    res.send(cartones);
});

app.get("/mi_endpoint", function (req, res) {
    res.send("respuesta");
});

app.listen(PORT, function(err){
	if (err) console.log(err);
	console.log("Server listening on PORT", PORT);
});