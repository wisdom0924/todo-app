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
  AsyncStorage,
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
            {Object.values(toDos)
              .reverse()
              .map((toDo) => (
                <ToDo
                  key={toDo.id}
                  {...toDo}
                  deleteToDo={this._deleteToDo}
                  uncompleteTodo={this._uncompleteTodo}
                  completeTodo={this._completeTodo}
                  updateTodo={this._updateTodo}
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

  _loadToDos = async () => {
    //1)
    try {
      const toDos = await AsyncStorage.getItem('toDos'); //3)
      const parsedToDos = JSON.parse(toDos); //5-1)
      console.log(toDos); //4)
      this.setState({
        loadedToDos: true,
        /*toDos, //5)*/
        toDos: parsedToDos,
      });
    } catch (error) {
      //2)
      console.log(error);
    }
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
        this._saveTodos(newState.toDos);
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
      this._saveTodos(newState.toDos);
      return { ...newState };
    });
  };

  _uncompleteTodo = (id) => {
    this.setState((prevState) => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            isCompleted: false,
          },
        },
      };
      this._saveTodos(newState.toDos);
      return { ...newState };
    });
  };

  _completeTodo = (id) => {
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
      this._saveTodos(newState.toDos);
      return { ...newState };
    });
  };

  _updateTodo = (id, text) => {
    this.setState((prevState) => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            text: text,
          },
        },
      };
      this._saveTodos(newState.toDos);
      return { ...newState };
    });
  };

  _saveTodos = (newToDos) => {
    const saveTodos = AsyncStorage.setItem('toDos', JSON.stringify(newToDos));
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
1) Todo를 로드함. 즉, async함수(로딩이 끝날때까지 기다려야 한다는 의미)
2) try-catch를 작성하고 콘솔로그로 에러를 출력함
3) AsyncStorage는 폰 디스크에 작은 variable(key value object같은거를) 저장함. 얘는 많은 function이 있음. setItem, getItem, clearItem 등등등
4) 콘솔로 state에서 뭘 얻는지 찍어봐~

  {"d16fed50-c678-11ea-920c-0b1610070805":{"id":"d16fed50-c678-11ea-920c-0b1610070805","text":"hello","createdAt":1594803280038,"isCompleted":true},"d4e69d80-c678-11ea-920c-0b1610070805":{"id":"d4e69d80-c678-11ea-920c-0b1610070805","text":"bye","createdAt":1594803285848,"isCompleted":true}}
  이렇게 string이 출력되는걸 알 수 있음

5) 내가 얻고싶은 투두를 state에 assign할수도 있음 - 디스크에 얻은것을 state에 넣으면 됨
 - 오류뜨는데, AsyncStorage로 얻은 애는 오브젝트가 아니고 string이지. 
 - 5-1) 따라서 얘를 다시 오브젝트로 변환해줘야 함 : JSON.parse()사용
6) 투두 리스트를 추가할때 맨 아래가 아닌 맨 위에 오게 하려면 reverse()추가
  ⇒여기까지 하면, 리프레시해도 저장된 데이터가 사라지지 않고 남아있게 됨.
*/
