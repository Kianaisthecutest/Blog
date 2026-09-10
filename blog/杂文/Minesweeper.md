---
title: 扫雷
date: 2026-09-10
slug: 杂文/Minesweeper
tags: [游戏]
---

{/*truncate*/}

```cpp
#include <algorithm>    
#include <array>    
#include <chrono>    
#include <cctype>    
#include <iomanip>    
#include <iostream>    
#include <queue>    
#include <random>    
#include <string>    
#include <utility>    
#include <vector>    
    
    
using namespace std;    
    
    
class Minesweeper {    
private:    
    static constexpr int ROWS = 9;    
    static constexpr int COLS = 9;    
    static constexpr int MINES = 10;    
    
    
    struct Cell {    
        bool mine = false;    
        bool revealed = false;    
        bool flagged = false;    
        int adjacentMines = 0;    
    };    
    
    
    array<array<Cell, COLS>, ROWS> board{};    
    bool initialized = false;    
    bool gameOver = false;    
    bool won = false;    
    
    
    mt19937 randomEngine{    
        static_cast<unsigned int>(    
            chrono::steady_clock::now().time_since_epoch().count()    
        )    
    };    
    
    
    bool isInside(int row, int col) const {    
        return row >= 0 && row < ROWS && col >= 0 && col < COLS;    
    }    
    
    
    vector<pair<int, int>> getNeighbors(int row, int col) const {    
        vector<pair<int, int>> neighbors;    
    
    
        for (int dr = -1; dr <= 1; ++dr) {    
            for (int dc = -1; dc <= 1; ++dc) {    
                if (dr == 0 && dc == 0) {    
                    continue;    
                }    
    
    
                int nextRow = row + dr;    
                int nextCol = col + dc;    
    
    
                if (isInside(nextRow, nextCol)) {    
                    neighbors.emplace_back(nextRow, nextCol);    
                }    
            }    
        }    
    
    
        return neighbors;    
    }    
    
    
    void initializeBoard(int safeRow, int safeCol) {    
        vector<pair<int, int>> availableCells;    
    
    
        for (int row = 0; row < ROWS; ++row) {    
            for (int col = 0; col < COLS; ++col) {    
                if (row != safeRow || col != safeCol) {    
                    availableCells.emplace_back(row, col);    
                }    
            }    
        }    
    
    
        shuffle(availableCells.begin(), availableCells.end(), randomEngine);    
    
    
        for (int i = 0; i < MINES; ++i) {    
            auto [row, col] = availableCells[i];    
            board[row][col].mine = true;    
        }    
    
    
        for (int row = 0; row < ROWS; ++row) {    
            for (int col = 0; col < COLS; ++col) {    
                if (board[row][col].mine) {    
                    continue;    
                }    
    
    
                int count = 0;    
    
    
                for (auto [neighborRow, neighborCol] : getNeighbors(row, col)) {    
                    if (board[neighborRow][neighborCol].mine) {    
                        ++count;    
                    }    
                }    
    
    
                board[row][col].adjacentMines = count;    
            }    
        }    
    
    
        initialized = true;    
    }    
    
    
    void revealEmptyArea(int startRow, int startCol) {    
        queue<pair<int, int>> cellsToReveal;    
        cellsToReveal.emplace(startRow, startCol);    
    
    
        while (!cellsToReveal.empty()) {    
            auto [row, col] = cellsToReveal.front();    
            cellsToReveal.pop();    
    
    
            Cell& currentCell = board[row][col];    
    
    
            if (currentCell.revealed || currentCell.flagged) {    
                continue;    
            }    
    
    
            currentCell.revealed = true;    
    
    
            if (currentCell.adjacentMines != 0) {    
                continue;    
            }    
    
    
            for (auto [neighborRow, neighborCol] : getNeighbors(row, col)) {    
                Cell& neighbor = board[neighborRow][neighborCol];    
    
    
                if (!neighbor.revealed &&    
                    !neighbor.flagged &&    
                    !neighbor.mine) {    
                    cellsToReveal.emplace(neighborRow, neighborCol);    
                }    
            }    
        }    
    }    
    
    
    void revealAllMines() {    
        for (auto& row : board) {    
            for (Cell& cell : row) {    
                if (cell.mine) {    
                    cell.revealed = true;    
                }    
            }    
        }    
    }    
    
    
    bool checkWin() const {    
        for (const auto& row : board) {    
            for (const Cell& cell : row) {    
                if (!cell.mine && !cell.revealed) {    
                    return false;    
                }    
            }    
        }    
    
    
        return true;    
    }    
    
    
    void revealSatisfiedNeighbors() {    
        bool revealedNewCell;    
    
    
        do {    
            revealedNewCell = false;    
    
    
            for (int row = 0; row < ROWS; ++row) {    
                for (int col = 0; col < COLS; ++col) {    
                    Cell& currentCell = board[row][col];    
    
    
                    if (!currentCell.revealed || currentCell.mine ||    
                        currentCell.adjacentMines == 0) {    
                        continue;    
                    }    
    
    
                    int flaggedCount = 0;    
    
    
                    for (auto [neighborRow, neighborCol] : getNeighbors(row, col)) {    
                        if (board[neighborRow][neighborCol].flagged) {    
                            ++flaggedCount;    
                        }    
                    }    
    
    
                    if (flaggedCount != currentCell.adjacentMines) {    
                        continue;    
                    }    
    
    
                    for (auto [neighborRow, neighborCol] : getNeighbors(row, col)) {    
                        Cell& neighbor = board[neighborRow][neighborCol];    
    
    
                        if (neighbor.revealed || neighbor.flagged) {    
                            continue;    
                        }    
    
    
                        if (neighbor.mine) {    
                            neighbor.revealed = true;    
                            revealAllMines();    
                            gameOver = true;    
                            won = false;    
                            cout << "\n你踩到地雷了！\n";    
                            return;    
                        }    
    
    
                        revealEmptyArea(neighborRow, neighborCol);    
                        revealedNewCell = true;    
                    }    
                }    
            }    
        } while (revealedNewCell && !gameOver);    
    }    
    
    
    void handleWin() {    
        if (!checkWin()) {    
            return;    
        }    
    
    
        gameOver = true;    
        won = true;    
    
    
        for (auto& boardRow : board) {    
            for (Cell& boardCell : boardRow) {    
                if (boardCell.mine) {    
                    boardCell.flagged = true;    
                }    
            }    
        }    
    
    
        cout << "\n恭喜你，扫雷成功！\n";    
    }    
    
    
    void printCell(const Cell& cell) const {    
        if (cell.flagged && !cell.revealed) {    
            cout << " F ";    
        } else if (!cell.revealed) {    
            cout << " # ";    
        } else if (cell.mine) {    
            cout << " * ";    
        } else if (cell.adjacentMines == 0) {    
            cout << "   ";    
        } else {    
            cout << ' ' << cell.adjacentMines << ' ';    
        }    
    }    
    
    
public:    
    void printBoard() const {    
        cout << "\n   ";    
    
    
        for (int col = 1; col <= COLS; ++col) {    
            cout << setw(3) << col;    
        }    
    
    
        cout << "\n   ";    
    
    
        for (int col = 0; col < COLS; ++col) 
        if( col )
        {    
            cout << "---";    
        } 
        else cout<<"+--";
    
    
        cout << "-\n";    
    
    
        for (int row = 0; row < ROWS; ++row) {    
            cout << setw(2) << row + 1 << " |";    
    
    
            for (int col = 0; col < COLS; ++col) {    
                printCell(board[row][col]);    
            }    
    
    
            cout << "\n";    
        }    
    
    
        cout << "\n# = 未翻开   F = 旗帜   * = 地雷\n";    
    }    
    
    
    void reveal(int row, int col) {    
        if (!isInside(row, col)) {    
            cout << "坐标超出范围。\n";    
            return;    
        }    
    
    
        Cell& cell = board[row][col];    
    
    
        if (cell.flagged) {    
            cout << "该格已插旗，请先取消旗帜。\n";    
            return;    
        }    
    
    
        if (cell.revealed) {    
            cout << "该格已经翻开。\n";    
            return;    
        }    
    
    
        if (!initialized) {    
            initializeBoard(row, col);    
        }    
    
    
        if (board[row][col].mine) {    
            board[row][col].revealed = true;    
            revealAllMines();    
            gameOver = true;    
            won = false;    
            cout << "\n你踩到地雷了！\n";    
            return;    
        }    
    
    
        revealEmptyArea(row, col);    
    
    
        handleWin();    
    }    
    
    
    void toggleFlag(int row, int col) {    
        if (!isInside(row, col)) {    
            cout << "坐标超出范围。\n";    
            return;    
        }    
    
    
        Cell& cell = board[row][col];    
    
    
        if (cell.revealed) {    
            cout << "已经翻开的格子不能插旗。\n";    
            return;    
        }    
    
    
        cell.flagged = !cell.flagged;    
        cout << (cell.flagged ? "已插旗。\n" : "已取消旗帜。\n");    
    
    
        if (cell.flagged && initialized) {    
            revealSatisfiedNeighbors();    
        }    
    
    
        if (!gameOver) {    
            handleWin();    
        }    
    }    
    
    
    void run() {    
        cout << "=============================\n";    
        cout << "        C++ 控制台扫雷\n";    
        cout << "=============================\n";    
        cout << "棋盘大小: " << ROWS << " x " << COLS << "\n";    
        cout << "地雷数量: " << MINES << "\n";    
        cout << "操作格式:\n";    
        cout << "  r 行 列  翻开格子，例如: r 3 5\n";    
        cout << "  f 行 列  插旗或取消旗帜，例如: f 3 5\n";    
        cout << "  q        退出游戏\n";    
    
    
        while (!gameOver) {    
            printBoard();    
    
    
            cout << "\n请输入操作: ";    
    
    
            char command;    
            cin >> command;    
    
    
            if (!cin) {    
                cout << "输入结束，游戏退出。\n";    
                return;    
            }    
    
    
            command = static_cast<char>(tolower(static_cast<unsigned char>(command)));    
    
    
            if (command == 'q') {    
                cout << "游戏结束。\n";    
                return;    
            }    
    
    
            if (command != 'r' && command != 'f') {    
                cout << "无效操作，请输入 r、f 或 q。\n";    
                string restOfLine;    
                getline(cin, restOfLine);    
                continue;    
            }    
    
    
            int row;    
            int col;    
    
    
            if (!(cin >> row >> col)) {    
                cout << "坐标格式错误。\n";    
                cin.clear();    
    
    
                string restOfLine;    
                getline(cin, restOfLine);    
                continue;    
            }    
    
    
            --row;    
            --col;    
    
    
            if (command == 'r') {    
                reveal(row, col);    
            } else {    
                toggleFlag(row, col);    
            }    
        }    
    
    
        printBoard();    
    
    
        if (won) {    
            cout << "\n游戏胜利！\n";    
        } else {    
            cout << "\n游戏失败！\n";    
        }    
    }    
};    
    
    
int main() {    
    Minesweeper game;    
    game.run();    
    
    
    return 0;    
}
```