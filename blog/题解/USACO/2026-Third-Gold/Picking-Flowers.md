---
title: Picking Flowers
date: 2026-03-04
slug: 题解/USACO/2026-Third-Gold/Picking-Flowers
tags: [题解, 动态规划, 分层图]
---

{/*truncate*/}

<h4>

首先关注限制"不存在从农场$1$到农场$x$的更短路径"，保证一定走的是最短路

所以对于每个点，我们走到它的距离肯定是确定的，从另一个方面想，这张图是分层的

又因为每轮是增加一个临时花点，于是转化为寻找是否存在两条合法路径一是从$1$到该点，二是从任一终点到该点，两条路因为分层的原因肯定无交

所以我们容易想到，如果存在一层有多个花点是肯定无解的，我们不能同时走到两个花点上

如果只有一个花点则只能走这个花点，如果没有就可以任意走这层上的点了

分层后正反两次$DP$求路径合法性即可，时间复杂度$O(tn)$

</h4>

```cpp
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

int d[N], flw[N];
bool f[N], g[N];
vector< int > layer[N];

inline void bfs()//分层
{
	queue< int > q;
	q.push( 1 ), d[1]=1;
	while( !q.empty() )
	{
		int x=q.front();
		q.pop();
		layer[d[x]].push_back( x );
		for( int i=head[x];i;i=nxt[i] ) if( !d[ver[i]] ) d[ver[i]]=d[x]+1, q.push( ver[i] );
	}
}

inline void sovel()
{
	int n, m, k, l;
	cin>>n>>m>>k>>l;
	CNT=0;
	for( int i=1;i<=n;i++ ) head[i]=d[i]=flw[i]=0, f[i]=g[i]=false, layer[i].clear();
	vector< int > isf, ise;
	for( int i=1, x;i<=k;i++ ) cin>>x, isf.push_back( x );
	for( int i=1, x;i<=l;i++ ) cin>>x, ise.push_back( x );
	for( int i=1, x, y;i<=m;i++ ) cin>>x>>y, add( x,y );
	bfs();
	int maxd=0;
	for( auto &x:isf )//观察有没有同一层的花点，如果有肯定无解
	{
		if( flw[d[x]] )
		{
			for( int i=1;i<n;i++ ) cout<<0;
			cout<<"\n";
			QAQ;
		}
		maxd=max( maxd,d[x] );//记录层数最深的花点
		flw[d[x]]=x;//记录每层的花点，途径该层时只能走这个点
	}
	for( auto &x:ise )
	{
		if( d[x] > maxd ) f[x]=true;//比最深花点还深，可以走完花点后再走过来
		if( d[x] == maxd && flw[d[x]] ) f[x]=true;//和花点同层且不是无花点的情况
	}
	for( int lay=n-1;lay>=1;lay-- ) for( auto &x:layer[lay] ) for( int i=head[x];i;i=nxt[i] )//遍历层
		if( flw[lay+1] )//如果该层有花点
		{ if( ver[i] == flw[lay+1] ) f[x]|=f[ver[i]]; }//只能走花点
		else
		{ if( d[ver[i]] == d[x]+1 ) f[x]|=f[ver[i]]; }//走任意一条通往下一层的路径即可
	g[1]=true;
	for( int lay=1;lay<n;lay++ ) for( auto &x:layer[lay] ) for( int i=head[x];i;i=nxt[i] )//反向跑一遍
		if( flw[lay+1] )
		{ if( ver[i] == flw[lay+1] ) g[ver[i]]|=g[x]; }
		else
		{ if( d[ver[i]] == d[x]+1 ) g[ver[i]]|=g[x]; }
	for( int i=2;i<=n;i++ ) cout<<( f[i]&g[i] ? 1 : 0 );//起点可以到这个点且存在终点可以到这个点就有解
	cout<<"\n";
}

int main()
{
//	freopen( "txt.in","r",stdin );
//	freopen( "txt.out","w",stdout );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	int t;
	for( cin>>t;t;t-- ) sovel();
	QWQ	 
}
```
