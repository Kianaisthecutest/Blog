---
title: 01分数规划
date: 2026-11-06
slug: 算法/Kruskal重构树
tags: [算法, 最小生成树, 并查集, Kruskal重构树]
---

{/*truncate*/}

## 1.定义及应用场景

<h5>

我将提出暴论，$Kruskal$ 重构树就是不能删边的LCT。

$Kruskal$ 重构树是一种在做 $Kruskal$ 算法时通过新建特殊点记录连通块信息的方式解决一些图上问题的算法。

它一般可以在某些离线并查集好做但是强制在线的题目中使用，利用特殊点记录边信息再利用单调性从而维护到连通块(或者说重构树上的子树)信息解决问题。

</h5>

## 2.例题与解法

<h5>

一条臭区出的题[宣布无人罪](https://nsoj.top/p/7123)，其实就是[「USACO 2018 Jan Gold」MooTube](https://www.luogu.com.cn/problem/P4185)的强制在线版本。

我们容易想到离线写法，将每个边离线下来排序把边从大到小连起来，这样我们在询问一组查询 $x$ 的时候这棵树会被划分为多个连通块(就是一个森林)，树上任意一条边的权值大与等于 $x$。

那么我们追溯到这个离线算法的底层逻辑，其实一个合并操作会使两个点之间等价于连一个权值已知的边，并且这两个连通块里面的边是一定。

那么我们不如就直接建一个新的点并且记录一个权值 $w$ 为这个边权，并且将这两个连通块作为子树连上这个点，这时候的优秀点在于：对于任意一颗子树，若其根节点为 $rt$，那么这些点互相到达的边权不小于 $w$。

那么我们只需要处理一个倍增数组向上跳找父亲就可以做到 $O(n)$ 预处理 $O(logn)$ 单次询问的优秀复杂度了。

并且我们再考虑一下合并的一些特征，会发现这个重构树还有以下优秀特征：

1.节点个树为 $2n-1$，

2.当且仅当该点为叶子节点时，它是原节点，

3.这是一颗二叉树。

我们有时还可以通过这个来寻找一些特殊性质。

给出本题代码(赛时代码将就这看吧)：

</h5>

```cpp
/*
虽然我好久之前就知道他要出 Mootube 加强版
虽然我好久之前就知道这个是 Kruskal 重构树
但是还是尊重一下写一下思路吧

我们可以简单想出这个的离线做法，离线后处理当前的并查集集合的 Siz

但是我不会 Kruskal 重构树，淦

那么我们再思考一下，其实一个合并操作会使两个点之间等价于连一个权值已知的边
那么我们直接连边化连中间点，这个点的权值就是边权，那么由这个点强制的两个连通块的相互到达的代价不小于这个 val
最后只需要查询满足 val >= k 的极远父亲(同时也是 Siz 最大)的 Siz 即可

cao怎么 RE 了，靠靠靠靠靠

nmd并查集没预处理

怎么还是 RE 了，靠靠靠靠靠

哦读入反了

还是 RE 没招了，靠靠靠靠靠

tmd傻逼 Ice-king 改了读入没修大样例，浪费我生命

还有异或解密
*/
#include<bits/stdc++.h>
using namespace std;
#define ll long long
#define pii pair< int,int >
#define QWQ return 0;
#define QAQ return

const int N=2e5+10, LOGN=18;

struct EDGE
{
    int u, v, w;

    bool operator< ( const EDGE &x )const
    { QAQ w > x.w; }

}edge[N>>1];

int Fa[N], siz[N], val[N];
int fa[LOGN][N];

inline int get( int x )
{ QAQ ( Fa[x] == x ? x : Fa[x]=get( Fa[x] ) ); }

int main()
{
    // freopen( "4.in","r",stdin );
    // freopen( "txt.out","w",stdout );
    ios::sync_with_stdio( false );
    cin.tie( nullptr ); cout.tie( nullptr );
    int n, q, c;
    cin>>n>>q>>c;
    for( int i=1, u, v, w;i<n;i++ )
        cin>>u>>v>>w, edge[i]={ u,v,w };
    sort( edge+1,edge+n );
    for( int i=1;i<( n<<1 );i++ )
        Fa[i]=i, siz[i]=( i <= n );
    int cnt=n;
    for( int i=1;i<n;i++ )
    {
        auto [u,v,w]=edge[i];
        int fu=get( u ), fv=get( v );
        if( fu == fv ) continue;
        Fa[fu]=Fa[fv]=++cnt; val[cnt]=w;
        siz[cnt]=siz[fu]+siz[fv];
        fa[0][fu]=fa[0][fv]=cnt;
    }
    for( int bit=1;bit<LOGN;bit++ ) for( int i=1;i<( n<<1 );i++ )
        fa[bit][i]=fa[bit-1][fa[bit-1][i]];
    int lst=0;
    for( int i=1, x, y;i<=q;i++ )
    {
        cin>>y>>x;
        x^=( lst*c ); y^=( lst*c );
        for( int bit=LOGN-1;bit>=0;bit-- )
            if( fa[bit][x] && val[fa[bit][x]] >= y ) x=fa[bit][x];
        lst=siz[x]-1;
        cout<<lst<<"\n";
    }
    QWQ
}
```

## 3.优秀点与不足

<h5>

优秀点不用多说，它可以将一些题目变成可在线处理的形式。

那我们再思考一下，其实和边权大小强相关的图上都可以思考一下使用重构树。

但是不足也很明显，因为这个重构树的建立本质上也是一个对于边集的离线预处理，而当边的状态存在变化的时候重构这个重构树的复杂度就不可接受了。

~~所以还是老老实实写 $LCT$ 吧~~

</h5>