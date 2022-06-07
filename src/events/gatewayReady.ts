import { GatewayClientEvents, InteractionCommandClient } from 'detritus-client';
import { ClientEvents } from 'detritus-client/lib/constants';

export default {
	name: ClientEvents.GATEWAY_READY,
	async execute(
		context: GatewayClientEvents.GatewayReady,
		client: InteractionCommandClient
	) {
		let err = false;

		await client
			.addMultipleIn('commands/slash', { subdirectories: true })
			.catch((e) => {
				client.logger.error(e);
				err = true;
			});

		await client.checkAndUploadCommands().catch((e) => {
			client.logger.error(e);
			err = true;
		});

		if (err) client.logger.info('Error loading commands.');
		else
			client.logger.info(
				`Successfully loaded ${client.commands.size} commands`
			);

		client.logger.info(`Client is ready!`);
	},
};
