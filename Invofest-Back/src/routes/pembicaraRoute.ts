import express from "express";
import { createPembicara, deletePembicaraById, getPembicara, showPembicaraById, updatePembicaraById } from "../controllers/pembicaraController";

const router = express.Router();

router.get("/", getPembicara);
router.post("/", createPembicara);
router.get("/:id", showPembicaraById);
router.put("/:id", updatePembicaraById);
router.delete("/:id", deletePembicaraById);

export default router;