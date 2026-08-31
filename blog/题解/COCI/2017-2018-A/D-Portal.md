---
title: Portal
date: 2026-08-31
slug: 题解/COCI/2017-2018-A/D-Portal
tags: [题解, COCI, 最短路]
---

{/*truncate*/}

## [COCI 2017/2018 #3] Portal
<details>
<summary>题干</summary>

<h2>题目描述</h2>

本任务的主角 Chell 必须解决 GLaDOS 提出的新谜题。

Chell 处于一个房间中，该房间的布局可以表示为一个 $N$ 行 $M$ 列的矩阵。每个格子可以是以下几种之一：

- 障碍格子 - 其中有一面墙（用 '#' 表示），
- Chell 的起始位置（用 'C' 表示），
- Chell 必须到达以解决谜题的格子（用 'F' 表示），或者
- 空格子（用 '.' 表示）。

Chell 携带一个所谓的传送枪，可以用来在墙上创建传送门。

在每次移动中，她可以执行以下操作之一：
- 向相邻的格子移动，方向可以是上、下、左或右（她不能移动到有墙的格子）。此移动耗时一个单位时间。
- 通过转向一个方向（不一定是相邻的）朝墙射击来在墙上创建一个传送门。传送门只会在被击中的墙的一侧创建。在任何时刻，**最多只能有两个传送门是激活的**。如果在已有两个激活传送门的情况下创建新的传送门，最早创建的那个将消失。不能在已有传送门的位置创建新的传送门。此操作耗时可忽略不计，即零时间。
- 如果她在一个与墙相邻的格子并且墙的这一侧有传送门，她可以进入传送门并从另一个传送门出来到一个非障碍格子。此操作在有两个激活传送门时才可能，并且耗时一个单位时间。

Chell 想知道解决谜题的最少时间，即到达标记为 'F' 的格子的时间。

**请注意**：房间的四周总是有墙，并且字母 'C' 和 'F' 在矩阵中只出现一次。

<h2>输入格式</h2>

输入的第一行包含正整数 $N$ 和 $M$（$4 \le N, M \le 500$），即任务中的数字。

接下来的 $N$ 行中的每一行包含 $M$ 个字符，描述房间的布局。

<h2>输出格式</h2>

你必须输出解决谜题所需的最少时间，或者如果无法解决则输出 "nemoguce"（不带引号，克罗地亚语表示不可能）。

<h2>输入输出样例 #1</h2>

<h3>输入 #1</h3>

```
4 4
####
#.F#
#C.#
####

```

<h3>输出 #1</h3>

```
2
```

<h2>输入输出样例 #2</h2>

<h3>输入 #2</h3>

```
6 8
########
#.##..F#
#C.##..#
#..#...#
#.....##
########

```

<h3>输出 #2</h3>

```
4
```

<h2>输入输出样例 #3</h2>

<h3>输入 #3</h3>

```
4 5
#####
#C#.#
###F#
#####

```

<h3>输出 #3</h3>

```
nemoguce

```

<h2>说明/提示</h2>

在总分的 $50\%$ 的测试用例中，将满足 $4 \le N, M \le 15$。

**第二个测试用例的说明**：

该谜题可以在 $8$ 步内解决，如下图所示。

在第一步中，我们转向左侧墙壁，射击并创建一个传送门，该传送门出现在第 $3$ 行第 $1$ 列（坐标 $(3,1)$）的墙的右侧。

在第二步中，我们从墙的上侧在坐标 $(6,2)$ 创建一个传送门。

在第三步中，我们进入坐标 $(3,1)$ 的传送门并在坐标 $(5,2)$ 出口——一个有第二个传送门的非障碍格子。

在第四步中，我们向右转并从墙的左侧在坐标 $(5,7)$ 创建一个传送门。由于已经有两个传送门，位于 $(3,1)$ 的传送门消失。

在第五步中，我们进入坐标 $(6,2)$ 的传送门并在坐标 $(5,6)$ 出口。

在第六步中，我们从墙的下侧在坐标 $(1,6)$ 创建一个新传送门，使得坐标 $(6,2)$ 的传送门消失。

在第七步中，我们进入坐标 $(5,7)$ 的传送门并在坐标 $(2,6)$ 出口。最后，在第八步中，我们向右移动一格以结束游戏。

第 $1$、$2$、$4$ 和 $6$ 步中的传送门创建耗时为零，而其余移动耗时一个单位时间，因此解决谜题总共需要 $4$ 个单位时间。

