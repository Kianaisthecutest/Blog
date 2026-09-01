---
title: You WILL Like Sigma Problem
date: 2026-05-24
slug: 题解/Atcoder/ABC-452/E-You-WILL-Like-Sigma-Problem
tags: [题解, ABC, 数论分块]
---

{/*truncate*/}

<h5>

好久没见到数论分块的题目了

先将$i\mod j$变形为$i-j\lfloor\frac{i}{j}\rfloor$

再将求和公式换位为$\sum_{j=1}^{m}\sum_{i=1}^{n}A_i\times  B_i\times  (i-j\times \lfloor\frac{i}{j}\rfloor)$

将不变值提取出来$(\sum_{i=1}^{n}i\times A_i)\times (\sum_{j=1}^{m}B_j)-\sum_{j=1}^{m}\sum_{i=1}^{n}A_i\times B_j\times j\times \lfloor\frac{i}{j}\rfloor$

然后我们可以发现$\lfloor\frac{i}{j}\rfloor$只有每当$i$扩大$j$的时候才会变，所以可以将$[k\times j,k\times j+j-1)$放在一起计算

时间复杂度即为$O(n+\frac{n}{2}+\frac{n}{3}\cdots +1)$，即调和级数

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

const int N=5e5+10, mod=998244353;

ll a[N], b[N], suma[N];

int main()
{
//	freopen( "txt.in","r",stdin );
//	freopen( "txt.out","w",stdout );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	int n, m;
	ll ans=0, sumb=0;
	cin>>n>>m;
	for( int i=1;i<=n;i++ ) cin>>a[i], suma[i]=( suma[i-1]+a[i] )%mod;
	for( int i=1;i<=m;i++ ) cin>>b[i], ( sumb+=b[i] )%=mod;
	for( int i=1;i<=n;i++ ) ( ans+=a[i]*i%mod*sumb )%=mod;
	for( int i=1;i<=m;i++ ) for( int k=0;k<=n;k+=i )
	{
		int j=min( n,k+i-1 );
		if( k ) ( ans-=b[i]*i%mod*( k/i )%mod*( suma[j]-suma[k-1] ) )%=mod;
		else    ( ans-=b[i]*i%mod*( k/i )%mod*suma[j] )%=mod;
	}
	cout<<( ans+mod )%mod;
	QWQ	 
}
```

</details>

<h5>

时间复杂度：$O(nlogn)$，瓶颈在于数论分块带来的调和级数

</h5>