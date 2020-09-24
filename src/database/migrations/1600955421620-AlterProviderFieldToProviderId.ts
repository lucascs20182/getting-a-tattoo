import {
	MigrationInterface,
	QueryRunner,
	TableColumn,
	TableForeignKey,
} from 'typeorm';

export default class AlterProviderFieldToProviderId1600955421620
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('appointments', 'provider');

		await queryRunner.addColumn(
			'appointments',
			new TableColumn({
				name: 'provider_id',
				type: 'uuid',
				isNullable: true,
			}),
		);

		await queryRunner.createForeignKey(
			'appointments',
			new TableForeignKey({
				name: 'AppointmentProvider',
				columnNames: ['provider_id'],
				referencedColumnNames: ['id'],
				referencedTableName: 'users',
				onDelete: 'SET NULL',
				onUpdate: 'CASCADE', // if users had IDs modified (wtf) it should reflect in their relationships
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		// Reversals should be coding inversely the way that were created

		await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');

		await queryRunner.dropColumn('appointments', 'provider_id');

		await queryRunner.addColumn(
			'appointments',
			new TableColumn({
				name: 'provider',
				type: 'varchar',
			}),
		);
	}
}
