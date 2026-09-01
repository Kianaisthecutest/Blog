---
title: Alkemija
date: 2026-9-01
slug: 题解/COCI/2017-2018-B/A-Alkemija
tags: [题解, 拓扑排序, 图论建模]
---

{/*truncate*/}

## [COCI 2017/2018 #6] Alkemija
<details>

<h2>题目描述</h2>

在古代，当炼金术士们在寻找黄金时，世界上已知共有 N 种不同的物质，用 1 到 N 表示。经过多年的努力，寻找秘密配方，炼金术士们发现了一系列有趣的规律——炼金反应。在一种反应中，可以将物质集合 $\{X_1, X_2, \ldots, X_L\}$ 转化为另一种物质集合 $\{Y_1, Y_2, \ldots, Y_R\}$。例如，物质集合 $\{1, 4, 5\}$ 可能反应一次并生成新的物质集合 $\{2, 6\}$。

Joško 是一位现代炼金术士，他拥有 M 种不同的物质，用 $A_1, A_2, \ldots, A_M$ 表示。他拥有这些物质的无限量。Joško 想知道他可以使用古代炼金术士的反应列表创造出哪些物质，所以他请你帮助他解决这个问题。

<h2>输入格式</h2>

输入的第一行包含两个整数 N 和 M ($1 \leq M \leq N \leq 100\,000$)，即题目中的数字。

输入的第二行包含 M 个整数 $A_i$ ($1 \leq A_i \leq N$)，表示 Joško 起初拥有的物质的标签。

输入的第三行包含整数 K ($1 \leq K \leq 100\,000$)，即已知反应的数量。

接下来的 $3 \cdot K$ 行包含反应列表。每个反应由以下 3 行描述：

- 第一行包含整数 L 和 R ($1 \leq L, R \leq N$)。
- 第二行包含 L 个不同的整数 $X_i$ ($1 \leq X_i \leq N$)。
- 第三行包含 R 个不同的整数 $Y_i$ ($1 \leq Y_i \leq N$)。
- 这描述了物质集合 $\{X_1, X_2, \ldots, X_L\}$ 转化为物质集合 $\{Y_1, Y_2, \ldots, Y_R\}$ 的反应。

所有 L 值的总和不会超过 100\,000。

所有 R 值的总和不会超过 100\,000。

<h2>输出格式</h2>

输出的第一行必须包含整数 X，即可以获得的物质数量。

输出的第二行必须包含 X 个不同的整数 $B_i$，按升序排列，表示可以获得的物质的标签。

<h2>输入输出样例 #1</h2>

<h3>输入 #1</h3>

```
4 2
1 2
2
2 1
1 2
3
2 1
1 3
4

```

<h3>输出 #1</h3>

```
4
1 2 3 4
```

<h2>输入输出样例 #2</h2>

<h3>输入 #2</h3>

```
6 3
1 4 5
3
3 2
2 3 4
1 6
1 3
4
1 5 6
1 1
6
2

```

<h3>输出 #2</h3>

```
5
1 2 4 5 6
```

<h2>说明/提示</h2>

在总分值的 60% 的测试用例中，将满足：

- $N, K \leq 500$。
- 所有 L 值的总和和所有 R 值的总和不会超过 500。

**第一个测试用例的说明：**

有 2 个反应。

第一个反应将物质集合 $\{1, 2\}$ 转化为物质集合 $\{3\}$。

第二个反应将物质集合 $\{1, 3\}$ 转化为物质集合 $\{4\}$。

Joško 起初拥有物质集合 $\{1, 2\}$。

使用第一个反应，Joško 可以获得物质 3，之后他拥有物质集合 $\{1, 2, 3\}$。

之后，使用第二个反应，他还可以获得物质 4。

**第二个测试用例的说明：**

Joško 起初拥有物质集合 $\{1, 4, 5\}$。

使用第二个反应，可以获得物质 6，之后可以应用第三个反应，得到物质 2。

第一个反应无法应用，因为 Joško 没有物质 3。

题面翻译由 ChatGPT-4o 提供。

</details>

***

## 分析

<h5>

首先我们发现这个是一个点对点的限制，只有满足一些点选择才能选择另一些点

这不就是拓扑吗？

所以我们可以快速写一份代码，就是将每组的$(\forall x_i,\forall y_i)$连边，判断这一组的边有没有松弛完就行了

但是我们发现这样它的边的数量最大是$n^2$级别的，会爆炸

优化方法很巧妙，我们可以增加一个中间点，连接成$\forall x_i$->$Transfer$->$\forall y_i$的形式，这样我们连的边数量就有保证了

时间复杂度就是由拓扑决定的边的数量：$O(\sum l_i+r_i)$

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

const int N=1e5+10;

int a[N];
int deg[N<<1];
bool vis[N];
vector< int > rode[N<<1];

int main()
{
    // freopen( "1.in","r",stdin );
    // freopen( "1.out","w",stdout );
    ios::sync_with_stdio( false );
    cin.tie( nullptr ); cout.tie( nullptr );
    int n, m, k;
	cin>>n>>m;
	for( int i=1;i<=m;i++ ) cin>>a[i];
    cin>>k;
	for( int i=1, l, r, z;i<=k;i++ )
	{
		cin>>l>>r; deg[n+i]=l;
		for( int j=1;j<=l;j++ ) cin>>z, rode[z].push_back( n+i );
		for( int j=1;j<=r;j++ ) cin>>z, rode[n+i].push_back( z );
	}
	queue< int > topsort;
	for( int i=1;i<=m;i++ ) topsort.push( a[i] ), vis[a[i]]=true;
	while( !topsort.empty() )
	{
		auto p=topsort.front();
		topsort.pop();
        for( auto &x:rode[p] ) if( !( --deg[x] ) )
            for( auto &y:rode[x] ) if( !vis[y] ) topsort.push( y ), vis[y]=true;
            
	}
    int ans=0;
    for( int i=1;i<=n;i++ ) ans+=vis[i];
    cout<<ans<<"\n";
    for( int i=1;i<=n;i++ ) if( vis[i] ) cout<<i<<" ";
	QWQ
}
```

</details>