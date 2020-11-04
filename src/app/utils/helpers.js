import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import flatten from 'flat';
import merge from 'deepmerge';
import moment from 'moment/moment';
import { randomBytes } from 'crypto';

import _compact from 'lodash/compact';
import _difference from 'lodash/difference';
import _filter from 'lodash/filter';
import _find from 'lodash/find';
import _findIndex from 'lodash/findIndex';
import _groupBy from 'lodash/groupBy';
import _isArray from 'lodash/isArray';
import _isEmpty from 'lodash/isEmpty';
import _isFunction from 'lodash/isFunction';
import _isNaN from 'lodash/isNaN';
import _isNil from 'lodash/isNil';
import _isUndefined from 'lodash/isUndefined';
import _map from 'lodash/map';
import _omit from 'lodash/omit';
import _omitBy from 'lodash/omitBy';
import _orderBy from 'lodash/orderBy';
import _partition from 'lodash/partition';
import _pickBy from 'lodash/pickBy';
import _startCase from 'lodash/startCase';
import _union from 'lodash/union';
import _uniq from 'lodash/uniq';

import PouchDB from 'pouchdb';
import PouchdbFind from 'pouchdb-find';

import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

import { Menu, MenuItem } from 'react-bootstrap-typeahead';

import { getNoteContexts, getToxicologySources } from 'utils/options';

import { EDITTEMPLATE_UIMODE } from 'containers/App/constants';

import agentMessages from 'components/AgentView/messages';

PouchDB.plugin(PouchdbFind);

export const Fieldset = styled.fieldset`
  border: none;
`;

const MenuDivider = () => <li className="divider dropdown-divider" role="separator" />;
const MenuHeader = (props) => <li {...props} className="dropdown-header" />;

const generateUniqueFilename = (name, list) => {
  let newName;
  if (list.indexOf(name) !== -1) {
    const parts = name.split('.');
    const found = parts[parts.length - 2].match(/\((\d+)\)$/);
    if (found) {
      parts[parts.length - 2] = parts[parts.length - 2].replace(/\(\d+\)$/, `(${parseInt(found[1], 10) + 1})`);
    } else {
      parts[parts.length - 2] = `${parts[parts.length - 2]} (1)`;
    }
    newName = parts.join('.');
    return generateUniqueFilename(newName, list);
  }
  return name;
};

const filterHistoryDefaults = (object) => { // eslint-disable-line no-unused-vars
  let retval = object;
  if (
      _isEmpty(retval['features.descriptors'])
      && _isEmpty(retval['features.notes'])
      && _isEmpty(retval['features.pastDescriptors'])
      && retval['features.outcome'] === 'no impact'
      && retval['features.when'] === 'at'
  ) {
    retval = _omit(retval, ['features.descriptors', 'features.notes', 'features.pastDescriptors', 'features.outcome', 'features.when']);
  }
  return retval;
};

/* eslint-disable no-param-reassign */
const mergeArrayNested = (destinationArray, sourceArray) => {
  if (_isArray(destinationArray[1]) || _isArray(sourceArray[1])) {
    if (!_isArray(destinationArray[1])) {
      destinationArray[1] = sourceArray[1];
    } else if (!_isArray(sourceArray[1])) {
      destinationArray[1] = [];
    } else {
      destinationArray[1] = _union(destinationArray[1], sourceArray[1]);
    }
  } else {
    destinationArray[1] = sourceArray[1];
  }
  return destinationArray;
};
/* eslint-enable no-param-reassign */

