---
title: Bitovi
date: 2026-08-25
slug: blog/题解/COCI/2023-2024-05/A-Bitovi.md
tags: [题解, COCI, 二进制]
---

模拟，二进制

{/*truncate*/}

首先我们先对整个序列进行一次"去重"，将两个序列中相同的数先去掉，保证每个数需要操作至少一次

首先我们对每对去操作变化，每次就是一个$\log$的复杂度，但是如何处理重复的情况呢

假设现在存在一个变化情况$x$->$y$->$z$但是$y$已经存在，此时我们不妨先用那个已经存在的$y$去操作

在最后，我们再执行$x$->$y$就行了，相当于我们把这个操作暂缓处理

时间复杂度$O(nlogn)$

```cpp
#include<bits/stdc++.h>
using namespace std;
#define ll long long
#define pii pair< int,int >
#define QWQ return 0;
#define QAQ return 

const int N=20;

set< int > a, b, c;
stack< pii > rep;
vector< pii > ans;

inline void ope( int x,int y )
{
    if( a.find( y ) != a.end() )
    { rep.push( { x,y } ); QAQ; }
    a.erase( x ); a.insert( y );
    ans.push_back( { x,y } );
}

inline int lowbit( int x ){ QAQ x&-x; }

inline void turn( int x,int y )
{
    while( x != y )
    {
        int diff=x^y; diff=lowbit( diff );
        ope( x,x^diff );
        x^=diff;
    }
    while( !rep.empty() )
    {
        auto [nx,ny]=rep.top();
        rep.pop();
        turn( nx,ny );
    }
}

int main()
{
    // freopen( "1.in","r",stdin );
    // freopen( "1.out","w",stdout );
    ios::sync_with_stdio( false );
    cin.tie( nullptr ); cout.tie( nullptr );
    int n;
    cin>>n;
    for( int i=1, x;i<=n;i++ )
        cin>>x,
        a.insert( x ), c.insert( x );
    for( int i=1, x;i<=n;i++ )
        cin>>x,
        b.insert( x );
    while( !b.empty() )
    {
        int y=*b.begin();
        if( a.find( y ) != a.end() )
        { b.erase( y ); c.erase( y );
          continue; }
        int x=*c.begin();
        turn( x,y );
        b.erase( y ); c.erase( x );
    }
    cout<<ans.size()<<"\n";
    for( auto &[x,y]:ans ) cout<<x<<" "<<y<<"\n";
    QWQ
}
```