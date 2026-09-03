---
title: Takoyaki and Flip
date: 2026-06-12
slug: 题解/Atcoder/ABC-441/G-Takoyaki-and-Flip
tags: [题解, 线段树]
---

{/*truncate*/}

<h5>

区间反转，区间求最大，区间加，就差把线段树的标签丢你脸上了

直接模拟即可

</h5>

<summary><h3>AC代码</h3></summary>
<details>
	
```cpp
#include<bits/stdc++.h>
using namespace std;
#define QAQ return
#define QWQ return 0;
#define ll long long
#define int long long
#define pii pair< int,int >

const int N=2e5+10;

struct segment_tree
{
	int l, r;
	int up, filp;
	ll maxv, add;
}st[N<<2];

inline void pushup( int p ){ st[p].maxv=max( st[p<<1].maxv,st[p<<1|1].maxv ); st[p].up=st[p<<1].up+st[p<<1|1].up; }

inline void build( int p,int l,int r )
{
	st[p].l=l, st[p].r=r;
	if( l == r ){ st[p].up=1; QAQ; }
	int mid=l+r>>1;
	build( p<<1,l,mid );
	build( p<<1|1,mid+1,r );
	pushup( p );
}

inline void rev( int p ){ st[p].up=st[p].r-st[p].l+1-st[p].up; }

inline void maketag( int p,int x,int op )
{
	if( op == 1 ) if( st[p].up ) st[p].maxv+=x, st[p].add+=x;
	if( op == 2 ) st[p].maxv=0, st[p].filp+=x, rev( p ), st[p].add=0;
}

inline void pushdown( int p )
{
	if( st[p].filp )
	{
		if( st[p].filp&1^1 ) rev( p<<1 ), rev( p<<1|1 );
		maketag( p<<1,st[p].filp,2 );
		maketag( p<<1|1,st[p].filp,2 );
		st[p].filp=0;
	}
	if( st[p].add )
	{
		maketag( p<<1,st[p].add,1 );
		maketag( p<<1|1,st[p].add,1 );
		st[p].add=0;
	}
}

inline void change( int p,int l,int r,int x,int op )
{
	if( l <= st[p].l && st[p].r <= r ){ maketag( p,x,op ); QAQ; }
	pushdown( p );
	int mid=st[p].l+st[p].r>>1;
	if( mid >= l ) change( p<<1,l,r,x,op );
	if( mid <  r ) change( p<<1|1,l,r,x,op );
	pushup( p );
}

inline ll query( int p,int l,int r )
{
	if( l <= st[p].l && st[p].r <= r ) QAQ st[p].maxv;
	pushdown( p );
	int mid=st[p].l+st[p].r>>1;
	ll ans=0;
	if( mid >= l ) ans=max( ans,query( p<<1,l,r ) );
	if( mid <  r ) ans=max( ans,query( p<<1|1,l,r ) );
	QAQ ans; 
}

signed main()
{
//	freopen( "txt.in","r",stdin );
//	freopen( "txt.out","w",stdout );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	int n, q;
	cin>>n>>q;
	build( 1,1,n );
	for( int i=1, op, l, r, x;i<=q;i++ )
	{
		cin>>op>>l>>r;
		if( op == 1 ) cin>>x, change( 1,l,r,x,1 );
		if( op == 2 ) change( 1,l,r,1,2 );
		if( op == 3 ) cout<<query( 1,l,r )<<"\n";
	}
	QWQ
}
```

</details>

<h5>

时间复杂度：$O(nlogn)$

</h5>