export function FieldGroup({ id, label, help, groupStyle, ...props }) {
  return (
    <FormGroup controlId={id} style={groupStyle}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

FieldGroup.propTypes = {
  id: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  help: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  groupStyle: PropTypes.object,
};

export function FieldSelectGroup({ id, label, options, placeholder, noblank = false, ...props }) {
  let firstOption = null;
  if (!noblank) {
    firstOption = placeholder ? <option value="">{placeholder}</option> : <option></option>;
  }
  return (
    <FormGroup controlId={id}>
      {label ? <ControlLabel>{label}</ControlLabel> : null}
      <FormControl componentClass="select" {...props}>
        {firstOption}
        {options.map((option, i) => {
          if (option.group) {
            return <optgroup key={i} label={option.group}>{option.options.map((o, j) => <option key={j} value={o.value ? o.value : o.label}>{o.label}</option>)}</optgroup>;
          }
          if (!option.attrs) {
            option.attrs = {}; // eslint-disable-line no-param-reassign
          }
          return (<option
            key={i}
            value={option.value ? option.value : option.label}
            {...option.attrs}
          >
            {option.label}
          </option>);
        })}
      </FormControl>
    </FormGroup>
  );
}

FieldSelectGroup.propTypes = {
  id: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  options: PropTypes.array,
  placeholder: PropTypes.string,
  noblank: PropTypes.bool,
};

export function ReadOnlyField({ id, label, value }) {
  return (
    <FormGroup controlId={id}>
      {label ? <ControlLabel>{label}</ControlLabel> : null}
      <span style={{ marginLeft: '1rem' }}>{value}</span>
    </FormGroup>
  );
}

ReadOnlyField.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
};

export function ageFieldBlurHandler(e, cb, old, units, group, years) {
  if (e.target.value.length > 1 && (e.target.value.match(/^0+/) || e.target.value.match(/\.$/))) {
    cb(old, Number(e.target.value), units, units, group, years);
  }
}

export function ageFieldChangeHandler(e, cb, old, units, group, years, category) { // eslint-disable-line no-unused-vars
  if (e.target.value !== '' && e.target.value.match(/\./) && e.target.value.toString().split('.')[1].length > 1) {
    return false;
  }
  return cb(old, e.target.value, units, units, group, years);
}

export function buildAttachments(currentRecordId, notes) {
  const db = new PouchDB('PicApp');

  const diff = _difference(_compact([].concat.apply([], _map(notes, 'attachments'))), Object.keys(this.state.attachments)); // eslint-disable-line prefer-spread

  if (diff.length > 0) {
    db.get(currentRecordId)
        .then(() => {
          diff.map((filename) => {
            if (!this.state.attachments[filename]) {
              db.getAttachment(currentRecordId, filename)
                  .then((blob) => {
                    const { attachments } = this.state;
                    attachments[filename] = URL.createObjectURL(blob);
                    this.setState({ attachments });
                  });
            }
            return filename;
          });
        });
  }
}

export function buildSource(criteria = { filter: null, naturalId: '', name: '', sex: '', postcode: '', time: '', centreName: '', callerLocation: '', callerOrganisation: '' }, cases, siteId) {
  const filtered = _orderBy(_filter(cases, (o) => {
    if (!('siteCreated' in o)) {
      if (siteId !== 1) {
        return false;
      }
    } else if (o.siteCreated !== siteId) {
      if ('careTeam' in o) {
        if (!(~o.careTeam.indexOf(siteId))) { // eslint-disable-line no-bitwise
          return false;
        }
      } else {
        return false;
      }
    }
    switch (criteria.filter) {
      case 'all':
      case null:
        if (o.status === 'deleted') {
          return false;
        }
        break;
      default:
        if (o.status !== criteria.filter) {
          return false;
        }
        break;
    }

    if (!_isEmpty(criteria.naturalId) && !new RegExp(criteria.naturalId, 'i').test(o.naturalId)) {
      return false;
    }

    if (!_isEmpty(criteria.name) && !new RegExp(criteria.name, 'i').test(o.patient.name)) {
      return false;
    }

    if (!_isEmpty(criteria.sex) && o.patient.gender !== criteria.sex) {
      return false;
    }

    let simplePostcodeCheck = false;
    if (!_isEmpty(criteria.postcode) && o.patient.postcode === criteria.postcode) {
      simplePostcodeCheck = true;
    }

    if (!_isEmpty(criteria.centreName)
        && !_find(o.agents, (a) => _find(a.centreAgents, (c) => new RegExp(criteria.centreName, 'i').test(c.name)))) {
      return false;
    }

    if (!_isEmpty(criteria.time) || !_isEmpty(criteria.callerLocation) || !_isEmpty(criteria.callerOrganisation) || (!_isEmpty(criteria.postcode) && simplePostcodeCheck !== true)) {
      if (!_find(o.communications, (c) => {
        if ((!_isEmpty(criteria.postcode) && simplePostcodeCheck !== true) && (!c.interlocutor || !c.interlocutor.organisation || c.interlocutor.organisation.postcode !== criteria.postcode)) {
          return false;
        }

        if (!_isEmpty(criteria.callerLocation) && (!c.interlocutor || !c.interlocutor.organisation || c.interlocutor.organisation.location !== criteria.callerLocation)) {
          return false;
        }

        let time;
        switch (criteria.time) {
          case 'Last Day':
            time = moment().subtract(1, 'day');
            break;
          case 'Last Week':
            time = moment().subtract(1, 'week');
            break;
          case 'Last Month':
            time = moment().subtract(1, 'month');
            break;
          default:
            time = '';
        }
        if (!_isEmpty(time) && (!c.timestamp || moment(c.timestamp).isBefore(time))) {
          return false;
        }

        if (!_isEmpty(criteria.callerOrganisation) && (!c.interlocutor || !c.interlocutor.organisation || !new RegExp(criteria.callerOrganisation, 'i').test(c.interlocutor.organisation.name))) {
          return false;
        }

        return true;
      })) {
        return false;
      }
    }

    return true;
  }), ['timestamp'], ['desc']);

  const results = [];
  filtered.map((currentCase) => {
    const id = currentCase._id; // eslint-disable-line no-underscore-dangle

    let category;
    if (currentCase.patient.category === 'human' && currentCase.patient.ageGroup) {
      category = currentCase.patient.ageGroup;
    } else {
      category = currentCase.patient.category;
    }

    results.push({
      id,
      category,
      name: currentCase.patient.name,
      topic: currentCase.topic,
      type: currentCase.type,
      status: currentCase.status,
      incidentId: currentCase.incidentId,
      timestamp: currentCase.timestamp,
    });
    return currentCase;
  });

  return results;
}

export function buildUseTypeTree(tree, selected) {
  return _traverseChildren(tree, (el) => {
    if (_findIndex(selected, (s) => s === el.value) > -1) {
      el.checked = true; // eslint-disable-line
    }
    return el;
  });
}

export function checkForUpdates() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then((registration) => {
      registration.update();
    });
  }
}

