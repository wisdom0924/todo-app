import React from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions, Platform } from 'react-native'; //1-1) 4) 8)

const { width, height } = Dimensions.get('window'); //5)

export default function App() {
  return (
    <View style={styles.container}>
      {/* //1) */}
      <StatusBar barStyle="light-content" />
      {/* //2) */}
      <Text style={styles.title}>To Do</Text>
      {/* //3) */}
      <View style={styles.card}>
        <TextInput style={styles.input} placeholder={'New ToDo'} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f23657',
    alignItems: 'center',
  },
  title: {
    //2)
    color: 'white',
    fontSize: 30,
    marginTop: 50,
    fontWeight: '200',
    marginBottom: 30,
  },
  card: {
    //3)
    backgroundColor: 'white',
    flex: 1,
    width: width - 25, //4) //6)
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      //7) //9)
      ios: {
        shadowColor: 'rgba(50,50,50)',
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
});

/*
1) StatusBar 를 작성해주고, import해줌
2) 제목을 작성해주고, 스타일링함
3) todo list가 나오는 곳(card)을 작성해주고 스타일링함
4) 휴대폰 스크린의 폭만큼 너비를 주기위해 줌 - 이를 위해 react-native의 Dimensions import
5) window사이즈로 width와 height를 가져오기 위해 작성
6) width값으로 변수 width에서 25을 빼준 값을 넣어줌. 즉, 이렇게 하면 페이지 전체에서 50을 뺀 값이 됨
7) shadow를 추가할건데, 얘는 플랫폼마다 약간 다름.(ios/android)
⇒ 즉. platform-specific code를 해야 함(css에 안드로이드 타겟, ios 타겟 작성해줘야 함)
⇒ ios에서는 shadowOpacity, shadowColor, shadowOffset, shadowRadius 사용하고
    안드로이드에서는 elevation: 0~5까지 있음. 사용해야함. 숫자가 커질수록 쉐도우가 커짐
⇒ 그럼 각각 다른 파일을 만들어야 하나? if condition를 사용해야 하나? : react-native에는 platform이라는게 있음. 얘를 import해줌

8) platform import : platform이 어떤 플랫폼을 사용하는지 확인해줌
9) 그리고 css에 
  ...Platform.select({
      ios: {},
      android: {},
  }),
이렇게 작성해줌 - ios면 해당 버전을 고르고, 안드로이드면 해당 스타일을 골라줌 
⇒ 플랫폼에 맞는 스타일을 적용할 수 있음

※ 그런데 니꼬의 코드는 클래스 컴포넌튼데 나는 함수형임
*/
