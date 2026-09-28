---
title: Klasika
date: 2026-09-28
slug: 题解/COCI/2019-2020-4/C-Klasika
tags: [题解, COCI, 字典树, 树状数组, 树链剖分, 树套树]
---

{/*truncate*/}

## [COCI 2019/2020 #4] Klasika
<details>

<h2>题目描述</h2>

开始时，你有一个编号为 $1$ 的节点，它代表着一棵树的根。你的任务是对树进行 $Q$ 次操作。

操作分为两类：

- $\texttt{Add x y}$，给树上编号为 $x$ 的节点加入一个儿子，该儿子的编号为加入该节点后树的大小，它与 $x$ 的边的边权为 $y$。
- $\texttt{Query a b}$，查找从 $a$ 出发，到 $b$ 节点子树内某个节点（包括 $B$ ）的路径中边权异或和最大的一条，并输出其异或和。

<h2>输入格式</h2>

第一行一个整数 $Q$。

加下来 $Q$ 行，每行一个字符串和两个数字，描述一次操作。

<h2>输出格式</h2>

对于每个 $\texttt{Query}$ 操作，一行一个整数表示答案。

<h2>输入输出样例 #1</h2>

<h3>输入 #1</h3>

```
4
Add 1 5
Query 1 1
Add 1 7
Query 1 1
```

<h3>输出 #1</h3>

```
5
7
```

<h2>输入输出样例 #2</h2>

<h3>输入 #2</h3>

```
6
Add 1 5
Add 2 7
Add 1 4
Add 4 3
Query 1 1
Query 2 4
```

<h3>输出 #2</h3>

```
7
2
```

<h2>输入输出样例 #3</h2>

<h3>输入 #3</h3>

```
10
Add 1 4
Add 1 9
Add 1 10
Add 2 2
Add 3 3
Add 4 4
Query 4 2
Query 1 3
Add 6 7
Query 1 3
```

<h3>输出 #3</h3>

```
14
10
13
```

<h2>说明/提示</h2>

【数据规模与约定】

| 子任务编号 | 特殊限制                                   | 分值 |
| ---------- | ------------------------------------------ | ---- |
| $1$        | $Q\le 200$                                 | $10$ |
| $2$        | $Q\le 2\times 10^3$                        | $20$ |
| $3$        | 对于所有 $\texttt{Query}$ 操作，保证 $b=1$ | $30$ |
| $4$        | 无特殊限制                                 | $40$ |

对于 $100\%$ 的数据，$1\le Q\le 2\times 10^5$，$0\le y\le 2^{30}$，保证 $x,a,b$ 小于等于当前树的大小。

【提示与帮助】

