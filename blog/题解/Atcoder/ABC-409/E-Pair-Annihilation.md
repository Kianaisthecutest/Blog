---
title: Pair Annihilation
date: 2025-07-03
slug: 题解/Atcoder/ABC-409/E-Pair-Annihilation
tags: [题解, ABC, 贪心]
---

{/*truncate*/}

<h5>

题意：将树上的所有点移动到根节点上，求最小花费

关键数据范围：$2 \leqslant n \leqslant 10^5$

解题思路：由题意，这 n 个节点一定构成树状结构，所以我们可以任选一个节点作为根

对于此题目，其实使用最简单的$DFS$就可以切掉，只需要以任意节点为根，$DFS$让子节点向上转移并增加$ans$即可

但在这之前，我们需要证明$<对任意子树，从子节点移动向叶节点一定是最优方案>$，我们使用*微扰(临项交换)*进行证明

</h5>

<details>

$$
\begin{aligned}

&已知节点 A 与其左儿子 B 右儿子 C，B 有 x 个电子，C有 y 个电子，AB路径的花费为 a，AC路径的花费为 b\\

&证明由 B，C 移动向 A 造成的开销一定最小，即\\
&ans1 = abs(a \times x) + abs(b \times y) 最小\\

&若选择其中一点先行移动到根节点再在另一儿子节点道路上往来\\

&则开销为\\
&ans2=abs((a+b) \times x)+abs(b \times abs(x+y))\\
&OR\\
&ans3=abs((a+b) \times y)+abs(a \times abs(x+y))\\\\

&<1> 若 x，y 带有相同电子，即 x，y同号，可得:\\
&ans1 \leqslant ans2当且仅当x=0时取等\\
&ans1 \leqslant ans3当且仅当y=0时取等\\
&ans2 \lt ans3 == abs(x) \gt abs(y) \\\\

&<2> 若 x，y 带有不同电子，即 x，y异号，可得:\\
&ans1 \lt ans2，ans1 \lt ans3\\
&ans2 \lt ans3 == abs(x) \lt abs(y)\\\\

&<3> 若 x，y 代数和为 0 ,可得:\\
&ans1 \lt ans2 = ans3\\\\

&综上所述，改变移动的方式不会使结果变得更优

\end{aligned}
$$

</details>

<summary><h3>AC代码</h3></summary>
<details>

```cpp
#include <bits/stdc++.h>
using namespace std;
#define ll long long
#define pii pair< ll,ll >
#define to first
#define cost second

const int N=1e5+10;

ll ans=0;
ll t[N];
vector< pii >rode[N];
bool vis[N];

void dfs( ll st )
{
	vis[st]=true;
	for( auto x:rode[st] )
	{
		if( vis[x.to] )
		{
			continue;
		}
		dfs( x.to );
		ans+=abs( t[x.to]*x.cost );
		t[st]+=t[x.to];
	}
}

int main() {
//   	freopen( "txt.in","r",stdin );
//   	freopen( ".out","w",stdout );
	int n;
	scanf( "%d",&n );
	for( int i=1;i<=n;i++ )
	{
		scanf( "%lld",&t[i] );
	}
	for( int i=1;i<n;i++ )
	{
		ll u, v, w;
		scanf( "%lld%lld%lld",&u ,&v ,&w );
		rode[u].push_back( { v,w } );
		rode[v].push_back( { u,w } );
	}
	dfs( 1 );
	printf( "%lld",ans );
	return 0;
}

```

</details>

**时间复杂度**：$O(n)$