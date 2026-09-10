---
title: 贪吃蛇
date: 2026-09-10
slug: 杂文/Snake
tags: [游戏]
---

{/*truncate*/}

```cpp
#include <algorithm>
#include <chrono>
#include <cctype>
#include <cstdlib>
#include <deque>
#include <iostream>
#include <random>
#include <thread>

#ifdef _WIN32
#include <conio.h>
#include <windows.h>
#else
#include <fcntl.h>
#include <sys/select.h>
#include <termios.h>
#include <unistd.h>
#endif

using namespace std;

struct Point {
    int x;
    int y;

    bool operator==(const Point& other) const {
        return x == other.x && y == other.y;
    }
};

enum class Direction {
    Up,
    Down,
    Left,
    Right
};

constexpr int BOARD_WIDTH = 30;
constexpr int BOARD_HEIGHT = 18;

deque<Point> snake;
Point food;

Direction direction = Direction::Right;

bool gameOver = false;
bool paused = false;
int score = 0;

#ifdef _WIN32

void setupTerminal() {
    HANDLE console = GetStdHandle(STD_OUTPUT_HANDLE);

    CONSOLE_CURSOR_INFO cursorInfo;
    GetConsoleCursorInfo(console, &cursorInfo);

    cursorInfo.bVisible = FALSE;
    SetConsoleCursorInfo(console, &cursorInfo);
}

void restoreTerminal() {
    HANDLE console = GetStdHandle(STD_OUTPUT_HANDLE);

    CONSOLE_CURSOR_INFO cursorInfo;
    GetConsoleCursorInfo(console, &cursorInfo);

    cursorInfo.bVisible = TRUE;
    SetConsoleCursorInfo(console, &cursorInfo);
}

bool keyPressed() {
    return _kbhit() != 0;
}

char readKey() {
    int key = _getch();

    // Windows 方向键会返回 0 或 224，
    // 再读取一次才能得到真正的方向码。
    if (key == 0 || key == 224) {
        key = _getch();

        switch (key) {
            case 72:
                return 'U'; // 上
            case 80:
                return 'D'; // 下
            case 75:
                return 'L'; // 左
            case 77:
                return 'R'; // 右
            default:
                return '\0';
        }
    }

    return static_cast<char>(key);
}

#else

termios originalTerminal;

void setupTerminal() {
    tcgetattr(STDIN_FILENO, &originalTerminal);

    termios rawTerminal = originalTerminal;

    // 关闭规范模式和回显，实现实时读取按键
    rawTerminal.c_lflag &= ~(ICANON | ECHO);
    rawTerminal.c_cc[VMIN] = 0;
    rawTerminal.c_cc[VTIME] = 0;

    tcsetattr(STDIN_FILENO, TCSANOW, &rawTerminal);

    int flags = fcntl(STDIN_FILENO, F_GETFL, 0);
    fcntl(STDIN_FILENO, F_SETFL, flags | O_NONBLOCK);

    // 隐藏光标
    cout << "\033[?25l";
}

void restoreTerminal() {
    tcsetattr(STDIN_FILENO, TCSANOW, &originalTerminal);

    // 显示光标
    cout << "\033[?25h";
}

bool keyPressed() {
    fd_set inputSet;
    FD_ZERO(&inputSet);
    FD_SET(STDIN_FILENO, &inputSet);

    timeval timeout{};
    timeout.tv_sec = 0;
    timeout.tv_usec = 0;

    return select(STDIN_FILENO + 1, &inputSet, nullptr, nullptr, &timeout) > 0;
}

char readKey() {
    char first = '\0';

    if (read(STDIN_FILENO, &first, 1) != 1) {
        return '\0';
    }

    // Linux/macOS 方向键通常会产生：
    // ESC [ A：上
    // ESC [ B：下
    // ESC [ C：右
    // ESC [ D：左
    if (first == '\033') {
        char sequence[2];

        if (read(STDIN_FILENO, sequence, 2) == 2 &&
            sequence[0] == '[') {
            switch (sequence[1]) {
                case 'A':
                    return 'U';
                case 'B':
                    return 'D';
                case 'C':
                    return 'R';
                case 'D':
                    return 'L';
                default:
                    return '\0';
            }
        }

        return '\0';
    }

    return first;
}

#endif

void clearScreen() {
    cout << "\033[2J\033[H";
}

bool isSnakeBody(const Point& point) {
    return find(snake.begin(), snake.end(), point) != snake.end();
}

void createFood() {
    random_device randomDevice;
    mt19937 generator(randomDevice());

    uniform_int_distribution<int> xDistribution(1, BOARD_WIDTH - 2);
    uniform_int_distribution<int> yDistribution(1, BOARD_HEIGHT - 2);

    do {
        food = {
            xDistribution(generator),
            yDistribution(generator)
        };
    } while (isSnakeBody(food));
}

void initializeGame() {
    snake.clear();

    int startX = BOARD_WIDTH / 2;
    int startY = BOARD_HEIGHT / 2;

    snake.push_back({startX, startY});
    snake.push_back({startX - 1, startY});
    snake.push_back({startX - 2, startY});

    direction = Direction::Right;
    score = 0;
    gameOver = false;
    paused = false;

    createFood();
}

void drawGame() {
    clearScreen();

    cout << "C++ 贪吃蛇    分数: " << score << '\n';
    cout << "操作: 方向键移动，P 暂停，Q 退出\n\n";

    for (int y = 0; y < BOARD_HEIGHT; ++y) {
        for (int x = 0; x < BOARD_WIDTH; ++x) {
            Point current{x, y};

            if (x == 0 || x == BOARD_WIDTH - 1 ||
                y == 0 || y == BOARD_HEIGHT - 1) {
                cout << '#';
            } else if (current == snake.front()) {
                cout << '@';
            } else if (current == food) {
                cout << '*';
            } else if (isSnakeBody(current)) {
                cout << 'o';
            } else {
                cout << ' ';
            }
        }

        cout << '\n';
    }

    if (paused) {
        cout << "\n游戏已暂停，按 P 继续。\n";
    }

    cout.flush();
}

void handleInput() {
    if (!keyPressed()) {
        return;
    }

    char key = readKey();

    if (key == 'q' || key == 'Q') {
        gameOver = true;
        return;
    }

    if (key == 'p' || key == 'P') {
        paused = !paused;
        return;
    }

    if (paused) {
        return;
    }

    switch (key) {
        case 'U':
            if (direction != Direction::Down) {
                direction = Direction::Up;
            }
            break;

        case 'D':
            if (direction != Direction::Up) {
                direction = Direction::Down;
            }
            break;

        case 'L':
            if (direction != Direction::Right) {
                direction = Direction::Left;
            }
            break;

        case 'R':
            if (direction != Direction::Left) {
                direction = Direction::Right;
            }
            break;

        default:
            break;
    }
}

void updateGame() {
    if (paused) {
        return;
    }

    Point head = snake.front();
    Point newHead = head;

    switch (direction) {
        case Direction::Up:
            --newHead.y;
            break;

        case Direction::Down:
            ++newHead.y;
            break;

        case Direction::Left:
            --newHead.x;
            break;

        case Direction::Right:
            ++newHead.x;
            break;
    }

    bool hitsWall =
        newHead.x <= 0 ||
        newHead.x >= BOARD_WIDTH - 1 ||
        newHead.y <= 0 ||
        newHead.y >= BOARD_HEIGHT - 1;

    bool eatsFood = newHead == food;

    // 没有吃到食物时，蛇尾会移动，
    // 因此新头部可以进入原来的尾部位置。
    bool hitsBody = false;

    size_t bodyLimit = eatsFood
        ? snake.size()
        : snake.size() - 1;

    for (size_t i = 0; i < bodyLimit; ++i) {
        if (snake[i] == newHead) {
            hitsBody = true;
            break;
        }
    }

    if (hitsWall || hitsBody) {
        gameOver = true;
        return;
    }

    snake.push_front(newHead);

    if (eatsFood) {
        score += 10;
        createFood();
    } else {
        snake.pop_back();
    }
}

int main() {
    setupTerminal();

    initializeGame();

    while (!gameOver) {
        drawGame();
        handleInput();
        updateGame();

        this_thread::sleep_for(chrono::milliseconds(120));
    }

    restoreTerminal();
    clearScreen();

    cout << "游戏结束！\n";
    cout << "最终得分: " << score << '\n';

    return 0;
}
```