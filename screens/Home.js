import { View, Text, StyleSheet, Image, FlatList } from 'react-native'
import React from 'react'
import { Card, FAB } from 'react-native-paper'

export default function Home() {
  const data = [
    { id: 1, name: 'jangbuho', position: 'web dev' },
    { id: 2, name: 'JungGu', position: 'android dev' },
    { id: 3, name: 'BongGu', position: 'ML dev' },
    { id: 4, name: 'TangGu', position: 'web dev' },
    { id: 5, name: 'TangGu', position: 'web dev' },
    { id: 6, name: 'TangGu', position: 'web dev' },
    { id: 7, name: 'TangGu', position: 'web dev' },
    { id: 8, name: 'TangGu', position: 'web dev' },
    { id: 9, name: 'jangbuho', position: 'web dev' },
    { id: 10, name: 'JungGu', position: 'android dev' },
    { id: 11, name: 'BongGu', position: 'ML dev' },
    { id: 12, name: 'TangGu', position: 'web dev' },
    { id: 13, name: 'TangGu', position: 'web dev' },
    { id: 14, name: 'TangGu', position: 'web dev' },
    { id: 15, name: 'TangGu', position: 'web dev' },
    { id: 16, name: 'TangGu', position: 'web dev' },
  ]

  const renderList = (item) => {
    return (
      <>
        <Card style={styles.mycard}>
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
      </>
    )
  }

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return renderList(item)
        }}
        keyExtractor={(item) => `${item.id}`}
      />
      <FAB
        style={styles.fab}
        small
        icon='plus'
        theme={{ colors: { accent: '#006aff' } }}
        onPress={() => console.log('Pressed')}
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
