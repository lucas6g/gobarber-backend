import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	JoinColumn,
} from 'typeorm';
import User from '../../../../users/infra/typeorm/entities/User';

@Entity('appointments')
class Appointment {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('timestamp with time zone')
	date: Date;

	// coluna do relacionamento
	@Column('uuid')
	provider_id: string;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'provider_id' }) // referencia para a coluna de onde o relacionamento acontece
	provider: User;

	// coluna do relacionamento
	@Column('uuid')
	user_id: string;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	user: User;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	// omit serve para não ter que passar uma propriedade
	// quando instanciar um objeto dessa classe no construtor
}

export default Appointment;
