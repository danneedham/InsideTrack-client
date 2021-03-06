//import liraries
import React, { Component } from "react";
import { Dimensions } from "react-native";
import PendingRacesList from "../../components/PendingRacesList";
import { TabView, SceneMap } from "react-native-tab-view";
import { putARace } from '../../store/races'
import { fetchPendingUserRacesByUser } from "../../store/userRacesPending";
import { fetchUserRacesByUser } from "../../store/userRaces";
import { connect } from "react-redux";
import { me } from "../../store/user";

// create a component
class PendingRacesScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      index: 0,
      routes: [
        { key: "third", title: "Created Races" },
        { key: "fourth", title: "Invitations" }
      ]
    }
    this.toggleStart = this.toggleStart.bind(this)
  }

  async componentDidMount() {
    await this.props.getUser();
    await this.props.getPendingRaces(this.props.user.id, 'hasStarted', false);
  }

  toggleStart = async (raceId) => {
    const startTime = new Date()
    const hasStarted = true
    await this.props.startRace(raceId, { hasStarted, startTime })
    await this.props.getPendingRaces(this.props.user.id, 'hasStarted', false);
    await this.props.getRaces(this.props.user.id, 'acceptedInvitation', true);

  };

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          third: () => (
            <PendingRacesList
              user={this.props.user}
              races={this.props.races}
              isOwnerBool={true}
              toggleStart={this.toggleStart}
            />
          ),
          fourth: () => (
            <PendingRacesList
              user={this.props.user}
              races={this.props.races}
              isOwnerBool={false}
              toggleStart={this.toggleStart}
            />
          )
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height
        }}
      />
    );
  }
}

const mapState = state => {
  return {
    races: state.userRacesPending,
    user: state.user
  };
};

const mapDispatch = dispatch => {
  return {
    getUser: () => dispatch(me()),
    getPendingRaces: (userId, queryType, queryIndicator) =>
      dispatch(fetchPendingUserRacesByUser(userId, queryType, queryIndicator)),
    getRaces: (userId, queryType, queryIndicator) =>
      dispatch(fetchUserRacesByUser(userId, queryType, queryIndicator)),
    startRace: (raceId, updateObj) =>
      dispatch(putARace(raceId, updateObj))
  };
};

export default connect(
  mapState,
  mapDispatch
)(PendingRacesScreen);
