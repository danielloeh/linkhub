import { connect } from 'react-redux';
import LinkHub from './LinkHub';
import { applyFilter, showConfig, showLinks } from './actions';
import {
  alerting,
  allResults,
  auth,
  categories,
  featureConfig,
  filteredResults,
  filterTerm,
  page,
  saving,
} from './reducers/selectors';

const mapStateToProps = state => {

  let filteredOrAllResults;

  if (filterTerm(state) === '') {
    filteredOrAllResults = allResults(state);
  } else {
    filteredOrAllResults = filteredResults(state);
  }

  return {
    allResults: allResults(state),
    categories: categories(state),
    filteredResults: filteredOrAllResults,
    page: page(state),
    alerting: alerting(state),
    saving: saving(state),
    featureConfig: featureConfig(state),
    auth: auth(state),
  };
};

const mapDispatchToProps = dispatch => {

  return {
    onFilterChange: (filterTerm) => {
      dispatch(applyFilter(filterTerm));
    },
    onShowConfig: () => {
      dispatch(showConfig());
    },
    onShowLinks: () => {
      dispatch(showLinks());
    },
  };
};

const PropMapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LinkHub);

export default PropMapper;