export function createFilteredReducer(reducerFunction, reducerPredicate) {
  return (state, action) => {
    const isInitializationCall = state === undefined;
    const shouldRunWrappedReducer = reducerPredicate(action) || isInitializationCall;
    return shouldRunWrappedReducer ? reducerFunction(state, action) : state;
  };
}

export function convertWeightToKg(weight, units) {
  switch (units) {
    case 'gm':
      return parseFloat(weight) / 1000;
    case 'oz':
      return 0.0283495 * parseFloat(weight);
    case 'lb':
      return 0.4536 * parseFloat(weight);
    case 'kg':
    default:
      return weight;
  }
}

export function executeMacro(document, template) {
  /* eslint-disable no-underscore-dangle, array-callback-return */
  const sanitised = { ...template };

  // Merge all other than communications history
  const templateComms = template.communications;
  delete sanitised._id;
  delete sanitised._rev;
  delete sanitised.communications;
  const updatedDocument = merge(document, sanitised);

  // Cumulative CF descriptors
  if (updatedDocument.features.length > 1) {
    // Merge the last set of original descriptors with the template descriptors
    updatedDocument.features[updatedDocument.features.length - 1].descriptors = merge(updatedDocument.features[updatedDocument.features.length - 2].descriptors, updatedDocument.features[updatedDocument.features.length - 1].descriptors);

    // Remove duplicates
    if (Object.keys(updatedDocument.features[updatedDocument.features.length - 1].descriptors).length > 0) {
      Object.keys(updatedDocument.features[updatedDocument.features.length - 1].descriptors).map((d) => {
        if (updatedDocument.features[updatedDocument.features.length - 1].descriptors[d].length > 0) {
          updatedDocument.features[updatedDocument.features.length - 1].descriptors[d] = _uniq(updatedDocument.features[updatedDocument.features.length - 1].descriptors[d]);
        }
      });
    }
  }

  // Remove duplicates from agent routes of exposure
  updatedDocument.agents.map((o, i) => {
    if (o.exposure.route.length > 0) {
      updatedDocument.agents[i].exposure.route = _uniq(o.exposure.route);
    }
  });

  // Merge template change history
  updatedDocument.communications[updatedDocument.communications.length - 1].history.topic = sanitised.topic;
  const featuresHistory = _map(templateComms, (c) => c.history.features);
  featuresHistory.unshift(updatedDocument.communications[updatedDocument.communications.length - 1].history.features);
  const investigationsHistory = _map(templateComms, (c) => c.history.investigations);
  investigationsHistory.unshift(updatedDocument.communications[updatedDocument.communications.length - 1].history.investigations);
  const treatmentsHistory = _map(templateComms, (c) => c.history.treatments, _isNil);
  treatmentsHistory.unshift(_omitBy(updatedDocument.communications[updatedDocument.communications.length - 1].history.treatments, _isNil));
  const patientHistory = _map(templateComms, (c) => _omitBy(c.history.patient, _isNil));
  patientHistory.unshift(_omitBy(updatedDocument.communications[updatedDocument.communications.length - 1].history.patient, _isNil));
  const agentsHistory = _map(templateComms, (c) => c.history.agents);
  agentsHistory.unshift(updatedDocument.communications[updatedDocument.communications.length - 1].history.agents);
  Object.keys(agentsHistory).map((key) => {
    agentsHistory[key] = _omitBy(agentsHistory[key], _isNil);
  });

  updatedDocument.communications[updatedDocument.communications.length - 1].history.features = merge.all(featuresHistory, {
    arrayMerge: (destinationArray, sourceArray) => _union(destinationArray, sourceArray),
  });
  updatedDocument.communications[updatedDocument.communications.length - 1].history.investigations = merge.all(investigationsHistory, {
    arrayMerge: (destinationArray, sourceArray) => _union(destinationArray, sourceArray),
  });
  updatedDocument.communications[updatedDocument.communications.length - 1].history.treatments = merge.all(treatmentsHistory);
  updatedDocument.communications[updatedDocument.communications.length - 1].history.patient = merge.all(patientHistory, {
    arrayMerge: (destinationArray, sourceArray) => {
      destinationArray[1] = sourceArray[1]; // eslint-disable-line no-param-reassign
      return destinationArray;
    },
  });
  updatedDocument.communications[updatedDocument.communications.length - 1].history.agents = merge.all(agentsHistory, {
    arrayMerge: mergeArrayNested,
  });

  return updatedDocument;
}

