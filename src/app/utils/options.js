export function getAnimalTypeOptions() {
  return [
    { label: 'Dog' },
    { label: 'Cat' },
    { label: 'Horse/pony' },
    { label: 'Cow' },
    { label: 'Sheep' },
    { label: 'Goat' },
    { label: 'Poultry' },
    { label: 'Bird not Poultry' },
    { label: 'Rat/mouse' },
    { label: 'Rabbit' },
    { label: 'Possum' },
    { label: 'Guinea Pig' },
    { label: 'Kangaroo' },
    { label: 'Elephant' },
    { label: 'Camel' },
    { label: 'Pig' },
    { label: 'Marine mammal' },
    { label: 'Lizard' },
    { label: 'Fish' },
    { label: 'Other - see notes' },
  ];
}

export function getCircumstanceOptions() {
  return [
    { label: 'Unknown' },
    { label: 'Unintentional - Accidental' },
    { label: 'Unintentional - Occupational' },
    { label: 'Unintentional - Environmental' },
    { label: 'Unintentional - Transport accident' },
    { label: 'Unintentional - Fire' },
    { label: 'Unintentional - Therapeutic error' },
    { label: 'Unintentional - Misuse' },
    { label: 'Unintentional - Food Poisoning' },
    { label: 'Unintentional - Other - see notes' },
    { label: 'Unintentional - Unknown' },
    { label: 'Intentional - Suicide' },
    { label: 'Intentional - Misuse' },
    { label: 'Intentional - Abuse' },
    { label: 'Intentional - Malicious/criminal' },
    { label: 'Intentional - Abortion' },
    { label: 'Intentional - Other - see notes' },
    { label: 'Intentional - Unknown' },
    { label: 'Adverse Reaction' },
    { label: 'Other - see notes' },
  ];
}

export function getOutcomeOptions() {
  return [
    { label: '' },
    { label: 'No Impact' },
    { label: 'Recovery' },
    { label: 'Delayed Recovery' },
    { label: 'Sequelae' },
    { label: 'Death' },
  ];
}

export function getLocationOptions() {
  return [
    { label: '' },
    { label: 'Home' },
    { label: 'Workplace' },
    { label: 'Medical - hospital' },
    { label: 'Medical - non-hospital' },
    { label: 'Veterinary clinic' },
    { label: 'Poisons Centre' },
    { label: 'Educational establishment' },
    { label: 'Enclosed public space' },
    { label: 'Open space' },
    { label: 'Mode of transport' },
    { label: 'Prison' },
  ];
}

export function getInterlocutorCategoryOptions() {
  return [
    { label: 'Victim/Patient' },
    {
      group: 'Family member',
      options: [
        { label: 'Family Member parent' },
        { label: 'Family Member grandparent' },
        { label: 'Family Member partner/spouse' },
        { label: 'Family Member other' },
        { label: 'Friend' },
      ],
    },
    {
      group: 'Health personnel',
      options: [
        { label: 'Medical Professional doctor' },
        { label: 'Medical Professional nurse' },
        { label: 'Medical Professional pharmacist' },
        { label: 'Medical Professional other, eg dentist, psychologist, social worker' },
        { label: 'Ambulance officer' },
        { label: 'Veterinary Personnel' },
        { label: 'Carer' },
      ],
    },
    {
      group: 'Other personnel',
      options: [
        { label: 'Teacher or Educational worker' },
        { label: 'Police' },
        { label: 'Counsellor, eg Lifeline' },
      ],
    },
    { label: 'Other - see notes' },
    { label: 'Unknown' },
  ];
}

export function getInterlocutorLocationOptions() {
  return [
    { label: 'Home' },
    { label: 'Workplace' },
    { label: 'Medical - hospital' },
    { label: 'Medical - non-hospital' },
    { label: 'Veterinary clinic' },
    { label: 'Poisons Centre' },
    { label: 'Educational establishment' },
    { label: 'Enclosed public space' },
    { label: 'Open space' },
    { label: 'Mode of transport' },
    { label: 'Prison' },
  ];
}

export function getStateOptions() {
  return [
    { label: 'ACT' },
    { label: 'New South Wales' },
    { label: 'Northern Territory' },
    { label: 'Queensland' },
    { label: 'South Australia' },
    { label: 'Tasmania' },
    { label: 'Victoria' },
    { label: 'Western Australia' },
  ];
}

export function getCommunicationMediumOptions() {
  return [
    { label: 'Phone' },
    { label: 'Email' },
    { label: 'Postal' },
    { label: 'Personal Contact' },
    { label: 'Other - see notes' },
  ];
}

export function getSexOptions() {
  return [
    { label: 'female' },
    { label: 'male' },
    { label: 'unknown' },
  ];
}

export function getWeightUnitsOptions() {
  return [
    { label: 'kg' },
  ];
}

export function getAgeUnitsOptions() {
  return [
    { label: 'months' },
    { label: 'years' },
  ];
}

export function getAgeGroupOptions() {
  return [
    { label: 'neonate' },
    { label: 'infant' },
    { label: 'toddler' },
    { label: 'child' },
    { label: 'adolescent' },
    { label: 'adult' },
    { label: 'elderly' },
    { label: 'unknown' },
  ];
}

export function getOccupationOptions() {
  return [
    { label: 'none' },
    { label: 'housewife / husband' },
    { label: 'agricultural worker' },
    { label: 'industrial worker' },
    { label: 'cottage industry worker' },
    { label: 'commercial' },
    { label: 'services' },
    { label: 'student' },
    { label: 'other - see notes' },
    { label: 'unknown' },
  ];
}

export function getRiskAssessmentOptions() {
  return [
    { label: 'No Risk' },
    { label: 'Minimal Risk' },
    { label: 'Moderate Risk' },
    { label: 'High Risk' },
    { label: 'Established Poisoning' },
  ];
}

export function getPoisonSeverityScoreOptions() {
  return [
    { label: 'None' },
    { label: 'Minor' },
    { label: 'Moderate' },
    { label: 'Severe' },
    { label: 'Death' },
  ];
}

