import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Card, FAB } from 'react-native-paper'

export default function Home(props) {
  const [employee, setEmployee] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchEmployee = () => {
    fetch('http://e9b7-211-224-139-216.ngrok.io/user')
      .then((res) => res.json())
      .then((results) => {
        setEmployee(results)
        setLoading(false)
      })
      .catch((err) => Alert.alert('Fetch Employee Error !!'))
  }

  useEffect(() => {
    fetchEmployee()
  }, [])

  const renderList = (item) => {
    return (
      <>
        <Card
          style={styles.mycard}
          onPress={() => props.navigation.navigate('Profile', { item: item })}
        >
          <View style={styles.cardView}>
            <Image
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                marginRight: 10,
              }}
              source={{
                uri: item.picture,
              }}
            />
            <View styles={{ marginLeft: 10 }}>
              <Text style={styles.text}>{item.name}</Text>
              <Text style={styles.text}>{item.position}</Text>
            </View>
          </View>
        </Card>
      </>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={employee}
        renderItem={({ item }) => {
          return renderList(item)
        }}
        keyExtractor={(item) => item._id}
        onRefresh={() => fetchEmployee()}
        refreshing={loading}
      />

      <FAB
        onPress={() => props.navigation.navigate('CreateEmployee')}
        style={styles.fab}
        small
        icon='plus'
        theme={{ colors: { accent: '#006aff' } }}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  mycard: {
    margin: 5,
    flexDirection: 'row',
  },
  cardView: {
    flexDirection: 'row',
    padding: 6,
  },
  text: {
    fontSize: 18,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
})
