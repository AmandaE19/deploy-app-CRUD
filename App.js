import React, {useState, useEffect} from "react"
import './App.css';
import Axios from "axios"
import Card from "./components/cards/card";

function App() {
  const [values, setValues] = useState();
  const [listShoes, setListShoes] = useState();

  //função que pegará todos os valores
  //preenchidos no formulário
  const handleChangeValues = (value) => {
    setValues((prevValue)=>({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

//faz a requisição para o backend para mandar 
//esses dados para BD
const handleClickButton = () =>{
  Axios.post("http://localhost:3001/add", {
    num_id: values.num_id,
    color: values.color,
    brand: values.brand,
    tam: values.tam,
    category: values.category,
    value: values.value,
  }).then((response) => {
    console.log(response)
  });
};

useEffect(() => {
  Axios.get("http://localhost:3001/getCards").then((response) => {
    setListShoes(response.data);
  })
}, [])


  return (
    <div className="app--container">
      <div className="register--container">
        <div className="register--title">
          <h1>Lojinha da Amanda</h1>
          <input 
            type="text" 
            name="color"
            placeholder="Cor" 
            className="register--input"
            onChange={handleChangeValues}
          />
          <input 
            type="text" 
            name="brand"
            placeholder="Marca" 
            className="register--input"
            onChange={handleChangeValues}
          />
          <input 
            type="text" 
            name="tam"
            placeholder="Tamanho" 
            className="register--input"
            onChange={handleChangeValues}
          />
          <input 
            type="text"   
            name="category"
            placeholder="Categoria" 
            className="register--input"
            onChange={handleChangeValues}
          />
          <input 
            type="text" 
            name="value"
            placeholder="Preço" 
            className="register--input"
            onChange={handleChangeValues}
          />
          <button className="register-button" onClick={() => handleClickButton()}>Cadastrar</button>
        </div>
      </div>
      {typeof listShoes !== "undefined" &&
        listShoes.map((value) => {
          return (
            <Card className="card--container"
              key={value.id}
              listCard={listShoes} 
              setListCard={setListShoes}
              num_id={value.num_id}
              color={value.color}
              brand={value.brand}
              tam={value.tam}
              category={value.category}
              value={value.value}
            ></Card>
          );
      })}
    </div>
  );
}

export default App;
