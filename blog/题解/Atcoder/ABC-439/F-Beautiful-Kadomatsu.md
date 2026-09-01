---
title: Beautiful Kadomatsu
date: 2026-05-31
slug: 题解/Atcoder/ABC-439/F-Beautiful-Kadomatsu
tags: [题解, ABC, 数学, 前缀和]
---

{/*truncate*/}

<h5>

题目含义即为求相邻两数的差均为$1$的序列的个数

于是考虑在前后缀中记录更小值的数量，根据数学式子即可得到

</h5>

<summary><h3>AC代码</h3></summary>
<details>
	
```cpp
#include<bits/stdc++.h>
using namespace std;
#define QAQ return
#define QWQ return 0;
#define ll long long
#define pii pair< int,int >

const int N=3e5+10, mod=998244353, inv2=499122177;

int n;

ll tree[N];

inline int lowbit( int x ){ QAQ x&-x; }

inline void add( int x ){ for( ;x<=n;x+=lowbit( x ) ) tree[x]++; }

inline int query( int x )
{
	int ans=0;
	for( ;x;x-=lowbit( x ) ) ans+=tree[x];
	QAQ ans;
} 

int p[N];
int l[N], r[N];
ll pow2[N], invpow2[N];

int main()
{
//	freopen( "txt.in","r",stdin );
//	freopen( "txt.out","w",stdout );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	cin>>n;
	for( int i=1;i<=n;i++ ) cin>>p[i];
	pow2[0]=invpow2[0]=1;
	for( int i=1;i<=n;i++ ) pow2[i]=pow2[i-1]*2%mod, invpow2[i]=invpow2[i-1]*inv2%mod;
	for( int i=1;i<=n;i++ ) l[i]=query( p[i] ), add( p[i] );
	for( int i=1;i<=n;i++ ) tree[i]=0;
	for( int i=n;i>=1;i-- ) r[i]=query( p[i] ), add( p[i] );
	ll ans=0, sum=0;
	for( int i=1;i<=n;i++ ) ans+=1ll*l[i]*r[i];
	for( int i=2;i<n;i++ ) 
	( ans+=1ll*r[i]*sum%mod*pow2[i-1] )%=mod,
	( sum+=1ll*l[i]*invpow2[i] )%=mod;
	cout<<ans;
	QWQ
}

```

</details>

<h5>

时间复杂度：$O(nlogn)$

</h5>