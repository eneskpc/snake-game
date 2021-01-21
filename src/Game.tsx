import { PrimaryButton, Stack, Text } from '@fluentui/react';
import { Server } from 'http';
import React, { Component } from 'react';

export class Game extends Component {
  state = {
    decidedSize: 0,
    direction: '',
    top: 0,
    left: 0,
    speed: 500,
    foodPosition: { top: 0, left: 0 },
    iterationInterval: setInterval(() => {}, 99999),
  };

  changeDirection = (e: KeyboardEvent) => {
    this.setState({
      direction: e.code,
    });
  };

  newFoodPosition = (maxLength: number) => {
    let top = 0;
    let left = 0;

    top = Math.abs(Math.random() * maxLength - 85);
    left = Math.abs(Math.random() * maxLength);

    if (!Number.isInteger(top / 20)) {
      top = Math.trunc(top / 20) * 20;
    }

    if (!Number.isInteger(left / 20)) {
      left = Math.trunc(left / 20) * 20;
    }

    this.setState({
      foodPosition: {
        top: top,
        left: left,
      },
    });
  };

  checkMove = () => {
    if (
      this.state.top === this.state.foodPosition.top &&
      this.state.left === this.state.foodPosition.left
    ) {
      if (this.state.iterationInterval) {
        clearInterval(this.state.iterationInterval);
      }
      this.setState({
        speed: this.state.speed - 50,
        iterationInterval: setInterval(
          this.iteratorMove,
          this.state.speed - 50
        ),
      });
      this.newFoodPosition(this.state.decidedSize);
    }
  };

  iteratorMove = () => {
    switch (this.state.direction) {
      case 'ArrowUp':
        if (this.state.top >= 20) {
          this.setState(
            {
              top: this.state.top - 20,
            },
            this.checkMove
          );
        } else {
        }
        break;
      case 'ArrowDown':
        if (this.state.top <= this.state.decidedSize - 85) {
          this.setState(
            {
              top: this.state.top + 20,
            },
            this.checkMove
          );
        } else {
        }
        break;
      case 'ArrowLeft':
        if (this.state.left >= 20) {
          this.setState(
            {
              left: this.state.left - 20,
            },
            this.checkMove
          );
        } else {
        }
        break;
      case 'ArrowRight':
        if (this.state.left <= this.state.decidedSize - 45) {
          this.setState(
            {
              left: this.state.left + 20,
            },
            this.checkMove
          );
        } else {
        }
        break;
      default:
        break;
    }
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

    if (!Number.isInteger(decidedSize / 20)) {
      decidedSize = Math.trunc(decidedSize / 20) * 20;
    }

    this.setState({
      decidedSize: decidedSize + 10,
    });

    this.newFoodPosition(decidedSize);

    window.addEventListener('keydown', this.changeDirection);

    this.setState({
      iterationInterval: setInterval(this.iteratorMove, this.state.speed),
    });
  };

  newGame = () => {
    this.setState({
      decidedSize: this.state.decidedSize - 10,
      top: this.state.decidedSize / 2 + 20,
      left: this.state.decidedSize / 2 + 20,
    });
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
              onClick={this.newGame.bind(this)}
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
                width: 20,
                height: 20,
                backgroundColor: '#ccc',
                zIndex: 1,
              },
            }}
          >
            &nbsp;
          </Stack.Item>
          <Stack.Item
            styles={{
              root: {
                position: 'absolute',
                top: this.state.foodPosition.top,
                left: this.state.foodPosition.left,
                display: 'block',
                width: 20,
                height: 20,
                backgroundColor: 'red',
                zIndex: 0,
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
