import express from 'express';
// erros dentro de funçoes assincronas express precisa disso exatamente depois do express

// todos os arquivos tem acesso as variaveis ambiemte
import 'dotenv/config';

import 'express-async-errors';
import path from 'path';
import cors from 'cors';
import { errors } from 'celebrate';
import rateLimiter from './middlewares/rateLimiter';
import handleErrors from './middlewares/handleErrors';

// arquivo de conexao com o banco
import '../database';

import routes from './routes';

const app = express();
app.use(rateLimiter);
app.use(cors());
app.use(express.json());
app.use(routes);

// tratamento de erros do celebrate
app.use(errors());

// medeware de tratamento de erros
// para não pressizar colocar try cath em todas as rotas
app.use(handleErrors);

const uploadsDirectory = path.resolve(
	__dirname,
	'..',
	'..',
	'..',
	'..',
	'temp',
);
app.use('/files', express.static(uploadsDirectory));

app.listen(3333, () => {
	console.log('servidor rodando na porta 3333');
});
