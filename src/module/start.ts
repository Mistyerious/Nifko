import { Configuration } from '@sach1/dahlia';
import { ClusterClient, InteractionCommandClient } from 'detritus-client';
import { NifkoInteractionCommandClient } from '../structures/InteractionCommandClient';
import { DataSource } from 'typeorm';
import { GuildEntity, PermissionGroupEntity, UserEntity } from '../database';
import path from 'path';
import { GatewayIntents } from 'detritus-client-socket/lib/constants';
import { ActivityTypes } from 'detritus-client/lib/constants';
import * as fs from 'fs';

interface EventImport {
	default: {
		name: 'string';
		execute(context: any, attachment: InteractionCommandClient): void;
	};
}

export async function start() {
	const config = new Configuration('config.yml');
	const cluster = new ClusterClient(config.get<string>('bot.token')!, {
		gateway: {
			intents: [GatewayIntents.GUILDS],
			presence: {
				activity: {
					type: ActivityTypes.WATCHING,
					name: 'You!',
				},
			},
		},
	});
	const nifkoInteractionCommandClient = new NifkoInteractionCommandClient(
		cluster,
		config
	);
	try {
		await cluster.run();
		const dataSource = new DataSource({
			type: 'postgres',
			url: config.get<string>('db.url'),
			entities: [UserEntity, GuildEntity, PermissionGroupEntity],
			synchronize: true,
		});

		{
			await nifkoInteractionCommandClient.run();
			const clientEvents = fs
				.readdirSync(path.resolve(__dirname, '..', 'events'), {
					withFileTypes: true,
				})
				.filter(
					(file) =>
						['js', 'ts'].some((e) => file.name.endsWith(e)) &&
						!file.name.endsWith('.d.ts')
				);

			for (const file of clientEvents) {
				const ret: EventImport = await import(
					path.resolve(__dirname, '..', 'events', file.name)
				);

				cluster.on(ret.default.name, (context) =>
					ret.default.execute(context, nifkoInteractionCommandClient)
				);
				nifkoInteractionCommandClient.logger.info(
					`Loaded event ${ret.default.name} to NifkoInteractionCommandClient`
				);
			}
			await dataSource.initialize();
		}
	} catch (e) {
		console.log(e);
	}
}
