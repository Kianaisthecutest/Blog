---
title: Grass Cownoisseur
date: 2026-09-15
slug: 题解/洛谷-or-Nsoj/2026-09-15测试/C-Grass-Cownoisseur
tags: [题解, Tarjan, 强连通分量, 拓扑排序]
---

{/*truncate*/}

首先第一步就是缩点，这个可以很容易的想到，因为我们一个环内是可以一只走全部取贡献的

然后我们看一下图，只有这样的情况才会使橙色边反转后满足回到初始点形成环

![](/img/GrassCownoisseur.jpg)

所以建正反图之后枚举边即可

时间复杂度：$O(n+m)$

```cpp
#include<bits/stdc++.h>  
using namespace std;   
#define ll long long  
#define pii pair< int,int >  
#define QWQ return 0;   
#define QAQ return  
  
const int N=1e5+10;   
  
int idx, cnt, num;   
int dfn[N], low[N];   
int group[N], val[N], deg1[N], deg2[N];   
int dis1[N], dis2[N];   
bool in[N];   
stack< int > stk;   
vector< int > rode[N], frt_rode[N], bck_rode[N];   
  
inline void dfs( int p,int fa )   
{   
    dfn[p]=low[p]=++idx;   
    stk.push( p ); in[p]=true;   
    for( auto &x:rode[p] )   
        if( !dfn[x] )   
        {   
            dfs( x,p );   
            low[p]=min( low[p],low[x] );   
        }   
        else if( in[x] ) low[p]=min( low[p],dfn[x] );   
    if( dfn[p] == low[p] )   
    {   
        ++cnt;   
        while( stk.top() != p )   
        {   
            val[cnt]++;   
            group[stk.top()]=cnt;   
            in[stk.top()]=false;   
            stk.pop();   
        }   
        val[cnt]++;   
        group[stk.top()]=cnt;   
        in[stk.top()]=false;   
        stk.pop();   
    }   
}   
  
int main()   
{   
	// freopen( "1.in","r",stdin );
    // freopen( "1.out","w",stdout );
    ios::sync_with_stdio( false );   
    cin.tie( nullptr ); cout.tie( nullptr );   
    int n, m;   
    cin>>n>>m;   
    for( int i=1, x, y;i<=m;i++ )   
        cin>>x>>y, rode[x].push_back( y );   
    for( int i=1;i<=n;i++ ) if( !dfn[i] ) dfs( i,0 );   
  
    for( int u=1;u<=n;u++ ) for( auto &v:rode[u] )   
        if( group[u] != group[v] )   
            frt_rode[group[u]].push_back( group[v] ), deg1[group[v]]++,   
            bck_rode[group[v]].push_back( group[u] ), deg2[group[u]]++;
  
    queue< int > q1;   
    for( int i=1;i<=cnt;i++ ) if( !deg1[i] ) q1.push( i );   
    memset( dis1,0xcf,sizeof dis1 );   
    dis1[group[1]]=val[group[1]];   
    while( !q1.empty() )   
    {   
        auto p=q1.front();   
        q1.pop();   
        for( auto &x:frt_rode[p] )   
        {   
            if( dis1[p] > 0 ) dis1[x]=max( dis1[x],dis1[p]+val[x] );   
            if( !( --deg1[x] ) ) q1.push( x );   
        }   
    }   
  
    queue< int > q2;   
    for( int i=1;i<=cnt;i++ ) if( !deg2[i] ) q2.push( i );   
    memset( dis2,0xcf,sizeof dis2 );   
    dis2[group[1]]=val[group[1]];   
    while( !q2.empty() )   
    {   
        auto p=q2.front();   
        q2.pop();   
        for( auto &x:bck_rode[p] )   
        {   
            if( dis2[p] > 0 ) dis2[x]=max( dis2[x],dis2[p]+val[x] );   
            if( !( --deg2[x] ) ) q2.push( x );   
        }   
    }   
    int ans=val[group[1]];   
    for( int u=1;u<=cnt;u++ ) for( auto &v:frt_rode[u] )   
        ans=max( ans,dis1[v]+dis2[u]-val[group[1]] );   
    cout<<ans;   
    QWQ   
}
```