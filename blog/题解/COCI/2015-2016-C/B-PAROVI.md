---
title: PAROVI
date: 2026-09-07
slug: 题解/COCI/2015-2016-C/B-PAROVI
tags: [题解, COCI, 容斥定理]
---

{/*truncate*/}

## [COCI 2015/2016 #6] PAROVI
<details>
<summary>题干</summary>

<h2>题目描述</h2>

$\text{Mirko}$ 和 $\text{Slavko}$ 在玩一个游戏，先由 $\text{Mirko}$ 在 $1\dots N$ 中选出几组互质的数（不能不选，且每组中的数不得相同）。例如当 $N=5$ 时，$\text{Mirko}$ 可以选择 $\big\{\{1,2\},\{3,4\},\{2,5\},\{3,5\},\cdots\big\}$ 中的几组。

然后轮到 $\text{Slavko}$。他需要找到一个 $x\in \big[2,N\big]$ 使得对于每组 $\{a,b\}$ 都满足以下两个条件之一：

- $a$，$b<x$

- $a$，$b\ge x$

例如，如果 $\text{Mirko}$ 选了 $\big\{\{1,2\},\{3,4\}\big\}$，那么 $x$ 可以等于 $3$。

如果 $\text{Slavko}$ 找不到满足条件的 $x$ 值，则表示 $\text{Mirko}$ 获得胜利。现在请你求出 $\text{Mirko}$ 获胜的不同情况的总数，在对 $10^9$ 取模后告诉他。

<h2>输入格式</h2>

第一行包含一个整数 $N$。

<h2>输出格式</h2>

第一行输出一个整数，为 $\text{Mirko}$ 获胜的不同情况的总数对 $10^9$ 取模后的值。

<h2>输入输出样例 #1</h2>

<h3>输入 #1</h3>

```
2
```

<h3>输出 #1</h3>

```
1
```

<h2>输入输出样例 #2</h2>

<h3>输入 #2</h3>

```
3
```

<h3>输出 #2</h3>

```
5
```

<h2>输入输出样例 #3</h2>

<h3>输入 #3</h3>

```
4
```

<h3>输出 #3</h3>

```
21
```

<h2>说明/提示</h2>

**【样例 1 解释】**

$\text{Slavko}$ 只有一种取法 $\big\{\{1,2\}\big\}$。

**【样例 2 解释】**

$\text{Slavko}$ 的其中一种取法为 $\big\{\{1,2\},\{1,3\}\big\}$。

**【数据范围】**

对于 $100\%$ 的数据，$1\le N\le 20$。

**【题目来源】**

**题目译自 [COCI 2015-2016](https://hsin.hr/coci/archive/2015_2016/) [CONTEST #6](https://hsin.hr/coci/archive/2015_2016/contest6_tasks.pdf) T4 PAROVI**。

**本题分值按 COCI 原题设置，满分 $120$**。

</details>

***

## 分析

<h5>

首先我会想正难则反，求补集转化一下这个问题

如果把这个放到区间上来看，那么就是我们存在一个点$x$，$\forall [l,r]\ l>=x\ or\ r<x$

就是以$x$为分界，没有跨界的区间，那么我们可以想到枚举以哪些点为分界然后容斥

时间复杂度：$O(2^nn^2)$，但是$O(n^2)$是理论互斥数对数量完全跑不到那个地步

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

const int N=4e2+10, mod=1e9;

int l[N], r[N];
int vis[N], pow2[N];

int main()
{
    // freopen( "txt.in","r",stdin );
    // freopen( "txt.out","w",stdout );
    ios::sync_with_stdio( false );
    cin.tie( nullptr ); cout.tie( nullptr );
    int n, m=0;
    cin>>n;
    for( int i=1;i<=n;i++ ) for( int j=1;j<i;j++ ) if( __gcd( i,j ) == 1 )
        l[++m]=i, r[m]=j;
    pow2[0]=1;
    for( int i=1;i<=m;i++ ) pow2[i]=pow2[i-1]*2%mod;
    int ans=pow2[m];
    for( int state=1;state<( 1<<n );state++ ) if( state&1^1 )
    {
        int cnt=0, sum=0;
        for( int bit=2;bit<=n;bit++ )
            vis[bit]=( ( state>>bit-1 )&1 ), cnt+=vis[bit],
            vis[bit]+=vis[bit-1];
        for( int i=1;i<=m;i++ ) sum+=( vis[r[i]]-vis[l[i]] == 0 );
		if( cnt&1 ) ( ans-=pow2[sum] )%=mod;
        else        ( ans+=pow2[sum] )%=mod;
    }
    cout<<( ans+mod )%mod; 
    QWQ
}
```

</details>