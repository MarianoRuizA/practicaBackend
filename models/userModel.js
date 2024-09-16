import mongoose from "mongoose";
import {Schema} from "mongoose";

const usuariosSchema  = new Schema({
    nombre: String,
    apellido: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false,
    }
})

const usuarioModel = mongoose.model("usuarios",usuariosSchema);
export default usuarioModel;