export function formatTimestamp(timestamp) {
  if (!moment(timestamp).isValid()) {
    return timestamp;
  }

  try {
    const tzoffset = (new Date()).getTimezoneOffset() * 60000;
    return new Date(new Date(timestamp) - tzoffset).toISOString().slice(0, -8).split('T').join(' ');
  } catch (e) {
    return timestamp;
  }
}

export function generateUuid() {
  return randomBytes(20).toString('hex');
}

export function getCentreAgentsBreakdown(agents, patientWeight, patientWeightUnits, toxicologySource, intl) {
  const centreAgents = {};
  agents.map((agent) => {
    agent.centreAgents.map((centreAgent) => {
      const { name, url } = centreAgent;
      let { quantity, units } = centreAgent;
      quantity = Number(quantity);
      if (_isEmpty(units)) {
        units = intl.formatMessage(agentMessages['message.units.unspecified']);
      }

      if (!centreAgents[name]) {
        centreAgents[name] = {
          url,
          qty: [],
          dosage: [],
          toxicology: getToxicologyLink(name, toxicologySource),
          units: [],
        };
      }
      if (!centreAgents[name].units[units]) {
        centreAgents[name].units[units] = 0;
      }
      if (!_isNaN(quantity)) {
        centreAgents[name].units[units] += parseFloat(quantity);
      }
      return centreAgent;
    });
    return agent;
  });

  Object.keys(centreAgents).map((c) => {
    Object.keys(centreAgents[c].units).map((units) => {
      centreAgents[c].qty.push(`${centreAgents[c].units[units]} ${units}`);
      if (!_isNaN(patientWeight) && patientWeight > 0 && !_isEmpty(patientWeightUnits)) {
        centreAgents[c].dosage.push(`${((parseFloat(centreAgents[c].units[units]) / convertWeightToKg(patientWeight, patientWeightUnits))).toFixed(4)} ${units} / kg`);
      } else {
        centreAgents[c].dosage.push(intl.formatMessage(agentMessages['message.dosage.insufficient']));
      }
      return units;
    });
    return c;
  });

  return centreAgents;
}

