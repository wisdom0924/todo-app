import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Dimensions,
  Platform,
  ScrollView,
} from 'react-native';
import { AppLoading } from 'expo'; //4)
import ToDo from './ToDo';

const { width, height } = Dimensions.get('window');

export default class App extends React.Component {
  state = {
    newTodo: '',
    loadedToDos: false, //2)
  };

  componentDidMount() {
    this._loadToDos();
  } //6)

  render() {
    const { newTodo, loadedToDos } = this.state; //3)

    //5)
    if (!loadedToDos) {
      return <AppLoading />;
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        <Text style={styles.title}>To Do</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder={'New To Do'}
            value={newTodo}
            onChangeText={this._controlNewToDo}
            placeholderTextColor={'#999'}
            returnKeyType={'done'}
            autoCorrect={false}
          />
          <ScrollView contentContainerStyle={styles.toDos}>
            <ToDo text={'hello'} />
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

  _loadToDos = () => {
    //7)
    this.setState({
      loadedToDos: true,
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
    alignItems: 'center',
  },
});

/*
2) 디스크에서 투두를 로딩해야 함. 누군가 투두를 추가할 때마다 얘를 저장해야 하므로 - loadedToDos를 만들어주고, 디폴트로 false를 줌. 
3) this.state에 넣어주고
4) expo에서 AppLoading을 import해줌
5) 만약에 투두가 로딩이 안되어 있다면, AppLoading을 리턴해주고, 로딩되어 있다면 기존의 return내용을 리턴해줌
⇒ 이렇게하면 로딩화면이 뜸
6) componentDidMount를 만들어서 로딩이 끝났을때 실행될 아이를 작성해줌. 그 함수를 _loadToDos라고 하고, 7)에 내용을 작성
7) 로딩이 끝나면 state를 true로 세팅해야 렌더링됨
8) 
9) 
*/
