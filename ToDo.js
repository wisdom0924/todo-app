import React, { component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default class ToDo extends React.Component {
  state = {
    isEditing: false,
    isCompleted: false,
  };
  render() {
    const { isCompleted, isEditing } = this.state; //6)
    return (
      <View style={styles.container}>
        <View style={styles.column}>
          {/* //2) */}
          <TouchableOpacity onPress={this._toggleComplete}>
            <View style={[styles.circle, isCompleted ? styles.completedCircle : styles.uncompletedCircle]} />
          </TouchableOpacity>
          <Text //1)
            style={[styles.text, isCompleted ? styles.completedText : styles.uncompletedText]}
          >
            Hello Hello Hello Hello Hello
          </Text>
        </View>
        {isEditing ? ( //4)
          <View style={styles.actions}>
            <TouchableOpacity onPressOut={this._finishEditing}>
              {/* //13) */}
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}>✔</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          //5)
          <View style={styles.actions}>
            <TouchableOpacity onPressOut={this._startEditing}>
              {/* //12) */}
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
    //11)
    this.setState({
      isEditing: true,
    });
  };

  _finishEditing = () => {
    //13)
    this.setState({
      isEditing: false,
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
    //7)
    flexDirection: 'row',
    alignItems: 'center',
    width: width / 2,
    justifyContent: 'space-between',
  },
  actions: {
    //9)
    flexDirection: 'row',
  },
  actionContainer: {
    marginVertical: 10, //10)
    marginHorizontal: 10,
  },
});

/*
1) 완료 / 미완료 됐을때 텍스트의 스타일도 다르게 줌
⇒ styles.text를 배열로 만들고
⇒ 삼항연산자를 사용해서 조건문을 만들어줌
⇒ 이런식으로 상태 변화를 줘서 state변화를 보여주는 것은, ToDo.js가 아니라 App.js에서 관리 됨(App 컴포넌트에서 ToDo를 렌더링하고, 얘를 로컬 스토리지에 저장할거기 때문)
2) TouchableOpacity, View를 또다른 View로 묶어줌 + styles.column을 적용해줌
3) 또다른 View를 만들어줌 (이모티콘 들어갈 영역) - 8)에서 삭제됨
4) 만약 수정하고 있따면 체크마크가 달린 액션을 보여주고, 아니라면 연필+엑스가 달린 액션을 보여줌(삭제해야 하므로) 
⇒ 따라서 삼항연산자 안에 View를 만들어서 style로 actions을 주고 
⇒ 액션 안에 터치 부분을 TouchableOpacity로 만들어주고 
⇒ 그 안에 다시 텍스트를 만들어서 체크마크를 넣어줌. (이모티콘은 윈도우+마침표)
5) 수정하지 않을때도 만들어줌
6) this.state에 isEditing을 넣어줌
7) 스타일을 작성해줌(column)
8)  <View style={styles.column}> 삭제해줌(isEditing위에있는거)
9) 연필모양과 삭제 버튼이 옆으로 위치하게 하기 위해 스타일 작성(actions)
10) 버튼에 마진을 주는 이유는, 터치시 콕 집어서 클릭하지 않고 항상 약간 위를 클릭하므로(손가락은 두꺼우니까)

11) 편집모드 / 수정 안할때 모드 스위칭을 하기 위해 startEditing function을 만들어줌
12) 연필모양 클릭했을때, startEditing이 실행되게 함
13) finishEditing도 만들어줌
⇒ 토글로 안해주는 이유는, 편집을 다 하고 나서 이걸 앱js의 함수에 저장을 해야하기 때문
*/
