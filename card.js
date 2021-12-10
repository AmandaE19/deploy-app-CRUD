import { getThemeProps } from "@material-ui/styles";
import React from "react";
import "./card.css";
import FormDialog from "./dialog/dialog";
import sapato from "./sapato.jpeg"

export default function Card(props){
    const [open, setOpen] = React.useState(false);

    const handleClickCard = () =>{
        setOpen(true);
    }

    return (
        <>
            <FormDialog 
                open={open} 
                setOpen={setOpen}
                num_id={props.num_id} 
                brand={props.brand}
                color={props.color} 
                tam={props.tam} 
                category={props.category} 
                value={props.value}
                listCard={props.listCard}
                setListCard={props.setListCard}
                id={props.id}
            />
            <div className="card--container" onClick={() => 
            handleClickCard()}>
                <h1 className="card--title">{props.brand}</h1>
                <h3 className="card--title">ID: {props.num_id}</h3>
                <img src= {sapato} className="card--image" alt="sapato"/>
                <p className="card--color">{props.color}</p>
                <p className="card--tam">{props.tam}</p>
                <p className="card--category">{props.category}</p>
                <p className="card--value">R$ {props.value}</p>
            </div>
        </>
    );
}