![](https://cdn.luogu.com.cn/upload/pic/17512.png)

题面翻译由 ChatGPT-4o 提供。
</details>

***

## 分析

<h5>

很暴力的一个题

首先我们可以以$O(4\times n^2)$的复杂度处理如果设立传送门每个方向会到哪个点

然后我们还可以想到一个点：传送门没必要保留，或者说"那么较早创建的门将消失"这个限制只是限制个数而不限制行走

因为如果我们说我们现在有了门$1$和$2$需要保留$2$才能使建立第$3$个门时最优，那么我们可以当作走到$2$后向原地开了个门，于是与前面的问题无关

所以我们之间跑一个$SPFA$就可以了(图很稠密，不会卡掉)

但是要注意一个点，我们不一定要在墙边才能传送，可以先设立传送门然后再走一条最短路过去(即一条直线)

时间复杂度:$O(kn^2)$，$k$为常数且$k\leq n$

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

const int N=5e2+10;
const int ix[4]={ 0, 0,1,-1 };
const int iy[4]={ 1,-1,0, 0 };

int n, m;
int sx, sy, ex, ey;
int dis[N][N];
int tp[4][N][N];
char mp[N][N];
bool vis[N][N];

inline void bfs()
{
    memset( dis,0x3f,sizeof dis );
    queue< pii > q;
    dis[sx][sy]=0; vis[sx][sy]=true;
    q.push( { sx,sy } );
    while( !q.empty() )
    {
        auto [x,y]=q.front();
        q.pop();
        vis[x][y]=false;
        for( int i=0;i<4;i++ )
        {
            int nx=x+ix[i], ny=y+iy[i];
            if( mp[nx][ny] == '#' ) continue;
            if( dis[nx][ny] <= dis[x][y]+1 ) continue;
            dis[nx][ny]=dis[x][y]+1;
            if( !vis[nx][ny] ) q.push( { nx,ny } ), vis[nx][ny]=true;
        }
        for( int i=0;i<4;i++ )
        {
            int d;
            if( i < 2 ) d=abs( tp[i][x][y]-y );
            else        d=abs( tp[i][x][y]-x );
            for( int j=0;j<4;j++ ) if ( i != j )
            {
                int nx=x, ny=y;
                if( j < 2 ) ny=tp[j][x][y];
                else        nx=tp[j][x][y];
                if( mp[nx][ny] == '#' ) continue;
                if( dis[nx][ny] <= dis[x][y]+d+1 ) continue;
                dis[nx][ny]=dis[x][y]+d+1;
                if( !vis[nx][ny] ) q.push( { nx,ny } ), vis[nx][ny]=true;
            }
        }
    }
}

int main()
{
    // freopen( "1.in","r",stdin );
    // freopen( "1.out","w",stdout );
    ios::sync_with_stdio( false );
    cin.tie( nullptr ); cout.tie( nullptr );
    cin>>n>>m;
    for( int i=1;i<=n;i++ ) for( int j=1;j<=m;j++ )
        cin>>mp[i][j];
    for( int i=1;i<=n;i++ )
    {
        for( int j=1;j<=m;j++ ) if( mp[i][j] != '#' )
            tp[0][i][j]=( mp[i][j-1] == '#' ? j : tp[0][i][j-1] );
    }
    for( int i=1;i<=n;i++ )
    {
        for( int j=m;j>=1;j-- ) if( mp[i][j] != '#' )
            tp[1][i][j]=( mp[i][j+1] == '#' ? j : tp[1][i][j+1] );
    }
    for( int j=1;j<=m;j++ )
    {
        for( int i=1;i<=n;i++ ) if( mp[i][j] != '#' )
            tp[2][i][j]=( mp[i-1][j] == '#' ? i : tp[2][i-1][j] );
    }
    for( int j=1;j<=m;j++ )
    {
        for( int i=n;i>=1;i-- ) if( mp[i][j] != '#' )
            tp[3][i][j]=( mp[i+1][j] == '#' ? i : tp[3][i+1][j] );  
    }
    for( int i=1;i<=n;i++ ) for( int j=1;j<=m;j++ )
        if( mp[i][j] == 'C' )      sx=i, sy=j;
        else if( mp[i][j] == 'F' ) ex=i, ey=j;
    bfs();
    if( dis[ex][ey] == 0x3f3f3f3f ) cout<<"nemoguce";
    else                            cout<<dis[ex][ey];
    QWQ
}
```

</details>