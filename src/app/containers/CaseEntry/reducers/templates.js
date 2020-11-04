/* eslint no-underscore-dangle: ["error", { "allow": ["_id", "_rev", "_attachments"] }]*/

import { isSiteConfig } from 'utils/helpers';

import {
  BATCH_INSERT_DOCUMENT,
  DISPLAY_TEMPLATE,
  DELETE_DOCUMENT,
  INSERT_DOCUMENT,
  UPDATE_DOCUMENT,
} from 'containers/App/constants';

import {
  DELETE_TEMPLATE,
  SAVE_TEMPLATE,
} from 'containers/CaseEntry/constants';

const templatesReducer = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    case BATCH_INSERT_DOCUMENT:
      action.documents.map((document) => { // eslint-disable-line array-callback-return
        if (isSiteConfig(document)) {
          newState = document.templates;
        }
      });
      return newState;
    case DELETE_DOCUMENT:
      return {};
    case DELETE_TEMPLATE:
      delete newState[action.macro];
      return newState;
    case DISPLAY_TEMPLATE:
      return state;
    case INSERT_DOCUMENT:
    case UPDATE_DOCUMENT:
      if (isSiteConfig(action.document)) {
        newState = action.document.templates;
      }
      return newState;
    case SAVE_TEMPLATE:
      newState[action.macro] = action.template;
      return newState;
    default:
      return state;
  }
};
export default templatesReducer;
