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
  filter: {
    padding: 13,
    backgroundColor: '#007B7F',
  },
  filterButton: {
    backgroundColor: '#2F868E',
    flexDirection: 'row',
    padding: 10,
    borderRadius: 3,
    alignItems: 'center',
  },
  filterText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 15,
  },
});

class ExploreTab extends Component {

  componentWillMount() {
    this.props.getGadgets();
  }

  onPress(item) {
    this.props.navigate({ routeName: "Gadget", params: { item: item } });
  }

  onFilterPress() {
    this.props.navigate({ routeName: 'Filter' });
  }

  render() {
    const { gadgets, filter } = this.props;
    return (
      <View style = {styles.container}>
        <View style = {styles.filter}>
          <TouchableOpacity style={styles.filterButton} onPress={() => this.onFilterPress()}>
            <Icon size={30} name = 'ios-search-outline' color = 'white' />
            <Text style = { styles.filterText}>
              {`${filter.address || '場所'} - ${filter.startDate && filter.endDate ? `${filter.startDate} to ${filter.endDate}` : '時間' }`}
            </Text>
          </TouchableOpacity>
        </View>

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
  filter: state.gadget.filter,
});

const mapDispatchToProps = dispatch => ({
  navigate: (route) => dispatch(navigate(route)),
  getGadgets: () => dispatch(getGadgets()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreTab);
