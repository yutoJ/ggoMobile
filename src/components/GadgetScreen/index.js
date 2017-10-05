
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import GoGoButton from '../Shared/GoGoButton';

import { getGadget } from '../../actions/gadget';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginBottom: 40,
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width*4/7,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 60,
  },
  info: {
    flex: 1,
    alignItems: 'center',
  },
  about: {
    paddingBottom: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
  },
  aboutText: {
    fontWeight: 'bold',
  },
  bookingBar: {
    position: 'absolute',
    bottom: 0,
    padding: 15,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#E2E2E2',
    backgroundColor: 'white',
    alignItems: 'center',
  }
});

class GadgetScreen extends Component {

  componentWillMount() {
    const selectedGadgetId = this.props.navigation.state.params.item.id;
    this.props.getGadget(selectedGadgetId);
  }

  render() {
    const gadget = this.props.gadget;
    if (!gadget) return null;

    const { image, owner, description, gadgetType, price, hasGuarantee, hasManual, hasContent, hasNoSetup, hasBattery, requireMobile, requireAccount } = gadget;

    //const item = this.props.navigation.state.params.item;
    return (

      <View style={{flex: 1}}>
        <ScrollView style = {styles.container}>
          <Image source = {{uri: image}} style = {styles.image} />
          <View style = {{padding: 30}}>

            <View style = {styles.row}>
              <Text style={{flex: 1}}>{`By ${owner.name}`}</Text>
              <Image source={{uri: owner.image}} style = {styles.avatar} />
            </View>

            <View style = {styles.row}>
              <View style = {styles.info}>
                <Icon name='ios-heart-outline' size={40}/>
                <Text>保証あり {hasGuarantee}</Text>
              </View>
              <View style = {styles.info}>
                <Icon name='ios-copy-outline' size={40}/>
                <Text>手順書あり {hasManual}</Text>
              </View>
              <View style = {styles.info}>
                <Icon name='ios-power-outline' size={40}/>
                <Text>初期設定済み {hasNoSetup}</Text>
              </View>
            </View>

            <View style = {styles.about}>
              <Text style = {styles.aboutText}>このガジェットについて</Text>
              <Text>{description}</Text>
            </View>

          </View>
        </ScrollView>

        <View style = {styles.bookingBar}>
          <Text style={{flex: 1}}>
            <Text style = {{fontWeight: 'bold'}}>{`${price}円`}</Text>/日
          </Text>
          <GoGoButton
            onPress = { () => {alert("Check Availability")} }
            backgroundColor = '#FF5A60'
            textColor = 'white'
            label = 'Check Availability'
          />
        </View>
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
