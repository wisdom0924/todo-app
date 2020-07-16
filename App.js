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
            underlineColorAndroid={'transparent'} //3)
          />
          <ScrollView contentContainerStyle={styles.toDos}>
            {Object.values(toDos)
              .sort(function (a, b) {
                //1)
                if (a.hasOwnProperty('createdAt')) {
                  return a.createdAt - b.createdAt;
                }
              })
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
    try {
      const toDos = await AsyncStorage.getItem('toDos');
      const parsedToDos = JSON.parse(toDos);
      console.log(toDos);
      this.setState({
        loadedToDos: true,
        toDos: parsedToDos || {}, //2)
      });
    } catch (error) {
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
1) 완성/미완성 토글시 리스트 순서가 바뀌는 부분 해결하기 위해 sort함수 추가함
2) 앱에서 뜨는 경고 Object.values 관련 에러가 있는데 앱이 처음 열릴 때 todo를 찾을 수 없기 때문임(즉, todo를 null로 보고 있기 때문)
⇒ null은 object가 아니므로 parse를 할 수 없게 됨
⇒ 따라서 빈객체를 넣어서, 나중에 투두를 다 삭제하거나 리스트가 없이 시작할때, toDos가 빈 객체가 되도록 함
3) 안드로이드에서 TextInput을 클릭하면 밑줄생기는거 없애기 + ToDo.js의 TextInput에도 동일하게 적용해줌

# 이렇게 수정했는데, 수정 전에 build했어~ 만약에 이 상태로 앱 실행하면 얼어버림
엑스포의 작점은 코드를 빌드할때 apk위에 하지 않음. 빌드한 건 엑스포 클라이언트임. 이 때문에 열릴때마다 최신버전의 코드를 다운로드 할 수 있음
이 방법으로 apk, ios 앱스토어를 업데이트하는거임
이 때문에 다시 업데이트하고, 승인요청할 필요가 없어짐

수정했으므로, 엑스포 dev tool에서 Publish or republish project눌러주면 수정이 반영되어 최신 상태를 업데이트함
4) 
5)

 */
