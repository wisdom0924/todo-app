import React, { component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';
import PropTypes from 'prop-types';

const { width, height } = Dimensions.get('window');

export default class ToDo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      toDoValue: props.text,
    };
  }
  static propTypes = {
    text: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    deleteToDo: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    uncompleteTodo: PropTypes.func.isRequired,
    completeTodo: PropTypes.func.isRequired,
  };

  render() {
    const { isEditing, toDoValue } = this.state; //7-3)
    const { text, id, deleteToDo, isCompleted } = this.props; //7-4)
    return (
      <View style={styles.container}>
        <View style={styles.column}>
          <TouchableOpacity onPress={this._toggleComplete}>
            <View
              style={[
                styles.circle,
                isCompleted ? styles.completedCircle : styles.uncompletedCircle,
              ]}
            />
          </TouchableOpacity>
          {isEditing ? (
            <TextInput
              style={[
                styles.text,
                styles.input,
                isCompleted ? styles.completedText : styles.uncompletedText,
              ]}
              value={toDoValue}
              multiline={true}
              onChangeText={this._controlInput}
              returnKeyType={'done'}
              onBlur={this._finishEditing}
            />
          ) : (
            <Text
              style={[
                styles.text,
                isCompleted ? styles.completedText : styles.uncompletedText,
              ]}
            >
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
            <TouchableOpacity onPressOut={() => deleteToDo(id)}>
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
    // this.setState((prevState) => {
    //   return {
    //     isCompleted: !prevState.isCompleted,
    //   };
    // });
    const { isCompleted, uncompleteTodo, completeTodo, id } = this.props; //7-1)

    if (isCompleted) {
      uncompleteTodo(id);
      console.log(`isCompleted un, ${isCompleted}, ${id}`);
    } else {
      completeTodo(id);
      console.log(`isCompleted com, ${isCompleted}, ${id}`);
    }
  };

  _startEditing = () => {
    this.setState({
      isEditing: true,
    });
  };

  _finishEditing = () => {
    this.setState({
      isEditing: false,
    });
  };

  _controlInput = (text) => {
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
  },
  actions: {
    flexDirection: 'row',
  },
  actionContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  input: {
    width: width / 2,
    marginVertical: 15,
    paddingBottom: 5,
  },
});

/*
6) uncompleteTodo, completeTodo의 proptype을 작성함
7) 완성, 미완성을 컨트롤 하는 토글함수를 확인(_toggleComplete)
  7-1) props에 isCompleted, uncompleteTodo, completeTodo, id을 넣어주고
  7-2) isCompleted 에따라 uncom-com id값 주도록 설정함 
  ⇒ 이렇게 하면 차이점은 isCompleted를 state에서 하는 대신에, props에서 보고 처리하게 되는 거. 따라서 7-3)에 있던 isCompleted를 7-4)로 옮겨줌
⇒ 에뮬레이터에서 확인하면, 리스트의 완성 미완성 표시가 잘 됨
∴ 이제 props에서 관리되므로 즉, App.js에서 작업이 되고 있다는 거
*/
