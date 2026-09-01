---
title: Sum of Mex
date: 2026-05-31
slug: 题解/Atcoder/ABC-438/F-Sum-of-Mex
tags: [题解, ABC, 数学, 树形DP]
---

{/*truncate*/}

<summary><h3>AC代码</h3></summary>
<details>
	
```c++
#include<bits/stdc++.h>
using namespace std;
#define QAQ return 
#define QWQ return 0;
#define ll long long
#define pii pair< int,int >

const int N=2e5+10;

int head[N], ver[N<<1], nxt[N<<1], CNT;
inline void add( int x,int y )
{
	ver[++CNT]=y, nxt[CNT]=head[x], head[x]=CNT;
	ver[++CNT]=x, nxt[CNT]=head[y], head[y]=CNT;
}

int fa[N], siz[N];
bool vis[N];
ll ans=0;

inline void dfs( int x )
{
	siz[x]=1;
	for( int i=head[x];i;i=nxt[i] )
	{
		if( ver[i] == fa[x] ) continue;
		fa[ver[i]]=x;
		dfs( ver[i] );
		siz[x]+=siz[ver[i]];
		if( x == 0 ) ans-=1ll*siz[ver[i]]*( siz[ver[i]]+1 )/2;
	}
}

int main()
{
//	freopen( "txt.in","r",stdin );
//	freopen( "txt.out","w",stdout );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	int n;
	cin>>n;
	for( int i=1, u, v;i<n;i++ ) cin>>u>>v, add( u,v );
	ans=1ll*n*( n+1 )/2;
	fa[0]=-1;
	dfs( 0 );
	vis[0]=true;
	int x, y, u=0, v=0;
	ll cnt;
	for( int i=1;i<n;i++ )
	if( vis[i] ) ans+=cnt;
	else
	{
		cnt=0;
		x=i, y=fa[i];
		vis[i]=true;
		while( !vis[y] ) vis[y]=true, y=fa[y], x=fa[x];
		if( y != u && y != v ) break;
		else if( y == u )      u=i;
		else                   v=i;
		if( y == 0 ) siz[y]-=siz[x];
		cnt=1ll*siz[u]*siz[v];
		ans+=cnt;
	}	
	cout<<ans<<"\n";
	QWQ	  
}
```

</details>