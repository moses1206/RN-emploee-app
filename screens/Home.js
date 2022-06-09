import { View, Text, StyleSheet, Image, FlatList } from 'react-native'
import React from 'react'
import { Card, FAB } from 'react-native-paper'

export default function Home(props) {
  const data = [
    {
      id: 1,
      name: 'BongGu',
      email: 'BongGu@abc.com',
      salary: '5 lpa',
      phone: '123',
      position: 'web dev',
      picture:
        'https://images.unsplash.com/photo-1654488719071-40a7a4b0d44d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80',
    },
    {
      id: 2,
      name: 'TangBu',
      email: 'TangBu@abc.com',
      salary: '8 lpa',
      phone: '123555',
      position: 'mobile dev',
      picture:
        'https://images.unsplash.com/photo-1654488719071-40a7a4b0d44d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80',
    },
    {
      id: 3,
      name: 'JJangGu',
      email: 'JJangGu@abc.com',
      salary: '12 lpa',
      phone: '2212883',
      position: 'Full Stack dev',
      picture:
        'https://images.unsplash.com/photo-1654488719071-40a7a4b0d44d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80',
    },
  ]

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
                uri: 'https://images.unsplash.com/photo-1654488719071-40a7a4b0d44d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80',
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
        data={data}
        renderItem={({ item }) => {
          return renderList(item)
        }}
        keyExtractor={(item) => item.id}
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
