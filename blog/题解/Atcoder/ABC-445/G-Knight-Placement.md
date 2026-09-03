---
title: Reconstruct Chocolate
date: 2026-06-14
slug: 题解/Atcoder/ABC-445/G-Knight-Placement
tags: [题解, 二分图, 点集覆盖, Dinic定理]
---

{/*truncate*/}

<h5>

依旧没什么好说的模板，二分图最大匹配+点集覆盖，写个$Dinic$跑遍最大流再根据"最大独立集=所有点-最小点覆盖"就解决了

</h5>

<summary><h3>AC代码</h3></summary>
<details>
	
```cpp
/*
二分图最大匹配的典，跑完随便放一组解就行了 
*/
#include<bits/stdc++.h>
using namespace std;
#define QAQ return
#define QWQ return 0;
#define ll long long
#define pii pair< int,int >
#define pll pair< ll,ll >

const int N=3e2+10, M=2e6+10;
const ll inf=1e16;
const int ix[4]={ 1, 1,-1,-1 };
const int iy[4]={ 1,-1, 1,-1 };

int head[N*N], ver[M], nxt[M], now[N*N], CNT=1;
ll edge[M];
void add( int u,int v,ll w )
{
	ver[++CNT]=v, edge[CNT]=w, nxt[CNT]=head[u], head[u]=CNT;
	ver[++CNT]=u, edge[CNT]=0, nxt[CNT]=head[v], head[v]=CNT;
} 

int n, a, b, s, t;
int d[N*N];
int idx[N][N];
char mp[N][N];
bool vis[N*N], ans[N*N];

inline int val( int x,int y,int a,int b )
{
	if( a&1 && b&1 ) QAQ x&1;
	if( a&1 || b&1 ) QAQ x+y&1;
	QAQ val( x>>1,y>>1,a>>1,b>>1 );
}

inline bool out( int x,int y ){ QAQ ( x < 1 ) || ( x > n ) || ( y < 1 ) || ( y > n ); }

inline void build( int x,int y )
{
	int nx, ny;
	for( int i=1;i<=2;i++ )
	{
		swap( a,b );
		for( int j=0;j<4;j++ )
		{
			nx=x+a*ix[j], ny=y+b*iy[j];
			if( out( nx,ny ) || mp[nx][ny] == '#' ) continue;
			add( idx[x][y],idx[nx][ny],inf );
		}
	}
}

inline void intt(){ for( int i=0;i<=t;i++ ) d[i]=0; }

inline bool bfs()
{
	intt();
	queue< int > q;
	q.push( s ), d[s]=1;
	now[s]=head[s];
	while( !q.empty() )
	{
		auto x=q.front();
		q.pop();
		for( int i=head[x];i;i=nxt[i] ) if( edge[i] && !d[ver[i]] )
		{
			d[ver[i]]=d[x]+1;
			now[ver[i]]=head[ver[i]];
			if( ver[i] == t ) QAQ true;
			q.push( ver[i] );
		}
	}
	QAQ false;
}

inline ll dinic( int x,ll flow )
{
	if( x == t ) return flow;
	ll rest=flow;
	for( int i=now[x];i && rest;i=nxt[i] )
	{
		now[x]=i;
		if( edge[i] && d[ver[i]] == d[x]+1 )
		{
			ll sonflow=dinic( ver[i],min( rest,edge[i] ) );
			if( !sonflow ) d[ver[i]]=0;
			edge[i]-=sonflow;
			edge[i^1]+=sonflow;
			rest-=sonflow;
		}
	}
	QAQ flow-=rest;
}

int main()
{
//	freopen( "txt.in","r",stdin );
//	freopen( "txt.out","w",stdout );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	cin>>n>>a>>b; 
	for( int i=1;i<=n;i++ ) for( int j=1;j<=n;j++ ) cin>>mp[i][j];
	int cnt=0;
	for( int i=1;i<=n;i++ ) for( int j=1;j<=n;j++ ) if( mp[i][j] == '.' ) idx[i][j]=++cnt;
	s=0, t=cnt+1;
	for( int i=1;i<=n;i++ ) for( int j=1;j<=n;j++ ) if( mp[i][j] == '.' )
		if( val( i,j,a,b ) ) add( idx[i][j],t,1 );
		else                 add( s,idx[i][j],1 );
	for( int i=1;i<=n;i++ ) for( int j=1;j<=n;j++ ) if( mp[i][j] == '.' && !val( i,j,a,b ) ) build( i,j );
	ll maxflow=0, flow;
	while( bfs() ) while( flow=dinic( s,inf ) ) maxflow+=flow;
	queue< int > q;
	vis[s]=true;
	q.push( s );
	while( !q.empty() )
	{
		int x=q.front();
		q.pop();
		for( int i=head[x];i;i=nxt[i] ) if( edge[i] && !vis[ver[i]] ) vis[ver[i]]=true, q.push( ver[i] );
	}
	for( int i=1;i<=n;i++ ) for( int j=1;j<=n;j++ ) if( mp[i][j] == '.' )
		if( val( i,j,a,b ) ){ if( vis[idx[i][j]] )  ans[idx[i][j]]=true; }
		else                { if( !vis[idx[i][j]] ) ans[idx[i][j]]=true; }
	for( int i=1;i<=n;i++ )
	{
		for( int j=1;j<=n;j++ )
			if( mp[i][j] == '.' && !ans[idx[i][j]] ) cout<<"o";
			else                                     cout<<mp[i][j];
		cout<<"\n";
	}
	QWQ
}
```

</details>

<h5>

时间复杂度：$O(E\times \sqrt V)O(n\times n\times \sqrt{n\times n})=O(n^3)$

</h5>