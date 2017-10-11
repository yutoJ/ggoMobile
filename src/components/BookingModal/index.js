import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
} from 'react-native';
import Dates from 'react-native-dates';
import moment from 'moment';

import { bookGadget } from '../../actions/gadget';

import GoGoButton from '../Shared/GoGoButton';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#812990',
  },
  calendar: {
    marginBottom: 30,
  }
});

class BookingModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      focus: 'startDate',
      startDate: null,
      endDate: null
    }
  }

  onBooking() {
    const { bookGadget, gadget } = this.props;
    const startDate = this.state.startDate.format('YYYY-MM-DD');
    const endDate = this.state.endDate.format('YYYY-MM-DD');

    bookGadget(gadget.id, startDate, endDate);
  }

  render() {

    const isDateBlocked = (date) =>
    date.isBefore(moment(), 'day') || this.props.gadget.unavailableDates.indexOf(date.format('YYYY-MM-DD')) !== -1;


    const onDatesChange = ({ startDate, endDate, focusedInput }) =>
      this.setState({ ...this.state, focus: focusedInput }, () =>
        this.setState({ ...this.state, startDate, endDate })
      );

    return (
      <ScrollView style={styles.container} contentContainerStyle = {{ padding: 20 }}>
        <View style = {styles.calendar}>
          <Dates
           onDatesChange={onDatesChange}
           isDateBlocked={isDateBlocked}
           startDate={this.state.startDate}
           endDate={this.state.endDate}
           focusedInput={this.state.focus}
           range
         />

         </View>
         <GoGoButton onPress = { () => this.onBooking()}
           backgroundColor = {!this.state.startDate ? 'rgba(47,134,142,0.2)' : '#2F868E' }
           textColor = {!this.state.startDate ? 'rgba(226,226,226,0.2)' : '#E2E2E2' }
           //TODO Request or resevation
           label = '予約'
           disable = {!this.state.startDate}
         />

      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  gadget: state.gadget.gadget,

});

const mapDispatchToProps = dispatch => ({
  bookGadget: (gadgetId, startDate, endDate) => dispatch(bookGadget(gadgetId, startDate, endDate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