export function getContextName(context) {
  const options = getNoteContexts();

  const option = _find(options, ['value', context]);
  let label;
  if (!_isEmpty(option)) {
    label = option.label;
  } else {
    label = _startCase(context);
  }
  return label;
}

export function getGlyph(type, expanded) {
  let glyph;
  switch (type) {
    case 'inquiry':
      glyph = 'question-sign';
      break;
    case 'hoax':
      glyph = 'warning-sign';
      break;
    case 'notes':
      glyph = 'file';
      break;
    case 'comms':
      glyph = 'phone-alt';
      break;
    case 'incident':
      if (expanded) {
        glyph = 'triangle-bottom';
      } else {
        glyph = 'triangle-right';
      }
      break;
    default:
      glyph = 'folder-close';
      break;
  }
  return glyph;
}

export function getTimeSince(timestamp) {
  if (!timestamp || timestamp === '') {
    return { time: '', units: '' };
  }
  let time;
  let units;
  const now = moment();
  const then = moment(timestamp);

  /* eslint-disable no-cond-assign */
  if ((time = now.diff(then, 'years', true)) >= 1) {
    units = 'Years';
  } else if ((time = now.diff(then, 'months', true)) >= 1) {
    units = 'Months';
  } else if ((time = now.diff(then, 'days', true)) >= 1) {
    units = 'Days';
  } else if ((time = now.diff(then, 'hours', true)) >= 1) {
    units = 'Hours';
  } else if ((time = now.diff(then, 'minutes', true)) >= 1) {
    units = 'Minutes';
  } else if ((time = now.diff(then, 'seconds', true)) >= 1) {
    units = 'Seconds';
  } else {
    return { time: '', units: '' };
  }
  /* eslint-enable no-cond-assign */
  return { time: time !== '' ? parseFloat(time).toFixed(1) : '', units };
}

export function getToxicologyLink(substance, src) {
  const terms = substance.toUpperCase().replace(/\s+/g, '+');
  const sources = getToxicologySources();
  let obj = _find(sources, (o) => o.label === src);
  if (!obj) {
    obj = _find(sources, (o) => o.label === 'POISINDEX');
  }
  return obj.url.replace(/THE_TERMS/, terms);
}

