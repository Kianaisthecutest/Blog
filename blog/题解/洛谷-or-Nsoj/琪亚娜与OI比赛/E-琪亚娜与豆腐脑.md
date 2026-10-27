---
title: 琪亚娜与豆腐脑
date: 2026-10-26
slug: 题解/洛谷-or-Nsoj/琪亚娜与OI比赛/E-琪亚娜与豆腐脑
tags: [题解, 图论建模, 网络流]
---

{/*truncate*/}

<h5>

首先我们发现有一些点的颜色是固定的，并且它们不能放在一起，这就不难想到“二分图”这类东西。

那我们先考虑每个点向左右两个超级源点连边，连在那一条上就表示放在哪个组内。

但是我们发现这样还是不好做，所以不如变成先连边再删边，这样我们只需要删除一些边使不存在一个点同时连通两边就可以了。

那我们再思考一下，其实就是把这张图删除一些边使其裂成两张图，就是求这张图的最小割了。

将连左边记为甜、右边记为咸，我们再加入“争执”这个限制，那么就是一些左部点向右部点的连边，我们需要把这些边同样割掉就可以了。

那么对于“一定某个颜色”，我们只需要向对应颜色再连一个流量为 $inf$ 的边来强制就行了，这样是不可能割这个边的。

时间复杂度：$O(N\sqrt{M})$。

</h5>

```cpp
#include<bits/stdc++.h>
using namespace std;
#define ll long long
#define pii pair< int,int >
#define QWQ return 0;
#define QAQ return

const int N=3e3+10, M=3e4+10;
const ll inf=1e18;

int head[N], ver[N+M<<1], nxt[N+M<<1], now[N], CNT=1;
ll edge[N+M<<1];
inline void add( int u,int v,ll w )
{
	ver[++CNT]=v, edge[CNT]=w, nxt[CNT]=head[u], head[u]=CNT;
	ver[++CNT]=u, edge[CNT]=0, nxt[CNT]=head[v], head[v]=CNT;
}

int n, m, s, t;
int d[N];

inline void intt()
{ for( int i=s;i<=t;i++ ) d[i]=0; }

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
	if( x == t ) QAQ flow;
	ll rest=flow;
	for( int i=now[x];i && rest;i=nxt[i] )
	{
		now[x]=i;
		if( edge[i] && d[ver[i]] == d[x]+1 )
		{
			ll sonflow=dinic( ver[i],min( rest,edge[i] ) );
			if( !sonflow ) d[ver[i]]=0;
			edge[i]-=sonflow; edge[i^1]+=sonflow;
			rest-=sonflow;
		}
	}
	QAQ flow-=rest;
}

int col[N];

int main()
{
    // freopen( "tofu20.in","r",stdin );
    // freopen( "tofu20.out","w",stdout );
    ios::sync_with_stdio( false );
    cin.tie( nullptr ); cout.tie( nullptr );
    int n, m;
    cin>>n>>m;
    s=0, t=n+1;
    for( int i=1;i<=n;i++ ) cin>>col[i];
    for( int i=1, a, b;i<=n;i++ )
        cin>>a>>b,
        add( s,i,b ), add( i,t,a );
    for( int i=1, u, v, w;i<=m;i++ )
        cin>>u>>v>>w, add( u,v,w );
    for( int i=1;i<=n;i++ )
             if( col[i] == 0 ) add( s,i,inf );
        else if( col[i] == 1 ) add( i,t,inf );
    ll maxflow=0, flow;
	while( bfs() ) while( flow=dinic( s,inf ) ) maxflow+=flow;
    cout<<maxflow;
    QWQ
}
```