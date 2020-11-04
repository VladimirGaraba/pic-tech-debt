import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import casemessages from 'components/CaseView/messages';
import messages from 'components/TreatmentView/messages';

const TreatmentsHistory = ({ history, ix }) => <div>
  <br /><strong><FormattedMessage {...casemessages['section.treatment']} /></strong>
  {
    (
        history.pastTreatments
        && Object.keys(history.pastTreatments).length > 0
    )
        ? Object.keys(history.pastTreatments).map((category, j) => (
            (history.pastTreatments[category])
                ? history.pastTreatments[category].map((treatment, k) =>
                    (
                        history.treatments
                        && history.treatments.length > 0
                        && history.treatments
                            .map((record) => (
                                    record.treatments
                                    && record.treatments[category]
                                    && record.treatments[category].includes(treatment)
                                )
                            )
                            .reduce((accumulator, currentValue) => accumulator || currentValue)
                    )
                        ? null
                        : <div key={`${category}-${treatment}-${ix}-${j}-${k}`}><del><strong><FormattedMessage {...messages['section.treatment']} />:</strong> {treatment}</del></div>
                )
                : null
        ))
        : null
  }
  {
    history.treatments.map(
        (record, id) => (
          <div key={id}>
            <strong><FormattedMessage {...messages['field.disposition']} />:</strong> {record.disposition}
            {
              (Object.keys(record.treatments).length > 0)
                  ? Object.keys(record.treatments).map(
                  (category, j) => (
                      record.treatments[category].map((key, k) => (
                        <div key={`${id}-${j}-${k}`}><strong><FormattedMessage {...casemessages['section.treatment']} />:</strong> {key}</div>
                      ))
                  ))
                  : null
            }
          </div>
        )
    )
  }
</div>;

TreatmentsHistory.propTypes = {
  history: PropTypes.object,
  ix: PropTypes.number,
};

export default TreatmentsHistory;
