
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

import { logout } from '../../actions/user';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    flex: 1,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#555',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 80,
  },
  menuButton: {
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingVertical: 20,
  },
  menuButtonText: {
    fontSize: 20,
  },
});

class ProfileTab extends Component {

  addPayment() {

  }

  switchType() {}

  render() {
    const profile = this.props.profile || {}
    return (
      <ScrollView style = { styles.container }>
        <View style = { styles.profile }>
          <Text style = { styles.name }>{profile.name}</Text>
          <Image style = { styles.avatar } source = {{ uri: profile.avatar }} />
        </View>

        <TouchableOpacity onPress = {() => this.addPayment()} style = {styles.menuButton} >
          <Text>入金方法追加</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress = {() => this.switchPayment()} style = {styles.menuButton} >
          <Text>ホスト画面へ移動</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress = {() => this.props.logout()} style = {styles.menuButton} >
          <Text>ログアウト</Text>
        </TouchableOpacity>

      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.user.profile,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileTab);
