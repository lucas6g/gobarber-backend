import path from 'path';
import fs from 'fs';

import IStorageProvider from '../model/IStorageProvider';

class FakeDiskStorageProvider implements IStorageProvider {
	public async saveFile(fileName: string): Promise<string> {
		const tempFolder = path.resolve(
			__dirname,
			'..',
			'..',
			'..',
			'..',
			'..',
			'temp',
			fileName,
		);

		const uploadsFolder = path.resolve(
			__dirname,
			'..',
			'..',
			'..',
			'..',
			'..',
			'temp',
			'uploads',
			fileName,
		);
		await fs.promises.rename(tempFolder, uploadsFolder);
		return fileName;
	}

	public async deleteFile(fileName: string): Promise<void> {
		const filePath = path.resolve(
			__dirname,
			'..',
			'..',
			'..',
			'..',
			'..',
			'temp',
			'uploads',
			fileName,
		);

		try {
			await fs.promises.stat(filePath);
		} catch (error) {
			return;
		}
		await fs.promises.unlink(filePath);
	}
}

export default FakeDiskStorageProvider;
