import { Modal, View, Text, TouchableOpacity,TouchableWithoutFeedback, StyleSheet } from 'react-native';


interface DataItem{
    name:string,
    type:string,
    value:number,
    currency:string[],
}

 interface ModalBlockProps {
       modalVisible:boolean;
       setModalVisible:(visible:boolean) => void ;
    }

   
export default function ModalBlock({modalVisible,setModalVisible}:ModalBlockProps) {
    const handleEdit = () =>{
       setModalVisible(false);
    }

    // const handleDelete = () =>{
    //    setModalVisible(false);
    //  const filter =  data.filter((item)=> item.value === 5);
    //  setTransData(filter);
       
    // }
    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Transaction Options</Text>
                        
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={handleEdit }
                                
                            >
                                <Text style={styles.textStyle}>Edit</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                               // onPress={handleDelete}
                            >
                                <Text style={styles.textStyle}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    },
    modalView: {
        margin: 20,
        backgroundColor: 'green',
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '90%',
        maxWidth: 400,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        color: '#333',
    },
    modalText: {
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 16,
        lineHeight: 22,
        color: 'black',
    },
    buttonContainer: {
        flexDirection: 'column',
        width: '100%',
        gap:8,
    },
    button: {
        borderRadius: 10,
        padding: 12,
        elevation: 2,
        minWidth: 100,
    },
    buttonClose: {
        backgroundColor: 'white',
    },
    textStyle: {
         color: '#333',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
});