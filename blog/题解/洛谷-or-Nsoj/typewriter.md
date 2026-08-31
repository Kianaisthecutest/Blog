---
title: typewriter
date: 2025-11-20
slug: 题解/洛谷-or-Nsoj/typewriter
tags: [题解, 容斥定理, 数学, 二进制]
---

{/*truncate*/}

<h4>

首先考虑只选择一个字符串的方案数，设总共可以贡献$cnt$种不同的字符，即每个位置可以任选$cnt$种字符，长度为$L$，方案数为$cnt^L$

但是我们存在一些情况重复，于是考虑容斥解决该问题

手模一下/数学思考一下可以发现，对于$j$个模式串的交集，他们的贡献是$-1^( j+1 )*交集的cnt^L$

将所有模式串可提供的不同字母数量转化在一个二进制数上的对应位，记录在$s_i$里面

于是得到总式子$\sum_{state=1}^{2^n-1} -1^{cnt+1}\times count1( s_{i1}\cap s_{i2}\cap ...s_{icnt} )^L,1\&(state>>i)=1 $

</h4>

```cpp
#include<bits/stdc++.h>
using namespace std;
#define ll long long
#define pii pair< int,int >
#define QWQ return 0;

const int N=27, mod=998244353;

int sta[N];
string s[N];

ll quick_power( ll a,ll b )
{
	ll ans=1;
	while( b )
	{
		if( b&1 ) ( ans*=a )%=mod;
		( a*=a )%=mod, b>>=1;
	}
	return ans;
}

int main()
{
//	freopen( "typewriter.in","r",stdin );
//	freopen( "typewriter.out","w",stdout );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	int n, l;
	cin>>n>>l;
	for( int i=1;i<=n;i++ )
	{
		cin>>s[i];
		for( int j=0;j<s[i].size();j++ ) sta[i]|=( 1<<( s[i][j]-'a' ) );
	}
	ll ans=0;
	for( int state=1;state<( 1<<n );state++ )
	{
		int maxs=( 1<<26 )-1, flag=-1;
		for( int i=1;i<=n;i++ ) if( ( state>>( i-1 ) )&1 ) maxs&=sta[i], flag*=-1;
		ans=( ans+flag*quick_power( __builtin_popcount( maxs ),l )+mod )%mod;
	}
	cout<<ans;
	QWQ
}
```