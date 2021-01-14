import { PrimaryButton, Stack, Text } from '@fluentui/react';
import React, { Component } from 'react';

export class Game extends Component {
  state = {
    decidedSize: 0,
    direction: '',
    top: 0,
    left: 0,
  };

  changeDirection = (e: KeyboardEvent) => {
    this.setState({
      direction: e.code,
    });
  };

  componentDidMount = () => {
    let decidedSize = 0;
    if (window.innerWidth > window.innerHeight) {
      decidedSize = window.innerHeight;
    } else if (window.innerWidth < window.innerHeight) {
      decidedSize = window.innerWidth;
    } else {
      decidedSize = window.innerWidth;
    }
    this.setState({
      decidedSize: decidedSize - 10,
    });
    window.addEventListener('keydown', this.changeDirection);
    setInterval(() => {
      switch (this.state.direction) {
        case 'ArrowUp':
          if (this.state.top >= 10)
            this.setState({
              top: this.state.top - 10,
            });
          break;
        case 'ArrowDown':
          if (this.state.top <= this.state.decidedSize - 70)
            this.setState({
              top: this.state.top + 10,
            });
          break;
        case 'ArrowLeft':
          if (this.state.left >= 10)
            this.setState({
              left: this.state.left - 10,
            });
          break;
        case 'ArrowRight':
          if (this.state.left <= this.state.decidedSize - 30)
            this.setState({
              left: this.state.left + 10,
            });
          break;
        default:
          break;
      }
    }, 50);
  };

  render() {
    return (
      <Stack
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          height: this.state.decidedSize,
          width: this.state.decidedSize,
        }}
      >
        <Stack>
          <Text>
            <PrimaryButton
              style={{
                marginTop: 5,
                marginBottom: 5,
              }}
            >
              Yeni Oyun
            </PrimaryButton>
          </Text>
        </Stack>
        <Stack
          style={{
            position: 'relative',
            border: '5px solid #ccc',
            width: '100%',
            height: '100%',
          }}
        >
          <Stack.Item
            styles={{
              root: {
                position: 'absolute',
                top: this.state.top,
                left: this.state.left,
                display: 'block',
                width: 10,
                height: 10,
                backgroundColor: '#ccc',
                transition:"0.1s all"
              },
            }}
          >
            &nbsp;
          </Stack.Item>
        </Stack>
      </Stack>
    );
  }
}

export default Game;
