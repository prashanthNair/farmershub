import { StyleSheet, Dimensions } from 'react-native';

const { width: viewportWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
    circle: {
        borderRadius: 100,
        backgroundColor: 'red',
        width: 100,
        height: 100,
        justifyContent: "center",
        alignContent: 'center',
        color: 'red'
        // padding:50
    },
    container: {
        padding: 20,
        backgroundColor: '#ffffff'
    },
    header: {
        flexDirection:'row',
        justifyContent:'flex-start',
        marginBottom:30
    },
    detailsRow: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        margin: 5,
        padding: 10,
        borderBottomColor: '#e8e8e8',
        borderBottomWidth: 1, 
      },
      infoDetailsContainer: {
        // margin: 25,
        marginTop: 15,
        flex: 1
    },

    loginFormTextInput: {
        width: '99%',
        height: 43,
        fontSize: 14,
        borderRadius: 5,
        borderBottomWidth: 1,
        borderColor: '#0591fc',
        backgroundColor: '#fafafa',
        paddingLeft: 10,
        marginRight: 15,
        marginTop: 5,
        marginBottom: 5,

    },
});

export default styles;