**题目译自 [COCI 2019/2020](https://hsin.hr/coci/archive/2019_2020/) [CONTEST #4](https://hsin.hr/coci/archive/2019_2020/contest4_tasks.pdf) T4 Klasika**

在 COCI 中，本题分值为 $110$ 分。

</details>

***

## 分析

<h5>

首先考虑没有$Add$操作时怎么做，我们可以树剖+可持久化字典树解决

那么加入加点操作后如果在线实现我们每次加点操作后会因为重做$dfn$序和字典树导致$O(qnlogn)$爆炸

那么我们考虑一下离线能不能做，首先就是可以直接树剖一次作出$dfn$序了并且构建可持久化字典树了

然后我们又可以想到对于每个$Add$操作，我们可以动态的插入这个边的权值，初始为$0$就不会对答案产生影响了

所以我们只需要再在外层加一个树状数组/线段树转树套树就可以$O(log^2n)$的实现单点改区间查了

时间复杂度$O(qlog^2n)$，建议不要外层线段树空间会出问题

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

const int N=2e5+10, LOGN=31;

struct ASK
{
    bool op;
    int x, y;
}ask[N];

int id;
int siz[N], fa[N], dep[N], dis[N];
int mson[N], top[N], dfn[N], idx[N];
vector< pii > rode[N];

inline void dfs1( int p,int Fa )
{
    fa[p]=Fa;
    siz[p]=1; dep[p]=dep[Fa]+1;
    for( auto &[x,w]:rode[p] ) if( x != Fa )
    {
        dis[x]=dis[p]^w;
        dfs1( x,p );
        siz[p]+=siz[x];
        if( siz[x] > siz[mson[p]] ) mson[p]=x;
    }
}

inline void dfs2( int p,int t )
{
    top[p]=t;
    dfn[p]=++id; idx[id]=p;
    if( !mson[p] ) QAQ;
    dfs2( mson[p],t );
    for( auto &[x,w]:rode[p] ) if( x != fa[p] && x != mson[p] )
        dfs2( x,x );
}

struct Trie
{
    int cnt;
    int siz[N*LOGN<<3];
    int trie[N*LOGN<<3][2];
    
    inline Trie(){ cnt=0; }

    inline int newnode()
    {
        cnt++;
        trie[cnt][0]=trie[cnt][1]=siz[cnt]=0;
        QAQ cnt;
    }

    inline void insert( int &root,int Num )
    {
        if( !root ) root=newnode();
        int p=root; siz[p]++;
        for( int bit=LOGN;bit>=0;bit-- )
        {
            int now=( Num>>bit )&1;
            if( !trie[p][now] ) trie[p][now]=newnode();
            p=trie[p][now]; siz[p]++;
        }
    }

    inline int query( int rroot[],int sizr,int lroot[],int sizl,int num )
    {
        int ans=0;
        for( int bit=LOGN;bit>=0;bit-- )
        {
            int now=( num>>bit )&1, exp=now^1, sum=0;
            for( int i=0;i<sizr;i++ ) if( rroot[i] && trie[rroot[i]][exp] ) sum+=siz[trie[rroot[i]][exp]];
            for( int i=0;i<sizl;i++ ) if( lroot[i] && trie[lroot[i]][exp] ) sum-=siz[trie[lroot[i]][exp]];

            int nxt=now;
            if( sum > 0 ) nxt=exp, ans|=1<<bit;
            for( int i=0;i<sizr;i++ ) if( rroot[i] ) rroot[i]=trie[rroot[i]][nxt];
            for( int i=0;i<sizl;i++ ) if( lroot[i] ) lroot[i]=trie[lroot[i]][nxt];
        }
        QAQ ans;
    }

};

struct Binary
{
    int n;
    int root[N];
    int rroot[LOGN], lroot[LOGN];
    Trie trie;

    inline static int lowbit( int x ){ QAQ x&-x; }

    inline void add( int x,int y )
    { for( ;x<=n;x+=lowbit( x ) ) trie.insert( root[x],y ); }

    inline int query( int l,int r,int num )
    {
        int sizr=0, sizl=0;
        for(    ;r;r-=lowbit( r ) ) rroot[sizr++]=root[r];
        for( l--;l;l-=lowbit( l ) ) lroot[sizl++]=root[l];
        QAQ trie.query( rroot,sizr,lroot,sizl,num );
    }

}Bit;

int main()
{
    // freopen( "1.in","r",stdin );
    // freopen( "1.out","w",stdout );
    ios::sync_with_stdio( false );
    cin.tie( nullptr ); cout.tie( nullptr );
    int n=1, q;
    cin>>q;
    string op;
    for( int i=1, x, y;i<=q;i++ )
    {
        cin>>op>>x>>y;
        if( op == "Add" ) rode[x].push_back( { ++n,y } );
        ask[i]={ ( op == "Add" ),x,y };
    }
    dfs1( 1,0 ); dfs2( 1,1 );
    Bit.n=n;
    Bit.add( dfn[1],dis[1] );
    n=1;
    for( int i=1;i<=q;i++ )
    {
        auto [op,x,y]=ask[i];
        if( op ) n++, Bit.add( dfn[n],dis[n] );
        else     cout<<Bit.query( dfn[y],dfn[y]+siz[y]-1,dis[x] )<<"\n";
    }
    QWQ  
}
```

</details>