---
title: Go
date: 2026-09-02
slug: 题解/COCI/2017-2018-C/C-Go
tags: [题解, COCI, 动态规划, 区间DP]
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

感觉这种题算是一个$Trick$了，我真的找不到什么可以流畅的思维来转化这个写法

首先我们可以想到我们访问的部分是一个连续的区间，因为我们到了一个点无论如何访问一次不会更劣

然后如果你做过题目"关路灯"可能就可以将这个状态设计出来了

首先，我们访问是一个区间且每次区间扩展后我们一定在左右端点上，所以我们不妨将状态设计为这个

设计$f_{i,j,k,0/1}$为时间是$i$时访问区间为$[j,k]$并且在左/右端点时的最大答案

那我们就分讨四种可能(左/右端点上->左/右边的新点)直接暴力DP就可以了

时间复杂度：$O(MAXTm^2)$

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

const int N=2e3+10, M=1e2+10;

int f[N][M][M][2];
bool vis[N];

struct STATE
{
	int idx, w, t;

    bool operator< ( const STATE &x )const
    { QAQ idx < x.idx; }

}loc[M];

int main()
{
    // freopen( "txt.in","r",stdin );
    // freopen( "txt.out","w",stdout );
    ios::sync_with_stdio( false );
    cin.tie( nullptr ); cout.tie( nullptr );
    int n, k, m;
    cin>>n>>k>>m;
    for( int i=1, a, b, t;i<=m;i++ )
        cin>>a>>b>>t,
        loc[i]={ a,b,t }, vis[a]=true;
    if( !vis[k] ) loc[++m]={ k,0,0 };
    sort( loc+1,loc+m+1 );
    int s=0;
	for( int i=1;i<=m;i++ ) if( loc[i].idx == k ) s=i;
	memset( f,0xcf,sizeof f );
	f[0][s][s][0]=f[0][s][s][1]=loc[s].w;
    int ans=0;
    int maxt=0;
    for( int i=1;i<=m;i++ ) maxt=max( maxt,loc[i].t );
	for( int t=1;t<=maxt;t++ ) for( int len=1;len<=m;len++ ) for( int l=1, r=l+len-1;r<=m;l++, r++ )
    {
        int t1=t-abs( loc[l+1].idx-loc[l].idx ),
            t2=t-abs( loc[r].idx-  loc[l].idx ),
            t3=t-abs( loc[r].idx-  loc[r-1].idx );
        if( t1 >= 0 ) f[t][l][r][0]=max( f[t][l][r][0],f[t1][l+1][r][0]+loc[l].w*( loc[l].t > t ) );
        if( t2 >= 0 ) f[t][l][r][0]=max( f[t][l][r][0],f[t2][l+1][r][1]+loc[l].w*( loc[l].t > t ) );
        if( t2 >= 0 ) f[t][l][r][1]=max( f[t][l][r][1],f[t2][l][r-1][0]+loc[r].w*( loc[r].t > t ) );
        if( t3 >= 0 ) f[t][l][r][1]=max( f[t][l][r][1],f[t3][l][r-1][1]+loc[r].w*( loc[r].t > t ) );
        ans=max( { ans,f[t][l][r][1],f[t][l][r][0] } );
	}
    cout<<ans;
    QWQ
}
```

</details>