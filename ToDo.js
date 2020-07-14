import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default class Todo extends React.Component {
  //7)
  render() {
    return (
      <View>
        <Text>Hello</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({}); //7)

/*
7) 클래스 컴포넌트로 작성해줌 : 왜냐면, 수정을 누르면 state를 수정 모드로 변경해야 하므로
8) style을 작성해주고,
9) 렌더링 되는 부분을 작성(View, Text)
*/
