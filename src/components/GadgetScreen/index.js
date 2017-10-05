
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import { getGadget } from '../../actions/gadget';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
});

class GadgetScreen extends Component {

  componentWillMount() {
    const selectedGadgetId = this.props.navigation.state.params.item.id;
    this.props.getGadget(selectedGadgetId);
  }

  render() {
    const gadget = this.props.gadget;
    if (!gadget) return null;

    //const item = this.props.navigation.state.params.item;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{gadget.owner.name}</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  gadget: state.gadget.gadget,
});

const mapDispatchToProps = dispatch => ({
  getGadget: (gadgetId) => dispatch(getGadget(gadgetId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GadgetScreen);
