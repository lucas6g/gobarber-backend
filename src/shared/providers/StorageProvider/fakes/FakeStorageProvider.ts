import IStorageProvider from '../model/IStorageProvider';

class FakeDiskStorageProvider implements IStorageProvider {
	private storage: Array<string> = [];

	public async saveFile(fileName: string): Promise<string> {
		this.storage.push(fileName);
		return fileName;
	}

	public async deleteFile(fileName: string): Promise<void> {
		const indexOfFileName = this.storage.findIndex(fileInArray => {
			return fileName === fileInArray;
		});

		this.storage.splice(indexOfFileName, 1);
	}
}

export default FakeDiskStorageProvider;
