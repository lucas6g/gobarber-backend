import path from 'path';
import fs from 'fs';
import aws, { S3 } from 'aws-sdk';
import mime from 'mime';

import IStorageProvider from '../model/IStorageProvider';

class S3StorageProvider implements IStorageProvider {
	// client é porque é uma api cliente que faz o req para s3
	private client: S3;



	constructor() {

		this.client = new aws.S3({
			region: 'us-east-1',


		});
	}

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

		const fileContent = await fs.promises.readFile(tempFolder);

		const contentType = mime.getType(tempFolder);

		await this.client
			.putObject({
				Bucket: 'app-gobarber-s333',
				Key: fileName,
				ACL: 'public-read',
				Body: fileContent,
				ContentType: contentType,


			})
			.promise();

		await fs.promises.unlink(tempFolder);

		return fileName;
	}

	public async deleteFile(fileName: string): Promise<void> {
		await this.client
			.deleteObject({
				Bucket: 'app-gobarber-s333',
				Key: fileName,
			})
			.promise();
	}
}

export default S3StorageProvider;
