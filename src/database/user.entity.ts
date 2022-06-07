import {
	BaseEntity,
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ name: 'userId', type: 'text', nullable: false })
	userId!: string;

	@Column({ name: 'karma', type: 'bigint', default: 0 })
	karma!: number;
}
