import { BaseCommandOption } from '../../BaseCommand';
import { InteractionContext } from 'detritus-client/lib/interaction';

export class ViewBanList extends BaseCommandOption {
	name = 'viewbanlist';
	description = 'Allows you to view the ban list for the current server';
	constructor() {
		super({});
	}

	async run(context: InteractionContext) {
		context.editOrRespond({
			content: 'Hello World!',
		});
	}
}
