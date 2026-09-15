---
title: MooTube
date: 2026-09-15
slug: 题解/洛谷-or-Nsoj/2026-09-15测试/A-MooTube
tags: [题解, 并查集, 离线处理]
---

{/*truncate*/}

<h5>

因为我们其实就是找一个连通块，使连通块里面没有不符合的边(权值过小的边)

那么就是离线处理模拟一下生成树求连通块大小即可

并查集即可，时间复杂度：$O(n+q)$

</h5>

```cpp
/*
模拟一遍生成树，并查集模板了这不是
*/
#include<bits/stdc++.h>
using namespace std;
#define ll long long
#define pii pair< int,int >
#define QWQ return 0;
#define QAQ return 

const int N=1e5+10;

struct EDGE
{
    bool op;
    int x, y, z;

    bool operator< ( const EDGE &a )const
    {
        if( z == a.z ) QAQ op < a.op;
        QAQ z > a.z;
    }

}ask[N<<1];

int fa[N], siz[N];
int ans[N];

inline int get( int x )
{ QAQ ( fa[x] == x ? x : fa[x] = get( fa[x] ) ); }

inline void merge( int x,int y )
{
    x=get( x ); y=get( y );
    if( siz[x] > siz[y] ) fa[y]=x, siz[x]+=siz[y];
    else                  fa[x]=y, siz[y]+=siz[x];
}

int main()
{
    // freopen( "1.in","r",stdin );
    // freopen( "1.out","w",stdout );
    ios::sync_with_stdio( false );
    cin.tie( nullptr ); cout.tie( nullptr );
    int n, q;
    cin>>n>>q;
    for( int i=1, u, v, x;i<n;i++ ) 
        cin>>u>>v>>x, ask[i]={ 0,u,v,x };
    for( int i=1, x, y;i<=q;i++ )
        cin>>x>>y, ask[n+i-1]={ 1,i,y,x };
    for( int i=1;i<=n;i++ ) fa[i]=i, siz[i]=1;
    sort( ask+1,ask+n+q );
    for( int i=1;i<n+q;i++ )
    {
        auto &[op,u,v,w]=ask[i];
        if( op ) ans[u]=siz[get( v )];
        else     merge( u,v );
    }
    for( int i=1;i<=q;i++ ) cout<<ans[i]-1<<"\n";
	QWQ
}
```