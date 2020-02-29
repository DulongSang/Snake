# Snake
Hi!
This is a simple HTML5 based snake game with AI.
You can try it [here](https://dulongsang.github.io/Snake/), have fun!

## Algorithms
I implemented 3 AI algorithms. I will brief you on each algorithm in this section.

### Simple Greedy
For each step, the program computes the manhattan distance of each neighbour of the snake's head,
it will take the neighbour with the least manhattan distance and without crashing with any part
of the body as the next step.

### Path Planning
The program plans a current shortest path from the snake's head to the food and follows this path.
The program uses [A* algorithm](https://en.wikipedia.org/wiki/A*_search_algorithm) with manhattan distance as the heuristic to find the shortest path.

### Shortest Path
The program computes a current shortest path from the snake's head to the food every tick, 
and take the first move of the path as the next step. Use A* as well.
If there is no way from the head to the food, the program takes an available neighour of
the snake as the next position.

### Hamiltonian Cycle
The snake always follows a [hamiltonian cycle](https://en.wikipedia.org/wiki/Hamiltonian_path) 
and [takes shortcuts](https://github.com/chuyangliu/snake/blob/master/docs/algorithms.md#take-shortcuts) if available.

![Pikachu](pikachu.gif)

## Reference:
1. chuyangliu/snake, Artificial intelligence for the Snake game. [link](https://github.com/chuyangliu/snake)
2. Tapsell, J., Nokia 6110 Part 3 – Algorithms [link](https://johnflux.com/2015/05/02/nokia-6110-part-3-algorithms/)
3. Jensen, P., Snake Game using HTML5 Canvas tag [link](https://thoughtbot.com/blog/html5-canvas-snake-game)
4. HTML5 Canvas Snake Game [link](https://www.html5canvastutorials.com/advanced/html5-canvas-snake-game/)