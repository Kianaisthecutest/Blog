---
title: Copy Query
date: 2026-05-17
slug: 题解/Atcoder/ABC-453/G-Copy-Query
tags: [题解, ABC, 可持久化线段树]
---

{/*truncate*/}

<h5>

考场上没看，没想到就是一个可持久化线段树的模板题

首先是单点修改和区间求和，所以可以想到写线段树这个东西

又因为是整个序列的覆盖，将每个根算作一个序列就可以实现整个$O(1)$的区间覆盖操作

所以就是模板主席树了，QAQ为什么我考场上没看

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

const int N=2e5+10;

int root[N];

struct segment_tree
{
    ll sum[N<<5];
	int ls[N<<5], rs[N<<5];
    int cnt;
    
    inline int new_node( int x )
    {
    	int p=++cnt;
    	sum[p]=sum[x];
        ls[p]=ls[x];
        rs[p]=rs[x];
        return p;
	}
	
	inline void pushup( int p ){ sum[p]=sum[ls[p]]+sum[rs[p]]; }
	
	inline int build( int l,int r )
	{
		int p=++cnt;
		if( l == r )
		{
			sum[p]=root[l];
			return p;
		}
		int mid=l+r>>1;
		ls[p]=build( l,mid );
		rs[p]=build( mid+1,r );
		pushup( p );
	}
	
	inline int change( int p,int l,int r,int pos,int x )
	{
		p=new_node( p );
		if( l == pos && r == pos )
		{
			sum[p]=x;
			return p;
		}
		int mid=l+r>>1;
		if( mid >= pos ) ls[p]=change( ls[p],l,mid,pos,x );
		else             rs[p]=change( rs[p],mid+1,r,pos,x );
		pushup( p );
		return p;
	}
	
	inline ll query( int p,int l,int r,int nl,int nr )
	{
		if( nl <= l && r <= nr ) return sum[p];
		int mid=l+r>>1;
		ll ans=0;
		if( mid >= nl ) ans+=query( ls[p],l,mid,nl,nr );
		if( mid <  nr ) ans+=query( rs[p],mid+1,r,nl,nr );
		return ans;
	}
	
}tree;

int main()
{
//	freopen( "txt.in","r",stdin );
//	freopen( "txt.out","w",stdout );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	int n, m, q;
	cin>>n>>m>>q;
	for( int i=1, op, x, y, z;i<=q;i++ )
	{
		cin>>op>>x>>y;
		if( op == 1 )      root[x]=root[y];
		else if( op == 2 ) cin>>z, root[x]=tree.change( root[x],1,m,y,z );
		else               cin>>z, cout<<tree.query( root[x],1,m,y,z )<<"\n"; 
	}
	QWQ	 
}
```

</details>

<h5>

时间复杂度：$O(nlogn)$，瓶颈在于主席树

</h5>


