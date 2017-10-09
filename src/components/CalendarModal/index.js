import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
} from 'react-native';

import moment from 'moment';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  date: {
    flexDirection: 'row',
    height: 100,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    width: 100,
    textAlign: 'center',
    alignSelf: 'center',
  },
  details: {
    flex: 1,
  },
});

class CalendarModal extends Component {

  render() {
    const dates = moment.range(moment(), moment().add(1, 'months')).toArray('days');
    return (
      <ScrollView style = {styles.container}>
        {dates.map((date, idx) => {
          return (
            <View style = {styles.date} key = {idx}>
              <Text style = {styles.label}>{date.format('DD MMM')}</Text>
              <View style = {styles.details}></View>
            </View>
          );
        })}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarModal);
