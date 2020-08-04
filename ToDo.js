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
    updateTodo: PropTypes.func.isRequired,
  };

  render() {
    const { isEditing, toDoValue } = this.state;
    const { text, id, deleteToDo, isCompleted } = this.props;
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
              underlineColorAndroid={'transparent'} //3)
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
            <TouchableOpacity
              onPressOut={(event) => {
                event.stopPropagation;
                deleteToDo(id);
              }}
            >
              <View style={styles.actionContainer}>
                {/* <Text style={styles.actionText}>❌</Text> */}
                <Text style={{ ...styles.actionText, ...styles.deleteText }}>
                  X
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }

  _toggleComplete = (event) => {
    event.stopPropagation();
    const { isCompleted, uncompleteTodo, completeTodo, id } = this.props;
    if (isCompleted) {
      uncompleteTodo(id);
    } else {
      completeTodo(id);
    }
  };

  _startEditing = (event) => {
    event.stopPropagation();
    this.setState({
      isEditing: true,
    });
  };

  _finishEditing = (event) => {
    event.stopPropagation();
    const { toDoValue } = this.state;
    const { id, updateTodo } = this.props;
    updateTodo(id, toDoValue);
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
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 3,
    marginRight: 16,
    marginLeft: 5,
  },
  completedCircle: {
    borderColor: '#CADEE3',
  },
  uncompletedCircle: {
    borderColor: '#3E6B79',
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
  deleteText: {
    color: '#4E8092',
    fontSize: 20,
    paddingLeft: 5,
    paddingRight: 5,
    fontWeight: '800',
  },
});
