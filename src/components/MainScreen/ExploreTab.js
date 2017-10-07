import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
} from 'react-native';

import { navigate } from '../../actions/nav';
import { getGadgets } from '../../actions/gadget';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white'
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
  }
});

class ExploreTab extends Component {

  componentWillMount() {
    this.props.getGadgets();
  }

  onPress(item) {
    this.props.navigate({ routeName: "Gadget", params: { item: item } });
  }

  render() {
    const { gadgets } = this.props;
    return (
      <FlatList
        style={styles.container}
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
    );
  }
}

const mapStateToProps = state => ({
  gadgets: state.gadget.gadgets
});

const mapDispatchToProps = dispatch => ({
  navigate: (route) => dispatch(navigate(route)),
  getGadgets: () => dispatch(getGadgets()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreTab);
