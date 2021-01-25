import { PrimaryButton, Stack, Text } from '@fluentui/react';
import React, { Component } from 'react';

export class Game extends Component {
  state = {
    totalPoint: 0,
    decidedSize: 0,
    direction: '',
    speed: 250,
    speedIncrementValue: 10,
    snakePositions: [{ top: 0, left: 0 }],
    foodPosition: { top: 0, left: 0 },
    iterationInterval: setInterval(() => {}, 99999),
  };

  changeDirection = (e: KeyboardEvent) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
      this.setState({
        direction: e.code,
      });
    }
  };

  newFoodPosition = (maxLength: number) => {
    let top = 0;
    let left = 0;

    top = Math.abs(Math.random() * maxLength - 85);
    left = Math.abs(Math.random() * maxLength - 20);

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
      this.state.snakePositions[0].top === this.state.foodPosition.top &&
      this.state.snakePositions[0].left === this.state.foodPosition.left
    ) {
      if (this.state.iterationInterval) {
        clearInterval(this.state.iterationInterval);
      }
      let newSpeed = this.state.speed - this.state.speedIncrementValue;
      if (newSpeed <= 0) {
        newSpeed = this.state.speedIncrementValue;
      }
      this.setState({
        speed: newSpeed,
        iterationInterval: setInterval(this.iteratorMove, newSpeed),
        totalPoint: this.state.totalPoint + 1,
      });
      this.newFoodPosition(this.state.decidedSize);
    }
  };

  snakeMove = (directionKey: string) => {
    let index = Object.keys(this.state).indexOf(directionKey);
    console.log(Object.values(this.state)[index]);
  };

  iteratorMove = () => {
    switch (this.state.direction) {
      case 'ArrowUp':
        if (this.state.snakePositions[0].top >= 20) {
          let newSnakePositions: any[] = [];
          this.state.snakePositions.forEach((position, index) => {
            if (index === 0) {
              newSnakePositions = [
                {
                  top: position.top - 20,
                  left: position.left,
                },
              ];
            }
            if (index < this.state.snakePositions.length - 2) {
              newSnakePositions = [
                ...newSnakePositions,
                {
                  top: position.top,
                  left: position.left,
                },
              ];
            }
          });
          this.setState(
            {
              snakePositions: newSnakePositions,
            },
            this.checkMove
          );
        } else {
          alert(`Oyun bitti. Skor : ${this.state.totalPoint}`);
          this.newGame();
        }
        break;
      case 'ArrowDown':
        if (this.state.snakePositions[0].top <= this.state.decidedSize - 85) {
          let newSnakePositions: any[] = [];
          this.state.snakePositions.forEach((position, index) => {
            if (index === 0) {
              newSnakePositions = [
                {
                  top: position.top + 20,
                  left: position.left,
                },
              ];
            }
            if (index > 0 && index !== this.state.snakePositions.length - 2) {
              newSnakePositions = [
                ...newSnakePositions,
                {
                  top: position.top,
                  left: position.left,
                },
              ];
            }
          });
          this.setState(
            {
              snakePositions: newSnakePositions,
            },
            this.checkMove
          );
        } else {
          alert(`Oyun bitti. Skor : ${this.state.totalPoint}`);
          this.newGame();
        }
        break;
      case 'ArrowLeft':
        if (this.state.snakePositions[0].left >= 20) {
          let newSnakePositions: any[] = [];
          this.state.snakePositions.forEach((position, index) => {
            if (index === 0) {
              newSnakePositions = [
                {
                  top: position.top,
                  left: position.left - 20,
                },
              ];
            }
            if (index > 0 && index !== this.state.snakePositions.length - 2) {
              newSnakePositions = [
                ...newSnakePositions,
                {
                  top: position.top,
                  left: position.left,
                },
              ];
            }
          });
          this.setState(
            {
              snakePositions: newSnakePositions,
            },
            this.checkMove
          );
        } else {
          alert(`Oyun bitti. Skor : ${this.state.totalPoint}`);
          this.newGame();
        }
        break;
      case 'ArrowRight':
        if (this.state.snakePositions[0].left <= this.state.decidedSize - 45) {
          let newSnakePositions: any[] = [];
          this.state.snakePositions.forEach((position, index) => {
            if (index === 0) {
              newSnakePositions = [
                {
                  top: position.top,
                  left: position.left + 20,
                },
              ];
            }
            if (index > 0 && index !== this.state.snakePositions.length - 2) {
              newSnakePositions = [
                ...newSnakePositions,
                {
                  top: position.top,
                  left: position.left,
                },
              ];
            }
          });
          this.setState(
            {
              snakePositions: newSnakePositions,
            },
            this.checkMove
          );
        } else {
          alert(`Oyun bitti. Skor : ${this.state.totalPoint}`);
          this.newGame();
        }
        break;
      default:
        break;
    }
  };

  newGame = () => {
    clearInterval(this.state.iterationInterval);
    this.setState(
      {
        totalPoint: 0,
        decidedSize: 0,
        direction: '',
        top: 0,
        left: 0,
        speed: 250,
        speedIncrementValue: 10,
        foodPosition: { top: 0, left: 0 },
        iterationInterval: setInterval(() => {}, 99999),
      },
      () => {
        this.componentDidMount();
      }
    );
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

    window.onkeydown = this.changeDirection;

    this.setState({
      iterationInterval: setInterval(this.iteratorMove, this.state.speed),
    });
  };

  componentWillUnmount = () => {
    window.onkeydown = null;
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
        <Stack
          style={{
            flexDirection: 'row',
          }}
          horizontalAlign="center"
          verticalAlign="space-between"
        >
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
          <Text>Toplam Puan : {this.state.totalPoint}</Text>
        </Stack>
        <Stack
          style={{
            position: 'relative',
            border: '5px solid #ccc',
            width: '100%',
            height: '100%',
          }}
        >
          {this.state.snakePositions.map((position, index) => {
            return (
              <Stack.Item
                key={index}
                styles={{
                  root: {
                    position: 'absolute',
                    top: position.top,
                    left: position.left,
                    display: 'block',
                    width: 20,
                    height: 20,
                    backgroundColor: '#ccc',
                    zIndex: 0,
                  },
                }}
              >
                &nbsp;
              </Stack.Item>
            );
          })}
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
