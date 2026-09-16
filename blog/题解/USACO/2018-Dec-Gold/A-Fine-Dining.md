---
title: Fine Dining
date: 2026-09-16
slug: 题解/USACO/2018-Dec-Gold/A-Fine-Dining
tags: [题解, USACO, 最短路, 分层图]
---

{/*truncate*/}

<h5>

首先就是最容易想到的多源转单源，并且跑第一次最短路记录没有草干扰的$dis$

然后我最先想到的是将草点拆了变成一条负权边，但是后面就发现这个就是一个边权+点权的最短路了

那么又因为只能选择一个草点，那么就是点权变成图间路径的一个分层图，最后检测选了草点的能不能保证时间不变大就行了

那么跑这个首先就是因为负权边所以可以 $SPFA$，随便卡卡还是能过的

其次就是复杂度稳定一点的处理后 $Dijistra$，对两个分层图独立跑最短路，跑完无草点图的后转点权放在第二张图就行了

时间复杂度：$O(nlogm)$

</h5>

```cpp
#include<bits/stdc++.h>  
using namespace std;  
#define ll long long  
#define pii pair< int,int >  
#define QWQ return 0;  
#define QAQ return   
  
const int N=5e4+10;  
  
int n;  
ll grass[N];  
bool vis[N][2];  
ll   dis[N][2];  
vector< pii > rode[N];  
  
inline void SPFA()  
{     
    memset( dis,0x3f,sizeof dis );
    deque< pii > q;  
    q.push_back( { n,0 } ); dis[n][0]=0;  
    ll sum=0;  
    while( !q.empty() )  
    {  
        while( !q.empty() && dis[q.front().first][q.front().second] > sum/(ll)q.size() ) q.push_back( q.front() ), q.pop_front();  
        auto [p,op]=q.front();  
        q.pop_front();  
        vis[p][op]=false;  
        sum-=dis[p][op];  
        for( auto &[x,w]:rode[p] )  
        {  
            ll nd=dis[p][op]+w;  
            if( dis[x][op] > nd )  
            {  
                if( vis[x][op] ) sum-=dis[x][op];  
                dis[x][op]=nd;  
                sum+=dis[x][op];  
                if( !vis[x][op] )   
                {  
                    if( q.empty() || dis[q.front().first][q.front().second] > dis[x][op] ) q.push_front( { x,op } );  
                    else                                                                     q.push_back( { x,op } );  
                    vis[x][op]=true;  
                }  
            }  
        }  
        if( !op )  
            for( auto &[x,w]:rode[p] ) if( grass[x] )  
            {  
                ll nd=dis[p][op]+w-grass[x]-1;  
                if( dis[x][op^1] > nd )  
                {  
                    if( vis[x][op^1] ) sum-=dis[x][op^1];  
                    dis[x][op^1]=nd;  
                    sum+=dis[x][op^1];  
                    if( !vis[x][op^1] )   
                    {  
                        if( q.empty() || dis[q.front().first][q.front().second] > dis[x][op^1] ) q.push_front( { x,op^1 } );  
                        else                                                                     q.push_back( { x,op^1 } );  
                        vis[x][op^1]=true;  
                    }  
                }  
            }  
    }  
}  
  
int main()  
{  
    // freopen( "1.in","r",stdin );  
    // freopen( "1.out","w",stdout );  
    ios::sync_with_stdio( false );  
    cin.tie( nullptr ); cout.tie( nullptr );  
    int m, k;  
    cin>>n>>m>>k;  
    for( int i=1, u, v, w;i<=m;i++ )  
        cin>>u>>v>>w,  
        rode[u].push_back( { v,w } ), rode[v].push_back( { u,w } );  
    for( int i=1, x;i<=k;i++ )  
    {  
        ll y;  
        cin>>x>>y;  
        grass[x]=max( grass[x],y );  
    }  
    SPFA();  
    for( int i=1;i<n;i++ ) cout<<( dis[i][0] > dis[i][1] )<<"\n";  
    QWQ  
}
```