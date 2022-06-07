import { View, Text, StyleSheet, Image, FlatList } from 'react-native'
import React from 'react'
import { Card } from 'react-native-paper'

export default function Home() {
  const data = [
    { id: 1, name: 'jangbuho', position: 'web dev' },
    { id: 2, name: 'JungGu', position: 'android dev' },
    { id: 3, name: 'BongGu', position: 'ML dev' },
    { id: 4, name: 'TangGu', position: 'web dev' },
  ]

  const renderList = (item) => {
    return (
      <Card style={styles.mycard} key={item.id}>
        <View style={styles.cardView}>
          <Image
            style={{ width: 60, height: 60, borderRadius: 30 }}
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
    )
  }

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return renderList(item)
        }}
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
})
