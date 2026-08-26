---
title: Bitovi
date: 2026-08-25
slug: 题解/COCI/2023-2024-05/A-Bitovi.md
tags: [题解, COCI, 进制]
---

<h2>模拟，进制</h2>

{/*truncate*/}

## [COCI 2023/2024 #5] Bitovi
<details>
<summary>题干</summary>

<h2>题目背景</h2>

**译自 [COCI 2023/2024 Contest #5](https://hsin.hr/coci/archive/2023_2024) T2「[Bitovi](https://hsin.hr/coci/archive/2023_2024/contest5_tasks.pdf)」**

<h2>题目描述</h2>

哪个先出现，鸡还是蛋？作为一个百万富翁活上一百年好，还是贫穷中度过七天好？如何成为国际象棋大师？如何拉起百叶窗？如何通过期末考试？如何训练龙？这些都是一些有趣的问题，我们可以在竞赛结束后再去思考，但现在我们提出一个不那么有趣的计算机科学问题。

给定两组数集 $A$ 和 $B$，大小均为 $N$。每次操作，你可以从集合 $A$ 中选择一个任意元素，并改变其二进制表示中的一个任意数位。结果数不能是改变前集合 $A$ 中的元素。

例如，数字 $5$ 的二进制是 $0101_2$。通过一次操作，它可以变成 $13=1101_2$、$1=0001_2$、$7=0111_2$ 或 $4=0100_2$。

确定一系列操作，通过这些操作集合 $A$ 变得和集合 $B$ 相等。如果两个集合大小相同，并且集合 $A$ 中没有不属于集合 $B$ 的元素，则认为两个集合是相等的。

注意：操作的数量不必是最小的，但必须满足任务的限制。

<h2>输入格式</h2>

第一行包含一个整数 $N$（$1 \le N \le 2^{15}$），集合 $A$ 和 $B$ 的大小。

第二行包含 $N$ 个不同的整数 $a_i$（$0 \le a_i < 2^{15}$），表示集合 $A$ 的元素。

第二行包含 $N$ 个不同的整数 $b_i$（$0 \le b_i < 2^{15}$），表示集合 $B$ 的元素。

<h2>输出格式</h2>

第一行输出操作的数目，不超过 $2^{19}$。

接下来若干行，每行输出 $x,y$（$0 \le x, y < 2^{15}$），表示将集合 $A$ 中的 $x$ 修改为 $y$。$x$ 和 $y$ 在二进制位中只能有一位不同。并且，必须满足 $x\in A$，$y\not \in A$。

<h2>输入输出样例 #1</h2>

<h3>输入 #1</h3>

```
3
0 1 2
1 2 3
```

<h3>输出 #1</h3>

```
2
1 3
0 1
```

<h2>输入输出样例 #2</h2>

<h3>输入 #2</h3>

```
3
4 8 31
0 4 8
```

<h3>输出 #2</h3>

```
5
31 30
30 28
28 24
24 16
16 0
```

<h2>输入输出样例 #3</h2>

<h3>输入 #3</h3>

```
5
0 1 2 4 5
7 6 5 3 2
```

<h3>输出 #3</h3>

```
9
1 3
3 7
0 1
1 0
2 6
0 2
7 3
5 7
4 5
```

<h3>说明/提示</h3>

<h3>样例解释 1</h3>

如果我们先操作 $0\ 1$，再操作 $1\ 3$，两次操作间，集合 $A$ 将有两个相同的元素，这是不被允许的。另一种可能的方案是 $2\ 3$，$0\ 2$。

<h3>样例解释 2</h3>

$31=11111_2$。按照从最低有效位到最高有效位修改，依次可以得到 $30,28,24,16$ 和 $0$。在所有的操作后，$A$ 和 $B$ 相同。

<h3>子任务</h3>

| Subtask | Points | Constraints |
| :--: | :--: | :--: |
| 1 | 10 | $a_i,b_i \le 2^{14}$ |
| 2 | 15 | $N \le 7$ | 
| 3 | 30 | $N \le 2^7$ |
| 4 | 15 | 无额外限制 |

</details>

***

## 分析

<h5>

首先我们先对整个序列进行一次"去重"，将两个序列中相同的数先去掉，保证每个数需要操作至少一次

首先我们对每对去操作变化，每次就是一个$\log$的复杂度，但是如何处理重复的情况呢

假设现在存在一个变化情况$x$->$y$->$z$但是$y$已经存在，此时我们不妨先用那个已经存在的$y$去操作

在最后，我们再执行$x$->$y$就行了，相当于我们把这个操作暂缓处理

时间复杂度$O(nlogn)$

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

const int N=20;

set< int > a, b, c;
stack< pii > rep;
vector< pii > ans;

inline void ope( int x,int y )
{
    if( a.find( y ) != a.end() )
    { rep.push( { x,y } ); QAQ; }
    a.erase( x ); a.insert( y );
    ans.push_back( { x,y } );
}

inline int lowbit( int x ){ QAQ x&-x; }

inline void turn( int x,int y )
{
    while( x != y )
    {
        int diff=x^y; diff=lowbit( diff );
        ope( x,x^diff );
        x^=diff;
    }
    while( !rep.empty() )
    {
        auto [nx,ny]=rep.top();
        rep.pop();
        turn( nx,ny );
    }
}

int main()
{
    // freopen( "1.in","r",stdin );
    // freopen( "1.out","w",stdout );
    ios::sync_with_stdio( false );
    cin.tie( nullptr ); cout.tie( nullptr );
    int n;
    cin>>n;
    for( int i=1, x;i<=n;i++ )
        cin>>x,
        a.insert( x ), c.insert( x );
    for( int i=1, x;i<=n;i++ )
        cin>>x,
        b.insert( x );
    while( !b.empty() )
    {
        int y=*b.begin();
        if( a.find( y ) != a.end() )
        { b.erase( y ); c.erase( y );
          continue; }
        int x=*c.begin();
        turn( x,y );
        b.erase( y ); c.erase( x );
    }
    cout<<ans.size()<<"\n";
    for( auto &[x,y]:ans ) cout<<x<<" "<<y<<"\n";
    QWQ
}
```

</details>