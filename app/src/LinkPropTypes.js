import PropTypes from "prop-types";

export const alertTypePropTypes = PropTypes.shape({
  alertType: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
});

export const linkPropType = PropTypes.shape({
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string
}).isRequired;

export const linksPropTypes = PropTypes.arrayOf(
  linkPropType).isRequired;

export const resultsPropType = PropTypes.arrayOf(
  PropTypes.shape({
    categoryName: PropTypes.string.isRequired,
    links: linksPropTypes
  }).isRequired
).isRequired;

export const categoriesPropTypes = PropTypes.arrayOf(
  PropTypes.string.isRequired
).isRequired;

export const pageProptype = PropTypes.shape({
  pageState: PropTypes.string.isRequired,
  pageMode: PropTypes.string.isRequired,
});


