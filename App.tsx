import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { COLORS, GAME_SETTINGS } from './src/constants/gameConfig';
import Paddle from './src/components/Paddle';

export default function App() {
  const { ball, score, restart } = useGameLoop();

  return (
    <View style={[styles.container, ball.hitDetected && styles.flash]}>
      {/* Scoreboard */}
      <Text style={styles.scoreOverlay}>{score.opponent} - {score.player}</Text>

      {/* Goal Posts / Bounds Visualization 
          Adding visual lines to represent the \"gates\" and outer boundaries.
        */}
      <View style={_styleObjects.topGoalField} />
      <View style={_styleObjects.bottomGoalField} />

      {/* Game Entities */}
      <View 
        style={[styles.ball_line, { 
          left: ball.x - ball.radius, 
          top: ball.y - ball.radius 
        }]} 
      />

      {/* Players */}
      <Paddle 
        color={COLORS.OPPONENT} 
        top={100} 
        left={ball.x - GAME_SETTINGS.PADDLE_WIDTH / 2} 
      />
      <Paddle 
        color={COLORS.USER} 
        top={700} 
        left={ball.x - GAME_SETTINGS.PADDLE_WIDTH / 2} 
      />

      {/* UI Layer */}
      <View style={styles.uiContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => setShowMenu(!showMenu)}
        >
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>

        {showMenu && (
          <View style={styles.menuOverlay}>
            <Text style={styles.menuTitle}>Game Options</Text>
            <TouchableOpacity 
              style={[styles.button, styles.restartButton]} 
              onPress={restart}
            >
              <Text style={styles.buttonText}>Restart Game</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.closeButton]} 
              onPress={() => setShowMenu(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <StatusBar style="light" />
    </View>
  );
}

const _styleObjects = {
  topGoalField: {
    position: 'absolute',
    top: 140,
    width: 200,
    height: 5,
    backgroundColor: '#fff'
  },
  bottomGoalField: {
    position: 'absolute',
    bottom: 140,
    width: 200,
    height: 5,
    backgroundColor: '#fff'
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  ball_line: {
    width: GAME_SETTINGS.BALL_SIZE,
    height: GAME_SETTINGS.BALL_SIZE,
    borderRadius: GAME_SETTINGS.BALL_SIZE / 2,
    backgroundColor: COLORS.BALL,
    position: 'absolute',
    borderWidth: 1,
    borderColor: '#fff'
  },
  scoreOverlay: {
    position: 'absolute',
    top: 40,
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold'
  },
  uiContainer: {
    position: 'absolute',
    right: 20,
    top: 150,
  },
  button: {
    padding: 15,
    backgroundColor: COLORS.USER,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fff'
  },
  button_text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  menuOverlay: {
    position: 'absolute',
    top: -150,
    right: 0,
    width: 200,
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 10,
    padding: 20,
  },
  menuTitle: {
    color: '#fff',
    marginBottom: 20,
    fontSize: 20
  },
  restartButton: {
    backgroundColor: '#4CAF50'
  },
  closeButton: {
    marginTop: 10
  },
  flash: {
    opacity: 0.8,
  }
});
