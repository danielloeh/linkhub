import PropTypes from "prop-types";

class LinkPropTypes {

  static get StateStructure()  {
    return {
      allResults: PropTypes.arrayOf(
        PropTypes.shape({
          categoryName: PropTypes.string.isRequired,
          links: PropTypes.arrayOf(
            PropTypes.shape({
              url: PropTypes.string.isRequired,
              name: PropTypes.string.isRequired
            }).isRequired)
        }).isRequired
      ).isRequired,
      filteredResults: PropTypes.arrayOf(
        PropTypes.shape({
          categoryName: PropTypes.string.isRequired,
          links: PropTypes.arrayOf(
            PropTypes.shape({
              url: PropTypes.string.isRequired,
              name: PropTypes.string.isRequired
            }).isRequired)
        }).isRequired
      ).isRequired,
      onFilterChange: PropTypes.func.isRequired
    }
  }
}

export default LinkPropTypes;