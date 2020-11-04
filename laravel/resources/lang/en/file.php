<?php
/**
 * file.php
 *
 * @package default
 */


return [
     'id' => 'PIC record number',
     'meta' => [
          'title' => 'Case Creation'
     ],
     'created' => [
          'label' => [
               'date' => 'Date',
               'time' => 'Time'
          ]
     ],
     'type' => [
          'options' => [
               'case' => 'Case',
               'inquiry' => 'Inquiry',
               'hoax' => 'Hoax'
          ]
     ],
     'outcome' => [
         'label' => [
             'long' => 'Outcome'
         ],
         'format' => ':outcome'
     ],
     'status' => [
          'options' => [
               'open' => 'Open',
               'pending' => 'Closed Pending Review',
               'closed' => 'Closed',
               'deleted' => 'Deleted'
          ]
     ],
     'topic' => [
          'label' => [
               'long' => 'Topic'
          ],
          'format' => ':topic'
     ],
     'incident' => [
          'label' => [
               'long' => 'Incident'
          ],
     ],
     'mrn' => [
          'label' => [
               'long' => 'Last MRN',
               'short' => 'MRN'
          ]
     ],
     'patient' => [
          'title' => 'Patient',
          'name' => [
               'label' => [
                    'long' => 'Patient Name',
                    'short' => 'Name'
               ]
          ],
          'category' => [
               'label' => [
                    'long' => 'Type of Patient'
               ],
               'options' => [
                    'human' => 'human',
                    'animal' => 'animal',
                    'unknown' => 'unknown'
               ]
          ],
          'animalType' => [
               'label' => [
                    'long' => 'Animal Type',
               ],
          ],
          'age' => [
               'label' => [
                    'long' => 'Age',
               ],
               'format' => ':age :units'
          ],
          'ageGroup' => [
               'label' => [
                    'long' => 'Age Group',
               ],
               'options' => [
                    'neonate' => 'neonate',
                    'infant' => 'infant',
                    'toddler' => 'toddler',
                    'child' => 'child',
                    'adolescent' => 'adolescent',
                    'adult' => 'adult',
                    'elderly' => 'elderly',
                    'unknown' => 'unknown',
               ]
          ],
          'sex' => [
               'label' => [
                    'long' => 'Patient Sex',
                    'short' => 'Sex'
               ],
               'options' => [
                    'female' => 'female',
                    'male' => 'male',
                    'unknown' => 'unknown'
               ]
          ],
          'pregnant' => [
               'label' => [
                    'long' => 'Pregnant'
               ],
               'options' => [
                    'yes' => 'yes',
                    'no' => 'no',
                    'uncertain' => 'uncertain',
                    'unknown' => 'unknown'
               ]
          ],
          'trimester' => [
               'label' => [
                    'long' => 'Trimester'
               ],
               'options' => [
                    '1' => '1st trimester',
                    '2' => '2nd trimester',
                    '3' => '3rd trimester',
                    'unknown' => 'unknown'
               ]
          ],
          'weight' => [
               'label' => [
                    'long' => 'Patient weight'
               ],
               'format' => ':weight :units'
          ],
          'occupation' => [
               'label' => [
                    'long' => 'Occupation'
               ]
          ],
          'circumstance' => [
               'title' => 'Circumstances of exposure/incident',
               'label' => [
                    'long' => 'Circumstance'
               ],
          ],
          'location' => [
               'details' => 'Location details',
               'category' => 'Category of location',
               'label' => [
                    'long' => 'Location'
               ]
          ],
          'postcode' => [
               'label' => [
                    'long' => 'Postcode'
               ]
          ]
     ],
     'exposure' => [
          'title' => 'Exposure'
     ],
     'substances' => [
          'title' => 'Agent/Substance|Agents/Substances',
          'centre' => 'Centre Substance|Centre Substances',
          'caller' => 'Caller Substance|Caller Substances',
          'by' => [
               'centre' => 'By Centre Substance',
               'caller' => 'By Caller Substance'
          ],
          'category' => [
               'label' => [
                    'long' => 'Category'
               ]
          ],
          'use-type' => [
               'label' => [
                    'long' => 'Use Type'
               ]
          ],
          'intended-use' => [
               'label' => [
                    'long' => 'Intended Use/Function'
               ]
          ],
          'quantity' => [
               'label' => [
                    'long' => 'Quantity'
               ],
               'format' => ':quantity :units'
          ],
          'route' => [
               'label' => [
                    'long' => 'Route of Exposure',
                    'short' => 'Route'
               ]
          ],
          'type' => [
               'label' => [
                    'long' => 'Type of Exposure',
                    'short' => 'Type'
               ]
          ],
          'duration' => [
               'label' => [
                    'long' => 'Duration of Exposure',
                    'short' => 'Duration'
               ],
               'format' => ':duration :units'
          ],
          'timestamp' => [
               'since_last' => [
                    'long' => 'Time since last exposure'
               ],
               'label' => [
                    'long' => 'Time of Exposure'
               ]
          ],
          'centre-agent' => [
               'label' => [
                    'long' => 'Centre Agent|Centre Agents'
               ],
               'format' => ':name (:quantity :units)'
          ],
          'notes' => [
               'label' => [
                    'long' => 'Substance Notes',
                    'short' => 'Note|Notes'
               ]
          ],
          'name' => [
             'common' => [
                 'label' => [
                      'long' => 'Brand/Common Name',
                 ]
             ]
          ],
          'amount' => [
              'label' => [
                  'long' => 'Amount'
              ]
          ],
          'dosage' => [
              'label' => [
                  'long' => 'Dosage',
                  'short' => 'Dose'
              ]
          ],
          'none' => 'No Substances Recorded'
     ],
     'risk-assessment' => [
          'title' => 'Management',
          'assessment' => [
               'label' => [
                    'long' => 'Assessed Risk of Poisoning'
               ]
          ],
          'severity' => [
               'label' => [
                    'long' => 'Poison Severity Score',
                    'initial' => 'Initial severity',
                    'final' => 'Final severity'
               ]
          ]
     ],
     'clinical-features' => [
          'title' => 'Clinical features/organ systems',
          'when' => [
               'label' => [
                    'long' => 'When'
               ],
               'options' => [
                    'before' => 'Before call',
                    'at' => 'At time of call',
                    'end' => 'At end of case'
               ]
          ],
          'notes' => [
               'label' => [
                    'long' => 'Clinical Features Notes',
                    'short' => 'Notes'
               ],
          ],
          'attachments' => [
               'label' => [
                    'long' => 'Attachments'
               ]
          ],
          'none' => 'No Features Recorded'
     ],
     'referrals' => [
          'title' => 'Referrals',
          'format' => ':specialty by :referee'
     ],
     'treatments' => [
          'disposition' => [
               'label' => [
                    'long' => 'Disposition'
               ],
               'options' => [
                    'manage-at-location-of-poisoning' => 'Manage at location of poisoning',
                    'manage-by-gp' => 'Manage by GP',
                    'manage-at-a-hospital' => 'Manage at a hospital  (ED, Admit, ICU)',
                    'manage-at-triage' => 'Manage at Triage',
                    'refused-treatment' => 'Refused treatment',
                    'other-see-notes' => 'Other - see notes',
                    'unknown' => 'Unknown'
               ]
          ],
          'location' => [
               'recommended' => [
                    'label' => [
                         'long' => 'Location - recommended'
                    ]
               ]
          ],
          'none' => 'No Treatments',
          'notes' => [
               'label' => [
                    'long' => 'Treatment Notes',
                    'short' => 'Notes'
               ]
          ],
          'provider' => [
               'recommended' => [
                    'label' => [
                         'long' => 'Provider - recommended'
                    ]
               ]
          ],
          'title' => 'Treatment',
          'toxicologist' => [
               'label' => [
                    'long' => 'Clinical Toxicologist',
                    'short' => 'Toxicologist'
               ]
          ],
          'treatment' => [
               'recommended' => [
                    'label' => [
                         'long' => 'Treatment - recommended'
                    ]
               ]
          ],
     ],
     'investigations' => [
          'title' => 'Investigations',
          'request' => [
               'label' => [
                    'long' => 'Request'
               ],
               'untitled' => '&lt;untitled&gt;'
          ],
          'results' => [
               'label' => [
                    'long' => 'Results'
               ]
          ],
          'attachments' => [
               'label' => [
                    'long' => 'Attachments'
               ]
          ],
          'none' => 'No Investigations Requested'
     ],
     'notes' => [
          'title' => 'Notes'
     ],
     'case-history' => [
          'title' => 'Case History'
     ],
     'communications' => [
          'title' => 'Communication|Communications',
          'type' => [
               'label' => [
                    'long' => 'Type'
               ]
          ],
          'spi' => [
               'label' => [
                    'long' => 'Creating officer'
               ]
          ],
          'communication-type' => [
               'label' => [
                    'long' => 'Communication Type'
               ]
          ],
          'direction' => [
               'label' => [
                    'long' => 'Direction'
               ]
          ],
          'detail' => [
               'label' => [
                    'long' => 'Detail'
               ]
          ],
          'caller' => [
               'title' => 'Caller',
               'name' => [
                    'label' => [
                         'long' => 'Caller Name',
                         'short' => 'Caller'
                    ]
               ],
               'category' => [
                    'label' => [
                         'long' => 'Category'
                    ]
               ],
               'organisation' => [
                    'address' => [
                         'street1' => [
                             'label' => [
                                 'short' => 'Address'
                             ],
                         ],
                         'city' => [
                             'label' => [
                                 'short' => 'City'
                             ],
                         ],
                         'state' => [
                             'label' => [
                                 'short' => 'State'
                             ],
                         ],
                         'postcode' => [
                             'label' => [
                                 'short' => 'Postcode'
                             ],
                         ],
                         'country' => [
                             'label' => [
                                 'short' => 'Country'
                             ],
                         ],
                    ],
                    'label' => [
                         'long' => 'Caller - Organisation',
                         'short' => 'Organisation'
                    ],
                    'missing' => '&lt;Missing :field&gt;'
               ],
               'location' => [
                    'label' => [
                         'long' => 'Location'
                    ]
               ],
               'telephone' => [
                    'label' => [
                         'long' => 'Telephone'
                    ]
               ]
          ],
          'history' => [
               'missing' => '&lt;History unavailable&gt;'
          ],
          'method' => [
               'label' => [
                    'long' => 'Method of communication',
                    'short' => 'Method',
               ],
          ],
          'endTimestamp' => [
              'format' => '(Call end :endTimestamp)'
          ],
     ],
     'notes' => [
          'title' => 'Notes'
     ],
];
