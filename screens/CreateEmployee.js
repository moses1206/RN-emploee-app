import { View, Text, StyleSheet, Modal, Alert } from 'react-native'
import React, { useState } from 'react'
import { TextInput, Button } from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker'

export default function CreateEmployee() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [salary, Salary] = useState('')
  const [picture, setPicture] = useState('')
  const [modal, setModal] = useState(false)

  const pickFromGallary = async () => {
    let data = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    })
    console.log('Gallary Image', data)
  }

  const pickFromCamera = async () => {
    let data = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    })
    console.log('Camera Image', data)
  }

  return (
    <View style={styles.root}>
      <TextInput
        label='Name'
        value={name}
        mode='outlined'
        style={styles.inputStyle}
        theme={theme}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        label='Phone'
        value={phone}
        mode='outlined'
        style={styles.inputStyle}
        theme={theme}
        keyboardType='number-pad'
        onChangeText={(text) => setPhone(text)}
      />
      <TextInput
        label='Email'
        value={email}
        mode='outlined'
        style={styles.inputStyle}
        theme={theme}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        label='Salary'
        value={salary}
        mode='outlined'
        style={styles.inputStyle}
        theme={theme}
        onChangeText={(text) => setSalary(text)}
      />
      <Button
        style={styles.inputStyle}
        icon='upload'
        mode='contained'
        onPress={() => setModal(true)}
        theme={theme}
      >
        Upload Image
      </Button>
      <Button
        style={styles.inputStyle}
        icon='content-save'
        mode='contained'
        onPress={() => console.log('Saved')}
        theme={theme}
      >
        Save
      </Button>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setModal(false)
        }}
      >
        <View style={styles.modalView}>
          <View style={styles.modalButtonView}>
            <Button
              style={styles.buttonStlye}
              icon='camera'
              mode='contained'
              onPress={() => pickFromCamera()}
              theme={theme}
            >
              Camera
            </Button>
            <Button
              style={styles.buttonStlye}
              icon='image-area'
              mode='contained'
              onPress={() => pickFromGallary()}
              theme={theme}
            >
              Gallery
            </Button>
          </View>
          <Button
            style={styles.buttonStlye}
            onPress={() => setModal(false)}
            theme={theme}
          >
            Cancel
          </Button>
        </View>
      </Modal>
    </View>
  )
}

const theme = {
  colors: { primary: '#006aff' },
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  inputStyle: {
    margin: 5,
  },

  modalView: {
    position: 'absolute',
    bottom: 3,
    width: '100%',
    backgroundColor: 'white',
  },
  modalButtonView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
})
