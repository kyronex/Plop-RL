import multer from "multer";

// Configuration de multer pour gérer les uploads de fichiers
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./uploads/"); // Répertoire où les fichiers seront enregistrés
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`); // Renommer le fichier
	},
});


const upload = multer({
	storage: storage,
	limits: { fileSize: 5000000 }, // Limite la taille des fichiers à 1 Mo
});

export default upload;
