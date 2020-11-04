import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import casemessages from 'components/CaseView/messages';

const InvestigationsHistory = ({ history, notes, ix }) => <table>
  <thead>
    <tr>
      <th colSpan={2}><FormattedMessage {...casemessages['section.investigations']} /></th>
    </tr>
  </thead>
  {
    Object.keys(history).sort((a, b) => a - b).map(
        (key, j) => (
          <tbody key={[ix, 'investigations', j].join('.')}>
            <tr>
              <td colSpan={2} style={{ paddingLeft: '0.5rem' }}><strong>Investigation #{parseInt(key, 10) + 1}</strong></td>
            </tr>
            {
              (history[key].request)
                  ? <tr>
                    <td style={{ paddingLeft: '0.5rem', paddingRight: '1rem', fontWeight: 'bold', verticalAlign: 'top' }}>
                      Request
                    </td>
                    <td>
                      {
                        (notes[history[key].request].title)
                            ? <u>notes[history[key].request].title<br /></u>
                            : null
                      }
                      {notes[history[key].request].content}
                    </td>
                  </tr>
                  : null
            }
            {
              (history[key].results.length)
                  ? (history[key].results.map(
                  (resultsKey, k) => (
                    <tr key={[ix, 'investigations', j, 'results', k].join('.')}>
                      <td style={{ paddingLeft: '0.5rem', paddingRight: '1rem', fontWeight: 'bold', verticalAlign: 'top' }}>Result</td>
                      <td>
                        {
                          (notes[resultsKey].title)
                              ? <u>{notes[resultsKey].title}<br /></u>
                              : null
                        }
                        {notes[resultsKey].content}
                      </td>
                    </tr>
                  )
                  ))
                  : null
            }
          </tbody>
        )
    )
  }
</table>;

InvestigationsHistory.propTypes = {
  history: PropTypes.object,
  notes: PropTypes.object,
  ix: PropTypes.number,
};

export default InvestigationsHistory;
