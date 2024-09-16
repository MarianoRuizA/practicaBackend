import express from "express"
import usuarioModel from "../models/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import "dotenv/config"  

const router  = express.Router();

const getUsers = async (req,res) =>{

    try {
        const usuarios = await usuarioModel.find(); 
        res.json(usuarios)
        console.log(usuarios)
    } catch (error) {
        console.log(error)
    }
   
};

const registroUsuario = async (req,res) =>{
    try {
        const {nombre,apellido,email,password, admin} = req.body;

        const salt =  await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password,salt);//Enctripto la contraseña
        
        const usuario = new usuarioModel({
            nombre,
            apellido,
            email,
            password: passwordHash,
            admin
        });
        await usuario.save();
        res.status(201).json({message:"Usuario registrado correctamente" })


    } catch (error) {
        res.status(400).json({message: "Se produjo un error al intentar registrar el usuario,"})
        console.log(error)
    }
}

const deleteUser = async (req,res) =>{
    try {
        const {id} = req.params
        const usuario = await usuarioModel.findByIdAndDelete(id)
        res.status(200).json(usuario);
        res.status(200).json({message:"Usuario registrado correctamente" })
    } catch (error) {
        console.log(error)
    }

}

const loginUser = async (req,res) => {
    try {
        const {email,password} = req.body
        const usuario = await usuarioModel.findOne({email})

        if(!usuario){
            return res.status(400).json({message:"Usuario y/o contraseña incorrecto"})
        }

        const  comparePass= await bcrypt.compare(password,usuario.password)
        if(!comparePass){
            return res.status(400).json({message:"Usuario y/o contraseña incorrecto"})
        }

        const token = jwt.sign({
            id: usuario._id,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            admin: usuario.admin, 
        },
        process.env.SECRET_KEY,
        {
           expiresIn: 86400
        });
       
        res.header(token).json({token});
        
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"Error al iniciar sesion"})
        res.status(500).json({message:"Server error"})

    }
}

const updateUser =  async (req, res) =>{
    const {id} = req.params;
    const {nombre ,apellido,admin} = req.body;

    try {
        
    const usuario = await usuarioModel.findByIdAndUpdate(
        id,
        {nombre,apellido,admin},
        {new: true}   
    );
    res.json(usuario)
    } catch (error) {
        console.log() 
    }
}
export default {getUsers,registroUsuario, deleteUser, loginUser, updateUser };

 