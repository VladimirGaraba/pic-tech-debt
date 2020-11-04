/*
 * Note Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const ADD_NOTE_ATTACHMENTS = 'pic/App/ADD_NOTE_ATTACHMENT';
export const ADD_TEMPLATE_NOTE_ATTACHMENTS = 'pic/App/ADD_TEMPLATE_NOTE_ATTACHMENT';
export const REMOVE_NOTE_ATTACHMENT = 'pic/App/REMOVE_NOTE_ATTACHMENT';
export const REMOVE_TEMPLATE_NOTE_ATTACHMENT = 'pic/App/REMOVE_TEMPLATE_NOTE_ATTACHMENT';
export const SAVE_NOTE = 'pic/App/SAVE_NOTE';
export const SAVE_TEMPLATE_NOTE = 'pic/App/SAVE_TEMPLATE_NOTE';
export const UPDATE_NOTE_CONTENT = 'pic/App/UPDATE_NOTE_CONTENT';
export const UPDATE_NOTE_CONTEXT = 'pic/App/UPDATE_NOTE_CONTEXT';
export const UPDATE_NOTE_SUBCONTEXT = 'pic/App/UPDATE_NOTE_SUBCONTEXT';
export const UPDATE_NOTE_TITLE = 'pic/App/UPDATE_NOTE_TITLE';
export const UPDATE_TEMPLATE_NOTE_CONTENT = 'pic/App/UPDATE_TEMPLATE_NOTE_CONTENT';
export const UPDATE_TEMPLATE_NOTE_CONTEXT = 'pic/App/UPDATE_TEMPLATE_NOTE_CONTEXT';
export const UPDATE_TEMPLATE_NOTE_SUBCONTEXT = 'pic/App/UPDATE_TEMPLATE_NOTE_SUBCONTEXT';
export const UPDATE_TEMPLATE_NOTE_TITLE = 'pic/App/UPDATE_TEMPLATE_NOTE_TITLE';
