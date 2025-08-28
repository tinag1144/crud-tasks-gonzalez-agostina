import { Router } from "express";
import { 
    createDocumento, 
    getAllDocumentos, 
    deleteDocument, 
    updateDocument, 
    getDocumentById } from "../controllers/documento.controllers.js";

const router = Router()

router.post("/documento", createDocumento);
router.get("/documentos", getAllDocumentos);
router.delete("/documento/:id", deleteDocument);
router.delete("/documento/:id", getDocumentById);
router.put("/documento", updateDocument);

export default router;