export function getClinicalFeaturesOptions() {
  return [
    {
      id: 'Cardiovascular|Asystole',
      label: 'Cardiovascular: Asystole',
      category: 'Cardiovascular',
    }, {
      id: 'Cardiovascular|Bradycardia',
      label: 'Cardiovascular: Bradycardia',
      category: 'Cardiovascular',
    }, {
      id: 'Cardiovascular|Cardiac arrest',
      label: 'Cardiovascular: Cardiac arrest',
      category: 'Cardiovascular',
    }, {
      id: 'Cardiovascular|Cardiac failure',
      label: 'Cardiovascular: Cardiac failure',
      category: 'Cardiovascular',
    }, {
      id: 'Cardiovascular|Cardiomyopathy',
      label: 'Cardiovascular: Cardiomyopathy',
      category: 'Cardiovascular',
    }, {
      id: 'Cardiovascular|Hypertension',
      label: 'Cardiovascular: Hypertension',
      category: 'Cardiovascular',
    }, {
      id: 'Cardiovascular|Hypotension',
      label: 'Cardiovascular: Hypotension',
      category: 'Cardiovascular',
    }, {
      id: 'Cardiovascular|Palpitations',
      label: 'Cardiovascular: Palpitations',
      category: 'Cardiovascular',
    }, {
      id: 'Cardiovascular|Pericardial effusion',
      label: 'Cardiovascular: Pericardial effusion',
      category: 'Cardiovascular',
    }, {
      id: 'Cardiovascular|Phlebitis',
      label: 'Cardiovascular: Phlebitis',
      category: 'Cardiovascular',
    }, {
      id: 'Cardiovascular|Precordial pain',
      label: 'Cardiovascular: Precordial pain',
      category: 'Cardiovascular',
    }, {
      id: 'Cardiovascular|Supraventricular arrhythmia',
      label: 'Cardiovascular: Supraventricular arrhythmia',
      category: 'Cardiovascular',
    }, {
      id: 'Cardiovascular|Supraventricular tachycardia',
      label: 'Cardiovascular: Supraventricular tachycardia',
      category: 'Cardiovascular',
    }, {
      id: 'Cardiovascular|Tachycardia',
      label: 'Cardiovascular: Tachycardia',
      category: 'Cardiovascular',
    }, {
      id: 'Cardiovascular|Vasoconstriction',
      label: 'Cardiovascular: Vasoconstriction',
      category: 'Cardiovascular',
    }, {
      id: 'Cardiovascular|Ventricular arrhythmia',
      label: 'Cardiovascular: Ventricular arrhythmia',
      category: 'Cardiovascular',
    }, {
      id: 'Cardiovascular|Ventricular extrasystole',
      label: 'Cardiovascular: Ventricular extrasystole',
      category: 'Cardiovascular',
    }, {
      id: 'Cardiovascular|Ventricular fibrillation',
      label: 'Cardiovascular: Ventricular fibrillation',
      category: 'Cardiovascular',
    }, {
      id: 'Cardiovascular|Ventricular tachycardia',
      label: 'Cardiovascular: Ventricular tachycardia',
      category: 'Cardiovascular',
    }, {
      id: 'Cardiovascular|Ventricular tachycardia, polymorphic',
      label: 'Cardiovascular: Ventricular tachycardia, polymorphic',
      category: 'Cardiovascular',
    }, {
      id: 'Cardiovascular|Other',
      label: 'Cardiovascular: Other',
      category: 'Cardiovascular',
    }, {
      id: 'Dermatologic|Abscess',
      label: 'Dermatologic: Abscess',
      category: 'Dermatologic',
    }, {
      id: 'Dermatologic|Acne',
      label: 'Dermatologic: Acne',
      category: 'Dermatologic',
    }, {
      id: 'Dermatologic|Acrodynia',
      label: 'Dermatologic: Acrodynia',
      category: 'Dermatologic',
    }, {
      id: 'Dermatologic|Alopecia',
      label: 'Dermatologic: Alopecia',
      category: 'Dermatologic',
    }, {
      id: 'Dermatologic|Bite',
      label: 'Dermatologic: Bite',
      category: 'Dermatologic',
    }, {
      id: 'Dermatologic|Blisters',
      label: 'Dermatologic: Blisters',
      category: 'Dermatologic',
    }, {
      id: 'Dermatologic|Bowen\'s disease',
      label: 'Dermatologic: Bowen\'s disease',
      category: 'Dermatologic',
    }, {
      id: 'Dermatologic|Bullous eruption',
      label: 'Dermatologic: Bullous eruption',
      category: 'Dermatologic',
    }, {
      id: 'Dermatologic|Burns - (2nd and 3rd degree)',
      label: 'Dermatologic: Burns - (2nd and 3rd degree)',
      category: 'Dermatologic',
    }, {
      id: 'Dermatologic|Burns - superficial/1st degree',
      label: 'Dermatologic: Burns - superficial/1st degree',
      category: 'Dermatologic',
    }, {
      id: 'Dermatologic|Cellulitis',
      label: 'Dermatologic: Cellulitis',
      category: 'Dermatologic',
    }, {
      id: 'Dermatologic|Chloracne',
      label: 'Dermatologic: Chloracne',
      category: 'Dermatologic',
    }, {
      id: 'Dermatologic|Dry skin',
      label: 'Dermatologic: Dry skin',
      category: 'Dermatologic',
    }, {
      id: 'Dermatologic|Ecchymosis',
      label: 'Dermatologic: Ecchymosis',
      category: 'Dermatologic',
    }, {
      id: 'Dermatologic|Epidermolysis',
      label: 'Dermatologic: Epidermolysis',
      category: 'Dermatologic',
    }, {
      id: 'Dermatologic|Erythema',
      label: 'Dermatologic: Erythema',
      category: 'Dermatologic',
    }, {
      id: 'Dermatologic|Flushing',
      label: 'Dermatologic: Flushing',
      category: 'Dermatologic',
    }, {
      id: 'Dermatologic|Hives/welts',
      label: 'Dermatologic: Hives/welts',
      category: 'Dermatologic',
    }, {
      id: 'Dermatologic|Hyperkeratosis',
      label: 'Dermatologic: Hyperkeratosis',
      category: 'Dermatologic',
    }, {
      id: 'Dermatologic|Irritation',
      label: 'Dermatologic: Irritation',
      category: 'Dermatologic',
    }, {
      id: 'Dermatologic|Mee’s Lines',
      label: 'Dermatologic: Mee’s Lines',
      category: 'Dermatologic',
    }, {
      id: 'Dermatologic|Mucosal hyperaemia',
      label: 'Dermatologic: Mucosal hyperaemia',
      category: 'Dermatologic',
    }, {
      id: 'Dermatologic|Necrosis',
      label: 'Dermatologic: Necrosis',
      category: 'Dermatologic',
    }, {
      id: 'Dermatologic|Oedema, local',
      label: 'Dermatologic: Oedema, local',
      category: 'Dermatologic',
    }, {
      id: 'Dermatologic|Pallor',
      label: 'Dermatologic: Pallor',
      category: 'Dermatologic',
    }, {
      id: 'Dermatologic|Petechiae',
      label: 'Dermatologic: Petechiae',
      category: 'Dermatologic',
    }, {
      id: 'Dermatologic|Piloerection',
      label: 'Dermatologic: Piloerection',
      category: 'Dermatologic',
    }, {
      id: 'Dermatologic|Pruritus',
      label: 'Dermatologic: Pruritus',
      category: 'Dermatologic',
    }, {
      id: 'Dermatologic|Puncture',
      label: 'Dermatologic: Puncture',
      category: 'Dermatologic',
    }, {
      id: 'Dermatologic|Rash',
      label: 'Dermatologic: Rash',
      category: 'Dermatologic',
    }, {
      id: 'Dermatologic|Scratch mark',
      label: 'Dermatologic: Scratch mark',
      category: 'Dermatologic',
    }, {
      id: 'Dermatologic|Skin discoloration',
      label: 'Dermatologic: Skin discoloration',
      category: 'Dermatologic',
    }, {
      id: 'Dermatologic|Sting',
      label: 'Dermatologic: Sting',
      category: 'Dermatologic',
    }, {
      id: 'Dermatologic|Sweating',
      label: 'Dermatologic: Sweating',
      category: 'Dermatologic',
    }, {
      id: 'Dermatologic|Track marks',
      label: 'Dermatologic: Track marks',
      category: 'Dermatologic',
    }, {
      id: 'Dermatologic|Ulceration (skin/mucosa)',
      label: 'Dermatologic: Ulceration (skin/mucosa)',
      category: 'Dermatologic',
    }, {
      id: 'Dermatologic|Other',
      label: 'Dermatologic: Other',
      category: 'Dermatologic',
    }, {
      id: 'Endocrine and Reproductive|Abortion',
      label: 'Endocrine and Reproductive: Abortion',
      category: 'Endocrine and Reproductive',
    }, {
      id: 'Endocrine and Reproductive|Conn\'s syndrome/hyperaldosteronism',
      label: 'Endocrine and Reproductive: Conn\'s syndrome/hyperaldosteronism',
      category: 'Endocrine and Reproductive',
    }, {
      id: 'Endocrine and Reproductive|Cushing\'s syndrome',
      label: 'Endocrine and Reproductive: Cushing\'s syndrome',
      category: 'Endocrine and Reproductive',
    }, {
      id: 'Endocrine and Reproductive|Hyperthyroidism',
      label: 'Endocrine and Reproductive: Hyperthyroidism',
      category: 'Endocrine and Reproductive',
    }, {
      id: 'Endocrine and Reproductive|Hypoaldosteronism',
      label: 'Endocrine and Reproductive: Hypoaldosteronism',
      category: 'Endocrine and Reproductive',
    }, {
      id: 'Endocrine and Reproductive|Hypothyroidism',
      label: 'Endocrine and Reproductive: Hypothyroidism',
      category: 'Endocrine and Reproductive',
    }, {
      id: 'Endocrine and Reproductive|Impotence',
      label: 'Endocrine and Reproductive: Impotence',
      category: 'Endocrine and Reproductive',
    }, {
      id: 'Endocrine and Reproductive|Inappropriate secretion of antidiuretic hormone (SIADH)',
      label: 'Endocrine and Reproductive: Inappropriate secretion of antidiuretic hormone (SIADH)',
      category: 'Endocrine and Reproductive',
    }, {
      id: 'Endocrine and Reproductive|Menorrhagia',
      label: 'Endocrine and Reproductive: Menorrhagia',
      category: 'Endocrine and Reproductive',
    }, {
      id: 'Endocrine and Reproductive|Menstrual disorder',
      label: 'Endocrine and Reproductive: Menstrual disorder',
      category: 'Endocrine and Reproductive',
    }, {
      id: 'Endocrine and Reproductive|Priapism',
      label: 'Endocrine and Reproductive: Priapism',
      category: 'Endocrine and Reproductive',
    }, {
      id: 'Endocrine and Reproductive|Other',
      label: 'Endocrine and Reproductive: Other',
      category: 'Endocrine and Reproductive',
    }, {
      id: 'Eye, Ear and Nose|Anisocoria',
      label: 'Eye, Ear and Nose: Anisocoria',
      category: 'Eye, Ear and Nose',
    }, {
      id: 'Eye, Ear and Nose|Blepharospasm',
      label: 'Eye, Ear and Nose: Blepharospasm',
      category: 'Eye, Ear and Nose',
    }, {
      id: 'Eye, Ear and Nose|Blindness',
      label: 'Eye, Ear and Nose: Blindness',
      category: 'Eye, Ear and Nose',
    }, {
      id: 'Eye, Ear and Nose|Blurred vision',
      label: 'Eye, Ear and Nose: Blurred vision',
      category: 'Eye, Ear and Nose',
    }, {
      id: 'Eye, Ear and Nose|Chromatopsia',
      label: 'Eye, Ear and Nose: Chromatopsia',
      category: 'Eye, Ear and Nose',
    }, {
      id: 'Eye, Ear and Nose|Conjunctival irritation',
      label: 'Eye, Ear and Nose: Conjunctival irritation',
      category: 'Eye, Ear and Nose',
    }, {
      id: 'Eye, Ear and Nose|Corneal abrasion/ulceration',
      label: 'Eye, Ear and Nose: Corneal abrasion/ulceration',
      category: 'Eye, Ear and Nose',
    }, {
      id: 'Eye, Ear and Nose|Deafness',
      label: 'Eye, Ear and Nose: Deafness',
      category: 'Eye, Ear and Nose',
    }, {
      id: 'Eye, Ear and Nose|Diplopia',
      label: 'Eye, Ear and Nose: Diplopia',
      category: 'Eye, Ear and Nose',
    }, {
      id: 'Eye, Ear and Nose|Epistaxis',
      label: 'Eye, Ear and Nose: Epistaxis',
      category: 'Eye, Ear and Nose',
    }, {
      id: 'Eye, Ear and Nose|Lacrimation',
      label: 'Eye, Ear and Nose: Lacrimation',
      category: 'Eye, Ear and Nose',
    }, {
      id: 'Eye, Ear and Nose|Miosis',
      label: 'Eye, Ear and Nose: Miosis',
      category: 'Eye, Ear and Nose',
    }, {
      id: 'Eye, Ear and Nose|Mydriasis',
      label: 'Eye, Ear and Nose: Mydriasis',
      category: 'Eye, Ear and Nose',
    }, {
      id: 'Eye, Ear and Nose|Non-reactive pupils',
      label: 'Eye, Ear and Nose: Non-reactive pupils',
      category: 'Eye, Ear and Nose',
    }, {
      id: 'Eye, Ear and Nose|Oculogyric crisis',
      label: 'Eye, Ear and Nose: Oculogyric crisis',
      category: 'Eye, Ear and Nose',
    }, {
      id: 'Eye, Ear and Nose|Papilloedema',
      label: 'Eye, Ear and Nose: Papilloedema',
      category: 'Eye, Ear and Nose',
    }, {
      id: 'Eye, Ear and Nose|Parosmia',
      label: 'Eye, Ear and Nose: Parosmia',
      category: 'Eye, Ear and Nose',
    }, {
      id: 'Eye, Ear and Nose|Photophobia',
      label: 'Eye, Ear and Nose: Photophobia',
      category: 'Eye, Ear and Nose',
    }, {
      id: 'Eye, Ear and Nose|Ptosis, palpebral',
      label: 'Eye, Ear and Nose: Ptosis, palpebral',
      category: 'Eye, Ear and Nose',
    }, {
      id: 'Eye, Ear and Nose|Rhinitis',
      label: 'Eye, Ear and Nose: Rhinitis',
      category: 'Eye, Ear and Nose',
    }, {
      id: 'Eye, Ear and Nose|Scotoma',
      label: 'Eye, Ear and Nose: Scotoma',
      category: 'Eye, Ear and Nose',
    }, {
      id: 'Eye, Ear and Nose|Strabismus',
      label: 'Eye, Ear and Nose: Strabismus',
      category: 'Eye, Ear and Nose',
    }, {
      id: 'Eye, Ear and Nose|Subconjunctival haemorrhage',
      label: 'Eye, Ear and Nose: Subconjunctival haemorrhage',
      category: 'Eye, Ear and Nose',
    }, {
      id: 'Eye, Ear and Nose|Tinnitus',
      label: 'Eye, Ear and Nose: Tinnitus',
      category: 'Eye, Ear and Nose',
    }, {
      id: 'Eye, Ear and Nose|Visual defect',
      label: 'Eye, Ear and Nose: Visual defect',
      category: 'Eye, Ear and Nose',
    }, {
      id: 'Eye, Ear and Nose|Other',
      label: 'Eye, Ear and Nose: Other',
      category: 'Eye, Ear and Nose',
    }, {
      id: 'Gastrointestinal|Abdominal pain',
      label: 'Gastrointestinal: Abdominal pain',
      category: 'Gastrointestinal',
    }, {
      id: 'Gastrointestinal|Anorexia',
      label: 'Gastrointestinal: Anorexia',
      category: 'Gastrointestinal',
    }, {
      id: 'Gastrointestinal|Burton\'s lines',
      label: 'Gastrointestinal: Burton\'s lines',
      category: 'Gastrointestinal',
    }, {
      id: 'Gastrointestinal|Constipation',
      label: 'Gastrointestinal: Constipation',
      category: 'Gastrointestinal',
    }, {
      id: 'Gastrointestinal|Diarrhoea/hyperperistalsis',
      label: 'Gastrointestinal: Diarrhoea/hyperperistalsis',
      category: 'Gastrointestinal',
    }, {
      id: 'Gastrointestinal|Dry mouth',
      label: 'Gastrointestinal: Dry mouth',
      category: 'Gastrointestinal',
    }, {
      id: 'Gastrointestinal|Dyspepsia',
      label: 'Gastrointestinal: Dyspepsia',
      category: 'Gastrointestinal',
    }, {
      id: 'Gastrointestinal|Dysphagia',
      label: 'Gastrointestinal: Dysphagia',
      category: 'Gastrointestinal',
    }, {
      id: 'Gastrointestinal|Faecal incontinence',
      label: 'Gastrointestinal: Faecal incontinence',
      category: 'Gastrointestinal',
    }, {
      id: 'Gastrointestinal|Glossitis',
      label: 'Gastrointestinal: Glossitis',
      category: 'Gastrointestinal',
    }, {
      id: 'Gastrointestinal|Haematemesis',
      label: 'Gastrointestinal: Haematemesis',
      category: 'Gastrointestinal',
    }, {
      id: 'Gastrointestinal|Halitosis',
      label: 'Gastrointestinal: Halitosis',
      category: 'Gastrointestinal',
    }, {
      id: 'Gastrointestinal|Ileus/hypoperistalsis',
      label: 'Gastrointestinal: Ileus/hypoperistalsis',
      category: 'Gastrointestinal',
    }, {
      id: 'Gastrointestinal|Melaena',
      label: 'Gastrointestinal: Melaena',
      category: 'Gastrointestinal',
    }, {
      id: 'Gastrointestinal|Nausea',
      label: 'Gastrointestinal: Nausea',
      category: 'Gastrointestinal',
    }, {
      id: 'Gastrointestinal|Oesophageal injury/ulceration',
      label: 'Gastrointestinal: Oesophageal injury/ulceration',
      category: 'Gastrointestinal',
    }, {
      id: 'Gastrointestinal|Oesophageal irritation/oesophagitis',
      label: 'Gastrointestinal: Oesophageal irritation/oesophagitis',
      category: 'Gastrointestinal',
    }, {
      id: 'Gastrointestinal|Oesophageal stricture',
      label: 'Gastrointestinal: Oesophageal stricture',
      category: 'Gastrointestinal',
    }, {
      id: 'Gastrointestinal|Oropharyngeal injury/ulceration',
      label: 'Gastrointestinal: Oropharyngeal injury/ulceration',
      category: 'Gastrointestinal',
    }, {
      id: 'Gastrointestinal|Oropharyngeal irritation/pharyngitis',
      label: 'Gastrointestinal: Oropharyngeal irritation/pharyngitis',
      category: 'Gastrointestinal',
    }, {
      id: 'Gastrointestinal|Perforation',
      label: 'Gastrointestinal: Perforation',
      category: 'Gastrointestinal',
    }, {
      id: 'Gastrointestinal|Pyrosis/heart burn',
      label: 'Gastrointestinal: Pyrosis/heart burn',
      category: 'Gastrointestinal',
    }, {
      id: 'Gastrointestinal|Salivation',
      label: 'Gastrointestinal: Salivation',
      category: 'Gastrointestinal',
    }, {
      id: 'Gastrointestinal|Vomiting',
      label: 'Gastrointestinal: Vomiting',
      category: 'Gastrointestinal',
    }, {
      id: 'Gastrointestinal|Other',
      label: 'Gastrointestinal: Other',
      category: 'Gastrointestinal',
    }, {
      id: 'General Disorder|Fatigue/tiredness',
      label: 'General Disorder: Fatigue/tiredness',
      category: 'General Disorder',
    }, {
      id: 'General Disorder|Fever',
      label: 'General Disorder: Fever',
      category: 'General Disorder',
    }, {
      id: 'General Disorder|Malaise',
      label: 'General Disorder: Malaise',
      category: 'General Disorder',
    }, {
      id: 'General Disorder|Oedema generalised',
      label: 'General Disorder: Oedema generalised',
      category: 'General Disorder',
    }, {
      id: 'General Disorder|Pain/aches generalised',
      label: 'General Disorder: Pain/aches generalised',
      category: 'General Disorder',
    }, {
      id: 'General Disorder|Pain localised',
      label: 'General Disorder: Pain localised',
      category: 'General Disorder',
    }, {
      id: 'General Disorder|Other',
      label: 'General Disorder: Other',
      category: 'General Disorder',
    }, {
      id: 'Haematologic |Anaemia',
      label: 'Haematologic : Anaemia',
      category: 'Haematologic ',
    }, {
      id: 'Haematologic |Bleeding',
      label: 'Haematologic : Bleeding',
      category: 'Haematologic ',
    }, {
      id: 'Haematologic |Disseminated Intravascular Coagulation',
      label: 'Haematologic : Disseminated Intravascular Coagulation',
      category: 'Haematologic ',
    }, {
      id: 'Haematologic |Haemolysis',
      label: 'Haematologic : Haemolysis',
      category: 'Haematologic ',
    }, {
      id: 'Haematologic |Leucocytosis',
      label: 'Haematologic : Leucocytosis',
      category: 'Haematologic ',
    }, {
      id: 'Haematologic |Leucopaenia',
      label: 'Haematologic : Leucopaenia',
      category: 'Haematologic ',
    }, {
      id: 'Haematologic |Lymphadenopathy',
      label: 'Haematologic : Lymphadenopathy',
      category: 'Haematologic ',
    }, {
      id: 'Haematologic |Polycythaemia',
      label: 'Haematologic : Polycythaemia',
      category: 'Haematologic ',
    }, {
      id: 'Haematologic |Purpura',
      label: 'Haematologic : Purpura',
      category: 'Haematologic ',
    }, {
      id: 'Haematologic |Thrombocytopaenia',
      label: 'Haematologic : Thrombocytopaenia',
      category: 'Haematologic ',
    }, {
      id: 'Haematologic |Thrombocytosis',
      label: 'Haematologic : Thrombocytosis',
      category: 'Haematologic ',
    }, {
      id: 'Haematologic |Other',
      label: 'Haematologic : Other',
      category: 'Haematologic ',
    }, {
      id: 'Hepatic and Biliary|Ascites',
      label: 'Hepatic and Biliary: Ascites',
      category: 'Hepatic and Biliary',
    }, {
      id: 'Hepatic and Biliary|Encephalopathy',
      label: 'Hepatic and Biliary: Encephalopathy',
      category: 'Hepatic and Biliary',
    }, {
      id: 'Hepatic and Biliary|Hepatic failure/insufficiency',
      label: 'Hepatic and Biliary: Hepatic failure/insufficiency',
      category: 'Hepatic and Biliary',
    }, {
      id: 'Hepatic and Biliary|Hepatomegaly',
      label: 'Hepatic and Biliary: Hepatomegaly',
      category: 'Hepatic and Biliary',
    }, {
      id: 'Hepatic and Biliary|Jaundice',
      label: 'Hepatic and Biliary: Jaundice',
      category: 'Hepatic and Biliary',
    }, {
      id: 'Hepatic and Biliary|Liver tenderness',
      label: 'Hepatic and Biliary: Liver tenderness',
      category: 'Hepatic and Biliary',
    }, {
      id: 'Hepatic and Biliary|Other',
      label: 'Hepatic and Biliary: Other',
      category: 'Hepatic and Biliary',
    }, {
      id: 'Immunologic and Allergic|Anaphylaxis',
      label: 'Immunologic and Allergic: Anaphylaxis',
      category: 'Immunologic and Allergic',
    }, {
      id: 'Immunologic and Allergic|Immune deficiency',
      label: 'Immunologic and Allergic: Immune deficiency',
      category: 'Immunologic and Allergic',
    }, {
      id: 'Immunologic and Allergic|Immune hyperactivity',
      label: 'Immunologic and Allergic: Immune hyperactivity',
      category: 'Immunologic and Allergic',
    }, {
      id: 'Immunologic and Allergic|Stevens-Johnson syndrome',
      label: 'Immunologic and Allergic: Stevens-Johnson syndrome',
      category: 'Immunologic and Allergic',
    }, {
      id: 'Immunologic and Allergic|Urticaria',
      label: 'Immunologic and Allergic: Urticaria',
      category: 'Immunologic and Allergic',
    }, {
      id: 'Immunologic and Allergic|Other',
      label: 'Immunologic and Allergic: Other',
      category: 'Immunologic and Allergic',
    }, {
      id: 'Metabolic and Nutritional|Alkalosis',
      label: 'Metabolic and Nutritional: Alkalosis',
      category: 'Metabolic and Nutritional',
    }, {
      id: 'Metabolic and Nutritional|Dehydration',
      label: 'Metabolic and Nutritional: Dehydration',
      category: 'Metabolic and Nutritional',
    }, {
      id: 'Metabolic and Nutritional|Hypercalcaemia',
      label: 'Metabolic and Nutritional: Hypercalcaemia',
      category: 'Metabolic and Nutritional',
    }, {
      id: 'Metabolic and Nutritional|Hyperglycaemia',
      label: 'Metabolic and Nutritional: Hyperglycaemia',
      category: 'Metabolic and Nutritional',
    }, {
      id: 'Metabolic and Nutritional|Hyperkalaemia',
      label: 'Metabolic and Nutritional: Hyperkalaemia',
      category: 'Metabolic and Nutritional',
    }, {
      id: 'Metabolic and Nutritional|Hypermagnesaemia',
      label: 'Metabolic and Nutritional: Hypermagnesaemia',
      category: 'Metabolic and Nutritional',
    }, {
      id: 'Metabolic and Nutritional|Hypernatraemia',
      label: 'Metabolic and Nutritional: Hypernatraemia',
      category: 'Metabolic and Nutritional',
    }, {
      id: 'Metabolic and Nutritional|Hyperthermia',
      label: 'Metabolic and Nutritional: Hyperthermia',
      category: 'Metabolic and Nutritional',
    }, {
      id: 'Metabolic and Nutritional|Hypocalcaemia',
      label: 'Metabolic and Nutritional: Hypocalcaemia',
      category: 'Metabolic and Nutritional',
    }, {
      id: 'Metabolic and Nutritional|Hypoglycaemia',
      label: 'Metabolic and Nutritional: Hypoglycaemia',
      category: 'Metabolic and Nutritional',
    }, {
      id: 'Metabolic and Nutritional|Hypokalaemia',
      label: 'Metabolic and Nutritional: Hypokalaemia',
      category: 'Metabolic and Nutritional',
    }, {
      id: 'Metabolic and Nutritional|Hypomagnesaemia',
      label: 'Metabolic and Nutritional: Hypomagnesaemia',
      category: 'Metabolic and Nutritional',
    }, {
      id: 'Metabolic and Nutritional|Hyponatraemia',
      label: 'Metabolic and Nutritional: Hyponatraemia',
      category: 'Metabolic and Nutritional',
    }, {
      id: 'Metabolic and Nutritional|Hypothermia',
      label: 'Metabolic and Nutritional: Hypothermia',
      category: 'Metabolic and Nutritional',
    }, {
      id: 'Metabolic and Nutritional|Malnutrition',
      label: 'Metabolic and Nutritional: Malnutrition',
      category: 'Metabolic and Nutritional',
    }, {
      id: 'Metabolic and Nutritional|Metabolic acidosis',
      label: 'Metabolic and Nutritional: Metabolic acidosis',
      category: 'Metabolic and Nutritional',
    }, {
      id: 'Metabolic and Nutritional|Respiratory acidosis',
      label: 'Metabolic and Nutritional: Respiratory acidosis',
      category: 'Metabolic and Nutritional',
    }, {
      id: 'Metabolic and Nutritional|Other',
      label: 'Metabolic and Nutritional: Other',
      category: 'Metabolic and Nutritional',
    }, {
      id: 'Neuro-Psychiatric/Muscular|Agitation/irritability',
      label: 'Neuro-Psychiatric/Muscular: Agitation/irritability',
      category: 'Neuro-Psychiatric/Muscular',
    }, {
      id: 'Neuro-Psychiatric/Muscular|Ataxia',
      label: 'Neuro-Psychiatric/Muscular: Ataxia',
      category: 'Neuro-Psychiatric/Muscular',
    }, {
      id: 'Neuro-Psychiatric/Muscular|Babinski sign +',
      label: 'Neuro-Psychiatric/Muscular: Babinski sign +',
      category: 'Neuro-Psychiatric/Muscular',
    }, {
      id: 'Neuro-Psychiatric/Muscular|Behavioural change',
      label: 'Neuro-Psychiatric/Muscular: Behavioural change',
      category: 'Neuro-Psychiatric/Muscular',
    }, {
      id: 'Neuro-Psychiatric/Muscular|Coma',
      label: 'Neuro-Psychiatric/Muscular: Coma',
      category: 'Neuro-Psychiatric/Muscular',
    }, {
      id: 'Neuro-Psychiatric/Muscular|Confusion',
      label: 'Neuro-Psychiatric/Muscular: Confusion',
      category: 'Neuro-Psychiatric/Muscular',
    }, {
      id: 'Neuro-Psychiatric/Muscular|Convulsions/seizures',
      label: 'Neuro-Psychiatric/Muscular: Convulsions/seizures',
      category: 'Neuro-Psychiatric/Muscular',
    }, {
      id: 'Neuro-Psychiatric/Muscular|Dizziness/vertigo',
      label: 'Neuro-Psychiatric/Muscular: Dizziness/vertigo',
      category: 'Neuro-Psychiatric/Muscular',
    }, {
      id: 'Neuro-Psychiatric/Muscular|Drowsiness/lethargy',
      label: 'Neuro-Psychiatric/Muscular: Drowsiness/lethargy',
      category: 'Neuro-Psychiatric/Muscular',
    }, {
      id: 'Neuro-Psychiatric/Muscular|Dysarthia',
      label: 'Neuro-Psychiatric/Muscular: Dysarthia',
      category: 'Neuro-Psychiatric/Muscular',
    }, {
      id: 'Neuro-Psychiatric/Muscular|Dystonia',
      label: 'Neuro-Psychiatric/Muscular: Dystonia',
      category: 'Neuro-Psychiatric/Muscular',
    }, {
      id: 'Neuro-Psychiatric/Muscular|Extrapyramidal syndrome',
      label: 'Neuro-Psychiatric/Muscular: Extrapyramidal syndrome',
      category: 'Neuro-Psychiatric/Muscular',
    }, {
      id: 'Neuro-Psychiatric/Muscular|Fasciculation',
      label: 'Neuro-Psychiatric/Muscular: Fasciculation',
      category: 'Neuro-Psychiatric/Muscular',
    }, {
      id: 'Neuro-Psychiatric/Muscular|Flashbacks',
      label: 'Neuro-Psychiatric/Muscular: Flashbacks',
      category: 'Neuro-Psychiatric/Muscular',
    }, {
      id: 'Neuro-Psychiatric/Muscular|Hallucinations/delusions',
      label: 'Neuro-Psychiatric/Muscular: Hallucinations/delusions',
      category: 'Neuro-Psychiatric/Muscular',
    }, {
      id: 'Neuro-Psychiatric/Muscular|Headache',
      label: 'Neuro-Psychiatric/Muscular: Headache',
      category: 'Neuro-Psychiatric/Muscular',
    }, {
      id: 'Neuro-Psychiatric/Muscular|Hyperreflexia',
      label: 'Neuro-Psychiatric/Muscular: Hyperreflexia',
      category: 'Neuro-Psychiatric/Muscular',
    }, {
      id: 'Neuro-Psychiatric/Muscular|Hypertonia',
      label: 'Neuro-Psychiatric/Muscular: Hypertonia',
      category: 'Neuro-Psychiatric/Muscular',
    }, {
      id: 'Neuro-Psychiatric/Muscular|Hyporeflexia',
      label: 'Neuro-Psychiatric/Muscular: Hyporeflexia',
      category: 'Neuro-Psychiatric/Muscular',
    }, {
      id: 'Neuro-Psychiatric/Muscular|Hypotonia',
      label: 'Neuro-Psychiatric/Muscular: Hypotonia',
      category: 'Neuro-Psychiatric/Muscular',
    }, {
      id: 'Neuro-Psychiatric/Muscular|Intracerebral bleeding',
      label: 'Neuro-Psychiatric/Muscular: Intracerebral bleeding',
      category: 'Neuro-Psychiatric/Muscular',
    }, {
      id: 'Neuro-Psychiatric/Muscular|Muscular rigidity',
      label: 'Neuro-Psychiatric/Muscular: Muscular rigidity',
      category: 'Neuro-Psychiatric/Muscular',
    }, {
      id: 'Neuro-Psychiatric/Muscular|Muscular weakness',
      label: 'Neuro-Psychiatric/Muscular: Muscular weakness',
      category: 'Neuro-Psychiatric/Muscular',
    }, {
      id: 'Neuro-Psychiatric/Muscular|Myalgia/cramps',
      label: 'Neuro-Psychiatric/Muscular: Myalgia/cramps',
      category: 'Neuro-Psychiatric/Muscular',
    }, {
      id: 'Neuro-Psychiatric/Muscular|Nystagmus',
      label: 'Neuro-Psychiatric/Muscular: Nystagmus',
      category: 'Neuro-Psychiatric/Muscular',
    }, {
      id: 'Neuro-Psychiatric/Muscular|Opisthotonus',
      label: 'Neuro-Psychiatric/Muscular: Opisthotonus',
      category: 'Neuro-Psychiatric/Muscular',
    }, {
      id: 'Neuro-Psychiatric/Muscular|Paralysis',
      label: 'Neuro-Psychiatric/Muscular: Paralysis',
      category: 'Neuro-Psychiatric/Muscular',
    }, {
      id: 'Neuro-Psychiatric/Muscular|Parkinson\'s syndrome',
      label: 'Neuro-Psychiatric/Muscular: Parkinson\'s syndrome',
      category: 'Neuro-Psychiatric/Muscular',
    }, {
      id: 'Neuro-Psychiatric/Muscular|Peripheral neuropathy',
      label: 'Neuro-Psychiatric/Muscular: Peripheral neuropathy',
      category: 'Neuro-Psychiatric/Muscular',
    }, {
      id: 'Neuro-Psychiatric/Muscular|Pyramidal syndrome',
      label: 'Neuro-Psychiatric/Muscular: Pyramidal syndrome',
      category: 'Neuro-Psychiatric/Muscular',
    }, {
      id: 'Neuro-Psychiatric/Muscular|Rhabdomyolysis',
      label: 'Neuro-Psychiatric/Muscular: Rhabdomyolysis',
      category: 'Neuro-Psychiatric/Muscular',
    }, {
      id: 'Neuro-Psychiatric/Muscular|Slurred speech',
      label: 'Neuro-Psychiatric/Muscular: Slurred speech',
      category: 'Neuro-Psychiatric/Muscular',
    }, {
      id: 'Neuro-Psychiatric/Muscular|Status epilepticus',
      label: 'Neuro-Psychiatric/Muscular: Status epilepticus',
      category: 'Neuro-Psychiatric/Muscular',
    }, {
      id: 'Neuro-Psychiatric/Muscular|Syncope',
      label: 'Neuro-Psychiatric/Muscular: Syncope',
      category: 'Neuro-Psychiatric/Muscular',
    }, {
      id: 'Neuro-Psychiatric/Muscular|Tremor',
      label: 'Neuro-Psychiatric/Muscular: Tremor',
      category: 'Neuro-Psychiatric/Muscular',
    }, {
      id: 'Neuro-Psychiatric/Muscular|Trismus',
      label: 'Neuro-Psychiatric/Muscular: Trismus',
      category: 'Neuro-Psychiatric/Muscular',
    }, {
      id: 'Neuro-Psychiatric/Muscular|Other',
      label: 'Neuro-Psychiatric/Muscular: Other',
      category: 'Neuro-Psychiatric/Muscular',
    }, {
      id: 'Other|Collagen disorders',
      label: 'Other: Collagen disorders',
      category: 'Other',
    }, {
      id: 'Other|Foetal disorders',
      label: 'Other: Foetal disorders',
      category: 'Other',
    }, {
      id: 'Other|Neonatal/infancy disorders',
      label: 'Other: Neonatal/infancy disorders',
      category: 'Other',
    }, {
      id: 'Other|Neoplasm',
      label: 'Other: Neoplasm',
      category: 'Other',
    }, {
      id: 'Other|Other',
      label: 'Other: Other',
      category: 'Other',
    }, {
      id: 'Respiratory|Acute Respiratory Distress Syndrome',
      label: 'Respiratory: Acute Respiratory Distress Syndrome',
      category: 'Respiratory',
    }, {
      id: 'Respiratory|Asbestosis',
      label: 'Respiratory: Asbestosis',
      category: 'Respiratory',
    }, {
      id: 'Respiratory|Berylliosis',
      label: 'Respiratory: Berylliosis',
      category: 'Respiratory',
    }, {
      id: 'Respiratory|Bradypnoea',
      label: 'Respiratory: Bradypnoea',
      category: 'Respiratory',
    }, {
      id: 'Respiratory|Bronchorrhoea',
      label: 'Respiratory: Bronchorrhoea',
      category: 'Respiratory',
    }, {
      id: 'Respiratory|Bronchospasm',
      label: 'Respiratory: Bronchospasm',
      category: 'Respiratory',
    }, {
      id: 'Respiratory|Cheyne-Stokes respiration',
      label: 'Respiratory: Cheyne-Stokes respiration',
      category: 'Respiratory',
    }, {
      id: 'Respiratory|Cough/choking',
      label: 'Respiratory: Cough/choking',
      category: 'Respiratory',
    }, {
      id: 'Respiratory|Cyanosis',
      label: 'Respiratory: Cyanosis',
      category: 'Respiratory',
    }, {
      id: 'Respiratory|Dysphonia',
      label: 'Respiratory: Dysphonia',
      category: 'Respiratory',
    }, {
      id: 'Respiratory|Dyspnoea',
      label: 'Respiratory: Dyspnoea',
      category: 'Respiratory',
    }, {
      id: 'Respiratory|Haemoptysis',
      label: 'Respiratory: Haemoptysis',
      category: 'Respiratory',
    }, {
      id: 'Respiratory|Hyperventilation/tachypnoea',
      label: 'Respiratory: Hyperventilation/tachypnoea',
      category: 'Respiratory',
    }, {
      id: 'Respiratory|Kussmaul\'s breathing',
      label: 'Respiratory: Kussmaul\'s breathing',
      category: 'Respiratory',
    }, {
      id: 'Respiratory|Laryngitis',
      label: 'Respiratory: Laryngitis',
      category: 'Respiratory',
    }, {
      id: 'Respiratory|Laryngospasm',
      label: 'Respiratory: Laryngospasm',
      category: 'Respiratory',
    }, {
      id: 'Respiratory|Laryngotracheal oedema',
      label: 'Respiratory: Laryngotracheal oedema',
      category: 'Respiratory',
    }, {
      id: 'Respiratory|Pneumonitis',
      label: 'Respiratory: Pneumonitis',
      category: 'Respiratory',
    }, {
      id: 'Respiratory|Pulmonary oedema',
      label: 'Respiratory: Pulmonary oedema',
      category: 'Respiratory',
    }, {
      id: 'Respiratory|Respiratory arrest',
      label: 'Respiratory: Respiratory arrest',
      category: 'Respiratory',
    }, {
      id: 'Respiratory|Respiratory failure',
      label: 'Respiratory: Respiratory failure',
      category: 'Respiratory',
    }, {
      id: 'Respiratory|Other',
      label: 'Respiratory: Other',
      category: 'Respiratory',
    }, {
      id: 'Syndromes|Acquired ImmunoDeficiency Syndrome (AIDS)',
      label: 'Syndromes: Acquired ImmunoDeficiency Syndrome (AIDS)',
      category: 'Syndromes',
    }, {
      id: 'Syndromes|Acute Immunodeficiency syndrome',
      label: 'Syndromes: Acute Immunodeficiency syndrome',
      category: 'Syndromes',
    }, {
      id: 'Syndromes|Adrenergic',
      label: 'Syndromes: Adrenergic',
      category: 'Syndromes',
    }, {
      id: 'Syndromes|Alcohol withdrawal syndrome',
      label: 'Syndromes: Alcohol withdrawal syndrome',
      category: 'Syndromes',
    }, {
      id: 'Syndromes|Anticholinergic',
      label: 'Syndromes: Anticholinergic',
      category: 'Syndromes',
    }, {
      id: 'Syndromes|Baritosis',
      label: 'Syndromes: Baritosis',
      category: 'Syndromes',
    }, {
      id: 'Syndromes|Cholinergic',
      label: 'Syndromes: Cholinergic',
      category: 'Syndromes',
    }, {
      id: 'Syndromes|Cinchonism',
      label: 'Syndromes: Cinchonism',
      category: 'Syndromes',
    }, {
      id: 'Syndromes|Ergotism',
      label: 'Syndromes: Ergotism',
      category: 'Syndromes',
    }, {
      id: 'Syndromes|Fetal alcohol',
      label: 'Syndromes: Fetal alcohol',
      category: 'Syndromes',
    }, {
      id: 'Syndromes|Malignant neuroleptic',
      label: 'Syndromes: Malignant neuroleptic',
      category: 'Syndromes',
    }, {
      id: 'Syndromes|Metal fume fever',
      label: 'Syndromes: Metal fume fever',
      category: 'Syndromes',
    }, {
      id: 'Syndromes|Muscarinic',
      label: 'Syndromes: Muscarinic',
      category: 'Syndromes',
    }, {
      id: 'Syndromes|Nicotinic',
      label: 'Syndromes: Nicotinic',
      category: 'Syndromes',
    }, {
      id: 'Syndromes|Phalloides',
      label: 'Syndromes: Phalloides',
      category: 'Syndromes',
    }, {
      id: 'Syndromes|Reye\'s',
      label: 'Syndromes: Reye\'s',
      category: 'Syndromes',
    }, {
      id: 'Syndromes|Salicylism',
      label: 'Syndromes: Salicylism',
      category: 'Syndromes',
    }, {
      id: 'Syndromes|Saturnism',
      label: 'Syndromes: Saturnism',
      category: 'Syndromes',
    }, {
      id: 'Syndromes|Serotonergic',
      label: 'Syndromes: Serotonergic',
      category: 'Syndromes',
    }, {
      id: 'Syndromes|Zieve',
      label: 'Syndromes: Zieve',
      category: 'Syndromes',
    }, {
      id: 'Syndromes|Other',
      label: 'Syndromes: Other',
      category: 'Syndromes',
    }, {
      id: 'Urinary|Dysuria',
      label: 'Urinary: Dysuria',
      category: 'Urinary',
    }, {
      id: 'Urinary|Glomerulonephritis',
      label: 'Urinary: Glomerulonephritis',
      category: 'Urinary',
    }, {
      id: 'Urinary|Haematuria',
      label: 'Urinary: Haematuria',
      category: 'Urinary',
    }, {
      id: 'Urinary|Loin pain',
      label: 'Urinary: Loin pain',
      category: 'Urinary',
    }, {
      id: 'Urinary|Myoglobinuria',
      label: 'Urinary: Myoglobinuria',
      category: 'Urinary',
    }, {
      id: 'Urinary|Oliguria/anuria',
      label: 'Urinary: Oliguria/anuria',
      category: 'Urinary',
    }, {
      id: 'Urinary|Polyuria',
      label: 'Urinary: Polyuria',
      category: 'Urinary',
    }, {
      id: 'Urinary|Renal failure/insufficiency',
      label: 'Urinary: Renal failure/insufficiency',
      category: 'Urinary',
    }, {
      id: 'Urinary|Urinary incontinence',
      label: 'Urinary: Urinary incontinence',
      category: 'Urinary',
    }, {
      id: 'Urinary|Urinary pigmentation',
      label: 'Urinary: Urinary pigmentation',
      category: 'Urinary',
    }, {
      id: 'Urinary|Urinary retention',
      label: 'Urinary: Urinary retention',
      category: 'Urinary',
    }, {
      id: 'Urinary|Other',
      label: 'Urinary: Other',
      category: 'Urinary',
    },
  ];
}

