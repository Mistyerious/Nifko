import {
	ClusterClient,
	InteractionCommandClient,
	InteractionCommandClientOptions,
} from 'detritus-client';
import { Configuration } from '@sach1/dahlia';
import { Logger } from '@sach1/hydrangea';
import Redis from 'ioredis';
import { PermissionManager } from './PermissionManager';

declare module 'detritus-client/lib/interactioncommandclient' {
	export interface InteractionCommandClient {
		config: Configuration;
		logger: Logger;
		redis: Redis;
		permissionManager: PermissionManager;
	}
}

export class NifkoInteractionCommandClient extends InteractionCommandClient {
	public config: Configuration;
	public logger: Logger = new Logger({
		namespace: 'Nifko',
	});
	public redis: Redis;
	public permissionManager: PermissionManager;
	constructor(
		token: ClusterClient,
		config: Configuration,
		options?: InteractionCommandClientOptions
	) {
		super(token, options);
		this.config = config;

		this.redis = new Redis({
			port: this.config.get<number>('redis.port'),
			host: this.config.get<string>('redis.host'),
			password: this.config.get<string>('redis.password'),
		});

		this.permissionManager = new PermissionManager(this);
	}
}
