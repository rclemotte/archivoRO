import { Router } from "express";
import { methods as archivoROController } from "./../controller/archivoRO.controller";

const router = Router();

router.get("/", archivoROController.getArchivo);
router.get("/des", archivoROController.getArchivoDes);
router.get("/:id", archivoROController.getArchivoUser);
router.get("/des/:id", archivoROController.getArchivoUserDes);

export default router;
