import React from 'react';
import PropTypes from 'prop-types';

import editor from 'react-bootstrap-table/lib/Editor';

export class CentreAgentTableBody extends React.Component {
  getFieldValue() {
    const newRow = {};
    this.props.columns.forEach((column) => {
      let inputVal;
      if (column.autoValue) {
        // when you want same auto generate value and not allow edit, example ID field
        const time = new Date().getTime();
        inputVal = typeof column.autoValue === 'function' ?
            column.autoValue() :
            (`autovalue-${time}`);
      } else if (column.hiddenOnInsert || !column.field) {
        inputVal = '';
      } else {
        const dom = this[column.field];
        inputVal = dom.value;

        if (column.editable && column.editable.type === 'checkbox') {
          const values = inputVal.split(':');
          inputVal = dom.checked ? values[0] : values[1];
        } else if (column.customInsertEditor) {
          inputVal = inputVal || dom.getFieldValue();
        }
      }
      newRow[column.field] = inputVal;
    }, this);
    return newRow;
  }

  render() {
    const { columns, ignoreEditable, validateState } = this.props;
    return (
      <div className="modal-body">
        {
            columns.map((column) => {
              const {
                  editable,
                  format,
                  field,
                  name,
                  autoValue,
                  hiddenOnInsert,
                  customInsertEditor,
              } = column;
              const attr = {
                ref: (ref) => {
                  this[field] = field === 'name' && ref && ref.instanceRef ? ref.instanceRef : ref;
                },
                placeholder: editable.placeholder ? editable.placeholder : name,
              };
              let fieldElement;
              const defaultValue = editable.defaultValue || undefined;
              if (customInsertEditor) {
                const { getElement } = customInsertEditor;
                fieldElement = getElement(column, attr, 'form-control', ignoreEditable, defaultValue);
              }

              // fieldElement = false, means to use default editor when enable custom editor
              // Becasuse some users want to have default editor based on some condition.
              if (!customInsertEditor || fieldElement === false) {
                fieldElement = editor(editable, attr, format, '', defaultValue, ignoreEditable);
              }

              if (autoValue || hiddenOnInsert || !column.field) {
                // when you want same auto generate value
                // and not allow edit, for example ID field
                return null;
              }
              const error = validateState[field] ?
                  (<span className="help-block bg-danger">{ validateState[field] }</span>) :
                  null;
              return (
                <div className="form-group" key={field}>
                  <label htmlFor={field}>{ name }</label>
                  { fieldElement }
                  { error }
                </div>
              );
            })
          }
      </div>
    );
  }
}

CentreAgentTableBody.propTypes = {
  columns: PropTypes.array,
  ignoreEditable: PropTypes.bool,
  validateState: PropTypes.object,
};

export default CentreAgentTableBody;
