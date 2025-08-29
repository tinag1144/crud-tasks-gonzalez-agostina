import { User } from "../models/users.models.js"
import { Documento } from "../models/documento_models.js";
import { validationResult } from "express-validator";


//CRUD completo 

//registrar número de documento 
export const createDocumento = async (req, res) => {
        const { author_id, document_number, issue_date, expiration_date } = req.body;
    
        try{
            const exist = await Documento.findOne({
                where: { document_number },

            });
             
            //validamos que el documento ya existe en la bd
            if (exist) 
                return res
            .status(400)
            .json({ message: "Ese documento ya está registrado"})
            res
            .status(201)

            const newDoc = await Documento.create({
                author_id,
                document_number,
                issue_date, 
                expiration_date,
            });
            res
            .status(201)
            .json({ message: "Se creó el documento correctamente: "}, newDoc )

        } catch (error) {
            res
            .status(500)
            .json({ message: "Error al insertar el documento", error })
            
        }
};


//traer todos los documentos 
export const getAllDocumentos = async (req, res) => {
     try {
        const docs = await Documento.findAll({
         include: {
            model: User,
            as: "users" } 
    });
    res
    .status(200)
    .json(docs);
  } catch (error) {
    res
    .status(500)
    .json({ msg: "Error al traer documentos", error });
  }
};

//traer un documento por su id
export const getDocumentById = async (req, res) => {
    try {
        const doc = await Documento.findByPk(req.params.id);
        if (!doc)
            return res
        .status(400)
        .json({ message: "No se encontró el documento con el id ingresado"});
        res
        .json(doc)
    } catch (error) {
        res
        .status(500)
        .json({ messsage: "Error al buscar el documento"});
    }
};

//actualizar el documento

export const updateDocument = async (req, res) => {
    const { document_number, issue_date, expiration_date } = req.body;

    try{
        const documento = await Documento.findByPk(req.params.id)
        
        await documento.update({
            document_number, 
            issue_date,
            expiration_date,
        });

        res
        .json(documento);
    } catch (error) {
        res
        .status(500)
        .json({message: "Error al actualizar los datos del documento"})
    }
};

//Eliminar documento

export const deleteDocument = async (req, res) => {
    try {
        const documento = await Documento.findByPk(req.params.id);
       
        await documento.destroy() 
        res
        .json({ message: "Se eliminó el documento correctamente" })
    } catch (error) {
        res
        .status(500)
        .json({ message: "Hubo un error al intentar borrar el documento", error })
        console.error(error.message)
    }
    
};