import React from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions, Platform, ScrollView } from 'react-native';
import ToDo from './ToDo';

const { width, height } = Dimensions.get('window');

export default class App extends React.Component {
  state = {
    newTodo: '',
  };

  render() {
    const { newTodo } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        <Text style={styles.title}>To Do</Text>
        <View style={styles.card}>
          <TextInput style={styles.input} placeholder={'New To Do'} value={newTodo} onChangeText={this._controlNewToDo} placeholderTextColor={'#999'} returnKeyType={'done'} autoCorrect={false} />
          <ScrollView contentContainerStyle={styles.toDos}>
            {/* //5) */}
            <ToDo />
          </ScrollView>
        </View>
      </View>
    );
  }
  _controlNewToDo = (text) => {
    this.setState({
      newTodo: text,
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f23657',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 30,
    marginTop: 50,
    fontWeight: '200',
    marginBottom: 30,
  },
  card: {
    backgroundColor: 'white',
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(50,50,50,0.5)',
        shadowOpacity: 0.5,
        shadowRadius: 10,
        shadowOffset: {
          height: -1,
          width: 0,
        },
      },
      android: {
        elevation: 5,
      },
    }),
  },
  input: {
    padding: 20,
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    fontSize: 25,
  },
  toDos: {
    //4)
    alignItems: 'center',
  },
});

/*
4) toDos를 만들어서 가운데 정렬해주고 ⇒ 이걸 해주면 ToDo.js에서 작성한 with -50이 적용됨
5) ScrollView는 props이 있는데, "contentContainerStyle"임. 얘를 작성해서 앞서 만든 toDos스타일을 적용해줌
*/