export function getSpecialtyOptions() {
  return [
    { label: 'Clinical Toxicologist' },
    { label: 'Mycologist' },
    { label: 'Entomologist' },
  ];
}

export function getDispositionOptions() {
  return [
    { label: 'Manage at location of poisoning' },
    { label: 'Manage by GP' },
    { label: 'Manage at a hospital (ED, Admit, ICU)' },
    { label: 'Refused treatment' },
    { label: 'Other - see notes' },
    { label: 'Unknown' },
  ];
}

export function getTreatmentOptions() {
  return [
    {
      id: 'None|None',
      label: 'None: None',
      category: 'None',
    }, {
      id: 'Refused|Refused',
      label: 'Refused: Refused',
      category: 'Refused',
    }, {
      id: 'Dilution|Dilution',
      label: 'Dilution: Dilution',
      category: 'Dilution',
    }, {
      id: 'Neutralising agents|Neutralising agents',
      label: 'Neutralising agents: Neutralising agents',
      category: 'Neutralising agents',
    }, {
      id: 'Decontamination Internal|Gastric aspiration',
      label: 'Decontamination Internal: Gastric aspiration',
      category: 'Decontamination Internal',
    }, {
      id: 'Decontamination Internal|Gastric lavage',
      label: 'Decontamination Internal: Gastric lavage',
      category: 'Decontamination Internal',
    }, {
      id: 'Decontamination Internal|Induced emesis - ipecac',
      label: 'Decontamination Internal: Induced emesis - ipecac',
      category: 'Decontamination Internal',
    }, {
      id: 'Decontamination Internal|Induced emesis - other - see notes',
      label: 'Decontamination Internal: Induced emesis - other - see notes',
      category: 'Decontamination Internal',
    }, {
      id: 'Decontamination Internal|Activated Charcoal - single dose',
      label: 'Decontamination Internal: Activated Charcoal - single dose',
      category: 'Decontamination Internal',
    }, {
      id: 'Decontamination Internal|Activated Charcoal - repeated',
      label: 'Decontamination Internal: Activated Charcoal - repeated',
      category: 'Decontamination Internal',
    }, {
      id: 'Decontamination Internal|Fuller\'s earth',
      label: 'Decontamination Internal: Fuller\'s earth',
      category: 'Decontamination Internal',
    }, {
      id: 'Decontamination Internal|Cholestiramine',
      label: 'Decontamination Internal: Cholestiramine',
      category: 'Decontamination Internal',
    }, {
      id: 'Decontamination Internal|Other adsorbent',
      label: 'Decontamination Internal: Other adsorbent',
      category: 'Decontamination Internal',
    }, {
      id: 'Decontamination Internal|Cathartics',
      label: 'Decontamination Internal: Cathartics',
      category: 'Decontamination Internal',
    }, {
      id: 'Decontamination Internal|Whole bowel irrigation',
      label: 'Decontamination Internal: Whole bowel irrigation',
      category: 'Decontamination Internal',
    }, {
      id: 'Decontamination Internal|Endoscopic removal',
      label: 'Decontamination Internal: Endoscopic removal',
      category: 'Decontamination Internal',
    }, {
      id: 'Decontamination Internal|Rinse out mouth',
      label: 'Decontamination Internal: Rinse out mouth',
      category: 'Decontamination Internal',
    }, {
      id: 'Decontamination External|Skin decontamination',
      label: 'Decontamination External: Skin decontamination',
      category: 'Decontamination External',
    }, {
      id: 'Decontamination External|Irrigation of eyes',
      label: 'Decontamination External: Irrigation of eyes',
      category: 'Decontamination External',
    }, {
      id: 'Symptomatic/Support|Fluids & electrolytes p.o.',
      label: 'Symptomatic/Support: Fluids & electrolytes p.o.',
      category: 'Symptomatic/Support',
    }, {
      id: 'Symptomatic/Support|Fluids & electrolytes i.v.',
      label: 'Symptomatic/Support: Fluids & electrolytes i.v.',
      category: 'Symptomatic/Support',
    }, {
      id: 'Symptomatic/Support|Oxygen, normobaric',
      label: 'Symptomatic/Support: Oxygen, normobaric',
      category: 'Symptomatic/Support',
    }, {
      id: 'Symptomatic/Support|Oxygen, hyperbaric',
      label: 'Symptomatic/Support: Oxygen, hyperbaric',
      category: 'Symptomatic/Support',
    }, {
      id: 'Symptomatic/Support|Demulcents',
      label: 'Symptomatic/Support: Demulcents',
      category: 'Symptomatic/Support',
    }, {
      id: 'Symptomatic/Support|Transfusion',
      label: 'Symptomatic/Support: Transfusion',
      category: 'Symptomatic/Support',
    }, {
      id: 'Symptomatic/Support|Warming',
      label: 'Symptomatic/Support: Warming',
      category: 'Symptomatic/Support',
    }, {
      id: 'Symptomatic/Support|Cooling',
      label: 'Symptomatic/Support: Cooling',
      category: 'Symptomatic/Support',
    }, {
      id: 'Symptomatic/Support|Enteral nutrition',
      label: 'Symptomatic/Support: Enteral nutrition',
      category: 'Symptomatic/Support',
    }, {
      id: 'Symptomatic/Support|Parenteral nutrition',
      label: 'Symptomatic/Support: Parenteral nutrition',
      category: 'Symptomatic/Support',
    }, {
      id: 'Symptomatic/Support|Intubation',
      label: 'Symptomatic/Support: Intubation',
      category: 'Symptomatic/Support',
    }, {
      id: 'Symptomatic/Support|Artificial ventilation',
      label: 'Symptomatic/Support: Artificial ventilation',
      category: 'Symptomatic/Support',
    }, {
      id: 'Symptomatic/Support|Cardiac massage, ext.',
      label: 'Symptomatic/Support: Cardiac massage, ext.',
      category: 'Symptomatic/Support',
    }, {
      id: 'Symptomatic/Support|Cardiac massage, int.',
      label: 'Symptomatic/Support: Cardiac massage, int.',
      category: 'Symptomatic/Support',
    }, {
      id: 'Symptomatic/Support|Pacemaker',
      label: 'Symptomatic/Support: Pacemaker',
      category: 'Symptomatic/Support',
    }, {
      id: 'Symptomatic/Support|Defibrillation',
      label: 'Symptomatic/Support: Defibrillation',
      category: 'Symptomatic/Support',
    }, {
      id: 'Symptomatic/Support|Alkalinization',
      label: 'Symptomatic/Support: Alkalinization',
      category: 'Symptomatic/Support',
    }, {
      id: 'Symptomatic/Support|Resuscitation',
      label: 'Symptomatic/Support: Resuscitation',
      category: 'Symptomatic/Support',
    }, {
      id: 'Symptomatic/Support|Unknown',
      label: 'Symptomatic/Support: Unknown',
      category: 'Symptomatic/Support',
    }, {
      id: 'Symptomatic/Support|Other (symptom/support) - see notes',
      label: 'Symptomatic/Support: Other (symptom/support) - see notes',
      category: 'Symptomatic/Support',
    }, {
      id: 'Enhanced Elimination|A. Charcoal, multiple doses',
      label: 'Enhanced Elimination: A. Charcoal, multiple doses',
      category: 'Enhanced Elimination',
    }, {
      id: 'Enhanced Elimination|Modified diuresis',
      label: 'Enhanced Elimination: Modified diuresis',
      category: 'Enhanced Elimination',
    }, {
      id: 'Enhanced Elimination|Hemodialyses',
      label: 'Enhanced Elimination: Hemodialyses',
      category: 'Enhanced Elimination',
    }, {
      id: 'Enhanced Elimination|Peritoneal dialyses',
      label: 'Enhanced Elimination: Peritoneal dialyses',
      category: 'Enhanced Elimination',
    }, {
      id: 'Enhanced Elimination|Exchange transfusion',
      label: 'Enhanced Elimination: Exchange transfusion',
      category: 'Enhanced Elimination',
    }, {
      id: 'Enhanced Elimination|Haemoperfusion',
      label: 'Enhanced Elimination: Haemoperfusion',
      category: 'Enhanced Elimination',
    }, {
      id: 'Enhanced Elimination|Plasmapheresis',
      label: 'Enhanced Elimination: Plasmapheresis',
      category: 'Enhanced Elimination',
    }, {
      id: 'Enhanced Elimination|Haemofiltration',
      label: 'Enhanced Elimination: Haemofiltration',
      category: 'Enhanced Elimination',
    }, {
      id: 'Enhanced Elimination|Hyperventilation',
      label: 'Enhanced Elimination: Hyperventilation',
      category: 'Enhanced Elimination',
    }, {
      id: 'Antidote|Antidote - see notes',
      label: 'Antidote: Antidote - see notes',
      category: 'Antidote',
    }, {
      id: 'Antivenom|Antivenom - see notes',
      label: 'Antivenom: Antivenom - see notes',
      category: 'Antivenom',
    }, {
      id: 'Antitoxin|Antitoxin - see notes',
      label: 'Antitoxin: Antitoxin - see notes',
      category: 'Antitoxin',
    }, {
      id: 'Pharmaceuticals|Adrenergic stimulants',
      label: 'Pharmaceuticals: Adrenergic stimulants',
      category: 'Pharmaceuticals',
    }, {
      id: 'Pharmaceuticals|Adrenergic blockers',
      label: 'Pharmaceuticals: Adrenergic blockers',
      category: 'Pharmaceuticals',
    }, {
      id: 'Pharmaceuticals|Antiarrhythmics',
      label: 'Pharmaceuticals: Antiarrhythmics',
      category: 'Pharmaceuticals',
    }, {
      id: 'Pharmaceuticals|Analgesics',
      label: 'Pharmaceuticals: Analgesics',
      category: 'Pharmaceuticals',
    }, {
      id: 'Pharmaceuticals|Anticonvulsants',
      label: 'Pharmaceuticals: Anticonvulsants',
      category: 'Pharmaceuticals',
    }, {
      id: 'Pharmaceuticals|Antiemetics',
      label: 'Pharmaceuticals: Antiemetics',
      category: 'Pharmaceuticals',
    }, {
      id: 'Pharmaceuticals|Antihistamines',
      label: 'Pharmaceuticals: Antihistamines',
      category: 'Pharmaceuticals',
    }, {
      id: 'Pharmaceuticals|Antihypertensives',
      label: 'Pharmaceuticals: Antihypertensives',
      category: 'Pharmaceuticals',
    }, {
      id: 'Pharmaceuticals|Antimicrobials',
      label: 'Pharmaceuticals: Antimicrobials',
      category: 'Pharmaceuticals',
    }, {
      id: 'Pharmaceuticals|Antimuscarinics',
      label: 'Pharmaceuticals: Antimuscarinics',
      category: 'Pharmaceuticals',
    }, {
      id: 'Pharmaceuticals|Bronchodilators',
      label: 'Pharmaceuticals: Bronchodilators',
      category: 'Pharmaceuticals',
    }, {
      id: 'Pharmaceuticals|Hormones',
      label: 'Pharmaceuticals: Hormones',
      category: 'Pharmaceuticals',
    }, {
      id: 'Pharmaceuticals|Neuroleptics',
      label: 'Pharmaceuticals: Neuroleptics',
      category: 'Pharmaceuticals',
    }, {
      id: 'Pharmaceuticals|Neuromuscular blockers',
      label: 'Pharmaceuticals: Neuromuscular blockers',
      category: 'Pharmaceuticals',
    }, {
      id: 'Pharmaceuticals|Sedative/hypnotics',
      label: 'Pharmaceuticals: Sedative/hypnotics',
      category: 'Pharmaceuticals',
    }, {
      id: 'Pharmaceuticals|Other pharm. - see notes',
      label: 'Pharmaceuticals: Other pharm. - see notes',
      category: 'Pharmaceuticals',
    }, {
      id: 'Consultation|Consultation - see referral',
      label: 'Consultation: Consultation - see referral',
      category: 'Consultation',
    }, {
      id: 'Other treatment|First Aid for snake bite',
      label: 'Other treatment: First Aid for snake bite',
      category: 'Other treatment',
    }, {
      id: 'Other treatment|Other treatment - see notes',
      label: 'Other treatment: Other treatment - see notes',
      category: 'Other treatment',
    }, {
      id: 'Unknown|Unknown - see notes',
      label: 'Unknown: Unknown - see notes',
      category: 'Unknown',
    }, {
      id: 'Hospitalisation|Hospitalisation - see referral',
      label: 'Hospitalisation: Hospitalisation - see referral',
      category: 'Hospitalisation',
    }];
}

