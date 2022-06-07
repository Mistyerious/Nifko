import { NifkoInteractionCommandClient } from './InteractionCommandClient';
import Redis from 'ioredis';
import { NifkoPermissions } from '../util';
import { PermissionGroupEntity } from '../database';
export class PermissionManager {
	private client: NifkoInteractionCommandClient;
	private redis: Redis;
	constructor(client: NifkoInteractionCommandClient) {
		this.client = client;
		this.redis = client.redis;
	}

	async hasPermissions(
		userId: string,
		guildId: string,
		permissions: Array<NifkoPermissions>
	): Promise<boolean> {
		const permission = this._calculatePermissions(permissions);
		const perm = await PermissionGroupEntity.findOne({
			where: { guild: { guildId }, user: { userId } },
		});
		if (perm === null) return false;

		console.log(perm.permissions === permission);

		return perm.permissions === permission;
	}

	async setPermissions(
		userId: string,
		guildId: string,
		permissions: Array<NifkoPermissions>
	) {
		const permission = this._calculatePermissions(permissions);
		const perm = await PermissionGroupEntity.findOne({
			where: { guild: { guildId }, user: { userId } },
		});
		if (perm === null)
			throw new Error(
				'Could not find a permission group belonging to that guild/user'
			);

		perm.permissions = permission;
		await perm.save();
	}

	protected _calculatePermissions(
		permissions: Array<NifkoPermissions>
	): number {
		return permissions.reduce((a, b) => a + b, 0);
	}
}
