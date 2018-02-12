import {connect} from "react-redux";
import FilterHub from "./FilterHub";
import {doFilter} from "./actions";

const mapStateToProps = state => {
  console.log("# TLC " + JSON.stringify(state));
  return {
    filteredResults: state.filter.filteredResults
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onFilterClick: (filterTerm) => {
      dispatch(doFilter(filterTerm))
    }
  }
};

const SearchAndResults = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterHub);

export default SearchAndResults