import React from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions, Platform, ScrollView } from 'react-native';
import ToDo from './ToDo'; //10
const { width, height } = Dimensions.get('window');

export default class App extends React.Component {
  //1)

  state = {
    //2)
    newTodo: '',
  };

  render() {
    const { newTodo } = this.state; //4)
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        <Text style={styles.title}>To Do</Text>
        <View style={styles.card}>
          <TextInput style={styles.input} placeholder={'New To Do'} value={newTodo} onChangeText={this._controlNewToDo} placeholderTextColor={'#999'} returnKeyType={'done'} autoCorrect={false} />
          <ScrollView>
            <ToDo />
          </ScrollView>
        </View>
      </View>
    );
  }

  _controlNewToDo = (text) => {
    //3)
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
});

/*
1) 함수형 컴포넌트를 클래스형 컴포넌트로 변경 : input에 텍스트를 넣으면 화면이 변해야 하고, 이를 위해서는 state를 사용해야 함
2) state를 작성 : 이름은 새로 작성되는 todo이므로 newTodo로 하고, 값은 비어있으니까.
3) 새로운 function생성. 이건 이벤트에서 텍스트를 가져오므로 this.setState에 newTodo를 작성되는 text로 넣어주면 됨
4) value값을 넣어줘야 하므로 this.state를 설정해줌
5) value값과 onChangeText, placeholderTextColor값을 설정해줌
+ 텍스트를 입력할때 아래에 등장하는 키보드를 [done]으로 변경하기 위해 returnKeyType을 설정해줌
⇒ returnKeyType={'done'}으로 하면, 아이폰에서 화살표가 [완료]버튼으로 나옴
+ 자동수정을 방지하기 위해 autoCorrect={false}로 해줌

#todo element를 만들고, todo list를 만들어서 리스트를 스크롤 할 수 있어야 하고, new todo는 상단에 고정되게 스타일링 해줘야 함
6) 스크롤을 하기 위해 ScrollView 컴포넌트를 만들어줌
+ 이 안에 todo list가 들어가야(렌더링) 되어야 하므로, 루트위치에 새로운 파일을(ToDo.js) 만들어줌

10) ToDo.js를 import해줌
11) ScrollView에는 ToDo를 렌더링해줌
*/
