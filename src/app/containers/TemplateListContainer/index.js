import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import TemplateList from 'components/TemplateList';

import {
  displayTemplate,
  setTab,
} from 'containers/App/actions';

import {
  deleteTemplate,
  editTemplate,
  saveTemplate,
} from 'containers/CaseEntry/actions/template';

import { makeSelectCurrentTemplate, makeSelectSPI, selectTemplates, selectVars } from 'containers/App/selectors';

const makeMapStateToProps = () => {
  const selectSPI = makeSelectSPI();
  const mapStateToProps = (state) => {
    const vars = selectVars(state);
    const templates = selectTemplates(state);
    const { currentTemplateId, editingTemplateId } = vars;
    const currentTemplate = makeSelectCurrentTemplate()(state);

    return {
      currentTemplateId,
      currentTemplate,
      editingTemplateId,
      templates,

      userSPI: selectSPI(state),
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = (dispatch) => ({
  deleteTemplate: (macro) => {
    dispatch(deleteTemplate(macro));
  },
  editTemplate: (macro, template, spi) => {
    dispatch(editTemplate(macro, template, spi));
    dispatch(setTab(1));
  },
  onItemClick: (id, templateId) => {
    dispatch(displayTemplate(id));
    if (id !== templateId) {
      dispatch(setTab(0));
    }
  },
  saveTemplate: () => {
    dispatch(saveTemplate());
  },
});

const TemplateListContainer = injectIntl(connect(
  makeMapStateToProps,
  mapDispatchToProps
)(TemplateList));

export default TemplateListContainer;
