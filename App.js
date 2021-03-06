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
  KeyboardAvoidingView,
  // TouchableWithoutFeedback,
  // Keyboard,
  // Button,
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
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={20}
        style={styles.container}
      >
        <View style={styles.inner}>
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
            <ScrollView
              contentContainerStyle={styles.toDos}
              keyboardShouldPersistTaps="always"
            >
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
      </KeyboardAvoidingView>
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
    backgroundColor: '#94BFCA',
    alignItems: 'center',
  },
  inner: {
    flex: 1,
    justifyContent: 'space-around',
  },
  title: {
    color: 'white',
    marginTop: 50,
    fontWeight: '200',
    fontSize: 36,
    marginBottom: 30,
  },
  card: {
    // backgroundColor: 'white',
    flex: 1,
    width: width - 25,
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
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 60,
    borderColor: '#bbb',
    borderBottomWidth: 1,
    marginBottom: 5,
    padding: 20,
    backgroundColor: 'white',
  },
  toDos: {
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
