import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class createTableUserTokens1609344304672
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		// faz
		await queryRunner.createTable(
			new Table({
				name: 'user_tokens',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()',
					},
					{
						name: 'user_id',
						type: 'uuid',
						isNullable: false,
					},
					{
						name: 'token',
						type: 'uuid',
						isNullable: false,
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()',
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
				foreignKeys: [
					{
						name: 'user_tokens', // apilido para o relacionamento
						columnNames: ['user_id'], // coluna que recebe vai receber a chave estrangeira
						referencedTableName: 'users', // nome da tabela que é referenciada
						referencedColumnNames: ['id'], // coluna da outra tabela que é chave primaria
						onUpdate: 'CASCADE',
						onDelete: 'CASCADE',
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		// dezfaz
		await queryRunner.dropTable('user_tokens');
	}
}
