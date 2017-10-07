import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
} from 'react-native';

import { login, logout } from '../../actions/user';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class FilterModal extends Component {

  render() {

    return (
      <View style={styles.container}>

      </View>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterModal);