export function groupByIncident(results, incidents) {
  const partitions = _partition(results, (r) => r.incidentId && !_isEmpty(r.incidentId));
  if (partitions[0].length > 0) {
    const grouped = _groupBy(partitions[0], 'incidentId');
    Object.keys(grouped).map((k) => {
      const incident = incidents[k];
      incident.id = incident._id; // eslint-disable-line no-underscore-dangle
      incident.cases = _orderBy(grouped[k], ['timestamp'], ['desc']);
      incident.timestamp = incident.cases[0].timestamp;
      partitions[1].push(incident);
      return k;
    });
    return _orderBy(partitions[1], ['timestamp'], ['desc']);
  }
  return partitions[1];
}

export function isCase(document) {
  return document.type === 'case' || document.type === 'inquiry' || document.type === 'hoax';
}

export function isCaseAction(action) {
  return ('id' in action || 'caseId' in action);
}

export function isDisabled(props, context) {
  let disabled = true;
  if (context.uiMode === EDITTEMPLATE_UIMODE) {
    if (!_isEmpty(props.editingTemplateId) && props.editingTemplateId === props.currentTemplateId) {
      disabled = false;
    }
  } else {
    disabled = props.loading || !props.callRecordId || props.callRecordId !== props.currentRecordId;
    const userSPI = props.userSPI ? props.userSPI : props.userSPIFull;
    if (!disabled) {
      if (props.ability) {
        disabled = !userCan(userSPI, props.ability);
      } else {
        disabled = !userCan(userSPI, 'add call records');
      }
    }
  }
  return disabled;
}

export function isFileEmpty(currentCase) {
  // Require a minimum of topic.
  if (_isEmpty(currentCase.topic)) {
    return true;
  }

  // Human cases also require age group
  if (isHuman(currentCase.patient.category) && _isEmpty(currentCase.patient.ageGroup)) {
    return true;
  }

  // New cases also require caller information
  if (currentCase.communications.length === 1 &&
    _isEmpty(_pickBy(flatten(currentCase.communications[0].interlocutor), (o) => !_isEmpty(o) && !_isUndefined(o)))
  ) {
    return true;
  }

  return false;
}

export function isHuman(category) {
  return _isEmpty(category) || category === 'human';
}

export function isIncident(document) {
  return document.type === 'incident';
}

export function isIncidentAction(action) {
  return ('incidentId' in action);
}

export function isRecordEmpty(currentCase, userSPI) {
  const currentComms = currentCase.communications[currentCase.communications.length - 1];

  // Specialists: must have added notes
  if (userCan(userSPI, 'add call notes') && !userCan(userSPI, 'add call records')) {
    if (_isEmpty(currentCase.notes[currentComms.noteRef].content.trim())) {
      return true;
    }
  // Everyone else: Something must have changed
  } else if (
    _isEmpty(_pickBy(flatten(currentComms.interlocutor), (o) => !_isEmpty(o) && !_isUndefined(o))) &&
    (currentComms.history && _isEmpty(_pickBy(filterHistoryDefaults(flatten(currentComms.history)), (o) => !_isEmpty(o) && !_isUndefined(o))))) {
    return true;
  }
  return false;
}

export function isSiteConfig(document) {
  return document.type === 'siteConfig';
}

export function isTemplate(document) {
  return document.type === 'template';
}

export function isTemplateAction(action) {
  return ('templateId' in action);
}

export function isValidMacro(uiMode, initialMacro, currentMacro, templates) {
  if (uiMode !== EDITTEMPLATE_UIMODE) {
    return false;
  }

  if (initialMacro === currentMacro) {
    return true;
  }

  return (!(currentMacro in templates));
}

export function mergeSum(...args) {
  return Array.from(args).reduce((a, b) => {
    const accumulator = a;
    Object.keys(b).forEach((k) => {
      if (Object.prototype.hasOwnProperty.call(b, k)) { accumulator[k] = (a[k] || 0) + b[k]; }
    });
    return accumulator;
  }, {});
}

export function numberFieldBlurHandler(e, cb, old, units, unknown) {
  if (e.target.value.length > 1 && (e.target.value.match(/^0+/) || e.target.value.match(/\.$/))) {
    cb(old, Number(e.target.value), units, units, unknown, unknown);
  }
}

