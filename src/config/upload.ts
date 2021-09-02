import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

// config de upload de imagem

export default {
	storage: multer.diskStorage({
		// destino do meu arquivo na minha app depois desse pasta vai por s3
		destination: path.resolve(__dirname, '..', '..', 'temp'),
		filename(req, file, callback) {
			const filehash = crypto.randomBytes(10).toString('hex');
			const filename = `${filehash}-${file.originalname}`;

			return callback(null, filename);
		},
	}),
};
