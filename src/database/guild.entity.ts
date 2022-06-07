import {
	BaseEntity,
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { PermissionGroupEntity } from './permissionGroup.entity';

@Entity('guilds')
export class GuildEntity extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ name: 'guildId', type: 'text', nullable: false })
	guildId!: string;

	@Column({ name: 'addedAt', type: 'bigint', default: Date.now() })
	addedAt!: number;

	@OneToMany(
		() => PermissionGroupEntity,
		(permissionGroup) => permissionGroup.guild
	)
	permissionGroups!: Array<PermissionGroupEntity>;
}
