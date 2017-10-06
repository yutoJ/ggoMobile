
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
} from 'react-native';

import { login, logout } from '../../actions/user';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    backgroundColor: 'white',
    height: 60,
    padding: 20,
    borderRadius: 3,
    marginBottom: 10,
  },
});

class ProfileTab extends Component {

  state = {
    name: ''
  }

  render() {
    const { accessToken, login, logout, profile } = this.props;

    return (
      <View style={styles.container}>
        {
          !accessToken
          ?
          <View>
            <TextInput
              style={styles.input}
              placeholder="What's your name?"
              onChangeText={(name) => this.setState({ name })}/>
            <Button
              title='Login'
              onPress={() => login(this.state.name)}/>
          </View>
          :
          <View>
            <Text>{profile.name}</Text>
            <Button
              title='Logout'
              onPress={() => logout()}/>
          </View>
        }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  accessToken: state.user.accessToken,
  profile: state.user.profile,
});

const mapDispatchToProps = dispatch => ({
  login: (name) => dispatch(login(name)),
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileTab);
