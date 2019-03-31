import PropTypes from "prop-types";

export const featureConfigPropType = PropTypes.shape({
  editEnabled: PropTypes.bool.isRequired,
  authURI: PropTypes.string.isRequired,
  authClientID: PropTypes.string.isRequired,
}).isRequired;

