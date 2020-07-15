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
import { v1 as uuidv1 } from 'uuid'; //7)

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
  };

  componentDidMount() {
    this._loadToDos();
  }

  render() {
    const { newTodo, loadedToDos } = this.state;

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
            onSubmitEditing={this._addToDo} //1)
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
    this.setState({
      loadedToDos: true,
    });
  };
  _addToDo = () => {
    //2)
    const { newTodo } = this.state;

    if (newTodo !== '') {
      //3)
      this.setState({
        newTodo: '', //4)
      });

      //5)
      this.setState((prevState) => {
        const ID = uuidv1({ random: seed() }); //6) //8)
        const newToDoObject = {
          [ID]: {
            id: ID,
            isCompleted: false,
            text: newTodo,
            createdAt: Date.now(),
          },
        };

        //9)
        const newState = {
          ...prevState, //9-1)
          newToDo: '', //9-3)
          toDos: {
            //9-2)
            ...prevState.toDos,
            ...newToDoObject,
          },
        };
        return { ...newState };
      });
    }
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
1) 완료를 클릭할때를 의미하는 onSubmitEditing를 추가
2) 텍스트 인풋에서 투두를 추가하기 위해 새로운 function(_addToDo)을 만듦 : newTodo를 state에서 가져옴
3) newTodo가 비어있는지 아닌지 체크 - 즉, 비어있지 않고 뭔가가 쓰여있다면, 완료버튼을 눌렀을때 setState로 빈칸으로 바뀌게 함
4) 새로운 텍스트를 입력하고 확인을 누르면 빈칸이 나오도록함
  ⇒ 여기까지 하고 에뮬레이터에서 TextInput에 글자 넣고 확인버튼 누르면 빈칸나옴

## 다음으로는, TextInput에 들어갔던 글자들을 리스트로 넣어줘야 함
## 새로운 투두를 생성하기 위해서는 array를 생성하면 됨. 얘는 그냥 푸쉬하면 되는데 여기서는 조금 복잡하게 함
  step1)  IDIDIDIDIDIDID = {
            id : IDIDIDIDIDIDID,
            text : 'to do list에 작성한 내용',
            isCompleted : false,
            data : 20200101  
          }
          이런 형식으로 투두 오브젝트를 모델링 하려고 함
  step2) ID가 있는 이유는, 많은 투두 리스트를 가지게 하기 위함임
          즉, 
          const toDos = {
              IDIDIDIDIDIDID = {
              id : IDIDIDIDIDIDID,
              text : 'to do list에 작성한 내용',
              isCompleted : false,
              data : 20200101  
            },
            IDIDIDIDIDIDId = {
              id : IDIDIDIDIDIDId,
              text : 'to do list에 작성한 내용2',
              isCompleted : false,
              data : 20200102  
            }
          }
          이렇게 작성하려고 함
          그냥 array를 만드는 대신에, 이렇게 object를 만드는 이유는 todo를 자주 바꿀거기 때문임.(삭제, 완료, 업데이트 등)

5) 텍스트 박스를 비우고, state를 다시 바꿔줌 
  ⇒ 여기서 그냥 새로운 newToDo를 추가한다고 state가 바뀌는 거는 아님
    이전state를 가져와서 새로운 투두를 추가하는 방식으로 가야 함. 즉, prevState를 가져와서 새로운 투두를 추가
      this.setState({ toDos: prevState.toDos + newTodo });
    라는건데, 이렇게 작성하지 않고 
  ⇒ prevState를 가져와서 오브젝트를 생성 생성하고, 그 다음에 리스트 끝에 todo를 넣고 리스트를 추가


6) ID를 생성하기 위해 npm install uuid해줌 
7) uuid를 import해줌 - uuid version1임
8) 6)에 id를 생성해주기 위해 uuidv1()을 작성해줌

9) 새로운 오브젝트 생성(newState) 
9-1) 이전 state를 패스해줌(...prevState) 
9-2) toDos(오브젝트)작성 : 이전todo와 새todo를 전부 가져옴
9-3) newToDo(TextInput)를 배워버림


※ 6~8) 나는 니꼬꺼로 안돼서 공식문서(https://www.npmjs.com/package/uuid)와 아래 댓글 참고함 
  step1) [npm install uuid]
  step2) import { v1 as uuidv1 } from 'uuid';
  step3) 이걸 해주니까 TextInput에 입력하고 확인버튼 누르니 "getRandomValues() not supported" 에러가 뜸. 공식문서에 이 에러뜨면 Install react-native-get-random-values 하라고 나옴( crypto.getRandomValues() API is not supported때문이고 폴리필이 필요하다고 함)
  step4) [npm install --save react-native-get-random-values]
  step5) 설치하고 uuid보다 앞에 import하라고 나옴(공식문서 참조)
  step6) 여기까지 했더니 null은 오브젝트가 아니다 라는 에러 뜸
  step7) 댓글에 
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
      추가하라고 나옴
  step8) 마지막으로 const ID = uuidv1({ random:seed()}) 로 수정하니까 깔끔하게 작동됨
*/
