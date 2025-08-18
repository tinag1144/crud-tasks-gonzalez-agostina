import { User } from "../models/users.models.js"
import { Documento } from "../models/documento.models.js";

export const createDocumento = async (req, res) => {
        const { user_id, document_number, issue_date, expiration_date } = req.body;
        if (!user_id || !document_number || !issue_date || !expiration_date) 
            return res.status(400).json({ message: "faltan campos obligatorios"});
        
        try{
            const user = await User.findByPk(user_id);
            if (!user_id) 
                return res.status(400).json({ message: "El usuario que ingresó no se pudo encontrar" })

            const doc = Documento.create({
                user_id,
                document_number,
                issue_date,
                expiration_date
            });
            res.status(201).json(doc);
        } catch (error) {
            res.status(500).json({ message: "Error al insertar el documento", error });
        }
};

export const getAllDocumentos = async (req, res) => {
     try {
    const docs = await Documento.findAll({
         include: {
            model: User,
            as: "user" } 
    });
    res.status(200).json(docs);
  } catch (error) {
    res.status(500).json({ msg: "Error al traer documentos", error });
  }
}