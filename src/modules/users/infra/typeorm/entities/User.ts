import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';

@Entity('users')
class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar')
	name: string;

	@Column('varchar')
	email: string;

	@Column('varchar')
	@Exclude()
	password: string;

	@Column('varchar')
	avatar: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@Expose({ name: 'avatar_url' })
	getAvatarUrl(): string | null {
		if (!this.avatar) {
			return null;
		}

		if (process.env.STORAGE_DRIVER === 'disk') {
			return `${process.env.APP_API_URL}/files/${this.avatar}`;
		}
		if (process.env.STORAGE_DRIVER === 's3') {
			return `https://app-gobarber-s333.s3.amazonaws.com/${this.avatar}`;
		}
	}

	// omit serve para não ter que passar uma propriedade
	// quando instanciar um objeto dessa classe no construtor
}

export default User;
