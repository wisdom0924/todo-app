import React, { component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'; //2)

const { width, height } = Dimensions.get('window');

export default class ToDo extends React.Component {
  state = {
    isEditing: false, //1)
    isCompleted: false, //8)
  };
  render() {
    const { isCompleted } = this.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this._toggleComplete}>
          {/* //6) //10) */}
          <View style={[styles.circle, isCompleted ? styles.completedCircle : styles.uncompletedCircle]} />
        </TouchableOpacity>
        <Text style={styles.text}>Hello Hello Hello Hello Hello</Text>
      </View>
    );
  }

  _toggleComplete = () => {
    //10)
    this.setState((prevState) => {
      return {
        isCompleted: !prevState.isCompleted, //12)
      };
    });
  };
}

const styles = StyleSheet.create({
  container: {
    //3)
    width: width - 50,
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    //7)
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    marginRight: 20,
  },
  completedCircle: { borderColor: '#bbb' }, //11-1)
  uncompletedCircle: { borderColor: '#f23657' }, //11-1)
  text: {
    //7)
    fontWeight: '600',
    fontSize: 20,
    marginVertical: 20,
  },
});

/*
1) 투두앱은 두개의 states가 있음. 하나는 수정할 때, 나머지는 수정 안하고 그냥 보여주기만 할 때 : 수정했을때의 state를 작성(isEditing)해주고, 디폴트값을 false로 설정해줌
2) 리스트를 스타일링 하기 위해, Dimensions를 import해주고 + 화면의 사이즈를 불러오기 위해 작성해줌
3) 리스트를 스타일링 하기 위해 container를 만들고, View에 적용 
  ⇒그런데 width값을 줘도 적용이 안됨 (App.js로 가서 ScrollView 스타일링함)

6) 클릭 요소를 TouchableOpacity로 만들어줌
7) circle과 text를 만들어서 스타일을 작성하고 적용해줌
8) circle을 클릭하면 완성표시를 만들기 위해, state를 하나 더 작성해줌. isComplete:false
9) 로직 관리 - 변화를 만들어야 하기 때문임(완성/미완성)

10) TouchableOpacity가 onPress일때 _toggleComplete함수가 실행되도록 함
- onPress
: 터치가 해제 될 때 호출되지만 취소 된 경우에는 호출되지 않습니다 (예 : 응답기 잠금을 도용하는 스크롤 등).
- onPressIn
: onPress 이전에도 터치 가능한 요소를 누르고 호출하자마자 호출됩니다. 네트워크 요청을 할 때 유용합니다.
- onPressOut
: onPress 이전에도 터치가 해제 되 자마자 호출됩니다.
https://reactnative.dev/docs/touchablewithoutfeedback#onpressin

11) 완성 미완성에 따라 다른 스타일을 만들어줌 . circle에 array생성
12) setState에 !prevState.isCompleted를 해주면, onPress에 따라 true/false값이 나오면서 스타일이 변하게 됨
*/
