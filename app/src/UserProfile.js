import React from "react";
import {Component} from "react";
import "./UserProfile.css";
import {logout} from "./actions";
import GenericButton from "./GenericButton";
import {userDetailsPropTypes} from "./AuthPropTypes";
import {connect} from "react-redux";

class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {showMenu: false};

        this.toggleMenu = this.toggleMenu.bind(this);
    }

    hasUserDetails(userDetails) {
        return userDetails.name !== undefined && userDetails.picture !== undefined;
    }

    toggleMenu() {
        this.setState({showMenu: !this.state.showMenu});
    }

    userMenu(userDetails) {

        return (
            <div id='profile_menu' className='profile-menu-box'>
                <ul className="profile-menu">
                    <li className='profile-list-items'>
                        <div className='profile-card'>
                            <img className='profile-picture-full' src={userDetails.picture} alt='the users profile'/>
                            <div>
                                <div>{userDetails.nickname}</div>
                                <div>{userDetails.name}</div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <GenericButton id="logout" size="small" actions={[logout]} label="Logout"/>
                    </li>
                </ul>
            </div>
        );
    }

    render() {

        console.log(this.state);

        if (this.hasUserDetails(this.props.userDetails)) {
            return (
                <div>
                    <img className="profile-picture-icon" src={this.props.userDetails.picture} onClick={this.toggleMenu}
                         alt='the users profile'/>
                    {this.state.showMenu && this.userMenu(this.props.userDetails)}
                </div>);
        }
        return null;
    };
}

UserProfile.propTypes = {
    userDetails: userDetailsPropTypes
};

UserProfile = connect()(UserProfile);

export default UserProfile;


