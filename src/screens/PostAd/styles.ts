import { StyleSheet, Dimensions } from 'react-native';
const { width: winWidth, height: winHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
    infoDetailsContainer: {
        // margin: 25,
        marginTop: 15,
        flex: 1
    },

    lineheader: {
        backgroundColor: '#f0f0f0',
        width: '100%',
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 0
    },
    detailsRow: {
        // flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginBottom: 1,
        padding: 5,
        fontSize: 22,
    },
    radioRow: {
        // flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginBottom: 10,
        marginTop:5,
        padding: 5,
        fontSize: 22, 
        borderColor: '#c7c7c7',
    },
    infoContainer: {
        marginTop: 10,
        alignItems: 'center',
    },
    infoRecipeName: {
        fontSize: 18,
        // margin: 10,  
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'left',
    },
    scrollContainer: {
        backgroundColor: '#fcfcfc',
        flex: 1
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        height: 120,
        padding: 5
    },
    textareaContainer: {
        height: 110,
        padding: 5,
        backgroundColor: '#ffffff',
        marginBottom: 30,
        borderWidth:0.5,
        marginTop:10,
        marginLeft:10,
        width:'97%'
    },
    textarea: {
        textAlignVertical: 'top',  // hack android
        height: 100,
        fontSize: 14,
        color: '#333',
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
    inputlabel: {
        marginLeft:10, color:'#878686', fontSize:15
    },
    alignCenter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    preview: {
        height: winHeight,
        width: winWidth,
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    },
    bottomToolbar: {
        width: winWidth,
        position: 'absolute',
        height: 100,
        bottom: 0,
    },
    captureBtn: {
        width: 60,
        height: 60,
        borderWidth: 2,
        borderRadius: 60,
        borderColor: "#FFFFFF",
    },
    captureBtnActive: {
        width: 80,
        height: 80,
    },
    captureBtnInternal: {
        width: 76,
        height: 76,
        borderWidth: 2,
        borderRadius: 76,
        backgroundColor: "red",
        borderColor: "transparent",
    },
    galleryContainer: {
        bottom: 100
    },
    galleryImageContainer: {
        width: 75,
        height: 75,
        marginRight: 5
    },
    galleryImage: {
        width: 75,
        height: 75
    }
});
export default styles