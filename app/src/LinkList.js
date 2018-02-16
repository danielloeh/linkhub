import {connect} from "react-redux";
import FilterHub from "./FilterHub";
import {applyFilter, fetchConfig, showConfig, showLinks} from "./actions";

const mapStateToProps = state => {
  let filteredResults;
  if (state.filter.filterTerm ===''){
    filteredResults = state.loading.allResults;
  }else{
    filteredResults = state.filter.filteredResults;
  }

  return {
    allResults: state.loading.allResults,
    filteredResults: filteredResults,
    pageState: state.page.pageState
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

const LinkList = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterHub);

export default LinkList