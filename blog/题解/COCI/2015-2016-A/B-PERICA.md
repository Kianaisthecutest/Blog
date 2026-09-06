---
title: PERICA
date: 2026-09-04
slug: 题解/COCI/2015-2016-A/B-PERICA
tags: [题解, COCI, 组合数学]
---

{/*truncate*/}

## [COCI 2015/2016 #5] PERICA
<details>
<summary>题干</summary>

<h2>题目描述</h2>

给定一个长度为 $N$ 的序列 $a_1,a_2,\dots,a_N$。

请你求出所有 $K$ 个数的组合中最大数之和 $\bmod\ 10^9+7$ 的结果。

<h2>输入格式</h2>

输入第一行两个整数 $N,K$。

第二行一个长度为 $N$ 的序列 $a_1,a_2,\dots, a_N$。

<h2>输出格式</h2>

输出一行一个整数，为所有 $K$ 个数的组合中最大数之和 $\bmod\ 10^9+7$ 的结果。

<h2>输入输出样例 #1</h2>

<h3>输入 #1</h3>

```
5 3
2 4 2 3 4
```

<h3>输出 #1</h3>

```
39
```

<h2>输入输出样例 #2</h2>

<h3>输入 #2</h3>

```
5 1
1 0 1 1 1
```

<h3>输出 #2</h3>

```
4
```

<h2>输入输出样例 #3</h2>

<h3>输入 #3</h3>

```
5 2
3 3 4 0 0
```

<h3>输出 #3</h3>

```
31
```

<h2>说明/提示</h2>

<h4>样例解释</h4>

<h5>样例 $1$</h5>

所有的 $K$ 个数的组合为：$[2, 4, 2], [2, 4, 3], [2, 4, 4], [2, 2, 3], [2, 2, 4], [2, 3,
4], [4, 2, 3], [4, 2, 4], [4, 3, 4], [2, 3, 4]$。

<h4>数据规模与约定</h4>

对于 $40\%$ 的数据，$N\le 10^3$；  
对于 $100\%$ 的数据，$1\le N\le 10^5$，$1\le K\le 50$。

<h4>说明</h4>

**题目译自 [COCI2015-2016](https://hsin.hr/coci/archive/2015_2016/) [CONTEST #5](https://hsin.hr/coci/archive/2015_2016/contest5_tasks.pdf) *T3 PERICA***。

</details>

***

## 分析

<h5>

首先像这种题我们可以考虑每个数作为最大数可以怎么出现

我们直接排序后顺序跑一遍就行了

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

const int N=5e5+10, mod=1e9+7;

int a[N], vis[N], reala[N];

ll jc[N];

inline ll quick_power( ll a,ll b )
{
    ll ans=1, base=a;
    while( b )
    {
        if( b&1 ) ( ans*=base )%=mod;
        ( base*=base )%=mod; b>>=1;
    }
    QAQ ans;
}

inline ll C( int n,int m )
{   if( n < m ) QAQ 0ll;
    QAQ jc[n]*quick_power( jc[m]*jc[n-m]%mod,mod-2 )%mod; }

vector< int > uni;
inline int get( int x )
{ QAQ lower_bound( uni.begin(),uni.end(),x )-uni.begin()+1; }

int main()
{
    // freopen( "1.in","r",stdin );
    // freopen( "1.out","w",stdout );
    ios::sync_with_stdio( false );
    cin.tie( nullptr ); cout.tie( nullptr );
    int n, k;
    cin>>n>>k;
    jc[0]=1;
    for( int i=1;i<=n;i++ )
        cin>>a[i],
        uni.push_back( a[i] ), jc[i]=jc[i-1]*i%mod;
    sort( uni.begin(),uni.end() );
    uni.erase( unique( uni.begin(),uni.end() ),uni.end() );
    int m=uni.size();
    for( int i=1;i<=n;i++ )
    {   int newa=get( a[i] );
        vis[newa]++; reala[newa]=a[i]; }
    ll ans=0, sum=0;
    for( int i=1;i<=m;i++ )
    {
        for( int j=1;j<=vis[i];j++ ) ( ans+=1ll*C( sum,k-j )*C( vis[i],j )%mod*reala[i]%mod )%=mod;
        ( sum+=vis[i] )%=mod;
    }
    cout<<ans;
    QWQ
}
```

</details>