export function getAgentCategoryOptions() {
  return [
    { label: 'Algae' },
    { label: 'Animal' },
    { label: 'Chemical' },
    { label: 'Fungi' },
    { label: 'Insect' },
    { label: 'Micro-organism' },
    { label: 'Pharmaceutical' },
    { label: 'Plant' },
    { label: 'Other' },
  ];
}

export function getAgentUseTypeOptions() {
  return [
    { label: 'Substance of Abuse' },
    { label: 'Agricultural/Horticultural/Garden product (not pesticide)' },
    { label: 'Animal' },
    { label: 'Cosmetic / Hygiene' },
    { label: 'Environmental contamination' },
    { label: 'Food / Beverage' },
    { label: 'Fungi' },
    { label: 'Household / Leisure' },
    { label: 'Industrial / Commercial' },
    { label: 'Other - see notes' },
    { label: 'Pesticide' },
    { label: 'Pharmaceutical (Human)' },
    { label: 'Pharmaceutical (Veterinary)' },
    { label: 'Plant' },
    { label: 'Micro-organism' },
    { label: 'Unknown' },
    { label: 'Warfare/Anti-riot' },
  ];
}

export function getAgentUseTypeDetailOptions() {
  return [
    {
      label: 'Pharmaceuticals',
      value: 'Pharmaceuticals',
      children: [
        {
          label: 'Analgesics',
          value: 'Analgesics',
        },
        {
          label: 'Anaesthetics',
          value: 'Anaesthetics',
        },
        {
          label: 'Anticholinergics',
          value: 'Anticholinergics',
        },
        {
          label: 'Anticoagulants',
          value: 'Anticoagulants',
        },
        {
          label: 'Anticonvulsants',
          value: 'Anticonvulsants',
        },
        {
          label: 'Antidepressants',
          value: 'Antidepressants',
        },
        {
          label: 'Antihistamines',
          value: 'Antihistamines',
        },
        {
          label: 'Antimicrobials',
          value: 'Antimicrobials',
        },
        {
          label: 'Antineoplastic',
          value: 'Antineoplastic',
        },
        {
          label: 'Asthma Therapies',
          value: 'Asthma Therapies',
        },
        {
          label: 'Cardiovascular Drugs',
          value: 'Cardiovascular Drugs',
        },
        {
          label: 'Cold and Cough Preparations',
          value: 'Cold and Cough Preparations',
        },
        {
          label: 'Diagnostic Agents',
          value: 'Diagnostic Agents',
        },
        {
          label: 'Dietary Supplements',
          value: 'Dietary Supplements',
        },
        {
          label: 'Diuretics',
          value: 'Diuretics',
        },
        {
          label: 'Electrolytes and Minerals',
          value: 'Electrolytes and Minerals',
        },
        {
          label: 'Eye/Ear/Nose/Throat Preparations',
          value: 'Eye/Ear/Nose/Throat Preparations',
        },
        {
          label: 'Gastrointestinal Preparations',
          value: 'Gastrointestinal Preparations',
        },
        {
          label: 'Hormones and Hormone Antagonists',
          value: 'Hormones and Hormone Antagonists',
        },
        {
          label: 'Miscellaneous Drugs',
          value: 'Miscellaneous Pharmaceutical Drugs',
        },
        {
          label: 'Muscle Relaxants',
          value: 'Muscle Relaxants',
        },
        {
          label: 'Narcotic Antagonists',
          value: 'Narcotic Antagonists',
        },
        {
          label: 'Opiates',
          value: 'Opiates',
        },
        {
          label: 'Radiopharmaceuticals',
          value: 'Radiopharmaceuticals',
        },
        {
          label: 'Sedative/Hypnotics/Antipsychotics',
          value: 'Sedative/Hypnotics/Antipsychotics',
        },
        {
          label: 'Serums, Toxoids, Vaccines',
          value: 'Serums, Toxoids, Vaccines',
        },
        {
          label: 'Stimulants and Street Drugs',
          value: 'Stimulants and Street Drugs',
        },
        {
          label: 'Topical Preparations',
          value: 'Topical Preparations',
        },
        {
          label: 'Traditional Medicines',
          value: 'Traditional Medicines',
          children: [
            {
              label: 'Homeopathic Medicines',
              value: 'Homeopathic Medicines',
            },
            {
              label: 'Chinese Medicines',
              value: 'Chinese Medicines',
            },
            {
              label: 'Indian Medicines',
              value: 'Indian Medicines',
            },
            {
              label: 'Other Herbal Medicines/Drugs',
              value: 'Other Herbal Medicines/Drugs',
            },
            {
              label: 'Other Traditional Medicines',
              value: 'Other Traditional Medicines',
            },
          ],
        },
        {
          label: 'Veterinary Drugs',
          value: 'Veterinary Drugs',
        },
        {
          label: 'Vitamins',
          value: 'Vitamins',
        },
        {
          label: 'Other Drug',
          value: 'Other Drug',
        },
        {
          label: 'Unknown Drug',
          value: 'Unknown Drug',
        },
      ],
    },
    {
      label: 'Biological',
      value: 'Biological',
      children: [
        {
          label: 'Algae',
          value: 'Algae',
        },
        {
          label: 'Animal',
          value: 'Animal',
          children: [
            {
              label: 'jellyfish',
              value: 'jellyfish',
            },
            {
              label: 'fish',
              value: 'fish',
            },
            {
              label: 'other marine',
              value: 'other marine',
            },
            {
              label: 'insect',
              value: 'insect',
            },
            {
              label: 'tick',
              value: 'tick',
            },
            {
              label: 'spider',
              value: 'spider',
            },
            {
              label: 'snake',
              value: 'snake',
            },
            {
              label: 'mammal',
              value: 'mammal',
            },
            {
              label: 'other animals',
              value: 'other animals',
            },
          ],
        },
        {
          label: 'Fungi',
          value: 'Fungi',
        },
        {
          label: 'Plant',
          value: 'Plant',
        },
        {
          label: 'Food/Beverage',
          value: 'Food/Beverage',
        },
        {
          label: 'Micro-organism',
          value: 'Micro-organism',
          children: [
            {
              label: 'Food poisoning',
              value: 'Food poisoning',
            },
            {
              label: 'Infectious and Toxin-Mediated Diseases',
              value: 'Infectious and Toxin-Mediated Diseases',
            },
          ],
        },
      ],
    },
    {
      label: 'Non-Pharmaceutical',
      value: 'Non-Pharmaceutical',
      children: [
        {
          label: 'Adhesives/Glues',
          value: 'Adhesives/Glues',
        },
        {
          label: 'Alcohols',
          value: 'Alcohols',
        },
        {
          label: 'Arts/Crafts/Office Supplies',
          value: 'Arts/Crafts/Office Supplies',
        },
        {
          label: 'Automotive/Aircraft/Boat Products',
          value: 'Automotive/Aircraft/Boat Products',
        },
        {
          label: 'Batteries',
          value: 'Batteries',
          children: [
            {
              label: 'Dry cell',
              value: 'Dry cell',
            },
            {
              label: 'Button/disc batteries',
              value: 'Button/disc batteries',
            },
            {
              label: 'automotive batteries',
              value: 'automotive batteries',
            },
            {
              label: 'other batteries',
              value: 'other batteries',
            },
          ],
        },
        {
          label: 'Building and Construction Products',
          value: 'Building and Construction Products',
        },
        {
          label: 'Chemicals',
          value: 'Chemicals',
          children: [
            {
              label: 'Organic Solvents',
              value: 'Organic Solvents',
            },
            {
              label: 'Acids',
              value: 'Acids',
            },
            {
              label: 'Alkalis',
              value: 'Alkalis',
            },
            {
              label: 'Chlorates',
              value: 'Chlorates',
            },
            {
              label: 'Cyanide Compounds',
              value: 'Cyanide Compounds',
            },
            {
              label: 'Glycols',
              value: 'Glycols',
            },
            {
              label: 'Phenols',
              value: 'Phenols',
            },
            {
              label: 'Ketones',
              value: 'Ketones',
            },
            {
              label: 'Nitrates and nitrites',
              value: 'Nitrates and nitrites',
            },
            {
              label: 'Strychnine',
              value: 'Strychnine',
            },
            {
              label: 'Sulphur',
              value: 'Sulphur',
            },
            {
              label: 'Fluorines',
              value: 'Fluorines',
            },
            {
              label: 'Bisphenols and phthalates',
              value: 'Bisphenols and phthalates',
            },
            {
              label: 'Other chemicals',
              value: 'Other chemicals',
            },
          ],
        },
        {
          label: 'Cleaning Substances (Household)',
          value: 'Cleaning Substances (Household)',
        },
        {
          label: 'Cleaning Substances (Industrial)',
          value: 'Cleaning Substances (Industrial)',
        },
        {
          label: 'Cosmetics/Personal Care Products',
          value: 'Cosmetics/Personal Care Products',
        },
        {
          label: 'Deodorizers',
          value: 'Deodorizers',
        },
        {
          label: 'Desiccants',
          value: 'Desiccants',
        },
        {
          label: 'Dyes',
          value: 'Dyes',
        },
        {
          label: 'Essential Oils',
          value: 'Essential Oils',
        },
        {
          label: 'Fire Extinguishers',
          value: 'Fire Extinguishers',
        },
        {
          label: 'Flame retardants',
          value: 'Flame retardants',
        },
        {
          label: 'Foreign Bodies',
          value: 'Foreign Bodies',
        },
        {
          label: 'Fertilisers',
          value: 'Fertilisers',
        },
        {
          label: 'Fumes/Gases/Vapours',
          value: 'Fumes/Gases/Vapours',
        },
        {
          label: 'Heavy Metals',
          value: 'Heavy Metals',
        },
        {
          label: 'Hydrocarbons',
          value: 'Hydrocarbons',
        },
        {
          label: 'Matches/Fireworks/Explosives',
          value: 'Matches/Fireworks/Explosives',
        },
        {
          label: 'Paints and Stripping Agents',
          value: 'Paints and Stripping Agents',
        },
        {
          label: 'Cosmetic / Hygiene',
          value: 'Cosmetic / Hygiene',
        },
        {
          label: 'Photographic Products',
          value: 'Photographic Products',
        },
        {
          label: 'Polishes and Waxes',
          value: 'Polishes and Waxes',
        },
        {
          label: 'Radiation',
          value: 'Radiation',
        },
        {
          label: 'Sporting Equipment',
          value: 'Sporting Equipment',
        },
        {
          label: 'Swimming Pool/Aquarium',
          value: 'Swimming Pool/Aquarium',
        },
        {
          label: 'Tobacco/Nicotine/eCigarette Products',
          value: 'Tobacco/Nicotine/eCigarette Products',
        },
        {
          label: 'Toys/Miscellaneous',
          value: 'Toys/Miscellaneous',
        },
        {
          label: 'Waterproofers/Sealants',
          value: 'Waterproofers/Sealants',
        },
        {
          label: 'Sterlizing agents/Anti-Microbial',
          value: 'Sterlizing agents/Anti-Microbial',
        },
      ],
    },
    {
      label: 'Pesticide',
      value: 'Pesticide',
      children: [
        {
          label: 'Acaricide',
          value: 'Acaricide',
        },
        {
          label: 'Insecticides',
          value: 'Insecticides',
        },
        {
          label: 'Rodenticides',
          value: 'Rodenticides',
        },
        {
          label: 'Herbicides',
          value: 'Herbicides',
        },
        {
          label: 'Fungicides',
          value: 'Fungicides',
        },
        {
          label: 'other pesticides',
          value: 'other pesticides',
        },
      ],
    },
    {
      label: 'Warfare/Anti-Riot',
      value: 'Warfare/Anti-Riot',
      children: [
        {
          label: 'Biological Weapon',
          value: 'Biological Weapon',
        },
        {
          label: 'Chemical Weapon',
          value: 'Chemical Weapon',
          children: [
            {
              label: 'Nerve Agent',
              value: 'Nerve Agent',
            },
          ],
        },
        {
          label: 'Radioactive Weapon',
          value: 'Radioactive Weapon',
        },
        {
          label: 'Non-Lethal Weapons',
          value: 'Non-Lethal Weapons',
          children: [
            {
              label: 'Lacrimators',
              value: 'Lacrimators',
            },
            {
              label: 'Pepper Sprays',
              value: 'Pepper Sprays',
            },
            {
              label: 'Malodorants/Stink bombs',
              value: 'Malodorants/Stink bombs',
            },
            {
              label: 'Incapacitant/Sticky Foam',
              value: 'Incapacitant/Sticky Foam',
            },
          ],
        },
      ],
    },
    {
      label: 'Unknown',
      value: 'Unknown',
    },
  ];
}

