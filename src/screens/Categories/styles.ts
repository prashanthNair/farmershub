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
    justifyContent:'space-between',
    width: '100%',
    margin: 5,
    padding: 10,
    borderBottomColor: '#038d91',
    borderBottomWidth: 0.5, 
    marginBottom:5
  },
  lineheader: {
    backgroundColor: '#edf0ee',
    width: '100%',
    marginTop:0,
    marginBottom:0,
    borderWidth:0.5,
    borderColor:'#ffffff'
},
});
export default styles