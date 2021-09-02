import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class createTableAppointments1605481361516
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		// faz
		await queryRunner.createTable(
			new Table({
				name: 'appointments',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()',
					},
					{
						name: 'provider_id',
						type: 'uuid',
						isNullable: true,
					},
					{
						name: 'date',
						type: 'timestamp with time zone',
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
				foreignKeys: [
					{
						name: 'appointmentProvider', // apilido para o relacionamento
						columnNames: ['provider_id'], // coluna que recebe vai receber a chave estrangeira
						referencedTableName: 'users', // nome da tabela que é referenciada
						referencedColumnNames: ['id'], // coluna da outra tabela que é chave primaria
						onUpdate: 'SET NULL',
						onDelete: 'CASCADE',
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		// dezfaz
		await queryRunner.dropTable('appointments');
	}
}
