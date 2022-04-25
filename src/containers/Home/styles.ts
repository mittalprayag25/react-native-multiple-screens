import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ff6600',
    height: 50,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  headerLabel: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  subSection: {
    color: 'black',
  },
  story: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
    marginHorizontal: 5,
  },
  storyHeader: {
    fontWeight: 'bold',
    fontSize: 16,
    marginHorizontal: 5,
  },
  storyAuthor: {
    marginLeft: 10,
  },
  more: {
    fontSize: 20,
    color: 'green',
    alignSelf: 'center',
  },
});

export default styles;
