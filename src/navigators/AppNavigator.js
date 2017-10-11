
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StatusBar, View, BackHandler } from 'react-native';
import { addNavigationHelpers, StackNavigator, TabNavigator, NavigationActions } from 'react-navigation';

import ExploreTab from '../components/MainScreen/ExploreTab';
import ProfileTab from '../components/MainScreen/ProfileTab';
import CalendarTab from '../components/OwnerScreen/CalendarTab';
import GadgetScreen from '../components/GadgetScreen';
import AuthenticationScreen from '../components/AuthenticationScreen';
import FilterModal from '../components/FilterModal';
import BookingModal from '../components/BookingModal';
import CalendarModal from '../components/CalendarModal';

import Icon from 'react-native-vector-icons/Ionicons';

const tabConfig = {
  tabBarPosition: 'bottom',
  tabBarOptions: {
    showIcon: true,
    activeTintColor: '#FF5A60',
    inactiveTintColor: '#3A3A3A',
    labelStyle: {
      fontSize: 10,
      fontWeight: 'bold'
    },
    tabStyle: {
      paddingBottom: 0,
      borderTopWidth: 1,
      borderTopColor: 'lightgray',
      backgroundColor: 'white'
    },
    style: {
      backgroundColor: 'white',
    },
  },
}

export const MainScreen = TabNavigator({
  Explore: {
    screen: ExploreTab,
    navigationOptions: {
      tabBarLabel: '探す',
      tabBarIcon: ({focused, tintColor}) => <Icon name={'ios-search-outline'} size={30} color={tintColor}/>
    }
  },
  Profile: {
    screen: ProfileTab,
    navigationOptions: {
      tabBarLabel: 'あなた',
      tabBarIcon: ({focused, tintColor}) => <Icon name={'ios-person-outline'} size={30} color={tintColor}/>
    }
  },
}, tabConfig);

export const CalendarStack = StackNavigator({
  CalendarTab: {
    screen: CalendarTab,
    navigationOptions: {
      header: null,
    }
  },
  CalendarModal: {
    screen: CalendarModal,
    navigationOptions: (props) => ({
      title: props.navigation.state.params.item.title,
    })
  },
});

export const OwnerScreen = TabNavigator({
  Calendar: {
    screen: CalendarStack,
    navigationOptions: {
      tabBarLabel: 'カレンダー',
      tabBarIcon: ({focused, tintColor}) => <Icon name={'ios-calendar-outline'} size={30} color={tintColor}/>
    }
  },
  Profile: {
    screen: ProfileTab,
    navigationOptions: {
      tabBarLabel: 'あなた',
      tabBarIcon: ({focused, tintColor}) => <Icon name={'ios-person'} size={30} color={tintColor}/>
    }
  },
}, {
  ...tabConfig,
  tabBarOptions: {
    ...tabConfig.tabBarOptions,
    activeTintColor: '#812990'
  }
});

export const AppNavigator = StackNavigator({
  Authentication: {
    screen: AuthenticationScreen,
    navigationOptions: {
      header: null,
    }
  },
  Main: {
    screen: MainScreen,
    navigationOptions: {
      header: null,
    }
  },
  Gadget: {
    screen: GadgetScreen,
    navigationOptions: (props) => ({
      title: props.navigation.state.params.item.title,
    })
  },
  Filter: {
    screen: FilterModal,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#812990',
        elevation: 0,
      },
      headerTintColor: '#E2E2E2',
    }
  },
  Booking: {
    screen: BookingModal,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#812990',
        elevation: 0,
      },
      headerTintColor: '#E2E2E2',
    }
  },
  Owner: {
    screen: OwnerScreen,
    navigationOptions: {
      header: null,
    }
  },
});

class AppWithNavigationState extends Component {

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    const { dispatch, nav } = this.props;
    if (nav.index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  }

  render() {
    const { dispatch, nav } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#812990"/>
        <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
});

const mapDispatchToProps = dispatch => ({
  dispatch: (action) => dispatch(action),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppWithNavigationState);
