import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import casemessages from 'components/CaseView/messages';
import messages from 'components/TreatmentView/messages';

const ReferralsHistory = ({ history }) => <div>
  <br /><strong><FormattedMessage {...casemessages['section.treatment']} /> <FormattedMessage {...messages['section.referrals']} /></strong>
  {
    (history.map(
        (record, id) => (
          <div key={id}>{record.referee} - {record.specialty}</div>
        )
    ))
  }
</div>;

ReferralsHistory.propTypes = {
  history: PropTypes.array,
};

export default ReferralsHistory;