export function getQuantityUnitsOptions() {
  return [
    { label: 'g' },
    { label: 'L' },
    { label: 'mg' },
    { label: 'micrograms' },
    { label: 'mL' },
    { label: 'units' },
    { label: 'Other - see notes' },
  ];
}

export function getTimeSinceUnitsOptions() {
  return [
    { label: 'Minutes' },
    { label: 'Hours' },
    { label: 'Days' },
    { label: 'Months' },
    { label: 'Years' },
    { label: 'Unknown' },
  ];
}

export function getDurationUnitsOptions() {
  return [
    { label: 'Seconds' },
    { label: 'Minutes' },
    { label: 'Hours' },
    { label: 'Days' },
    { label: 'Months' },
    { label: 'Years' },
    { label: 'Unknown' },
  ];
}

export function getTypeOfExposureOptions() {
  return [
    { label: 'Acute' },
    { label: 'Chronic' },
    { label: 'Acute on Chronic' },
    { label: 'Acute, Staggered' },
    { label: 'Unknown' },
  ];
}

export function getRouteOfExposureOptions() {
  return [
    { label: 'Bite/Sting' },
    { label: 'Buccal/sublingual/oral mucosa' },
    { label: 'Cutaneous' },
    { label: 'Ingestion' },
    { label: 'Inhalation' },
    { label: 'Injection' },
    { label: 'Nasal' },
    { label: 'Ocular' },
    { label: 'Otic / Aural' },
    { label: 'Placental' },
    { label: 'Rectal' },
    { label: 'Vaginal' },
    { label: 'Other' },
    { label: 'Unknown' },
  ];
}

