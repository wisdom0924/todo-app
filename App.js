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
import { AppLoading } from 'expo';
import ToDo from './ToDo';
import 'react-native-get-random-values';
import { v1 as uuidv1 } from 'uuid';

const seed = () => {
  const one = Math.floor((Math.random() * 100) / 3.92);
  const two = Math.floor((Math.random() * 100) / 3.92);
  const three = Math.floor((Math.random() * 100) / 3.92);
  const four = Math.floor((Math.random() * 100) / 3.92);
  const five = Math.floor((Math.random() * 100) / 3.92);
  const six = Math.floor((Math.random() * 100) / 3.92);
  const seven = Math.floor((Math.random() * 100) / 3.92);
  const eight = Math.floor((Math.random() * 100) / 3.92);
  const nine = Math.floor((Math.random() * 100) / 3.92);
  const ten = Math.floor((Math.random() * 100) / 3.92);
  const eleven = Math.floor((Math.random() * 100) / 3.92);
  const twelve = Math.floor((Math.random() * 100) / 3.92);
  const thirteen = Math.floor((Math.random() * 100) / 3.92);
  const fourteen = Math.floor((Math.random() * 100) / 3.92);
  const fifteen = Math.floor((Math.random() * 100) / 3.92);
  const sixteen = Math.floor((Math.random() * 100) / 3.92);
  return [
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
    nine,
    ten,
    eleven,
    twelve,
    thirteen,
    fourteen,
    fifteen,
    sixteen,
  ];
};
const { width, height } = Dimensions.get('window');

export default class App extends React.Component {
  state = {
    newTodo: '',
    loadedToDos: false,
    toDos: {},
  };

  componentDidMount() {
    this._loadToDos();
  }

  render() {
    const { newTodo, loadedToDos, toDos } = this.state;

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
            onSubmitEditing={this._addToDo}
          />
          <ScrollView contentContainerStyle={styles.toDos}>
            {Object.values(toDos).map((toDo) => (
              <ToDo
                key={toDo.id}
                {...toDo}
                uncompleteTodo={this._uncompleteTodo} //5)
                completeTodo={this._completeTodo}
                deleteToDo={this._deleteToDo}
              />
            ))}
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
    this.setState({
      loadedToDos: true,
    });
  };

  _addToDo = () => {
    const { newTodo } = this.state;

    if (newTodo !== '') {
      this.setState({
        newTodo: '',
      });

      this.setState((prevState) => {
        const ID = uuidv1({ random: seed() });
        const newToDoObject = {
          [ID]: {
            id: ID,
            isCompleted: false,
            text: newTodo,
            createdAt: Date.now(),
          },
        };

        const newState = {
          ...prevState,
          newToDo: '',
          toDos: {
            ...prevState.toDos,
            ...newToDoObject,
          },
        };
        return { ...newState };
      });
    }
  };

  _deleteToDo = (id) => {
    this.setState((prevState) => {
      const toDos = prevState.toDos;
      delete toDos[id];
      const newState = {
        ...prevState,
        ...toDos,
      };
      return { ...newState };
    });
  };

  _uncompleteTodo = (id) => {
    //1)
    this.setState((prevState) => {
      const newState = {
        ...prevState, //2)
        toDos: {
          ...prevState.toDos,
          [id]: {
            //3)
            ...prevState.toDos[id],
            isCompleted: false,
          },
        },
      };
      return { ...newState };
    });
  };

  _completeTodo = (id) => {
    //4)
    this.setState((prevState) => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            isCompleted: true,
          },
        },
      };
      return { ...newState };
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
#할일목록 완성, 미완성 작업
1) 미완성 함수 만들고 
2) ...prevState에서 이전 state를 전달해주고 
3) 보내줄 id를 추가해줌. 즉, 이전todos를 덮어쓰면서 만약 해당 id를 가지고 있는 새로운게 있다면 덮어쓰게 함
4) 완성 함수도 만들어줌
5) _uncompleteTodo, _completeTodo는 투두 컴포넌트의 새로운 함수가 됨 : 얘네들을 디스크에 저장할건데 App.js는 저장되지만 ToDo.js는 저장 안됨.
*/
