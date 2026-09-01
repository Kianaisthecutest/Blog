---
title: Tree Distance
date: 2026-05-25
slug: 题解/Atcoder/ABC-451/E-Tree-Distance
tags: [题解, ABC, 最小生成树]
---

{/*truncate*/}

<h5>

首先可以贪心的想到构造最小生成树，这样可以优先满足那些边权要求尽可能小的边

然后在树上跑一遍判断其他边是否满足给的距离条件即可

</h5>

<summary><h3>AC代码</h3></summary>
<details>
	
```cpp
/*
首先可以想到需要构建最小生成树
因为我们可以尽量先满足小的边,否则连了权值大的边后可能会导致权值小的边不合法
然后在这个最小生成树上跑一遍,看一下任意两点间距离是不是满足给出的距离就行 
*/
#include<bits/stdc++.h>
using namespace std;
#define QAQ return 
#define QWQ return 0;
#define ll long long
#define pii pair< int,int >

const int N=3e3+10;

struct Edge
{
	int u, v, w;
	
	bool operator <( const Edge &x )const
	{
		QAQ w < x.w;
	}
	
}edge[N*N];

int fa[N];
inline int get( int x ){ QAQ ( fa[x] == x ? x : fa[x]=get( fa[x] ) ); }
inline void merge( int x,int y ){ fa[y]=x; }

int m;
int dis[N];
int a[N][N];
bool flag;
vector< int > rode[N], son[N];

inline void dfs( int p,int fa )
{
	son[p].push_back( p );
	for( auto x:rode[p] )
	{
		if( x == fa ) continue;
		dis[x]=dis[p]+max( a[p][x],a[x][p] );
		dfs( x,p );
		for( auto p1:son[p] ) for( auto p2:son[x] )
		if( dis[p1]+dis[p2]-2*dis[p] != max( a[p1][p2],a[p2][p1] ) ) flag=true;
		for( auto p2:son[x] ) son[p].push_back( p2 );
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
	for( int i=1;i<=n;i++ )
	{
		fa[i]=i;
		for( int j=i+1;j<=n;j++ ) cin>>a[i][j], edge[++m]={ i,j,a[i][j] };
	}
	sort( edge+1,edge+m+1 );
	int match=0;
	for( int i=1;i<=m;i++ )
	{
		auto &[u,v,w]=edge[i];
		int fu=get( u ), fv=get( v );
		if( fu == fv ) continue;
		merge( fu,fv );
		rode[u].push_back( v );
		rode[v].push_back( u );
		if( ++match == n-1 ) break;
	}
	dfs( 1,0 );
	cout<<( flag ? "No" : "Yes" );
	QWQ	  
}
```

</details>

<h5>

时间复杂度：$O(mlogm+n^2)$，瓶颈在于排序和路径枚举

</h5>