import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import casemessages from 'components/CaseView/messages';

const ClinicalFeaturesHistory = ({ history, notes, ix }) => <div>
  <br /><strong><FormattedMessage {...casemessages['section.clinicalfeatures']} /></strong>
  <br />
  {
    (history.when)
      ? <div>
        {(() => {
          switch (history.when) {
            case 'before':
              return 'Before call ';
            case 'at':
              return 'At time of call ';
            case 'end':
              return 'At end of case ';
            default:
              return null;
          }
        })}
      </div>
      : null
  }
  {
    (history.pastDescriptors && Object.keys(history.pastDescriptors).length > 0)
        ? Object.keys(history.pastDescriptors).map(
        (category) => (history.pastDescriptors[category].map(
            (key, j) => (
                history.descriptors
                && history.descriptors[category]
                && history.descriptors[category].includes(key)
            )
                ? null
                : <div key={[ix, 'features', 'descriptors', category, j].join('.')}><del>{category}: {key}</del></div>
        ))
        )
        : null
  }
  {
    (history.descriptors && Object.keys(history.descriptors).length > 0)
        ? Object.keys(history.descriptors).map(
        (category) => (history.descriptors[category].map(
            (key, j) => (<div key={[ix, 'features', 'descriptors', category, j].join('.')}>{category}: {key}</div>)
        ))
        )
        : null
  }
  {
    (history.notes && history.notes.length > 0)
        ? <div>
          <strong>Notes:</strong>
          {history.notes.map(
              (uuid) => (
                <div key={[ix, 'features', 'notes', uuid].join('.')}>
                  {notes[uuid].content}<br />
                  {
                    (notes[uuid].attachments.length > 0)
                        ? <span>
                          <br />File list:<br />
                          {notes[uuid].attachments.map(
                              (filename, k) => (<span key={[ix, 'features', 'notes', uuid, 'files', k].join('.')}>{filename}<br /></span>)
                          )}
                        </span>
                        : null
                  }
                </div>
              )
          )}
        </div>
        : null
  }
</div>;

ClinicalFeaturesHistory.propTypes = {
  history: PropTypes.object,
  notes: PropTypes.object,
  ix: PropTypes.number,
};

export default ClinicalFeaturesHistory;
