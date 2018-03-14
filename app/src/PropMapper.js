import {connect} from "react-redux";
import LinkHub from "./LinkHub";
import {applyFilter, showConfig, showLinks} from "./actions";
import {
  alerting,
  allResults,
  categories,
  filteredResults,
  filterTerm,
  gitConnection,
  pageState,
  saving
} from "./reducers/selectors";

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
    pageState: pageState(state),
    alerting: alerting(state),
    gitConnection: gitConnection(state),
    saving: saving(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFilterChange: (filterTerm) => {
      dispatch(applyFilter(filterTerm))
    },
    onShowConfig: () => {
      dispatch(showConfig())
    },
    onShowLinks: () => {
      dispatch(showLinks());
    },
  }
};

const PropMapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(LinkHub);

export default PropMapper