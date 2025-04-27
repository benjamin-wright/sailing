# Sailing Game

## Overview
This is a 2D top-down sailing game built with HTML5 and TypeScript. The game features custom physics for sailing mechanics, providing an engaging experience as players navigate their boats through various challenges.

## Project Structure
```
sailing-game
├── src
│   ├── index.html          # Main HTML entry point
│   ├── main.ts             # Main game logic
│   ├── game
│   │   ├── engine.ts       # Game engine managing the game loop and rendering
│   │   ├── physics.ts      # Physics controller for handling game physics
│   │   └── sailingMechanics.ts # Sailing mechanics implementation
│   ├── assets
│   │   ├── images          # Directory for image assets (e.g., boat sprites)
│   │   └── sounds          # Directory for sound assets (e.g., background music)
│   └── styles
│       └── main.css        # CSS styles for the game
├── package.json            # npm configuration file
├── tsconfig.json           # TypeScript configuration file
└── README.md               # Project documentation
```

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   cd sailing-game
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Build the project:
   ```
   npm run build
   ```

4. Start the game:
   ```
   npm start
   ```

## Gameplay
Players control a boat and must navigate through various obstacles while utilizing wind mechanics to adjust their speed and direction. The game includes different levels and challenges to enhance the sailing experience.

## Contribution Guidelines
Contributions are welcome! Please fork the repository and submit a pull request with your changes. Ensure that your code adheres to the project's coding standards and includes appropriate tests.

## License
This project is licensed under the MIT License. See the LICENSE file for details.