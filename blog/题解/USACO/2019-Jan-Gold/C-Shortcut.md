---
title: Shortcut
date: 2026-09-17
slug: 题解/USACO/2019-Jan-Gold/C-Shortcut
tags: [题解, USACO, 最短路, 拓扑排序]
---

{/*truncate*/}

<h5>

新路一定是要在原来路径上才会选择走，那么我们把最短路全部找下来定方向发现这是一张$DAG$

之后我们再跑拓扑将每个点有多少奶牛记录，再根据它到$1$距离计算新解

时间复杂度：$O(mlogm+n+m)$

</h5>

```cpp
#include<bits/stdc++.h>
using namespace std;
#define ll long long
#define pii pair< int,int >
#define QWQ return 0;
#define QAQ return
#define pli pair< ll,int >
#define int long long

const int N=1e4+10;

int c[N], pre[N], deg[N];
ll dis[N], tot[N];
vector< int > sp_rode[N];
vector< pii > rode[N];

inline void Dijikstra()
{
    memset( dis,0x3f,sizeof dis );
    priority_queue< pli,vector< pli >,greater< pli > > pq;
    pq.push( { 0,1 } ); dis[1]=0;
    while( !pq.empty() )
    {
        auto [d,p]=pq.top();
        pq.pop();
        if( d > dis[p] ) continue;
        for( auto &[x,w]:rode[p] )
            if( dis[x] > dis[p]+w )
                dis[x]=dis[p]+w, pre[x]=p,
                pq.push( { dis[x],x } );
            else if( dis[x] == dis[p]+w && p < pre[x] )
                pre[x]=p;
    }
}

signed main()
{
    // freopen( "1.in","r",stdin );
    // freopen( "1.out","w",stdout );
    ios::sync_with_stdio( false );
    cin.tie( nullptr ); cout.tie( nullptr );
    int n, m, t;
    cin>>n>>m>>t;
    for( int i=1;i<=n;i++ ) cin>>c[i];
    for( int i=1, u, v, w;i<=m;i++ )
        cin>>u>>v>>w,
        rode[u].push_back( { v,w } ), rode[v].push_back( { u,w } );
    for( int i=1;i<=n;i++ ) sort( rode[i].begin(),rode[i].end() );
    Dijikstra();
    for( int i=2;i<=n;i++ ) sp_rode[i].push_back( pre[i] ), deg[pre[i]]++;
    queue< int > topsort;
    for( int i=1;i<=n;i++ )
    {
        tot[i]=c[i];
        if( !deg[i] ) topsort.push( i );
    }
    while( !topsort.empty() )
    {
        auto p=topsort.front();
        topsort.pop();
        for( auto &x:sp_rode[p] )
        {
            tot[x]+=tot[p];
            if( !( --deg[x] ) ) topsort.push( x );
        }
    }
    ll ans=0;
    for( int i=1;i<=n;i++ ) ans=max( ans,1ll*( dis[i]-t )*tot[i] );
    cout<<ans;
    QWQ  
}
```