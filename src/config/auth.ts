export default {
	jwt: {
		secretKey: process.env.APP_SECRET || 'secret-teste',
		expiresIn: '7d',
	},
};
