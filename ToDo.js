import React, { component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput } from 'react-native';

const { width, height } = Dimensions.get('window');

export default class ToDo extends React.Component {
  state = {
    isEditing: false,
    isCompleted: false,
    toDoValue: '', //2)
  };
  render() {
    const { isCompleted, isEditing, toDoValue } = this.state; //5)
    const { text } = this.props; //1-1)
    return (
      <View style={styles.container}>
        <View style={styles.column}>
          <TouchableOpacity onPress={this._toggleComplete}>
            <View style={[styles.circle, isCompleted ? styles.completedCircle : styles.uncompletedCircle]} />
          </TouchableOpacity>
          {/* //4) */}
          {isEditing ? (
            <TextInput
              style={[styles.input, styles.text, isCompleted ? styles.completedText : styles.uncompletedText]}
              value={toDoValue}
              multiline={true}
              onChangeText={this._controlInput}
              returnKeyType={'done'}
              onBlur={this._finishEditing}
            /> //5) //6) //7) //8) //10) //11)
          ) : (
            <Text style={[styles.text, isCompleted ? styles.completedText : styles.uncompletedText]}>
              {/* // Hello Hello Hello Hello Hello111 //1) */}
              {text}
            </Text>
          )}
        </View>
        {isEditing ? (
          <View style={styles.actions}>
            <TouchableOpacity onPressOut={this._finishEditing}>
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}>✔</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.actions}>
            <TouchableOpacity onPressOut={this._startEditing}>
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}>✏</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}>❌</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }

  _toggleComplete = () => {
    this.setState((prevState) => {
      return {
        isCompleted: !prevState.isCompleted,
      };
    });
  };

  _startEditing = () => {
    const { text } = this.props; //3)
    this.setState({
      isEditing: true,
      toDoValue: text, //3)
    });
  };

  _finishEditing = () => {
    this.setState({
      isEditing: false,
    });
  };

  _controlInput = (text) => {
    //9)
    this.setState({
      toDoValue: text,
    });
  };
}

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    marginRight: 20,
  },
  completedCircle: {
    borderColor: '#bbb',
  },
  uncompletedCircle: {
    borderColor: '#f23657',
  },
  text: {
    fontWeight: '600',
    fontSize: 20,
    marginVertical: 20,
  },
  completedText: {
    color: '#bbb',
    textDecorationLine: 'line-through',
  },
  uncompletedText: {
    color: '#353535',
  },
  column: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width / 2,
    justifyContent: 'space-between',
  },
  actions: {
    flexDirection: 'row',
  },
  actionContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  input: {
    marginVertical: 15,
    width: width / 2,
  },
});

/*
※ App.js에서 value={newTodo}를 관리하고 있음
- value(newTodo)는 state에 있고, 얘를 input에 넘겨줘서 관리하고 있음 
⇒ 누군가 편집을 하고 있을 때, 동일한 작업을 해야 함.(왜냐하면 텍스트 인풋을 보여줘야 하므로) 즉, 수정하기를 누르면 리스트가 편집 가능한 input이 되도록 만드는 작업

1) 이 부분이 텍스트가 아닌, props에서 텍스트를 얻어오면 됨. (어떤값을 컴포넌트에게 전달해줘야 할때 props를 사용)
⇒ 따라서 1-1)에 비구조화 할당을 통해 text를 props로 받아오게 해줌
⇒ 그 후에 1)에 {text}를 넣어주고, 
⇒ App.js에서 ScrollView의 ToDo 부분에 text를 넣어줌 (1-2) - 텍스트를 여기로 패스하는 개념임
∴ 즉, 누군가 편집을 클릭했을 때, 해당 텍스트를 복사해서 state에 보내는 것
2) state에 toDoValue를 만들어짐. 처음엔 텅 비어있음. 그러나 누군가 편집을 하기 시작하면 props에서 텍스트를 가져와서 얘를 state에 넣을거임.(3)
3) 편집하기를 누르면, 텍스트가 지워지고 input박스가 생겨야 함. 따라서, 
4) 
  <Text
  style={[
    styles.text,
    isCompleted ? styles.completedText : styles.uncompletedText,
  ]}
>
  Hello Hello Hello Hello Hello111 //1) 
  {text}
</Text>
대신에 삼항연산자로 편집모드에서는 TextInput, 아닐때는 위의 Text가 보이게 해줌

5) value에 toDoValue를 추가해주고, this.state에도 추가해줌
6) input이라는 style을 적용해줌
7) textinput이 길어질 수 있으므로, multiline을 활성화해줌
8) 완료된 후에도 편집할 수 있도록 하기 위해 styles.input을 배열로 만들어서 styles.text도 추가해줌 + Text에 들어간 삼항연산자 복붙해줌
9) props를 복사해서 state에 넣고있음. 나중에 관리할 수 있도록, 얘를 쉽게 하려면, _controlInput 함수를 만들어서 
10) onChangeText에 _controlInput을 넣어줌
⇒ 이렇게 하면 input을 수정할 수 있게 됨
11) returnKeyType 추가
12) onBlur일때 _finishEditing추가 : 칸 밖을 클릭하면 편집 종료됨
*/
