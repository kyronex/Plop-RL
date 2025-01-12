// server.js
import express from "express";
import cors from "cors";
import upload from "./cfg/multerCfg.js"; // Importer la configuration de multer
import Header from "./cfg/replayParser.js"; // Importer la configuration du Parser

import fs from "fs";

const app = express();
const PORT = process.env.PORT || 5000;

console.log(`Server is running on port ${PORT}`);

// Utiliser le middleware CORS
app.use(cors());

// Route test
app.get("/", (req, res) => {
	res.send("Hellos, World!");
});

// Route pour gérer les uploads de fichiers
app.post("/upload", upload.single("file"), (req, res) => {
	let reponse = null;

	if (!req.file) {
		return res.status(400).send("Fichier non uploaded.");
	}

	console.log(req.file.path);

	// Lire le fichier binaire
	fs.readFile(req.file.path, (err, data) => {
		if (err) {
			console.error("Error reading binary file:", err);
			reponse = { message: "Error reading binary file" };
			return;
		}

		let parsing = Header.parse(data);
		console.log("parsing");
		console.log(parsing);
		reponse = { message: "Fichier uploaded correctement.", data: parsing };

		res.json(reponse);

		fs.unlink(req.file.path, (err) => {
			if (err) {
				console.error("Erreur lors de la suppression du fichier :", err);
				return;
			}
			console.log("Fichier supprimé avec succès.");
		});
	});
});

// Démarrer le serveur
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
