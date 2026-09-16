---
title: Teamwork
date: 2026-09-16
slug: 题解/USACO/2018-Dec-Gold/C-Teamwork
tags: [题解, USACO, 动态规划]
---

{/*truncate*/}

<h5>

首先我们自然思路下来设计状态$f_i$表示将前$i$个做完的最大答案

那么转移方程就是$f_i=max(f_{j-1}+max\ a_{[j,i]}\times (i-j+1)),j\in [max(1,i-k+1),i]$

然后我们发现复杂度就是$O(nk)$结束了???

</h5>

```cpp
#include<bits/stdc++.h>
using namespace std;
#define ll long long
#define pii pair< int,int >
#define QWQ return 0;
#define QAQ return

const int N=1e4+10, K=1e3+10;

int w[N];
ll f[N];

int main()
{
    // freopen( "1.in","r",stdin );
    // freopen( "1.out","w",stdout );
    ios::sync_with_stdio( false );
    cin.tie( nullptr ); cout.tie( nullptr );
    int n, k;
    cin>>n>>k;
    for( int i=1;i<=n;i++ ) cin>>w[i];
    for( int i=1;i<=n;i++ )
    {
        int maxv=0;
        for( int j=i;j>=max( 1,i-k+1 );j-- )
            maxv=max( maxv,w[j] ),
            f[i]=max( f[i],f[j-1]+1ll*maxv*( i-j+1 ) );
    }
    cout<<f[n];
    QWQ 
}
```