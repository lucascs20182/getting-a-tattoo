/**
 * Migrations are abstractions that run queries using JS
 * What Git do the migrations do to databases
 *
 * Ex.: you can run
 * yarn typeorm migration:run //run migrations and create table, alter etc.
 * yarn typeorm migration:revert //revert last migration
 *
 * P.S.: if a migration already exists and you run the 1st
 * command it will not know there was update and
 * create another table; actually it'll check
 * that table exists yet and don't upgrade nothing.
 *
 * So you have to create a new migration in each update.
 */

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAppointments1600891848806
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
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
						name: 'provider',
						type: 'varchar',
					},
					{
						name: 'date',
						type: 'timestamp with time zone', // It saves time zone beyond time
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
		await queryRunner.dropTable('appointments');
	}
}
