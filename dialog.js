import React, {useState} from "react";
import  Button  from "@material-ui/core/Button";
import  TextField  from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import  DialogActions  from "@material-ui/core/DialogActions";
import  DialogContent  from "@material-ui/core/DialogContent";
import  DialogContentText  from "@material-ui/core/DialogContentText";
import  DialogTitle  from "@material-ui/core/DialogTitle";
import Axios from "axios";

export default function  FormDialog(props) {
    const [editValues, setEditValues] = useState({
        id: props.id,
        num_id: props.num_id,
        brand: props.brand,
        color: props.color,
        tam: props.tam,
        category: props.category,
        value: props.value,
    });

    //FAZ A REQUISIÇÃO PARA O BACKEND DE ATUALIZAR
    const handleEditShoe = ()=>{
        Axios.put(`http://localhost:3001/edit/${props.num_id}`, {
            num_id: editValues.num_id,
            brand: editValues.brand,
            color: editValues.color,
            tam: editValues.tam,
            category: editValues.category,
            value: editValues.value,
        }).then((response) => {
            console.log(response)
        })
        .catch(error => {
            console.log(error.response)
        });
    };

    //FAZ A REQUISIÇÃO PARA O BACKEND P/ EXCLUIR
    const handleDelShoe = ()=>{
        console.log(props.num_id);
        Axios.delete(`http://localhost:3001/del/${props.num_id}` ,  {
            
        }).then((response) => {
            console.log(response)
        })
        .catch(error => {
            console.log(error.response)
        });
    };

    const handleClickOpen = () => {
        props.setOpen(true);
    };

    const handleClose = () =>  {
        props .setOpen(false);
    };
 
const handleChangeValues = (value) =>{
    setEditValues(prevValues=>({
        ...prevValues,
        [value.target.id]: value.target.value,
    }))
}

    return(
        
           <Dialog
               open={props.open}
               onClose={handleClose}
               aria-Labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Editar</DialogTitle>
            <DialogContent>
                <TextField 
                    autoFocus
                    margin="dense"
                    id="brand"
                    label="Marca"
                    defaultValue={props.brand}
                    onChange={handleChangeValues}
                    type="text"
                    fullWidth
                />
                <TextField 
                    autoFocus
                    margin="dense"
                    id="color"
                    label="Cor"
                    defaultValue={props.color}
                    onChange={handleChangeValues}
                    type="text"
                    fullWidth
                />
                <TextField 
                    autoFocus
                    margin="dense"
                    id="tam"
                    label="Tamanho"
                    defaultValue={props.tam}
                    onChange={handleChangeValues}
                    type="text"
                    fullWidth
                />
                <TextField 
                    autoFocus
                    margin="dense"
                    id="category"
                    label="Tipo"
                    defaultValue={props.category}
                    onChange={handleChangeValues}
                    type="text"
                    fullWidth
                />
                <TextField 
                    autoFocus
                    margin="dense"
                    id="value"
                    label="Preço"
                    defaultValue={props.value}
                    onChange={handleChangeValues}
                    type="text"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleDelShoe} color="primary">
                    Excluir
                </Button>
                <Button onClick={handleEditShoe} color="primary">
                    Salvar
                </Button>
            </DialogActions>
            </Dialog>
    );
}