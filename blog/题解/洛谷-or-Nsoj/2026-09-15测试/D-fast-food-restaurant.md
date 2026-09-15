---
title: 快餐店
date: 2026-09-15
slug: 题解/洛谷-or-Nsoj/2026-09-15测试/D-fast-food-restaurant
tags: [题解, 基环树, 动态规划]
---

{/*truncate*/}

<h5>

首先我们很容易想到我们的答案就是二分之一的直径

首先考虑树上怎么找，然后分割成环和子树，然后就可以了

时间复杂度：$O(n)$

</h5>

```cpp
#include<bits/stdc++.h>    
using namespace std;    
#define ll long long    
#define pii pair< int,int >    
#define QWQ return 0;  
#define QAQ return    
  
const int N=1e5+10;   
  
int idx, m;  
int dfn[N], fa[N];  
int circle[N], tmp[N];  
ll val[N];  
bool on_circle[N];  
vector< pii > rode[N];  
  
inline void dfs( int p )  
{  
    dfn[p]=++idx;  
    for( auto &[x,w]:rode[p] ) if( x != fa[p] )  
        if(!dfn[x])  
        {  
            fa[x]=p; tmp[x]=w;  
            dfs( x );  
        }  
        else if( dfn[x] > dfn[p] )  
        {  
            for( int i=x;i!=p;i=fa[i] )  
            {  
                on_circle[i]=true;  
                circle[++m]=i;  
                val[m]=tmp[i];  
            }  
            on_circle[p]=true;  
            circle[++m]=p;  
            val[m]=w;  
        }  
}  
  
ll Diameter;  
ll dis[N];  
  
inline void tree_dp( int p )  
{  
    for( auto &[x,w]:rode[p] ) if( !on_circle[x] && x != fa[p] )  
    {  
        tree_dp( x );  
        Diameter=max( Diameter,dis[p]+dis[x]+w );  
        dis[p]=max( dis[p],dis[x]+w );  
    }  
}  
  
ll a1[N], b1[N];  
ll a2[N], b2[N];  
  
int main()    
{    
    // freopen( "1.in","r",stdin );    
    // freopen( "1.out","w",stdout );    
    ios::sync_with_stdio( false );    
    cin.tie( nullptr ); cout.tie( nullptr );  
    int n;  
    cin>>n;  
    for( int i=1, u, v, w;i<=n;i++ )  
        cin>>u>>v>>w,  
        rode[u].push_back( { v,w } ), rode[v].push_back( { u,w } );  
    dfs( 1 );  
    for( int i=1;i<=m;i++ ) tree_dp( circle[i] );  
    ll sum, maxv;  
    sum=0, maxv=0;  
    for( int i=1;i<=m;i++ )  
    {  
        sum+=val[i-1];  
        a1[i]=max( a1[i-1],dis[circle[i]]+sum );  
        b1[i]=max( b1[i-1],sum+maxv+dis[circle[i]] );  
        maxv =max( maxv,dis[circle[i]]-sum );  
    }  
    ll tmp=val[m]; val[m]=0;  
    sum=0, maxv=0;  
    for( int i=m;i>=1;i-- )  
    {  
        sum+=val[i];  
        a2[i]=max( a2[i+1],dis[circle[i]]+sum );  
        b2[i]=max( b2[i+1],sum+maxv+dis[circle[i]] );  
        maxv =max( maxv,dis[circle[i]]-sum );  
    }  
    ll tmpp;  
    ll ans=b1[m];  
    for( int i=1;i<m;i++)  
    {  
        tmpp=max( b1[i],b2[i+1] );  
        tmpp=max( tmpp,a1[i]+a2[i+1]+tmp );  
        ans=min( tmpp,ans );  
    }  
    ans=max( Diameter,ans );  
    cout<<( ans>>1 )<<"."<<( ( ans&1 ) ? 5 : 0 );  
    QWQ      
}
```