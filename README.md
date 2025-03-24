# React + TypeScript + Vite

The rules of the game:
1. If the player's move is not victorious or does not lead to a draw, then a board opens in the played cell with a copy of the state of the board in which the move was made and with the value of the move.
2. If the player's move leads to a victory, the board turns into a square with the value of the winning sign. This process occurs recursively.
3. If the player's move leads to a draw, the board turns into a square with the value #. This sign means "draw" and is not compatible with any sign or their sequences.
