import { BaseCommand } from '../../BaseCommand';
import { MAIN_GUILD, NifkoColours, NifkoPermissions } from '../../../util';
import { InteractionContext } from 'detritus-client/lib/interaction';
import { MessageFlags } from 'detritus-client/lib/constants';
import { ViewBanList } from './';

export default class ServerOwnerGroup extends BaseCommand {
	name = 'owner';
	description = '.';
	constructor() {
		super({
			guildIds: [MAIN_GUILD],
			options: [new ViewBanList()],
		});
	}

	// async onBeforeRun(context: InteractionContext) {
	// 	console.log(context.userId, context.guildId);
	// 	return (
	// 		context.userId !== context.guild?.ownerId ||
	// 		(await context.interactionCommandClient.permissionManager.hasPermissions(
	// 			context.userId,
	// 			context.guildId!,
	// 			[NifkoPermissions.CAN_MANAGE_SERVER]
	// 		))
	// 	);
	// }
	//
	// async onCancelRun(context: InteractionContext) {
	// 	return await context.editOrRespond({
	// 		embed: {
	// 			color: NifkoColours.ERROR,
	// 			description:
	// 				'You must be a server owner or be in a permission group that has the `CAN_MANAGE_SERVER` permission',
	// 		},
	// 		flags: MessageFlags.EPHEMERAL,
	// 	});
	// }
}
