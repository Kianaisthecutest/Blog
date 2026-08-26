---
title: Trokut
date: 2026-08-25
slug: 题解/COCI/2023-2024-05/D-Trokut.md
tags: [题解, COCI, 博弈论]
---

<h2>博弈论，Ad-hoc</h2>

{/*truncate*/}

## [COCI 2023/2024 #5] Trokut
<details>
<summary>题干</summary>

<h2>题目背景</h2>

**译自 [COCI 2023/2024 Contest #5](https://hsin.hr/coci/archive/2023_2024) T5「[Trokut](https://hsin.hr/coci/archive/2023_2024/contest5_tasks.pdf)」**

<h2>题目描述</h2>

Ivan 和 Lucija 正在一次遥远的旅程中。他们知道旅程将持续很长时间，而且在某个时候他们会感到无聊。当他们在考虑做什么时，Lucija 想到了一个游戏。

她在纸上画了 $N$ 个点，使它们形成一个正 $N$ 边形的顶点，并按顺序标记为 $1$ 到 $N$。轮到的玩家选择两个点，满足连接这两个点的线段不与先前画的任何线段相交，并连接这两个点。线段可以在顶点处相接触。如果在玩家的回合后存在三条连接的线段形成一个三角形，即存在三个点，它们都通过已画的线段相连，则该玩家获胜。当然，玩家可以连接相邻的顶点，这些线段也可以用于形成三角形。玩家轮流进行，Lucija 先手。

两位玩家都非常熟练，我们知道他们会采用最优策略进行游戏。你的任务是确定给定 $N$ 时，谁将成为游戏的赢家。可以证明游戏将在有限次移动后结束，而且总会产生一个赢家。

<h2>输入格式</h2>

第一行一个整数 $T\ (1\le T\le 10\ 000)$，表示场景数。

接下来 $T$ 行，每行一个整数 $N\ (3\le N\le 10^9)$，表示 Lucija 在纸上画的点数。

<h2>输出格式</h2>

输出 $T$ 行，按给定的顺序，对于每个场景输出 `Ivan` 或 `Lucija`，表示该场景中的获胜者。

<h2>输入输出样例 #1</h2>

<h3>输入 #1</h3>

```
3
3
4
5

```

<h3>输出 #1</h3>

```
Lucija
Lucija
Ivan

```

<h2>输入输出样例 #2</h2>

<h3>输入 #2</h3>

```
3
7
8
9

```

<h3>输出 #2</h3>

```
Lucija
Lucija
Ivan

```

<h2>说明/提示</h2>

<h3>样例解释 1</h3>

当 $N = 3$ 时，必须连接所有三条可能的线段，Lucija 获胜。

当 $N = 4$ 时，Lucija 可以连接点 $1$ 和点 $3$ 之间的线段。我们看到，在 Ivan 的任何一步之后，Lucija 都可以连接一个三角形并获胜。

<h3>子任务</h3>

| Subtask| Points | Constraints|
| :--:|:--:|:--:|
|1|13|$T\le 18,N\le 20$|
|2|36|$T\le 998,N\le 1000$
|3|15|$N\le 10^5$|
|4|46|无额外限制|

</details>

***

## 分析

<h5>

博弈论经典操作之先找小的特殊情况，再DP推广

首先我们容易想到每次连接两个点其实会把整个问题分成两个更小的子问题

于是我们考虑分讨这两个子问题的状态

```
<1> 0 and 0
后手无论怎么选都会输，先手必胜

<2> 0 and 1
后手进入唯一必胜态，先手必败

<3> 1 and 0
同<2>，先手必败

<4>1 and 1
后手选择必胜态进入，含义是在该集合中一定存在使先手最后要连接已涂色点
但是先手可以选择另一个必胜态，相当与将一个必胜态转移为 0 后选择另一个 1
同<2><3>，先手必胜
```

即异或和决定先后手必胜

然后我们思考一下边界，当划分后没有点了或者只有一个点了此时先手只能连接两个选择过的点，必败

即f[0]=f[1]=0

然后我们写出这个$O(n^2)$代码就可以过前面$n\leq 1000$的点了

然后，最阴间的人类智慧观察环节来了

打表后“我们瞪眼可以发现”从第69位开始后面每34个为一个循环，打表即可

时间复杂度$O(T)$

</h5>

***

## AC代码
<details>
<summary>Code</summary>

```cpp
#include<bits/stdc++.h>
using namespace std;
#define ll long long
#define pii pair< int,int >
#define QWQ return 0;
#define QAQ return 

const int N=5e3+10;

int f[N];

inline void init()
{
    f[0]=0; f[1]=0;
    for( int i=2;i<=200;i++ )
    {
        map< int,bool > vis;
        for( int j=0;( j+2 )<=i;j++ ) vis[f[j]^f[i-j-2]]=true;
        while( vis.find( f[i] ) != vis.end() ) f[i]++;
    }
}

inline void sovel()
{
    int n;
    cin>>n;
    if( n <= 69 ) cout<<( f[n] ? "Lucija\n" : "Ivan\n" );
    else          cout<<( f[( n-70 )%34+70] ? "Lucija\n" : "Ivan\n" );
}

int main()
{
    // freopen( "1.in","r",stdin );
    // freopen( "1.out","w",stdout );
    ios::sync_with_stdio( false );
    cin.tie( nullptr ); cout.tie( nullptr );
	init();
    int t;
    for( cin>>t;t;t-- ) sovel();
    QWQ
}
```

</details>