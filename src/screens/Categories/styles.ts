import { StyleSheet,Dimensions } from 'react-native';


// screen sizing
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container:{
    backgroundColor: '#ffffff',
    height:height+100
  },
  detailsRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    margin: 5,
    padding: 10,
    borderBottomColor: '#e8e8e8',
    borderBottomWidth: 1,
    marginBottom:5
  }
});
export default styles