import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import { navigate } from '../../actions/nav';
import { getGadgets } from '../../actions/gadget';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  list: {
    padding: 20,
    backgroundColor: 'white',
  },
  item: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 10,
  },
  image: {
    width: Dimensions.get('window').width - 80,
    height: Dimensions.get('window').width *4/7,
    marginBottom: 15,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    alignSelf: 'center',
  },
});

class CalendarTab extends Component {

  componentWillMount() {
    this.props.getGadgets();
  }

  onPress(item) {
    this.props.navigate({ routeName: "Gadget", params: { item: item } });
  }

  render() {
    const { gadgets } = this.props;
    return (
      <View style = {styles.container}>
        <Text style = {styles.heading}>あなたのガジェット</Text>
        <FlatList
          style={styles.list}
          data={gadgets}
          renderItem={({item}) =>
            <TouchableOpacity onPress={() => this.onPress(item)} style={styles.item}>
              <Image style={styles.image} source= {{uri: item.image }} />
              <Text style={styles.title}>{`${item.price}円/日 ${item.instant ? '🎉 ' : ''}${item.title}`}</Text>
              <Text>{`${item.gadgetType}`}</Text>
            </TouchableOpacity>
          }
          keyExtractor={(item, index) => item.id}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  gadgets: state.gadget.gadgets,
});

const mapDispatchToProps = dispatch => ({
  navigate: (route) => dispatch(navigate(route)),
  getGadgets: () => dispatch(getGadgets()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarTab);
