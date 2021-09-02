import { MigrationInterface, QueryRunner, Table } from 'typeorm';
// ultimo criado
export default class createTableUsers1605481243095
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		// faz
		await queryRunner.createTable(
			new Table({
				name: 'users',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()', // funcao que cria uuid no pg
					},
					{
						name: 'name',
						isNullable: false,
						type: 'varchar',
					},
					{
						name: 'email',
						type: 'varchar',
						isNullable: false,
						isUnique: true,
					},
					{
						name: 'password',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'created_at',
						type: 'timestamp',
						default: 'now()',
					},
					{
						name: 'updated_at',
						type: 'timestamp',
						default: 'now()',
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		// dezfaz
		await queryRunner.dropTable('users');
	}
}
