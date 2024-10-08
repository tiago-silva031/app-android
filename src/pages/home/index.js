import { useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native'
import Slider from '@react-native-community/slider'
import { ModalPassword } from '../../components/modal'

let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*"

export function Home() {
  const [size, setSize] = useState(10)
  const [passwordValue, setPasswordValue] = useState("")
  const [modalVisible, setModalVisible] = useState(false)

  function generatePassword() {
    
    let password = "";

    for(let i = 0, n = charset.length; i < size; i++) {
      password += charset.charAt(Math.floor(Math.random() * n))
    }

    setPasswordValue(password)
    setModalVisible(true);
  }

    return(
        <View style={styles.container}>
          <Text style={styles.title}>Password Generator</Text>

          <Image
          source={require("../../assets/logo.png")}
          style={styles.logo}
          />

          <Text style={styles.subtitle}>{size} caracteres</Text>

          <View style={styles.area}>
            <Slider
            style={{ height: 50 }}
            minimumValue={6}
            maximumValue={20}
            maximumTrackTintColor="#ff0000"
            minimumTrackTintColor="#000"
            thumbTintColor="#392de9"
            value={size}
            onValueChange={ (value) => setSize(value.toFixed(0)) }
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={generatePassword}>
            <Text style={styles.buttonText}>Gerar senha</Text>
          </TouchableOpacity>


          <Modal visible={modalVisible} animationType="fade" transparent={true} >
            <ModalPassword password={passwordValue} handleClose={ () => setModalVisible(false) } />
          </Modal>
               
        </View>
    )
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: "#6256",
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo:{
    marginBottom: 10
  },
  area:{
    marginTop: 14,
    marginBottom: 14,
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
  },
  button:{
    backgroundColor:"#392de9",
    width: "80%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginBottom: 18
  },
  buttonText:{
    color: "#FFF",
    fontSize: 20,
    fontWeight: 'bold'
  },
  subtitle:{
    fontSize: 25,
    fontWeight: 'bold'
  },
  title:{
    fontSize: 40,
    marginBottom: 70,
    fontWeight: 'bold'
  }
})