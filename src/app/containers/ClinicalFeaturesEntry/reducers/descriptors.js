import cloneDeep from 'lodash/cloneDeep';

import {
  ADD_CALL_RECORD,
  ADD_CASE,
  ADD_TEMPLATE,
  DISPLAY_RECORD,
  DISPLAY_TEMPLATE,
  EDIT_TEMPLATE,
} from 'containers/App/constants';

const descriptorListInitialState = {
  'General Disorder': {
    collapsed: true,
    children: {
      'Fatigue / tiredness': {
        checkbox: true,
        checked: false,
      },

      Fever: {
        checkbox: true,
        checked: false,
      },

      Malaise: {
        checkbox: true,
        checked: false,
      },

      'Pain / aches generalised': {
        checkbox: true,
        checked: false,
      },

      'Oedema generalised': {
        checkbox: true,
        checked: false,
      },

      'Other - see notes': {
        checkbox: true,
        checked: false,
      },

    },
  },
  Cardiovascular: {
    collapsed: true,
    children: {
      Asystole: {
        checkbox: true,
        checked: false,
      },

      Bradycardia: {
        checkbox: true,
        checked: false,
      },

      'Cardiac arrest': {
        checkbox: true,
        checked: false,
      },

      'Cardiac failure': {
        checkbox: true,
        checked: false,
      },

      Cardiomyopathy: {
        checkbox: true,
        checked: false,
      },

      Hypertension: {
        checkbox: true,
        checked: false,
      },

      Hypotension: {
        checkbox: true,
        checked: false,
      },

      Palpitations: {
        checkbox: true,
        checked: false,
      },

      'Pericardial effusion': {
        checkbox: true,
        checked: false,
      },

      Phlebitis: {
        checkbox: true,
        checked: false,
      },

      'Precordial pain': {
        checkbox: true,
        checked: false,
      },

      'Supraventricular arrhythmia': {
        checkbox: true,
        checked: false,
      },

      'Supraventricular tachycardia': {
        checkbox: true,
        checked: false,
      },

      Tachycardia: {
        checkbox: true,
        checked: false,
      },

      Vasoconstriction: {
        checkbox: true,
        checked: false,
      },

      'Ventricular arrhythmia': {
        checkbox: true,
        checked: false,
      },

      'Ventricular extrasystole': {
        checkbox: true,
        checked: false,
      },

      'Ventricular tachycardia': {
        checkbox: true,
        checked: false,
      },

      'Ventricular tachycardia, polymorphic': {
        checkbox: true,
        checked: false,
      },

      'Ventricular fibrillation': {
        checkbox: true,
        checked: false,
      },

      'Other - see notes': {
        checkbox: true,
        checked: false,
      },
    },
  },
  Respiratory: {
    collapsed: true,
    children: {
      Asbestosis: {
        checkbox: true,
        checked: false,
      },

      'Acute Respiratory Distress Syndrome': {
        checkbox: true,
        checked: false,
      },

      Berylliosis: {
        checkbox: true,
        checked: false,
      },

      Bradypnoea: {
        checkbox: true,
        checked: false,
      },

      Bronchospasm: {
        checkbox: true,
        checked: false,
      },

      Bronchorrhoea: {
        checkbox: true,
        checked: false,
      },

      'Cheyne-Stokes respiration': {
        checkbox: true,
        checked: false,
      },

      'Cough/choking': {
        checkbox: true,
        checked: false,
      },

      Cyanosis: {
        checkbox: true,
        checked: false,
      },

      Dysphonia: {
        checkbox: true,
        checked: false,
      },

      Dyspnoea: {
        checkbox: true,
        checked: false,
      },

      Haemoptysis: {
        checkbox: true,
        checked: false,
      },

      'Hyperventilation/tachypnoea': {
        checkbox: true,
        checked: false,
      },

      "Kussmaul's breathing": {
        checkbox: true,
        checked: false,
      },

      Laryngitis: {
        checkbox: true,
        checked: false,
      },

      Laryngospasm: {
        checkbox: true,
        checked: false,
      },

      'Laryngotracheal oedema': {
        checkbox: true,
        checked: false,
      },

      Pneumonitis: {
        checkbox: true,
        checked: false,
      },

      'Pulmonary oedema': {
        checkbox: true,
        checked: false,
      },

      'Respiratory failure': {
        checkbox: true,
        checked: false,
      },

      'Respiratory arrest': {
        checkbox: true,
        checked: false,
      },

      'Other - see notes': {
        checkbox: true,
        checked: false,
      },
    },
  },
  'Endocrine and Reproductive': {
    collapsed: true,
    children: {
      Abortion: {
        checkbox: true,
        checked: false,
      },

      "Conn's syndrome/hyperaldosteronism": {
        checkbox: true,
        checked: false,
      },

      "Cushing's syndrome": {
        checkbox: true,
        checked: false,
      },

      Hyperthyroidism: {
        checkbox: true,
        checked: false,
      },

      Hypothyroidism: {
        checkbox: true,
        checked: false,
      },

      Hypoaldosteronism: {
        checkbox: true,
        checked: false,
      },

      'Inappropriate secretion of antidiuretic hormone (SIADH)': {
        checkbox: true,
        checked: false,
      },

      Impotence: {
        checkbox: true,
        checked: false,
      },

      'Menstrual disorder': {
        checkbox: true,
        checked: false,
      },

      Menorrhagia: {
        checkbox: true,
        checked: false,
      },

      Priapism: {
        checkbox: true,
        checked: false,
      },

      Other: {
        checkbox: true,
        checked: false,
      },
    },
  },
  'Neuro-Psychiatric/Muscular': {
    collapsed: true,
    children: {

      'Agitation/irritability': {
        checkbox: true,
        checked: false,
      },

      Ataxia: {
        checkbox: true,
        checked: false,
      },

      'Babinski sign +': {
        checkbox: true,
        checked: false,
      },

      'Behavioural change': {
        checkbox: true,
        checked: false,
      },

      Coma: {
        checkbox: true,
        checked: false,
      },

      Confusion: {
        checkbox: true,
        checked: false,
      },

      'Convulsions/seizures': {
        checkbox: true,
        checked: false,
      },

      Deafness: {
        checkbox: true,
        checked: false,
      },

      'Dizziness/vertigo': {
        checkbox: true,
        checked: false,
      },

      'Drowsiness/lethargy': {
        checkbox: true,
        checked: false,
      },

      Dysarthia: {
        checkbox: true,
        checked: false,
      },

      Dystonia: {
        checkbox: true,
        checked: false,
      },

      'Extrapyramidal syndrome': {
        checkbox: true,
        checked: false,
      },

      Fasciculation: {
        checkbox: true,
        checked: false,
      },

      Flashbacks: {
        checkbox: true,
        checked: false,
      },

      'Hallucinations/delusions': {
        checkbox: true,
        checked: false,
      },

      Headache: {
        checkbox: true,
        checked: false,
      },

      Hyperreflexia: {
        checkbox: true,
        checked: false,
      },

      Hypertonia: {
        checkbox: true,
        checked: false,
      },

      Hyporeflexia: {
        checkbox: true,
        checked: false,
      },

      Hypotonia: {
        checkbox: true,
        checked: false,
      },

      'Intracerebral bleeding': {
        checkbox: true,
        checked: false,
      },

      'Muscular rigidity': {
        checkbox: true,
        checked: false,
      },

      'Muscular weakness': {
        checkbox: true,
        checked: false,
      },

      'Myalgia/cramps': {
        checkbox: true,
        checked: false,
      },

      Nystagmus: {
        checkbox: true,
        checked: false,
      },

      Opisthotonus: {
        checkbox: true,
        checked: false,
      },

      Paralysis: {
        checkbox: true,
        checked: false,
      },

      "Parkinson's syndrome": {
        checkbox: true,
        checked: false,
      },

      'Peripheral neuropathy': {
        checkbox: true,
        checked: false,
      },

      'Pyramidal syndrome': {
        checkbox: true,
        checked: false,
      },

      Rhabdomyolysis: {
        checkbox: true,
        checked: false,
      },

      'Slurred speech': {
        checkbox: true,
        checked: false,
      },

      'Status epilepticus': {
        checkbox: true,
        checked: false,
      },

      Syncope: {
        checkbox: true,
        checked: false,
      },

      Tinnitus: {
        checkbox: true,
        checked: false,
      },

      Tremor: {
        checkbox: true,
        checked: false,
      },

      Trismus: {
        checkbox: true,
        checked: false,
      },

      'Other - see notes': {
        checkbox: true,
        checked: false,
      },
    },
  },

  'Eye, Ear and Nose': {
    collapsed: true,
    children: {
      Anisocoria: {
        checkbox: true,
        checked: false,
      },

      Blepharospasm: {
        checkbox: true,
        checked: false,
      },

      Blindness: {
        checkbox: true,
        checked: false,
      },

      'Blurred vision': {
        checkbox: true,
        checked: false,
      },

      Burns: {
        checkbox: true,
        checked: false,
      },

      Chromatopsia: {
        checkbox: true,
        checked: false,
      },

      'Conjunctival irritation': {
        checkbox: true,
        checked: false,
      },

      'Corneal abrasion/ulceration': {
        checkbox: true,
        checked: false,
      },

      Deafness: {
        checkbox: true,
        checked: false,
      },

      Diplopia: {
        checkbox: true,
        checked: false,
      },

      Epistaxis: {
        checkbox: true,
        checked: false,
      },

      Lacrimation: {
        checkbox: true,
        checked: false,
      },

      Miosis: {
        checkbox: true,
        checked: false,
      },

      Mydriasis: {
        checkbox: true,
        checked: false,
      },

      'Non-reactive pupils': {
        checkbox: true,
        checked: false,
      },

      'Oculogyric crisis': {
        checkbox: true,
        checked: false,
      },

      Papilloedema: {
        checkbox: true,
        checked: false,
      },

      Parosmia: {
        checkbox: true,
        checked: false,
      },

      Photophobia: {
        checkbox: true,
        checked: false,
      },

      'Ptosis, palpebral': {
        checkbox: true,
        checked: false,
      },

      Rhinitis: {
        checkbox: true,
        checked: false,
      },

      Scotoma: {
        checkbox: true,
        checked: false,
      },

      Strabismus: {
        checkbox: true,
        checked: false,
      },

      'Subconjunctival haemorrhage': {
        checkbox: true,
        checked: false,
      },

      Tinnitus: {
        checkbox: true,
        checked: false,
      },

      'Visual defect': {
        checkbox: true,
        checked: false,
      },

      'Other - see notes': {
        checkbox: true,
        checked: false,
      },
    },
  },
  Haematologic: {
    collapsed: true,
    children: {
      Anaemia: {
        checkbox: true,
        checked: false,
      },

      Bleeding: {
        checkbox: true,
        checked: false,
      },

      'Disseminated Intravascular Coagulation': {
        checkbox: true,
        checked: false,
      },

      Haemolysis: {
        checkbox: true,
        checked: false,
      },

      Leucocytosis: {
        checkbox: true,
        checked: false,
      },

      Leucopaenia: {
        checkbox: true,
        checked: false,
      },

      Lymphadenopathy: {
        checkbox: true,
        checked: false,
      },

      Polycythaemia: {
        checkbox: true,
        checked: false,
      },

      Purpura: {
        checkbox: true,
        checked: false,
      },

      Thrombocytopaenia: {
        checkbox: true,
        checked: false,
      },

      Thrombocytosis: {
        checkbox: true,
        checked: false,
      },

      'Other - see notes': {
        checkbox: true,
        checked: false,
      },
    },
  },

  Gastrointestinal: {
    collapsed: true,
    children: {
      'Abdominal pain': {
        checkbox: true,
        checked: false,
      },

      Anorexia: {
        checkbox: true,
        checked: false,
      },

      "Burton's lines": {
        checkbox: true,
        checked: false,
      },

      Constipation: {
        checkbox: true,
        checked: false,
      },

      'Diarrhoea/hyperperistalsis': {
        checkbox: true,
        checked: false,
      },

      'Dry mouth': {
        checkbox: true,
        checked: false,
      },

      Dypepsia: {
        checkbox: true,
        checked: false,
      },

      Dysphagia: {
        checkbox: true,
        checked: false,
      },

      'Faecal incontinence': {
        checkbox: true,
        checked: false,
      },

      Glossitis: {
        checkbox: true,
        checked: false,
      },

      Haematemesis: {
        checkbox: true,
        checked: false,
      },

      Halitosis: {
        checkbox: true,
        checked: false,
      },

      'Ileus/hypoperistalsis': {
        checkbox: true,
        checked: false,
      },

      Melaena: {
        checkbox: true,
        checked: false,
      },

      Nausea: {
        checkbox: true,
        checked: false,
      },

      'Oesophageal injury/ulceration': {
        checkbox: true,
        checked: false,
      },

      'Oesophageal irritation/oesophagitis': {
        checkbox: true,
        checked: false,
      },

      'Oesophageal stricture': {
        checkbox: true,
        checked: false,
      },

      'Oropharyngeal injury/ulceration': {
        checkbox: true,
        checked: false,
      },

      'Oropharyngeal irritation/pharyngitis': {
        checkbox: true,
        checked: false,
      },

      Perforation: {
        checkbox: true,
        checked: false,
      },

      'Pyrosis/heart burn': {
        checkbox: true,
        checked: false,
      },

      Salivation: {
        checkbox: true,
        checked: false,
      },

      Vomiting: {
        checkbox: true,
        checked: false,
      },

      'Other - see notes': {
        checkbox: true,
        checked: false,
      },
    },
  },

  'Hepatic and Biliary': {
    collapsed: true,
    children: {
      Ascites: {
        checkbox: true,
        checked: false,
      },

      Encephalopathy: {
        checkbox: true,
        checked: false,
      },

      'Hepatic failure/insufficiency': {
        checkbox: true,
        checked: false,
      },

      Hepatomegaly: {
        checkbox: true,
        checked: false,
      },

      Jaundice: {
        checkbox: true,
        checked: false,
      },

      'Liver tenderness': {
        checkbox: true,
        checked: false,
      },

      'Other - see notes': {
        checkbox: true,
        checked: false,
      },
    },
  },

  Urinary: {
    collapsed: true,
    children: {
      Dysuria: {
        checkbox: true,
        checked: false,
      },

      Glomerulonephritis: {
        checkbox: true,
        checked: false,
      },

      Haematuria: {
        checkbox: true,
        checked: false,
      },

      'Loin pain': {
        checkbox: true,
        checked: false,
      },

      Myoglobinuria: {
        checkbox: true,
        checked: false,
      },

      'Oliguria/anuria': {
        checkbox: true,
        checked: false,
      },

      Polyuria: {
        checkbox: true,
        checked: false,
      },

      'Renal failure/insufficiency': {
        checkbox: true,
        checked: false,
      },

      'Urinary pigmentation': {
        checkbox: true,
        checked: false,
      },

      'Urinary incontinence': {
        checkbox: true,
        checked: false,
      },

      'Urinary retention': {
        checkbox: true,
        checked: false,
      },

      'Other - see notes': {
        checkbox: true,
        checked: false,
      },
    },
  },


  'Immunologic and Allergic': {
    collapsed: true,
    children: {
      Anaphylaxis: {
        checkbox: true,
        checked: false,
      },

      'Immune deficiency': {
        checkbox: true,
        checked: false,
      },

      'Immune hyperactivity': {
        checkbox: true,
        checked: false,
      },

      'Stevens-Johnson syndrome': {
        checkbox: true,
        checked: false,
      },

      Urticaria: {
        checkbox: true,
        checked: false,
      },

      'Other - see notes': {
        checkbox: true,
        checked: false,
      },
    },
  },

  Other: {
    collapsed: true,
    children: {
      'Collagen disorders': {
        checkbox: true,
        checked: false,
      },
      'Foetal disorders': {
        checkbox: true,
        checked: false,
      },
      'Neonatal/infancy disorders': {
        checkbox: true,
        checked: false,
      },
      Neoplasm: {
        checkbox: true,
        checked: false,
      },
      'Other - see notes': {
        checkbox: true,
        checked: false,
      },
    },
  },

  Dermatologic: {
    collapsed: true,
    children: {
      Abscess: {
        checkbox: true,
        checked: false,
      },

      Acne: {
        checkbox: true,
        checked: false,
      },

      Acrodynia: {
        checkbox: true,
        checked: false,
      },

      Alopecia: {
        checkbox: true,
        checked: false,
      },

      Bite: {
        checkbox: true,
        checked: false,
      },

      Blisters: {
        checkbox: true,
        checked: false,
      },

      "Bowen's disease": {
        checkbox: true,
        checked: false,
      },

      'Bullous eruption': {
        checkbox: true,
        checked: false,
      },

      'Burns - (2nd and 3rd degree)': {
        checkbox: true,
        checked: false,
      },

      'Burns - superficial': {
        checkbox: true,
        checked: false,
      },

      Cellulitis: {
        checkbox: true,
        checked: false,
      },

      Chloracne: {
        checkbox: true,
        checked: false,
      },

      Cyanosis: {
        checkbox: true,
        checked: false,
      },

      'Dry skin': {
        checkbox: true,
        checked: false,
      },

      Ecchymosis: {
        checkbox: true,
        checked: false,
      },

      Epidermolysis: {
        checkbox: true,
        checked: false,
      },

      Erythema: {
        checkbox: true,
        checked: false,
      },

      Flushing: {
        checkbox: true,
        checked: false,
      },

      'Hives/welts': {
        checkbox: true,
        checked: false,
      },

      Hyperkeratosis: {
        checkbox: true,
        checked: false,
      },

      Irritation: {
        checkbox: true,
        checked: false,
      },

      "Mee's Lines": {
        checkbox: true,
        checked: false,
      },

      'Mucosal hyperaemia': {
        checkbox: true,
        checked: false,
      },

      Necrosis: {
        checkbox: true,
        checked: false,
      },

      'Oedema, local': {
        checkbox: true,
        checked: false,
      },

      Pallor: {
        checkbox: true,
        checked: false,
      },

      Petechiae: {
        checkbox: true,
        checked: false,
      },

      Piloerection: {
        checkbox: true,
        checked: false,
      },

      Pruritus: {
        checkbox: true,
        checked: false,
      },

      Puncture: {
        checkbox: true,
        checked: false,
      },

      Purpura: {
        checkbox: true,
        checked: false,
      },

      Rash: {
        checkbox: true,
        checked: false,
      },

      'Scratch mark': {
        checkbox: true,
        checked: false,
      },

      'Skin discoloration': {
        checkbox: true,
        checked: false,
      },

      Sting: {
        checkbox: true,
        checked: false,
      },

      Sweating: {
        checkbox: true,
        checked: false,
      },

      'Track marks': {
        checkbox: true,
        checked: false,
      },

      'Ulceration (skin/mucosa)': {
        checkbox: true,
        checked: false,
      },

      'Other - see notes': {
        checkbox: true,
        checked: false,
      },
    },
  },


  'Metabolic and Nutritional': {
    collapsed: true,
    children: {
      Alkalosis: {
        checkbox: true,
        checked: false,
      },

      Dehydration: {
        checkbox: true,
        checked: false,
      },

      Hypercalcaemia: {
        checkbox: true,
        checked: false,
      },

      Hypocalcaemia: {
        checkbox: true,
        checked: false,
      },

      Hyperglycaemia: {
        checkbox: true,
        checked: false,
      },

      Hypoglycaemia: {
        checkbox: true,
        checked: false,
      },

      Hyperkalaemia: {
        checkbox: true,
        checked: false,
      },

      Hypokalaemia: {
        checkbox: true,
        checked: false,
      },

      Hypermagnesaemia: {
        checkbox: true,
        checked: false,
      },

      Hypomagnesaemia: {
        checkbox: true,
        checked: false,
      },

      Hypernatraemia: {
        checkbox: true,
        checked: false,
      },

      Hyponatraemia: {
        checkbox: true,
        checked: false,
      },

      Hyperthermia: {
        checkbox: true,
        checked: false,
      },

      Hypothermia: {
        checkbox: true,
        checked: false,
      },

      Malnutrition: {
        checkbox: true,
        checked: false,
      },

      'Metabolic acidosis': {
        checkbox: true,
        checked: false,
      },

      'Respiratory acidosis': {
        checkbox: true,
        checked: false,
      },

      'Other - see notes': {
        checkbox: true,
        checked: false,
      },
    },
  },

  Syndromes: {
    collapsed: true,
    children: {
      Adrenergic: {
        checkbox: true,
        checked: false,
      },

      'Acute Immunodeficiency syndrome (AIDS)': {
        checkbox: true,
        checked: false,
      },

      'Alcohol withdrawal syndrome': {
        checkbox: true,
        checked: false,
      },

      Anticholinergic: {
        checkbox: true,
        checked: false,
      },

      Baritosis: {
        checkbox: true,
        checked: false,
      },

      Cholinergic: {
        checkbox: true,
        checked: false,
      },

      Cinchonism: {
        checkbox: true,
        checked: false,
      },

      Ergotism: {
        checkbox: true,
        checked: false,
      },

      'Fetal alcohol': {
        checkbox: true,
        checked: false,
      },

      'Malignant neuroleptic': {
        checkbox: true,
        checked: false,
      },

      'Metal fume fever': {
        checkbox: true,
        checked: false,
      },

      Muscarinic: {
        checkbox: true,
        checked: false,
      },

      Nicotinic: {
        checkbox: true,
        checked: false,
      },

      Phalloides: {
        checkbox: true,
        checked: false,
      },

      "Reye's": {
        checkbox: true,
        checked: false,
      },

      Salicylism: {
        checkbox: true,
        checked: false,
      },

      Saturnism: {
        checkbox: true,
        checked: false,
      },

      Serotonergic: {
        checkbox: true,
        checked: false,
      },

      Zieve: {
        checkbox: true,
        checked: false,
      },

      'Other - see notes': {
        checkbox: true,
        checked: false,
      },
    },
  },
};

const clinicalFeaturesDescriptorList = (state = cloneDeep(descriptorListInitialState), action) => {
  switch (action.type) {
    case ADD_CASE:
    case ADD_CALL_RECORD:
    case ADD_TEMPLATE:
    case DISPLAY_RECORD:
    case DISPLAY_TEMPLATE:
    case EDIT_TEMPLATE:
      return cloneDeep(descriptorListInitialState);
    default:
      return state;
  }
};

export default clinicalFeaturesDescriptorList;
