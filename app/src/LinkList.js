import {connect} from "react-redux";
import FilterHub from "./FilterHub";
import {applyFilter} from "./actions";

const mapStateToProps = state => {
  return {
    allResults: state.filter.allResults,
    filteredResults: state.filter.filteredResults
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onFilterChange: (filterTerm) => {
      dispatch(applyFilter(filterTerm))
    }
  }
};

const SearchAndResults = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterHub);

export default SearchAndResults