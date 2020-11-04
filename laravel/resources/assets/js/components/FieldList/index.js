import React from 'react';

import 'react-table/react-table.css';

import { fields } from './fields';

class FieldList extends React.Component {
  render() {
    return (
      <select multiple onChange={(e) => this.props.handleUpdate([...e.target.options].filter(o => o.selected).map(o => o.value))}>
        {fields.map((f, i) => (
          <option key={`${f.id}-${i}`} value={f.id}>{f.name}</option>
        ))}
      </select>
    );
  }
}

export default FieldList;