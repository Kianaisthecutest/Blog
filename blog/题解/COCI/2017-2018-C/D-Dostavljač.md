---
title: Dostavljač
date: 2026-09-02
slug: 题解/COCI/2017-2018-C/D-Dostavljač
tags: [题解, COCI, 动态规划, 树形DP, 背包DP]
---

{/*truncate*/}

## [COCI 2017/2018 #7] Dostavljač
<details>
<summary>题干</summary>

<h2>题目描述</h2>

自从 Krešo 开始种植辣椒以来，克罗地亚各地的 $N$ 家餐馆都对他的辣椒感兴趣，因此他们可以用真正的香料来丰富他们的菜肴。由于需求量很大，Krešo 决定开始作为辣椒的送货员。

餐馆用从 $1$ 到 $N$ 的数字表示，并且与 $N - 1$ 个道路相互连接，使得可以在任何两个餐馆之间旅行。Krešo 在 $1$ 号餐厅开始他的旅程。在一个单位的时间里，他可以开车到相邻的餐厅或将辣椒送到现在的餐馆。对于每家餐厅，我们都知道所需的辣椒数量 $A_i$。

由于交付货物很累，Krešo 决定在交付和旅行上花费总共 $M$ 个单位的时间，之后他计划休息一下。

确定 Krešo 在给定时间范围内可以提供的最大辣椒数量。你可以假设 Krešo 总是带有无限量的辣椒。

<h2>输入格式</h2>

第一行输入包含两个整数 $N$ 和 $M$（$1 \le N, M \le 500$），餐馆数量和 Krešo 计划用于交付辣椒的时间。

第二行输入包含 $N$ 个整数 $A_i$（$1 \le A_i \le 10^6$），用 $i$ 表示的餐馆所需的辣椒数量（$1 \le i \le N$）。

以下 $N - 1$ 行中的每一行包含两个整数 $U$ 和 $V$（$1 \le U, V \le N$，$U \ne V$），其表示餐馆 $U$ 和 $V$ 之间的道路。

<h2>输出格式</h2>

您必须输出 Krešo 在给定时间范围内可以提供的最大量的辣椒。

<h2>输入输出样例 #1</h2>

<h3>输入 #1</h3>

```
3 5
9 2 5
1 2
1 3

```

<h3>输出 #1</h3>

```
14
```

<h2>输入输出样例 #2</h2>

<h3>输入 #2</h3>

```
4 5
1 1 1 2
1 2
2 3
3 4

```

<h3>输出 #2</h3>

```
3
```

<h2>输入输出样例 #3</h2>

<h3>输入 #3</h3>

```
5 10
1 3 5 2 4
5 2
3 1
2 3
4 2
```

<h3>输出 #3</h3>

```
15
```

</details>

***

## 分析

<h5>

一个树上背包的变体，只需要在合并时注意一下往回走的双倍消耗就行了

记得加$siz$启发式优化，时间复杂度：$O(nm^2)$

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

int n, m;
int a[N];
int f[N][N<<1][2];
vector< int > rode[N];

inline void dfs( int p,int fa )
{
    for( auto &x:rode[p] ) if( x != fa )
    {
        dfs( x,p );
        for( int i=m;i>=0;i-- ) for( int j=m;j>=0;j-- )
        {
            if( j+i+2 <= m ) f[p][i+j+2][0] = max( f[p][i+j+2][0],f[p][i][0]+f[x][j][1] );
            f[p][i+j+2][1]=max( f[p][i+j+2][1],f[p][i][1]+f[x][j][1] );
            if( j+i+1 <= m ) f[p][i+j+1][0] = max( f[p][i+j+1][0],f[p][i][1]+f[x][j][0] );
        }
	}
    for( int i=m;i>=1;i-- )
        f[p][i][1]=max( f[p][i][1],f[p][i-1][1]+a[p] ),
        f[p][i][0]=max( f[p][i][0],f[p][i-1][0]+a[p] );
}

int main()
{
    // freopen( "txt.in","r",stdin );
    // freopen( "txt.out","w",stdout );
    ios::sync_with_stdio( false );
    cin.tie( nullptr ); cout.tie( nullptr );
    cin>>n>>m;
    for( int i=1;i<=n;i++ ) cin>>a[i];
    for( int i=1, u, v;i<n;i++ )
        cin>>u>>v,
        rode[u].push_back( v ), rode[v].push_back( u );
    dfs( 1,1 );
    cout<<max( f[1][m][0],f[1][m][1] );
    QWQ
}

```

</details>