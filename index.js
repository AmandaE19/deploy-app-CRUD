const express = require("express"); 
const app = express();
const cors = require('cors')
const admin = require('firebase-admin')
const serviceAccount = require('./serviceAccount.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

app.use(cors());
app.use(express.json());

//INSERINDO DADOS NO BD COM O MÉTODO .POST()
app.post("/add", async (req, res) => {
    const id = new Date();
    const require = db.collection('shoes').doc(String(id.getTime()));
    await require.set({
        //PEGA OS VALORES VINDOS DA REQUISIÇÃO
        num_id: String(id.getTime()),
        color: req.body.color,
        brand: req.body.brand,
        tam: req.body.tam,
        category: req.body.category,
        value: req.body.value,
    });
    res.send(req.body)
});

//RECEBENDO TODOS OS DADOS PRESENTES NO BD
app.get("/getCards", async (req,res) => {
    const shoes = await db.collection('shoes').get();
    const listShoes = []
    shoes.forEach((doc) =>{
        listShoes.push(doc.data())
        console.log(doc.id, "=>", doc.data());
    });
    res.send(listShoes)
});

//EXCLUI UM DADO NO BANCO
app.delete("/del/:id", async (req, res) =>{
    await db.collection('shoes').doc(req.params.id).delete();
    return console.log("EXCLUÍDO");
});

//ATUALIZANDO DADOS NO BD
app.put('/edit/:id', async (req, res) =>{
    await db.collection('shoes').doc(req.params.id).update({
        num_id: req.body.num_id,
        color: req.body.color,
        brand: req.body.brand,
        tam: req.body.tam,
        category: req.body.category,
        value: req.body.value,
    });
   return console.log("Atualizado com sucesso!!");
});

app.listen(3001, () => {
    console.log("server running on port 3001");
});

module.exports = app

/*Objeto firebase
const firebaseConfig = {
    apiKey: "AIzaSyDmWJomayRXh8R45Ci9bQAVCfnGMJe9GGM",
    authDomain: "loja-97ee6.firebaseapp.com",
    projectId: "loja-97ee6",
    storageBucket: "loja-97ee6.appspot.com",
    messagingSenderId: "885095016153",
    appId: "1:885095016153:web:db015a29e335ddd15d00c8",
    measurementId: "G-57F0WWNRY8"
};*/