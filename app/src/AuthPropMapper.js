import {connect} from "react-redux";
import {
  auth,
  featureConfig,
} from "./reducers/selectors";
import AuthComponent from "./AuthComponent";
import {isLoggedIn,updateUserDetails} from "./actions";

const mapStateToProps = (state) => {

  return {
    featureConfig: featureConfig(state),
    authentication: auth(state)
  };
};

const mapDispatchToProps = {
  isLoggedIn,
  updateUserDetails
};

const AuthPropMapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthComponent);

export default AuthPropMapper