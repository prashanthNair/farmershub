import { StyleSheet, Dimensions } from 'react-native';

const { width: viewportWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
    circle: {
        borderRadius: 100,
        backgroundColor: '#f6f7f0',
        width: 70,
        height: 70,
        justifyContent: "center",
        alignContent: 'center',
        color: 'red'
        // padding:50
    },
    container: {
        backgroundColor: '#ffffff',
        height:1000
    },
    header: { 
        justifyContent:'center',
        height:180, 
        backgroundColor: '#b7dedd',
        alignContent:'center',
        alignItems:'center'
    },
    detailsRow: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        margin: 5,
        padding: 5,
        borderBottomColor: '#e8e8e8',
        borderBottomWidth: 1, 
      },
      contactinfo: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginTop: 15,
        margin: 5,
        padding: 5,
        borderBottomColor: '#e8e8e8',
        borderBottomWidth: 1, 
      },
      infoDetailsContainer: {
        // margin: 25,
        marginTop: 15,
        flex: 1
    },

    loginFormTextInput: {
        color:'#007272',
        width: '99%',
        height: 43,
        fontSize: 14,
        borderRadius: 5,
        borderBottomWidth: 0,
        borderColor: '#c7c7c7',
        // backgroundColor: '#fafafa',
        paddingLeft: 10,
        marginRight: 15,
        marginTop: 5,
        marginBottom: 5,

    },

    formTextInput: {
        width: '98%',
        height: 30,
        fontSize: 14,
        borderRadius: 5,
        borderBottomWidth: 1,
        borderColor: '#c7c7c7',
        backgroundColor: '#fafafa',
        marginLeft: 10,
        marginRight: 10
    },
});

export default styles;
