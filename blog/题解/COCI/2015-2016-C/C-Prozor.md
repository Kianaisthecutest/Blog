---
title: Prozor
date: 2026-09-07
slug: 题解/COCI/2015-2016-C/C-Prozor
tags: [题解, COCI, 前缀和]
---

{/*truncate*/}

## [COCI 2015/2016 #7] Prozor
<details>
<summary>题干</summary>

<h2>题目描述</h2>

一扇规模为 $R \times S$ 的窗户上有若干只苍蝇。现有一把苍蝇拍，它可以消灭 $K \times K$ 矩形区域内（不含边界）的所有苍蝇。

请选择一种苍蝇拍的放置位置，使得被消灭的苍蝇数量最多。输出消灭的苍蝇的最大值和该方案。如果有多种符合的方案，请输出任意一种。

<h2>输入格式</h2>

第一行，三个整数 $R,S,K$。

接下来的 $R$ 行，每行 $S$ 个字符 $\texttt *$（表示苍蝇）或 $\texttt .$（表示空白区域）。数据保证至少能消灭一只苍蝇。

<h2>输出格式</h2>

第一行，输出能消灭苍蝇数量的最大值。当程序只答对该值时，可以获得 $50\%$ 的分数。

接下来的 $R$ 行，每行 $S$ 个字符。在输入的字符矩阵的基础上，将所选定的 $K \times K$ 矩形的四个角改为 $\texttt +$、横向边改为 $\texttt -$、纵向边改为 $\texttt |$ 即可。选定的矩形区域必须完全在整个矩阵内部。

**注：如果只想获得 $\mathbf{50\%}$ 的部分分，请只输出一个整数，即消灭苍蝇数量的最大值。此时，** $\red {\mathbf{请不要输出任何多余的字符（包括但不限于空格和换行符），否则会被判错。}}$

<h2>输入输出样例 #1</h2>

<h3>输入 #1</h3>

```
3 5 3
.....
.*.*.
.....
```

<h3>输出 #1</h3>

```
1
+-+..
|*|*.
+-+..
```

<h2>输入输出样例 #2</h2>

<h3>输入 #2</h3>

```
7 6 4
......
.*.*.*
......
.*.*..
..*...
..*...
*....*
```

<h3>输出 #2</h3>

```
2
......
.*.*.*
+--+..
|*.|..
|.*|..
+--+..
*....*
```

<h2>输入输出样例 #3</h2>

<h3>输入 #3</h3>

```
9 9 6
***......
......*.*
.*....*..
..*...*..
..*.*....
..*....*.
.....*...
.*...***.
.........
```

<h3>输出 #3</h3>

```
6
***......
......*.*
.*....*..
..*+----+
..*|*...|
..*|...*|
...|.*..|
.*.|.***|
...+----+
```

<h2>说明/提示</h2>

**【数据规模与约定】**

- 对于 $100\%$ 的数据，$3 \le K \le R,S \le 100$。

**【提示与说明】**

欢迎大家通过私信或发帖对自行编写的 [Special Judge](https://www.luogu.com.cn/paste/luaa2ic5) 进行 hack。

**题目译自 [COCI 2015-2016](https://hsin.hr/coci/archive/2015_2016/) [#7](https://hsin.hr/coci/archive/2015_2016/contest7_tasks.pdf) _Task 2 Prozor_。**

**本题分值按 COCI 原题设置，满分 $80$。**

</details>

***

## 分析

<h5>

二维前缀和模板，注意边框不计算就行

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

const int N=1e2+10;

char mp[N][N];
int sum[N][N];

int main()
{
    // freopen( "1.in","r",stdin );
    // freopen( "1.out","w",stdout );
    ios::sync_with_stdio( false );
    cin.tie( nullptr ); cout.tie( nullptr );
    int r, s, k;
    cin>>r>>s>>k;
    for( int i=1;i<=r;i++ ) for( int j=1;j<=s;j++ )
        cin>>mp[i][j], sum[i][j]=sum[i][j-1]+sum[i-1][j]-sum[i-1][j-1]+( mp[i][j] == '*' );
    int ans=0, x=k, y=k;
    for( int i=k;i<=r;i++ ) for( int j=k;j<=s;j++ )
        if( sum[i-1][j-1]-sum[i-1][j-k+1]-sum[i-k+1][j-1]+sum[i-k+1][j-k+1] > ans )
            ans=sum[i-1][j-1]-sum[i-1][j-k+1]-sum[i-k+1][j-1]+sum[i-k+1][j-k+1], x=i, y=j;
    cout<<ans<<"\n";
    int lux=x-k+1, luy=y-k+1;
    int rdx=x,     rdy=y;
    for( int i=1;i<=r;i++ )
    {
        for( int j=1;j<=s;j++ )
            if( i == lux && j == luy )                cout<<"+";
            else if( i == rdx && j == luy )           cout<<"+";
            else if( i == lux && j == rdy )           cout<<"+";
            else if( i == rdx && j == rdy )           cout<<"+";
            else if( i == lux && luy < j && j < rdy ) cout<<"-";
            else if( i == rdx && luy < j && j < rdy ) cout<<"-";
            else if( j == luy && lux < i && i < rdx ) cout<<"|";
            else if( j == rdy && lux < i && i < rdx ) cout<<"|";
            else                                      cout<<mp[i][j];
        cout<<"\n";
    }
    QWQ 
}
```

</details>