export function numberFieldChangeHandler(e, cb, old, units, unknown) {
  if (e.target.value !== '' && e.target.value.match(/\./) && e.target.value.toString().split('.')[1].length > 1) {
    return false;
  }
  return cb(old, e.target.value, units, units, unknown, unknown);
}

export function numberFieldKeyPressHandler(e) {
  const key = e.which ? e.which : e.keyCode;
  if (!(key >= 48 && key <= 57) && key !== 46) {
    e.preventDefault();
    return false;
  }
  if (key === 46 && e.target.value.match(/\./)) {
    e.preventDefault();
    return false;
  }
  return true;
}

export function parseGoogleAddressComponent(addressComponents) {
  const address = {};
  // go through all address components and pull out the matching types and map them to what we
  // want (city, state)
  const map = {
    street_number: 'street',
    route: 'street',
    locality: 'city',
    administrative_area_level_1: 'state',
    postal_code: 'zip',
    country: 'country',
  };

  let ii;
  const updater = (xx) => {
    // if have a map type we want
    if (addressComponents[ii].types.indexOf(xx) > -1) {
      // have to join street number and route together
      if ((xx === 'street_number' || xx === 'route') && address.street !== undefined) {
        if (xx === 'street_number') { // prepend
          address.street = `${addressComponents[ii].long_name} ${address.street}`;
        } else if (xx === 'route') { // append
          address.street = `${address.street} ${addressComponents[ii].long_name}`;
        }
      } else {
        address[map[xx]] = addressComponents[ii].long_name;
        if (xx === 'country') {
          address.isoCountry = addressComponents[ii].short_name;
        }
      }
    }
  };

  for (ii = 0; ii < addressComponents.length; ii += 1) {
    Object.keys(map).forEach(updater);
  }

  return address;
}

export function renderTypeaheadMenu(results, menuProps) {
  let idx = 0;
  const grouped = _groupBy(results, (r) => r.category);
  const items = Object.keys(grouped).sort().map((category) => {
    const categoryClass = category.replace(' ', '-');
    return [
      !!idx && <MenuDivider key={`${categoryClass}-divider`} />,
      <MenuHeader key={`${categoryClass}-header`}>
        {category}
      </MenuHeader>,
      _map(grouped[category], (state) => {
        const displayLabel = state.label.split(': ')[1];
        const item =
            (<MenuItem key={idx} option={state} position={idx}>
              {displayLabel}
            </MenuItem>);

        idx += 1;
        return item;
      }),
    ];
  });

  return <Menu {...menuProps}>{items}</Menu>;
}

export function sanitiseAttachments(attachments, currentNames) {
  const sanitised = {};
  _map(attachments, 'name').map((name, i) => {
    if (currentNames.indexOf(name) !== -1) {
      sanitised[generateUniqueFilename(name, Object.keys(sanitised).concat(currentNames))] = attachments[i];
    } else {
      sanitised[name] = attachments[i];
    }
    return attachments[i];
  });
  return sanitised;
}

export function terminateCall(currentCase, callRecordId, endCall, caseListSearch, deleteFile, deleteRecord, userSPI, silent = false) {
  const _isFileEmpty = isFileEmpty(currentCase);
  const _isRecordEmpty = isRecordEmpty(currentCase, userSPI);
  if (!_isFileEmpty && !_isRecordEmpty) {
    endCall(caseListSearch, callRecordId);
    return true;
  } else if (_isFileEmpty && currentCase.communications.length === 1) {
    if (confirm('New files require a topic, patient age group (human cases) and caller information. Do you wish to delete this file?')) { // eslint-disable-line no-alert
      deleteFile(callRecordId, userSPI);
      endCall(caseListSearch, callRecordId);
      return true;
    }
  } else if (silent) {
    deleteRecord(callRecordId);
    endCall(caseListSearch, callRecordId);
    return true;
  } else if (confirm('Updates require additional case information. Do you wish to delete this record?')) { // eslint-disable-line no-alert
    deleteRecord(callRecordId);
    endCall(caseListSearch, callRecordId);
    return true;
  }
  return false;
}

