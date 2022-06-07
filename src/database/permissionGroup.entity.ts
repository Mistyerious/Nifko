import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn,
	JoinColumn,
} from 'typeorm';
import { GuildEntity } from './guild.entity';
import { NifkoPermissions } from '../util';
import { UserEntity } from './user.entity';

@Entity('permission_groups')
export class PermissionGroupEntity extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ name: 'groupName', type: 'varchar', length: 12 })
	groupName!: string;

	@Column({ name: 'createdAt', type: 'bigint', default: Date.now() })
	createdAt!: number;

	@Column({ name: 'permissions', type: 'bigint' })
	permissions!: NifkoPermissions;

	@OneToOne(() => UserEntity)
	@JoinColumn()
	user!: UserEntity;

	@ManyToOne(() => GuildEntity, (guild) => guild.permissionGroups)
	guild!: GuildEntity;
}
