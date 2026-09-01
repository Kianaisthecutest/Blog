---
title: Second Gap
date: 2026-05-15
slug: 题解/Atcoder/ABC-457/F-Second-Gap
tags: [题解, ABC, 动态规划, 线段树]
---

{/*truncate*/}

<h5>

首先设定一个数组$Q$对应每一个排列$P$，$Q_i$指这个数在$P_i$~$P_n$中$P_i$的排名

我们可以发现每个数组$Q$可以唯一重构一个排列$P$，这个证明有点复杂，可以看[这里](https://mp.weixin.qq.com/s/tTREsOODF1GO9JKhvccT1Q)

然后再根据后缀最大值的出现位置，即$Q_i=1$的位置考虑哪些数组$Q$对应的排列$P$合法

<span>&lt;1&gt;</span>如果$Q_i=1$，则$P_i$是后缀最大值，所以后缀次大值就是$P_{i+d_i}$，所以需要令$Q_{i+1},Q_{i+2}...,Q{i+d_i-1}\gt Q_{i+d_i}=1$

<span>&lt;2&gt;</span>如果$Q_i=2$，则$P_i$是后缀次大值，所以后缀最大值就是$P_{i+d_i}$，所以需要令$Q_{i+1},Q_{i+2}...,Q{i+d_i-1}\gt Q_{i+d_i}=1$

<span>&lt;3&gt;</span>如果$Q_i\neq 1,2$，则$P_i$的加入并不会影响最大值或次大值的位置，则满足$d_i=d_{i+1}$，此时$Q_i$可以是$3,4,...n-i+1$中任意选择

我们记$f_{i,j}$是满足："确定了$Q_i,Q_{i+1}...Q_{n}$后，$j$满足$Q_j=1$中下标的最小值"这个状态的方案数

所以容易根据上述情况转移

<span>&lt;1&gt;</span>$f_{i,i}=f_{i+1,i+d_i}$

<span>&lt;2&gt;</span>$f_{i,i+d_i}=f_{i+1,i+d_i}$

<span>&lt;3&gt;</span>若$d_i=d_{i+1}$，$f_{i,j}=f_{i+1,j}\times ( n-i-1 )$

暴力转移为$O(n^2)$，考虑滚动数组为$g_i$且先处理操作$3$，则我们的操作就可以转化为

<span>&lt;1&gt;</span>记录$val=g_{i+d_i}=f_{i,i+d_i}$

<span>&lt;2&gt;</span>将整个数组$g$乘上$(n-i+1)$(操作3)

<span>&lt;3&gt;</span>将两点$g_i$和$g_{i+d_i}$加上$val$(操作1，2)

单点查询+全局乘法+单点修改，套线段树即可

</h5>

<summary><h3>AC代码</h3></summary>
<details>
	
```cpp
#include<bits/stdc++.h>
using namespace std;
#define QAQ return 
#define QWQ return 0;
#define ll long long
#define pii pair< int,int >

const int N=2e5+10, mod=998244353;

struct segment_tree
{
	int l, r;
	ll val, tag;
	
	inline segment_tree(){ val=0, tag=1; }
	
}st[2][N<<2];

inline void build( int p,int x,int l,int r )
{
	st[p][x].l=l,st[p][x].r=r;
	if( l == r ) QAQ ;
	int mid=l+r>>1;
	build( p,x<<1,l,mid );
	build( p,x<<1|1,mid+1,r );
}

inline void maketag( int p,int x,ll v ){ ( st[p][x].val*=v )%=mod; ( st[p][x].tag*=v )%=mod; }

inline void pushdown( int p,int x )
{
	if( st[p][x].tag != 1 )
	{
		maketag( p,x<<1,st[p][x].tag );
		maketag( p,x<<1|1,st[p][x].tag );
		st[p][x].tag=1;
	}
}

inline void change( int p,int x,int pos,ll v )
{
	if( st[p][x].l == st[p][x].r ){ ( st[p][x].val+=v )%=mod; QAQ ; }
	pushdown( p,x );
	int mid=st[p][x].l+st[p][x].r>>1;
	if( mid >= pos ) change( p,x<<1,pos,v );
	else             change( p,x<<1|1,pos,v );
}

inline ll query( int p,int x,int pos )
{
	if( st[p][x].l == st[p][x].r ){ QAQ st[p][x].val; }
	pushdown( p,x );
	int mid=st[p][x].l+st[p][x].r>>1;
	if( mid >= pos ) QAQ query( p,x<<1,pos );
	else             QAQ query( p,x<<1|1,pos );
}

ll d[N];

int main()
{
//	freopen( "txt.in","r",stdin );
//	freopen( "txt.out","w",stdout );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	int n;
	cin>>n;
	for( int i=1;i<n;i++ ) cin>>d[i];
	if( d[n-1] != 1 ){ cout<<0; QWQ; }
	build( 0,1,1,n ); build( 1,1,1,n );
	change( 0,1,n,1 ); change( 1,1,n-1,1 );
	for( int i=n-1;i>=2;i-- )
	{
		ll val1=0, val2=0, val3=0;
		int pos=d[i-1]+i-1;
		if( pos <= n )
			val2=query( 0,1,pos ), val3=query( 1,1,pos ),
			val1=( val2+val3 )%mod;
		if( d[i] == d[i-1] ) ( st[0][1].tag*=( n-i ) )%=mod, ( st[1][1].tag*=( n-i ) )%=mod;
		else                 st[0][1].tag=st[1][1].tag=0;
		if( pos <= n )
			change( 0,1,pos,val1 ),
			change( 1,1,i-1,val2+val3 );
	}
	ll ans=0;
	for( int i=1;i<=n;i++ ) ( ans+=query( 0,1,i )+query( 1,1,i ) )%=mod;
	cout<<ans;
	QWQ	 
}
```
</details>

<h5>

时间复杂度：$O(nlogn)$，瓶颈在于线段树，但是据说是可以使用区间乘记录的方式优化到$O(n)$

</h5>