export function typeaheadOnChangeHandler(old, values, cb, multiple) {
  let value = '';
  if (multiple) {
    value = values;

    if (JSON.stringify(old) === JSON.stringify(value)) {
      return;
    }
  } else if (values.length > 0) {
    if (values[0].label) {
      value = values[0].label;
    } else if (values[0].name) {
      value = values[0].name;
    } else {
      value = values[0];
    }

    if (!_isUndefined(old) && old === value) {
      return;
    }
  } else {
    value = '';

    if (!_isUndefined(old) && old === value) {
      return;
    }
  }

  if (_isFunction(cb)) {
    if (_isUndefined(old)) {
      cb(value);
    } else {
      cb(old, value);
    }
  }
}

export function updateAgeGroup(age, ageUnits, old, ownProps, cb, dispatch) {
  switch (ageUnits) {
    case 'weeks':
      if (age < 4) {
        dispatch(cb(ownProps.recordId, old, 'neonate'));
      } else if (age < 52) {
        dispatch(cb(ownProps.recordId, old, 'infant'));
      }
      break;
    case 'months':
      if (age <= 1) {
        dispatch(cb(ownProps.recordId, old, 'neonate'));
      } else if (age < 12) {
        dispatch(cb(ownProps.recordId, old, 'infant'));
      } else if (age < 48) {
        dispatch(cb(ownProps.recordId, old, 'toddler'));
      }
      break;
    case 'years':
    default:
      if (age < 4) {
        dispatch(cb(ownProps.recordId, old, 'toddler'));
      } else if (age < 15) {
        dispatch(cb(ownProps.recordId, old, 'child'));
      } else if (age < 20) {
        dispatch(cb(ownProps.recordId, old, 'adolescent'));
      } else if (age < 75) {
        dispatch(cb(ownProps.recordId, old, 'adult'));
      } else {
        dispatch(cb(ownProps.recordId, old, 'elderly'));
      }
  }
}

export function updateAgeYears(age, ageUnits, old, ownProps, cb, dispatch) {
  let ageYears;
  if (ageUnits === 'months') {
    ageYears = (Number.parseFloat(age) / 12).toPrecision(2);
  } else {
    ageYears = Number.parseFloat(age).toPrecision(2);
  }
  dispatch(cb(ownProps.recordId, old, ageYears));
}

export function userCan(user, ability) {
  return user.abilities && user.abilities.indexOf(ability) !== -1;
}

export function weightFieldBlurHandler(e, cb, old, units) {
  numberFieldBlurHandler(e, cb, old, units);
}

export function weightFieldChangeHandler(e, cb, old, units) {
  numberFieldChangeHandler(e, cb, old, units);
}

const _traverseChildren = (obj, callback) => {
  let expanded = false;
  if (_isArray(obj)) {
    _map(obj, (el, i) => {
      if (obj[i].children) {
        const { res, isExpanded } = _traverseChildren(el.children, callback);
        obj[i].children = res; // eslint-disable-line
        if (isExpanded) {
          obj[i].expanded = true; // eslint-disable-line
          expanded = true;
        }
      } else {
        obj[i] = callback(el);  // eslint-disable-line
        if (obj[i].checked) {
          expanded = true;
        }
      }
    });
  }
  if (obj.children) {
    const { res, isExpanded } = _traverseChildren(obj.children, callback);  // eslint-disable-line
    obj.children = res; // eslint-disable-line
    if (isExpanded) {
      obj.expanded = true; // eslint-disable-line
      expanded = true;
    }
  } else {
    obj = callback(obj);  // eslint-disable-line
    if (obj.checked) {
      expanded = true;
    }
  }

  return { res: obj, isExpanded: expanded };
};
