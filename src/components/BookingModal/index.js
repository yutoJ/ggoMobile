import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
} from 'react-native';

import GoGoButton from '../Shared/GoGoButton';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#007B7F',
  },
});

class BookingModal extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  onSearch() {
  }

  render() {

    return (
      <ScrollView style={styles.container} contentContainerStyle = {{ padding: 20 }}>

        <GoGoButton onPress = { () => this.onSearch()} backgroundColor = '#2F868E' textColor = '#E2E2E2' label = '検索'/>

      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
