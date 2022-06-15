import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { Card, FAB } from 'react-native-paper'
import { MyContext } from '../App'

export default function Home(props) {
  // const [employee, setEmployee] = useState([])
  // const [loading, setLoading] = useState(true)

  const { state, dispatch } = useContext(MyContext)
  const { employee, loading } = state
  console.log('eeemployee', employee)
  console.log('loading', loading)

  const fetchEmployee = () => {
    fetch('http://10.0.2.2:5000/user')
      .then((res) => res.json())
      .then((results) => {
        // setEmployee(results)
        // setLoading(false)
        dispatch({ type: 'ADD_EMPLOYEE', payload: results })
        dispatch({ type: 'SET_LOADING', payload: false })
        console.log(results)
      })
      .catch((err) => Alert.alert('Fetch Employee Error !!'))
  }

  console.log(employee, loading)

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
