import {connect} from "react-redux";
import LinkHub from "./LinkHub";
import {applyFilter, showConfig, showLinks} from "./actions";

const mapStateToProps = state => {
  let filteredResults;
  if (state.filter.filterTerm === '') {
    filteredResults = state.loading.allResults;
  } else {
    filteredResults = state.filter.filteredResults;
  }

  return {
    allResults: state.loading.allResults,
    categories: state.loading.categories,
    filteredResults: filteredResults,
    pageState: state.page.pageState,
    alerting: state.alerting,
    gitConnection: state.git
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