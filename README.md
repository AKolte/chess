# Chess Game Logic

This repository contains the logic for a chess game implemented in JavaScript. The code defines the movement and abilities of different chess characters, as well as the structure of the chessboard.

## Overview

The main file, `index.js`, includes the following key components:

- **Constants**: Definitions for the chess characters, their movement directions, and the chessboard setup.
- **Functions**: Logic for determining valid moves for each character, checking boundaries, and generating possible positions.

## File Structure

- `index.js`: Main logic for chess character movements and board setup.
- `config.js`: Configuration file containing constants for characters, initial positions, and player color.

## Key Features

- **Character Movement**: The code supports movement for different chess characters including:
  - **Queen**: Can move in any direction.
  - **King**: Can move one square in any direction.
  - **Pawn**: Can move forward one square.

- **Boundary Checking**: Functions to ensure moves do not go off the board.

- **Dynamic Board Generation**: The chessboard is generated based on the player's color.

## Usage

Modify the config.js file to give inputs of current position, color, and character

### Example

To get all possible positions for the Queen at position E4, the following code is executed:
node index.js