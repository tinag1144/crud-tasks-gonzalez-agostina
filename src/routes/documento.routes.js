import { Router } from "express";
import { createDocumento, getAllDocumentos } from "../controllers/documento.controllers.js";

const router = Router()

router.post("/nuevo-documento", createDocumento);
router.get("/documentos", getAllDocumentos);

export default router;