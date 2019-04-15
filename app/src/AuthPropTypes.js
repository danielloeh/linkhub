import PropTypes from "prop-types";

export const userDetailsPropTypes = PropTypes.shape({
  name: PropTypes.string.optional,
  nickname: PropTypes.string.optional,
  picture: PropTypes.string.optional,
}).isRequired;

export const authPropTypes = PropTypes.shape({
  authenticationState: PropTypes.string.isRequired,
  responseFragment: PropTypes.string.optional,
  userDetails: userDetailsPropTypes
}).isRequired;


