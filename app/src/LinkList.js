import {connect} from "react-redux";
import FilterHub from "./FilterHub";
import {applyFilter, showConfig, showLinks} from "./actions";

const mapStateToProps = state => {
  return {
    allResults: state.filter.allResults,
    filteredResults: state.filter.filteredResults,
    pageState: state.page.pageState
  }
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
      dispatch(showLinks())
    },
  }
};

const LinkList = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterHub);

export default LinkList