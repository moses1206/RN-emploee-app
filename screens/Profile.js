import { View, Text, StyleSheet, Image, Linking, Platform } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Title, Card } from 'react-native-paper'
import { MaterialIcons, Entypo, AntDesign } from '@expo/vector-icons'
import { Button } from 'react-native-paper'

export default function Profile(props) {
  const { id, name, phone, email, picture, salary, position } =
    props.route.params.item

  const openDial = () => {
    if (Platform.OS === 'android') {
      Linking.openURL('tel:12345')
    } else {
      Linking.openURL('telprompt:12345')
    }
  }

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={['#0033ff', '#6bc1ff']}
        style={{ height: '20%' }}
      />
      <View style={{ alignItems: 'center', marginTop: -70 }}>
        <Image
          style={{ width: 140, height: 140, borderRadius: 70 }}
          source={{
            uri: picture,
          }}
        />
      </View>
      <View style={{ alignItems: 'center', margin: 15 }}>
        <Title>{name}</Title>
        <Text style={{ fontSize: 15 }}>{position}</Text>
      </View>
      <Card
        style={styles.mycard}
        onPress={() => {
          Linking.openURL('mailto:abc@abc.com')
        }}
      >
        <View style={styles.cardContent}>
          <MaterialIcons name='email' size={32} color='#006aff' />
          <Text style={styles.mytext}>{email}</Text>
        </View>
      </Card>
      <Card style={styles.mycard} onPress={() => openDial()}>
        <View style={styles.cardContent}>
          <Entypo name='phone' size={32} color='#006aff' />
          <Text style={styles.mytext}>{phone}</Text>
        </View>
      </Card>
      <Card style={styles.mycard}>
        <View style={styles.cardContent}>
          <MaterialIcons name='attach-money' size={32} color='#006aff' />
          <Text style={styles.mytext}>{salary}</Text>
        </View>
      </Card>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          padding: 10,
        }}
      >
        <Button
          icon='account-edit'
          mode='contained'
          theme={theme}
          onPress={() => console.log('Pressed')}
        >
          Edit
        </Button>
        <Button
          icon='delete'
          mode='contained'
          theme={theme}
          onPress={() => console.log('Pressed')}
        >
          Fire employee
        </Button>
      </View>
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
  mycard: {
    margin: 3,
  },
  cardContent: {
    flexDirection: 'row',
    padding: 8,
  },
  mytext: {
    fontSize: 15,
    marginTop: 3,
    marginLeft: 5,
  },
})
