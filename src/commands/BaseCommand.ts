import { Interaction } from 'detritus-client';
import { ApplicationCommandOptionTypes, MessageFlags } from 'detritus-client/lib/constants';
import { Embed, Markup } from 'detritus-client/lib/utils';
import {ERROR_LOGS_CHANNEL, NifkoColours, ReadablePermissions} from '../util';
import { Response } from 'detritus-rest';

export interface CommandMetaData {
	description?: string;
	examples?: string[];
	nsfw?: boolean;
	usage?: string;
	adminOnly?: boolean;
	type?: string;
}

export class BaseCommand<
	ParsedArgsFinished = Interaction.ParsedArgs,
	> extends Interaction.InteractionCommand<ParsedArgsFinished> {
	constructor(options: Interaction.InteractionCommandOptions = {}) {
		super(
			Object.assign(
				{
					permissionsIgnoreClientOwner: true,
					ratelimits: [{ duration: 5000, limit: 5, type: 'guild' }],
				},
				options,
			),
		);
	}

	onDmBlocked(payload: Interaction.InteractionContext) {
		const command = Markup.codestring(payload.name);
		return payload.editOrRespond({
			embed: {
				color: NifkoColours.ERROR,
				description: `You cannot use ${command} in DMs!`,
			},
			flags: MessageFlags.EPHEMERAL,
		});
	}

	onPermissionsFailClient(payload: Interaction.InteractionContext, failed: Array<bigint>) {
		const permissions: Array<string> = [];
		for (let permission of failed) {
			const key = String(permission);
			if (key in ReadablePermissions) {
				permissions.push(`\`${ReadablePermissions[key]}\``);
			} else {
				permissions.push(`\`Unknown permission ${permission}\``);
			}
		}

		const command = Markup.codestring(payload.name);
		return payload.editOrRespond({
			embed: {
				title: '⚠ Permissions Failure',
				color: NifkoColours.ERROR,
				description: `I\'m missing the following permissions for ${command}:\n${Markup.codeblock(
					permissions.join('\n'),
				)}`,
			},
		});
	}

	onPermissionsFail(payload: Interaction.InteractionContext, failed: Array<bigint>) {
		const permissions: Array<string> = [];
		for (let permission of failed) {
			const key = String(permission);
			if (key in ReadablePermissions) {
				permissions.push(`\`${ReadablePermissions[key]}\``);
			} else {
				permissions.push(`\`Unknown permission: ${permission}\``);
			}
		}

		const command = Markup.codestring(payload.name);
		return payload.editOrRespond({
			embed: {
				title: '⚠ Permissions Failure',
				color: NifkoColours.ERROR,
				description: `You\'re missing the following permissions for ${command}:\n${Markup.codeblock(
					permissions.join('\n'),
				)}`,
			},
		});
	}

	async onRunError(payload: Interaction.InteractionContext, args: ParsedArgsFinished, error: any) {
		console.log(error);
		const embed = new Embed();
		embed.setAuthor(
			payload.user.toString(),
			payload.user.avatarUrlFormat(null, { size: 1024 }),
			payload.user.jumpLink,
		);
		embed.setTitle('⚠ Command Failure');
		embed.setColor(NifkoColours.ERROR);

		let description: Array<string> = [];

		if (error.response) {
			const response: Response = error.response;
			try {
				const errJSON = response.json() as any;

				description.push(error.message || error.stack);
				if ('errors' in errJSON) {
					for (let key in errJSON.errors) {
						const value = errJSON.errors[key];
						let message: string;
						if (typeof value == 'object') {
							message = JSON.stringify(value);
						} else {
							message = String(value);
						}
						description.push(`**${key}**: ${message}`);
					}
				}

				if (
					response.statusCode == 429 &&
					payload.rest.raw.restClient.baseUrl instanceof URL &&
					payload.rest.raw.restClient.baseUrl.host == response.request.parsedUrl.host
				) {
					const headers: Record<string, string> = {};
					for (let [header, value] of response.headers) {
						if (header.startsWith('x-ratelimit')) {
							headers[header] = value;
						}
					}
					embed.addField(
						'Ratelimit info',
						['```json', JSON.stringify({ body: errJSON, headers }), '```'].join('\n'),
					);
				}

				await payload.editOrRespond(`https://http.cat/${response.statusCode}`).catch(() => {});
			} catch (e) {
				description.push(`HTTP Exception: ${response.statusCode}`);
				const contentType = response.headers.get('content-type') || '';

				description.push('Unknown Error Data');
				if (contentType) {
					description.push(`**Mimetype**: ${contentType}`);
				}
			}
		} else {
			description.push(error.message || error.stack);
		}
		description.push('');
		description.push(Markup.url('Source', (await payload.fetchResponse()).jumpLink));
		embed.setDescription(description.join('\n'));

		if (error.metadata) {
			embed.addField('Metadata', ['```json', JSON.stringify(error.metadata), '```'].join('\n'));
		}

		return payload.client.channels.cache.get(ERROR_LOGS_CHANNEL)?.createMessage({
			embed,
		});
	}
}

export class BaseCommandOption<
	ParsedArgsFinished = Interaction.ParsedArgs,
	> extends Interaction.InteractionCommandOption<ParsedArgsFinished> {
	type = ApplicationCommandOptionTypes.SUB_COMMAND;
}

export class BaseCommandOptionGroup<
	ParsedArgsFinished = Interaction.ParsedArgs,
	> extends Interaction.InteractionCommandOption<ParsedArgsFinished> {
	type = ApplicationCommandOptionTypes.SUB_COMMAND_GROUP;
}