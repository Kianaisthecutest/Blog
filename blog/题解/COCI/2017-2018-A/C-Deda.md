---
title: Deda
date: 2026-08-31
slug: 题解/COCI/2017-2018-A/C-Deda
tags: [题解, COCI, 线段树, 二分]
---

{/*truncate*/}

## [COCI 2017/2018 #1] Deda
<details>
<summary>题干</summary>

<h2>题目描述</h2>

<h3>题面描述</h3>
小马里卡正在创作一个奇妙的童话故事。她一边编故事，一边讲给她的爷爷听。爷爷可高兴了，于是问了她一些有趣的问题。

在小马里卡的故事中，有 $N$ 个年龄分别为 $1$~$N$ 岁的孩子（最小的为 $1$ 岁，最大的为 $N$ 岁）。有一天，她们一起乘火车出去旅行。铁路线上有好多个车站，分别以 $0, 1, 2, 3 \dots$ 编号。其中第 $0$ 站为始发站，火车每到一个车站都会停下来逗留一段时间。每个孩子都可以在选择自己喜欢的车站下车。

小马里卡喜欢这样讲述她的故事：“在第 $X$ 站，年龄为 $A$ 岁的孩子下车了。”不过小马里卡的习惯非常不好，她讲述故事的顺序是完全随机的。换句话说，$X$ 是不单调的。爷爷知道小马里卡的坏习惯，所以他喜欢时不时问一些有趣的问题来找小马里的麻烦。问题是这样的：“年龄大于等于 $B$ 且在第 $Y$ 站（包含第 $Y$ 站）以前下车的最年轻的小孩是多大？”

小马里卡必须正确回答爷爷的问题，否则爷爷会因生气而睡觉。值得注意的是，小马里卡的答案必须在当时是正确的。虽然小马里卡在随后的讲述中可能会改变问题的答案，但这都是无关紧要的。

小马里卡对自己的坏习惯十分无奈。由于故事的顺序过于杂乱，小马里卡根本无法正确回答爷爷的问题。于是她找到了聪明的你。请帮小马里卡编写一个程序，动态追踪她的讲述，并回答爷爷的问题。

<h2>输入格式</h2>

输入的第一行包含两个正整数 $N,Q\ (2 \le N,Q \le 2 \times 10^{5})$，分别代表孩子的数量和语句的数量。

接下来 $Q$ 行，每行一个语句。语句的格式为 `M X A` 或 `D Y B`，分别代表小马里卡的讲述和爷爷的问题。其中 `M`、`D` 为大写字母，$X$、$Y$、$A$、$B$ $(1 \le X,Y \le 10^{9},1 \le A,B \le N)$ 分别为一个正整数。其意义请见【题面描述】。题目中保证至少有一个 `D`。

<h2>输出格式</h2>

对于每一个问题 `D` 输出一个答案。答案为一个整数。如果爷爷的问题无解，请输出 `-1`。

<h2>输入输出样例 #1</h2>

<h3>输入 #1</h3>

```
3 4
M 10 3
M 5 1
D 20 2
D 5 1

```

<h3>输出 #1</h3>

```
3
1

```

<h2>输入输出样例 #2</h2>

<h3>输入 #2</h3>

```
10 10
M 20 10
D 1 9
M 2 3
D 17 10
M 20 2
D 8 2
M 40 1
D 25 2
M 33 9
D 37 9

```

<h3>输出 #2</h3>

```
-1
-1
3
2
9
```

</details>

***

## 分析

<h5>

这个其实可以抽象成一个二维偏序的问题

首先因为年龄并不是很大，所以可以一次降维把这个当成线段树的下标，那么站点就是记录的值

那么我们的查询操作就是在区间$\lbrack B,n\rbrack$中找到满足值小于$Y$的最小下标

那这个就是一个一眼线段树二分的题目了

线段树记录一下区间的最小值，在满足的区间内寻找最左的(尽量走左子树，即$p<<1$)的满足的下标即可

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

const int N=2e5+10, inf=1e9;

struct segment_tree
{
    int l, r;
    int minv;
}st[N<<4];

inline void pushup( int p )
{ st[p].minv=min( st[p<<1].minv,st[p<<1|1].minv ); }

inline void build( int p,int l,int r )
{
    st[p].l=l, st[p].r=r;
    if( l == r )
    { st[p].minv=st[p<<1].minv=st[p<<1|1].minv=inf; QAQ; }
    int mid=l+r>>1;
    build( p<<1,l,mid );
    build( p<<1|1,mid+1,r );
    pushup( p );
}

inline void change( int p,int l,int r,int x )
{
    if( l <= st[p].l && st[p].r <= r )
    { st[p].minv=x; QAQ; }
    int mid=st[p].l+st[p].r>>1;
    if( mid >= l ) change( p<<1,l,r,x );
    if( mid <  r ) change( p<<1|1,l,r,x );
    pushup( p );
}

int ans;

inline int query( int p,int l,int r,int x )
{
    if( st[p].l == st[p].r && st[p].minv <= x ) QAQ st[p].l; 
    int ans=inf;
    if( st[p].l >= l && st[p].r <= r )
    {
        if( st[p<<1].minv <= x )        ans=query( p<<1,l,r,x );
		else if( st[p<<1|1].minv <= x ) ans=query( p<<1|1,l,r,x );
    }
    else
    {
		if( st[p<<1].r >= l )   ans=query( p<<1,l,r,x );
		if( st[p<<1|1].l <= r ) ans=min( ans,query( p<<1|1,l,r,x ) );
    }
	QAQ ans;
}

int main()
{
    // freopen( "1.in","r",stdin );
    // freopen( "1.out","w",stdout );
    ios::sync_with_stdio( false );
    cin.tie( nullptr ); cout.tie( nullptr );
    int n, q;
    cin>>n>>q;
    build( 1,1,n );
    char op;
    for( int i=1, x, y, ans;i<=q;i++ )
    {
        cin>>op>>x>>y;
        if( op == 'M' ) change( 1,y,y,x );
        else            ans=query( 1,y,n,x ), cout<<( ans == inf ? -1 : ans )<<"\n";
    }
    QWQ
}
```

</details>