---
title: Pictionary
date: 2026-9-01
slug: 题解/COCI/2017-2018-B/D-Pictionary
tags: [题解, 并查集, Kruskal重构树, LCA]
---

{/*truncate*/}

## [COCI 2017/2018 #5] Pictionary
<details>

<h2>题目描述</h2>

在宇宙一个不为人知的地方，有一个星球，上面有一个国家，只有数学家居住。在这个国家有 $n$ 个数学家，有趣的是，每个数学家都住在自己的城市，且城市间无道路相连，因为他们可以在线交流。当然，城市有从 $1$ 到 $n$ 的编号。

一位数学家决定用手机发论文，而手机将“不言而喻”自动更正成了“猜谜游戏”。不久之后，这个国家就发现了猜谜游戏。他们想要见面一起玩，于是这个国家就开始了修路工程。道路修建会持续 $m$ 天。对于第 $i$ 天，若 $\gcd(a,b)=m-i+1$，则 $a$ 和 $b$ 城市间会修一条路。

由于数学家们忙于建筑工作，请你来确定一对数学家最早什么时候能凑到一起玩。

<h2>输入格式</h2>

第一行有三个正整数 $n,m,q$，表示城市数量、修路持续天数、询问数量。

接下来 $q$ 行，每行有两个正整数 $a,b$，表示询问 $a$ 和 $b$ 两个城市的数学家最早什么时候能在一起玩。

<h2>输出格式</h2>

输出 $q$ 行，第 $i$ 行有一个正整数，表示第 $i$ 次询问的结果。

<h2>输入输出样例 #1</h2>

<h3>输入 #1</h3>

```
8 3 3
2 5
3 6
4 8
```

<h3>输出 #1</h3>

```
3
1
2
```

<h2>输入输出样例 #2</h2>

<h3>输入 #2</h3>

```
25 6 1
20 9
```

<h3>输出 #2</h3>

```
4
```

<h2>输入输出样例 #3</h2>

<h3>输入 #3</h3>

```
9999 2222 2
1025 2405
3154 8949
```

<h3>输出 #3</h3>

```
1980
2160
```

<h2>说明/提示</h2>

对于 $40\%$ 的数据：
$n≤4000,q≤10^5$  
对于全部数据：  
$1≤n,q≤10^5$  
$1≤m≤n$

样例 1 解释：  
在第一天，$(3,6)$ 之间修了一条路，因此第二次询问输出 `1`；  
在第二天，$(2,4),(2,6),(2,8),(4,6),(6,8)$ 之间都修了一条路，此时 $4$ 和 $8$ 号城市连通，第三次询问输出 `2`；  
在第三天，所有编号互质的城市之间都修了路，$2$ 和 $5$ 号城市在此时连通，第一次询问输出 `3`。

样例 2 解释：  
在第二天，$(20,15)$ 之间修了一条路；  
第四天，$(15,9)$ 之间修了一条路；  
所以 $20$ 和 $9$ 号城市在第四天连通，输出 `4`。

</details>

***

## 分析

<h5>

首先我们可以考虑如何建出一颗树来求解

每一个时刻，显然可以直接考虑第$m−i+1$座城市和所有$m−i+1$的倍数连边，这两张图是等价的(在只需要判断联通性的情况下)

那么就可以直接这样暴力枚举，然后用一个并查集记录两个点是否在同一个集合里

暴力枚举的复杂度是$\frac{n}{1}+\frac{n}{2}​+...+\frac{n}{n}$​的，所以复杂度是$O(nlogn)$的

那么我们每次的答案就是两点的$LCA$，于是可解了

时间复杂度：$O(nlogn)$

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

const int N=2e5+10;

int Fa[N];

inline int get( int x ){ QAQ ( Fa[x] == x ? x : Fa[x]=get( Fa[x] ) ); }

int fa[N], siz[N], dep[N];
int mson[N], top[N];
vector< int > rode[N];

void dfs1( int p,int Fa )
{
    siz[p]=1;
    dep[p]=dep[Fa]+1, fa[p]=Fa;
    for( auto &x:rode[p] )
    {
        if( x == Fa ) continue;
        dfs1( x,p );
        siz[p]+=siz[x];
        if( siz[x] > siz[mson[p]] ) mson[p]=x;
    }
}

void dfs2( int p,int t )
{
    top[p]=t;
    if( !mson[p] ) QAQ;
    dfs2( mson[p],t );
    for( auto &x:rode[p] ) if( x != fa[p] && x != mson[p] )
        dfs2( x,x );
}

int lca( int x,int y )
{
    while( top[x] != top[y] )
        if( dep[top[x]] > dep[top[y]] ) x=fa[top[x]];
        else                            y=fa[top[y]];
    return ( dep[x] < dep[y] ? x : y );
}

int ans[N];

int main()
{
    // freopen( "1.in","r",stdin );
    // freopen( "1.out","w",stdout );
    ios::sync_with_stdio( false );
    cin.tie( nullptr ); cout.tie( nullptr );
    int n, m, q;
    cin>>n>>m>>q;
    int root=n;
    for( int i=1;i<=( n<<1 );i++ ) Fa[i]=i, siz[i]=1;
    for( int u=m;u>=1;u-- ) for( int v=( u<<1 );v<=n;v+=u )
    {
        int fu=get( u ), fv=get( v );
        if( fu == fv ) continue;
        Fa[fu]=Fa[fv]=++root;
        ans[root]=m-u+1;
        rode[fu].push_back( root ); rode[root].push_back( fu );
        rode[fv].push_back( root ); rode[root].push_back( fv );
    }
    dfs1( root,root );
    dfs2( root,root );
    for( int i=1, x, y;i<=q;i++ ) cin>>x>>y, cout<<ans[lca( x,y )]<<"\n";
	QWQ
}
```

</details>