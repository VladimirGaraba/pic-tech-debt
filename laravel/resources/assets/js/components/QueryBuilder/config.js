import moment from 'moment-timezone';

export const filters = [{
  id: 'naturalID',
  label: 'ID',
  type: 'string',
},
  /*{
    id: 'patient.name',
    label: 'Patient Name',
    type: 'string',
  }, */{
    id: 'patient.gender',
    label: 'Gender',
    type: 'string',
    input: 'select',
    values: {
      'female': 'female',
      'male': 'male',
      'unknown': 'unknown',
    },
  }, {
    id: 'patient.postcode',
    label: 'Patient Postcode',
    type: 'string',
  }, {
    id: 'timestamp',
    label: 'Time of Call',
    type: 'string',
    input: 'select',
    values: {
      'Last Day': 'Last Day',
      'Last Week': 'Last Week',
      'Last Month': 'Last Month',
    },
    operators: [ 'greater_or_equal' ],
    valueGetter: function(rule) {
      const $value = rule.$el.find('.rule-value-container select option:selected').val();

      let time;
      switch ($value) {
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
      return moment(time).tz('GMT').format();
    }
  }, {
    id: 'agents.$.centreAgents.$.name',
    label: 'Centre Substance Name',
    type: 'string',
  }, {
    id: 'communications.$.interlocutor.organisation.location',
    label: 'Caller Location',
    type: 'string',
    input: 'select',
    values: {
      'Home': 'Home',
      'Workplace': 'Workplace',
      'Medical - hospital' : 'Medical - hospital',
      'Medical - non-hospital': 'Medical - non-hospital',
      'Veterinary clinic': 'Veterinary clinic',
      'Poisons Centre': 'Poisons Centre',
      'Educational establishment': 'Educational establishment',
      'Enclosed public space': 'Enclosed public space',
      'Open space': 'Open space',
      'Mode of transport': 'Mode of transport',
      'Prison': 'Prison',
    },
    operators: ['equal', 'not_equal', 'is_empty', 'is_not_empty']
  }, {
    id: 'communications.$.interlocutor.organisation.name',
    label: 'Caller Organisation',
    type: 'string',
  }, {
    id: 'communications.$.interlocutor.organisation.postcode',
    label: 'Caller Postcode',
    type: 'string',
  }];
