---
title: Merge Slimes 2
date: 2026-05-04
slug: 题解/Atcoder/ABC-455/F-Merge-Slimes-2
tags: [题解, ABC, 数学, 线段树]
---

{/*truncate*/}

<h5>

首先就是我考场上一直理解错误的一个点，区间的积的求法固定：

我们可以发现，因为我们是求和但是答案贡献是作积，所以这个式子最后其实等价与对每个其他数都乘一遍

对这些几个式子求和，考虑对每个式子加上自己乘自己，就等价于区间和的平方，而这样处理的结果就是答案需要减去区间的平方和

利用线段树维护即可，这里讲解一下区间的平方和如何维护

假设原本的区间和是$sum1$，区间平方和是$sum2$，区间长度是$len$，加上的数是$x$

老样子将所有项的$x$提出来，化简就可以得到我们后来的答案是$sum2+2*x*sum1+x*x*len$(可以自行利用完全平方公式化简验证)

直接套式子维护线段树即可

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
#define pll pair< ll,ll >

const int N=1e5+10, mod=998244353;

struct segment_tree
{
	int l, r;
	ll sum1, sum2;//sum1是区间和，sum2是区间平方和 
	ll tag;
}st[N<<2];

inline void build( int p,int l,int r )
{
	st[p].l=l, st[p].r=r;
	if( l == r ) QAQ;
	int mid=l+r>>1;
	build( p<<1,l,mid );
	build( p<<1|1,mid+1,r );
}

inline void pushup( int p ){ st[p].sum1=( st[p<<1].sum1+st[p<<1|1].sum1 )%mod; st[p].sum2=( st[p<<1].sum2+st[p<<1|1].sum2 )%mod; }

inline void maketag( int p,ll x ){ ( st[p].tag+=x )%=mod; ( st[p].sum2+=2ll*x%mod*st[p].sum1%mod+x*x%mod*( st[p].r-st[p].l+1 )%mod )%=mod; ( st[p].sum1+=1ll*( st[p].r-st[p].l+1 )*x )%=mod; }

inline void pushdown( int p )
{
	if( st[p].tag )
	{
		maketag( p<<1,st[p].tag );
		maketag( p<<1|1,st[p].tag );
		st[p].tag=0;
	}
}

inline void change( int p,int l,int r,ll x )
{
	if( l <= st[p].l && st[p].r <= r ){ maketag( p,x ); QAQ; }
	pushdown( p );
	int mid=st[p].l+st[p].r>>1;
	if( mid >= l ) change( p<<1,l,r,x );
	if( mid <  r ) change( p<<1|1,l,r,x );
	pushup( p );
}

pll operator+ ( const pll &a,const pll &b )
{
	QAQ { ( a.first+b.first )%mod,( a.second+b.second )%mod };
}

inline pll query( int p,int l,int r )
{
	if( l <= st[p].l && st[p].r <= r ) QAQ { st[p].sum1,st[p].sum2 };
	pushdown( p );
	int mid=st[p].l+st[p].r>>1;
	pll ans={ 0,0 };
	if( mid >= l ) ans=ans+query( p<<1,l,r );
	if( mid <  r ) ans=ans+query( p<<1|1,l,r );
	QAQ ans;
}

inline ll quick_power( ll a,ll b )
{
	ll ans=1, base=a;
	while( b )
	{
		if( b&1 ) ( ans*=base )%=mod;
		( base*=base )%=mod, b>>=1;
	}
	QAQ ans; 
}

int main()
{
//	freopen( "txt.in","r",stdin );
//	freopen( "txt.out","w",stdout );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	int n, q;
	cin>>n>>q;
	build( 1,1,n );
	for( int i=1, l, r, x;i<=q;i++ )
	{
		cin>>l>>r>>x;
		change( 1,l,r,x );
		auto [sum1,sum2]=query( 1,l,r );
		cout<<( ( sum1*sum1%mod-sum2 )*quick_power( 2,mod-2 )%mod+mod )%mod<<"\n";
	}
	QWQ;
}
```

</details>

<h5>

时间复杂度：$O(qlogn)$，瓶颈在于线段树的使用

</h5>
