---
title: Cow Poetry
date: 2026-09-17
slug: 题解/USACO/2019-Jan-Gold/A-Cow-Poetry
tags: [题解, USACO, 数学, 背包DP]
---

{/*truncate*/}

<h5>

现在我们只需要知道每个长度对应情况的方案数，看作完全背包计数就好理解了

所以按照韵脚分类在对每个需要押韵的点枚举即可

时间复杂度：$O(26\times n)$

</h5>

```cpp
#include<bits/stdc++.h>
using namespace std;
#define ll long long
#define pii pair< int,int >
#define QWQ return 0;
#define QAQ return 

const int N=5e3+10, M=1e5+10, mod=1e9+7;

int n, m, k;
int s[N];
int vis[26];
ll f[N], g[N];
ll ans[26];
vector< int > c[N];

inline ll quick_power( ll a,ll b )
{
    ll ans=1, base=a;
    while( b )
    {
        if( b&1 ) ( ans*=base )%=mod;
        ( base*=base )%=mod; b>>=1;
    }
    QAQ ans;
}

inline void init()
{
    f[0]=1;
    for( int j=0;j<=k;j++ ) for( int i=1;i<=n;i++ )
        if( j >= s[i] ) ( f[j]+=f[j-s[i]] )%=mod;
    for( int i=1;i<=n;i++ ) ( g[i]=f[k-s[i]] )%=mod;
}

int main()
{
    // freopen( "1.in","r",stdin );
    // freopen( "1.out","w",stdout );
    ios::sync_with_stdio( false );
    cin.tie( nullptr ); cout.tie( nullptr );
    cin>>n>>m>>k;
    for( int i=1, x;i<=n;i++ )
        cin>>s[i]>>x, c[x].push_back( i );
    init();
    char op;
    for( int i=1;i<=m;i++ ) cin>>op, vis[op-'A']++;
    for( int i=1;i<=n;i++ )
    {
        ll sum=0;
        for( auto &x:c[i] ) ( sum+=g[x] )%=mod;
        for( int j=0;j<26;j++ ) if( vis[j] ) ( ans[j]+=quick_power( sum,vis[j] ) )%=mod;
    }
    ll mul=1;
    for( int i=0;i<26;i++ ) ( mul*=max( 1ll,ans[i] ) )%=mod;
    cout<<mul;
    QWQ
} 
```