import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { GAME_SETTINGS } from '../constants/gameConfig';

interface PaddleProps {
  color: string;
  top: number;
  left: number;
}

const Paddle: React.FC<PaddleProps> = ({ color, top, left }) => {
  return (
    <View 
      style={[
        styles.paddle, 
        { 
          backgroundColor: color, 
          top: top, 
          left: left 
        }
      ]} 
    />
  );
};

const styles = StyleSheet.create({
  paddle: {
    position: 'absolute',
    width: GAME_SETTINGS.PADDLE_WIDTH,
    height: GAME_SETTINGS.PADDLE_HEIGHT,
    borderRadius: 4,
    // Adding a simple neon shadow effect via shadow properties
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5, // for Android
  },
});

export default Paddle;
