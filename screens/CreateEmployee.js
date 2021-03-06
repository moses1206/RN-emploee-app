import {
  View,
  Text,
  StyleSheet,
  Modal,
  Alert,
  KeyboardAvoidingView,
} from 'react-native'
import React, { useState } from 'react'
import { TextInput, Button } from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker'

export default function CreateEmployee({ navigation, route }) {
  const getDetails = (type) => {
    if (route.params) {
      switch (type) {
        case 'name':
          return route.params.name
        case 'phone':
          return route.params.phone
        case 'email':
          return route.params.email
        case 'salary':
          return route.params.salary
        case 'picture':
          return route.params.picture
        case 'position':
          return route.params.position
      }
    } else {
      return ''
    }
  }
  if (route.params) {
    console.log(route.params)
  }

  const [name, setName] = useState(getDetails('name'))
  const [phone, setPhone] = useState(getDetails('phone'))
  const [email, setEmail] = useState(getDetails('email'))
  const [salary, setSalary] = useState(getDetails('salary'))
  const [picture, setPicture] = useState(getDetails('picture'))
  const [position, setPosition] = useState(getDetails('position'))
  const [modal, setModal] = useState(false)
  const [enableshift, setEnableshift] = useState(false)

  const submitHandler = () => {
    fetch('http:/10.0.2.2:5000/send-data', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        salary,
        picture,
        position,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert(`${data.name} is saved successfully`)
        navigation.navigate('Home')
      })
      .catch((err) => {
        Alert.alert('Create Employee Error !!')
      })
  }

  const updateHandler = () => {
    fetch('http:/10.0.2.2:5000/update', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: route.params._id,
        name,
        email,
        phone,
        salary,
        picture,
        position,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert(`${data.name} is updated successfully`)
        navigation.navigate('Home')
      })
      .catch((err) => {
        Alert.alert('Update Employee Error !!')
      })
  }

  const pickFromGallary = async () => {
    let data = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    })
    if (!data.cancelled) {
      let newfile = {
        uri: data.uri,
        type: `test/${data.uri.split('.')[1]}`,
        name: `test.${data.uri.split('.')[1]}`,
      }
      handleUpload(newfile)
    }
  }

  const pickFromCamera = async () => {
    let data = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    })
    if (!data.cancelled) {
      let newfile = {
        uri: data.uri,
        type: `test/${data.uri.split('.')[1]}`,
        name: `test.${data.uri.split('.')[1]}`,
      }
      handleUpload(newfile)
    }
  }

  const handleUpload = (image) => {
    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', 'employeeApp')
    data.append('cloud_name', 'moses23')

    fetch('https://api.cloudinary.com/v1_1/moses23/image/upload', {
      method: 'post',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setPicture(data.url)
        setModal(false)
      })
      .catch((err) => Alert.alert('Image uploading Error !!'))
  }

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior='position'
      enabled={enableshift}
    >
      <View>
        <TextInput
          label='Name'
          value={name}
          onFocus={() => setEnableshift(false)}
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
          onFocus={() => setEnableshift(false)}
          onChangeText={(text) => setPhone(text)}
        />
        <TextInput
          label='Email'
          value={email}
          mode='outlined'
          style={styles.inputStyle}
          theme={theme}
          onFocus={() => setEnableshift(false)}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          label='Salary'
          value={salary}
          mode='outlined'
          style={styles.inputStyle}
          theme={theme}
          onFocus={() => setEnableshift(true)}
          onChangeText={(text) => setSalary(text)}
        />
        <TextInput
          label='Positon'
          value={position}
          mode='outlined'
          style={styles.inputStyle}
          theme={theme}
          onFocus={() => setEnableshift(true)}
          onChangeText={(text) => setPosition(text)}
        />
        <Button
          style={styles.inputStyle}
          icon={picture == '' ? 'upload' : 'check'}
          mode='contained'
          onPress={() => setModal(true)}
          theme={theme}
        >
          Upload Image
        </Button>

        {route.params ? (
          <Button
            style={styles.inputStyle}
            icon='content-save'
            mode='contained'
            onPress={() => updateHandler()}
            theme={theme}
          >
            Update
          </Button>
        ) : (
          <Button
            style={styles.inputStyle}
            icon='content-save'
            mode='contained'
            onPress={() => submitHandler()}
            theme={theme}
          >
            Save
          </Button>
        )}

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
    </KeyboardAvoidingView>
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
