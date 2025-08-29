import {  validator } from "../middlewares/validator.js";
import { Router } from "express";
import { 
    createDocumento, 
    getAllDocumentos, 
    deleteDocument, 
    updateDocument, 
    getDocumentById
 } from "../controllers/documento.controllers.js";

import { 
    createDocumentoValidation, 
    deleteDocumentoValidation, 
    getDocumentoByIdValidation, 
    updateDocumentoValidation 
} from "../middlewares/validations/documento.validations.js";

const router = Router()

router.post("/documento", createDocumentoValidation, validator, createDocumento);
router.get("/documentos", getAllDocumentos);
router.delete("/documento/:id", deleteDocumentoValidation, validator, deleteDocument);
router.get("/documento/:id", getDocumentoByIdValidation, validator, getDocumentById);
router.put("/documento", updateDocumentoValidation, validator, updateDocument);

export default router;