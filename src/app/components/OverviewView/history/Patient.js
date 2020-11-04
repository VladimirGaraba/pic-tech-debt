import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import _isEmpty from 'lodash/isEmpty';
import _compact from 'lodash/compact';

import casemessages from 'components/CaseView/messages';
import messages from 'components/PatientView/messages';

const PatientHistory = ({ history }) => <div>
  <br /><strong><FormattedMessage {...casemessages['section.patient']} /></strong>
  <br />
  { (history.topic)
      ? <span>
        <strong><FormattedMessage {...messages['field.topic']} />:</strong> {history.topic[1]} {(!_isEmpty(history.topic[0]) && history.topic[0] !== history.topic[1]) ? <span>(was {history.topic[0]})</span> : null}
        <br />
      </span>
      : null
  }
  { (history.outcome)
    ? <span>
      <strong><FormattedMessage {...messages['field.outcome']} />:</strong> {history.outcome[1]} {(!_isEmpty(history.outcome[0]) && history.outcome[0] !== history.outcome[1]) ? <span>(was {history.outcome[0]})</span> : null}
    </span>
    : null
  }
  {
    (
        history.name
        || history.medicalRecordNumber
        || history.animalType
        || history.gender
        || history.localityLocation || history.location
        || history.localityPostcode || history.postcode
    )
        ? <div>
          { (history.name)
              ? <span>
                <strong><FormattedMessage {...messages['field.name']} />:</strong> {history.name[1]} {(!_isEmpty(history.name[0]) && history.name[0] !== history.name[1]) ? <span>(was {history.name[0]})</span> : null}
              </span>
              : null
          }
          { (history.medicalRecordNumber)
              ? <span>
                <strong><FormattedMessage {...messages['field.mrn']} />:</strong> {history.medicalRecordNumber[1]} {(!_isEmpty(history.medicalRecordNumber[0]) && history.medicalRecordNumber[0] !== history.medicalRecordNumber[1]) ? <span>(was {history.medicalRecordNumber[0]})</span> : null}
              </span>
              : null
          }
          { (history.animalType)
              ? <span>
                <strong><FormattedMessage {...messages['field.animalType']} />:</strong> {history.animalType[1]} {(!_isEmpty(history.animalType[0]) && history.animalType[0] !== history.animalType[1]) ? <span>(was {history.animalType[0]})</span> : null}
              </span>
              : null
          }
          { (history.gender)
              ? <span>
                <strong><FormattedMessage {...messages['field.sex']} />:</strong> {history.gender[1]} {(!_isEmpty(history.gender[0]) && history.gender[0] !== history.gender[1]) ? <span>(was {history.gender[0]})</span> : null}
              </span>
              : null
          }
          { (history.location)
              ? <span>
                <strong><FormattedMessage {...messages['field.location']} />:</strong> {history.location[1]} {(!_isEmpty(history.location[0]) && history.location[0] !== history.location[1]) ? <span>(was {history.location[0]})</span> : null}
              </span>
              : null
          }
          { (history.localityLocation)
              ? <span>
                <strong><FormattedMessage {...messages['field.location']} />:</strong> {history.localityLocation[1]} {(!_isEmpty(history.localityLocation[0]) && history.localityLocation[0] !== history.localityLocation[1]) ? <span>(was {history.localityLocation[0]})</span> : null}
              </span>
              : null
          }
          { (history.postcode)
              ? <span>
                <strong><FormattedMessage {...messages['field.postcode']} />:</strong> {history.postcode[1]} {(!_isEmpty(history.postcode[0]) && history.postcode[0] !== history.postcode[1]) ? <span>(was {history.postcode[0]})</span> : null}
              </span>
              : null
          }
          { (history.localityPostcode)
              ? <span>
                <strong><FormattedMessage {...messages['field.postcode']} />:</strong> {history.localityPostcode[1]} {(!_isEmpty(history.localityPostcode[0]) && history.localityPostcode[0] !== history.localityPostcode[1]) ? <span>(was {history.localityPostcode[0]})</span> : null}
              </span>
              : null
          }
        </div>
        : null
  }
  {
    (
        history.circumstance
        || history.occupation
    )
        ? <div>
          { (history.circumstance)
              ? <span>
                <strong><FormattedMessage {...messages['field.circumstance']} />:</strong> {history.circumstance[1]} {(!_isEmpty(history.circumstance[0]) && history.circumstance[0] !== history.circumstance[1]) ? <span>(was {history.circumstance[0]})</span> : null}
      &nbsp;
              </span>
              : null
          }
          { (history.occupation)
              ? <span>
                <strong><FormattedMessage {...messages['field.occupation']} />:</strong> {history.occupation[1]} {(!_isEmpty(history.occupation[0]) && history.occupation[0] !== history.occupation[1]) ? <span>(was {history.occupation[0]})</span> : null}
              </span>
              : null
          }
        </div>
        : null
  }
  {
    (
        history.weight
        || history.weightUnits
        || history.age
        || history.ageUnits
        || history.ageGroup
        || history.ageYears
    )
        ? <div>
          { (
              history.weight
              || history.weightUnits
          )
              ? <span>
                <strong><FormattedMessage {...messages['field.weight']} />:</strong> {_compact([history.weight ? history.weight[1] : null, history.weightUnits ? history.weightUnits[1] : null]).join(' ') }&nbsp;
                {(
                  (history.weight && !_isEmpty(history.weight[0]) && history.weight[0] !== history.weight[1])
                  || (history.weightUnits && !_isEmpty(history.weightUnits[0]) && history.weightUnits[0] !== history.weightUnits[1])
                )
                ? <span>
                      (was {_compact([history.weight ? history.weight[0] : null, history.weightUnits ? history.weightUnits[0] : null]).join(' ') })
                    </span>
                : null}
                &nbsp;
              </span>
              : null
          }
          { (
            history.age
            || history.ageUnits
          )
              ? <span>
                <strong><FormattedMessage {...messages['field.age']} />:</strong> {_compact([history.age ? history.age[1] : null, history.ageUnits ? history.ageUnits[1] : null]).join(' ') }&nbsp;
                {(
                    (history.age && !_isEmpty(history.age[0]) && history.age[0] !== history.age[1])
                    || (history.ageUnits && !_isEmpty(history.ageUnits[0]) && history.ageUnits[0] !== history.ageUnits[1])
                )
                    ? <span>
                      (was {_compact([history.age ? history.age[0] : null, history.ageUnits ? history.ageUnits[0] : null]).join(' ') })
                    </span>
                    : null}
                &nbsp;
              </span>
              : null
          }
          { (history.ageGroup && history.ageGroup[0] !== history.ageGroup[1])
            ? <span>
              <strong><FormattedMessage {...messages['field.ageGroup']} />:</strong> { (history.ageGroup) ? history.ageGroup[1] : null}&nbsp;
              {(history.ageGroup && !_isEmpty(history.ageGroup[0]) && history.ageGroup[0] !== history.ageGroup[1])
                ? <span>
                    (was {(history.ageGroup) ? history.ageGroup[0] : null})
                  </span>
                : null}
              &nbsp;
            </span>
            : null
          }
          { (history.ageYears && history.ageYears[0] !== history.ageYears[1])
            ? <span>
              <strong><FormattedMessage {...messages['field.ageYears']} />:</strong> { (history.ageYears) ? history.ageYears[1] : null}&nbsp;
              {(history.ageYears && !_isEmpty(history.ageYears[0]) && history.ageYears[0] !== history.ageYears[1])
                ? <span>
                      (was {(history.ageYears) ? history.ageYears[0] : null})
                    </span>
                : null}
              &nbsp;
            </span>
            : null
          }
        </div>
        : null
  }
  { (history.poisonSeverityScore)
      ? <div>
        <strong><FormattedMessage {...messages['field.poisonseverityscore']} />:</strong> {history.poisonSeverityScore[1]} {(!_isEmpty(history.poisonSeverityScore[0]) && history.poisonSeverityScore[0] !== history.poisonSeverityScore[1]) ? <span>(was {history.poisonSeverityScore[0]})</span> : null}
      </div>
      : null
  }
  { (history.riskAssessment)
      ? <div>
        <strong><FormattedMessage {...messages['field.riskassessment']} />:</strong> {history.riskAssessment[1]} {(!_isEmpty(history.riskAssessment[0]) && history.riskAssessment[0] !== history.riskAssessment[1]) ? <span>(was {history.riskAssessment[0]})</span> : null}
      </div>
      : null
  }
</div>;

PatientHistory.propTypes = {
  history: PropTypes.object,
};

export default PatientHistory;