export function getSearchTimeOptions() {
  return [
    { label: 'Last Day' },
    { label: 'Last Week' },
    { label: 'Last Month' },
  ];
}

export function getToxicologySources() {
  return [
  {
    "label": "Afritox",
    "url": "/analytics/extdata/Afritox?Search=THE_TERMS"
  },
  {
    "label": "LITFL Tox-Library",
    "url": "https://litfl.com/?s=THE_TERMS"
  },
  {
    "label": "POISINDEX",
    "url": "http://www.micromedexsolutions.com/micromedex2/librarian/deeplinkaccess?SearchTerm=THE_TERMS"
  },
  {
    "label": "PetPoison Helpline",
    "url": "http://www.petpoisonhelpline.com/?s=THE_TERMS"
  },
  {
    "label": "Toxinology",
    "url": "/analytics/extdata/Toxinology?Search=THE_TERMS"
  },
  {
    "label": "Toxinz",
    "url": "https://www.toxinz.com/Search?SearchText=THE_TERMS"
  },
  {
    "label": "Toxinz via Hinari",
    "url": "http://login.research4life.org/tacsgr0www.toxinz.com/Search?SearchText=THE_TERMS"
  },
  {
    "label": "Wikitox",
    "url": "http://www.wikitox.org/doku.php?do=search&id=wikitox%3Awikitox_home&q=THE_TERMS"
  }
];
}

export function getNoteContexts() {
  return [
    { label: 'General', value: 'general' },
    { label: 'Specialist Comment', value: 'specialist' },
    { label: 'Initial History', value: 'initial' },
    { label: 'Review Comment', value: 'review' },
  ];
}
