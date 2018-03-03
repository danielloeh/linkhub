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
      onFilterChange: PropTypes.func.isRequired,
      onShowConfig: PropTypes.func.isRequired,
      onShowLinks: PropTypes.func.isRequired,
      gitConnection: PropTypes.shape({
        connected: PropTypes.boolean.isRequired,
        upToDate: PropTypes.boolean.isRequired,
        url: PropTypes.string.isRequired,
      }).isRequired
    }
  }
}

export default LinkPropTypes;