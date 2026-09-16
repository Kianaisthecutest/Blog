---
title: Cowpatibility
date: 2026-09-16
slug: 题解/USACO/2018-Dec-Gold/B-Cowpatibility
tags: [题解, USACO, 容斥定理, 哈希]
---

{/*truncate*/}

<h5>

首先入手点肯定是在于每个牛冰淇淋数量只有$5$上面，所以我们可以很容易想到容斥

然后现在问题在与怎么寻找对应的状态

然后......

</h5>

<h2>

我是$SB$

</h2>

<h5>

我写一堆的$bitset$套$map$来存，直接$MLE$

这里的处理是将组合处理成字符串形式，也能保证一一对应，那么就好做了

时间复杂度：$O(2^5\times n)$

</h5>

```cpp
#include<bits/stdc++.h>
using namespace std;
#define ll long long
#define pii pair< int,int >
#define QWQ return 0;
#define QAQ return

const int N=5e4+10;

string a[5];
unordered_map< string,int > mp;

int main()
{
    // freopen( "1.in","r",stdin );
    // freopen( "1.out","w",stdout );
    ios::sync_with_stdio( false );
    cin.tie( nullptr ); cout.tie( nullptr );
    int n;
    cin>>n;
    ll ans=1ll*( n-1 )*n>>1;
    for( int i=1;i<=n;i++ )
    {
        for( int j=0;j<5;j++ ) cin>>a[j];
        sort( a,a+5 );
        for( int state=1, popc=0;state<( 1<<5 );state++ )
        {
            string s=""; popc=0;
            for( int bit=0;bit<5;bit++ ) if( ( state>>bit )&1 )
                s+=a[bit]+' ', popc++;//记得加空格
            if( popc&1 ) ans-=mp[s];
            else         ans+=mp[s];
            mp[s]++;
        }
    }
    cout<<ans;
    QWQ
}
```