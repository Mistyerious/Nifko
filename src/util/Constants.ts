import { Permissions } from 'detritus-client/lib/constants';

export const ReadablePermissions = Object.freeze({
	[String(Permissions.ADD_REACTIONS)]: 'Add Reactions',
	[String(Permissions.ADMINISTRATOR)]: 'Administrator',
	[String(Permissions.ATTACH_FILES)]: 'Attach Files',
	[String(Permissions.BAN_MEMBERS)]: 'Ban Members',
	[String(Permissions.CHANGE_NICKNAME)]: 'Change Nickname',
	[String(Permissions.CHANGE_NICKNAMES)]: 'Change Nicknames',
	[String(Permissions.CONNECT)]: 'Connect',
	[String(Permissions.CREATE_INSTANT_INVITE)]: 'Create Instant Invite',
	[String(Permissions.DEAFEN_MEMBERS)]: 'Deafen Members',
	[String(Permissions.EMBED_LINKS)]: 'Embed Links',
	[String(Permissions.KICK_MEMBERS)]: 'Kick Members',
	[String(Permissions.MANAGE_CHANNELS)]: 'Manage Channels',
	[String(Permissions.MANAGE_EMOJIS)]: 'Manage Emojis',
	[String(Permissions.MANAGE_GUILD)]: 'Manage Guild',
	[String(Permissions.MANAGE_MESSAGES)]: 'Manage Messages',
	[String(Permissions.MANAGE_ROLES)]: 'Manage Roles',
	[String(Permissions.MANAGE_THREADS)]: 'Manage Threads',
	[String(Permissions.MANAGE_WEBHOOKS)]: 'Manage Webhooks',
	[String(Permissions.MENTION_EVERYONE)]: 'Mention Everyone',
	[String(Permissions.MOVE_MEMBERS)]: 'Move Members',
	[String(Permissions.MUTE_MEMBERS)]: 'Mute Members',
	[String(Permissions.NONE)]: 'None',
	[String(Permissions.PRIORITY_SPEAKER)]: 'Priority Speaker',
	[String(Permissions.READ_MESSAGE_HISTORY)]: 'Read Message History',
	[String(Permissions.REQUEST_TO_SPEAK)]: 'Request To Speak',
	[String(Permissions.SEND_MESSAGES)]: 'Send Messages',
	[String(Permissions.SEND_TTS_MESSAGES)]: 'Text-To-Speech',
	[String(Permissions.SPEAK)]: 'Speak',
	[String(Permissions.STREAM)]: 'Go Live',
	[String(Permissions.USE_APPLICATION_COMMANDS)]: 'Use Application Commands',
	[String(Permissions.USE_EXTERNAL_EMOJIS)]: 'Use External Emojis',
	[String(Permissions.USE_PRIVATE_THREADS)]: 'Use Private Threads',
	[String(Permissions.USE_PUBLIC_THREADS)]: 'Use Public Threads',
	[String(Permissions.USE_VAD)]: 'Voice Auto Detect',
	[String(Permissions.VIEW_AUDIT_LOG)]: 'View Audit Logs',
	[String(Permissions.VIEW_CHANNEL)]: 'View Channel',
	[String(Permissions.VIEW_GUILD_ANALYTICS)]: 'View Guild Analytics',
});

export enum NifkoPermissions {
	CAN_BAN_MEMBERS = 1 << 0,
	CAN_MUTE_MEMBERS = 1 << 1,
	CAN_KICK_MEMBERS = 1 << 2,
	CAN_MANAGE_PERMISSION_GROUPS = 1 << 3,
	VIEW_BAN_LIST = 1 << 4,
	VIEW_PERMISSIONS_OF_USERS = 1 << 5,
	CAN_MANAGE_SERVER = 1 << 6,
}

export const ReadableNifkoPermissions = Object.freeze({
	[String(NifkoPermissions.CAN_BAN_MEMBERS)]: 'Can Ban Members',
	[String(NifkoPermissions.CAN_MUTE_MEMBERS)]: 'Can Mute Members',
	[String(NifkoPermissions.CAN_KICK_MEMBERS)]: 'Can Kick Members',
	[String(NifkoPermissions.CAN_MANAGE_PERMISSION_GROUPS)]:
		'Can Manage Permission Groups',
	[String(NifkoPermissions.VIEW_BAN_LIST)]: 'View Ban List',
	[String(NifkoPermissions.VIEW_PERMISSIONS_OF_USERS)]:
		'View Permissions of Users',
	[String(NifkoPermissions.CAN_MANAGE_SERVER)]: 'Can Manage Server',
});

export enum NifkoColours {
	ERROR = 0xff0000,
	DEFAULT = 0x099ff,
	SUCCESS = 0x04ff00,
}

export const MAIN_GUILD = '957867801119449109';
export const ERROR_LOGS_CHANNEL = '972342210685206569';
