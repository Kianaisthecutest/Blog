---
title: Must Buy
date: 2026-06-12
slug: 题解/Atcoder/ABC-441/F-Must-Buy
tags: [题解, 动态规划, 分类讨论]
---

{/*truncate*/}

<h5>

该$DP$具有结合性，所以可以通过记录前后缀来讨论一定选或一定不选某个商品时的最大贡献

所以我们讨论这个最大贡献与实际最大贡献的关系即可判断类型

什么是结合性：已知一个前缀状态$A$和后缀状态$B$，若它们的并集是状态$C$且$A\cap B=\emptyset$，满足$f_A+f_B=f_C$

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

const int N=1e3+10, M=5e4+10;

ll p[N], v[N];
ll f[N][M], g[N][M];

int main()
{
//	freopen( "txt.in","r",stdin );
//	freopen( "txt.out","w",stdout );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	int n, m;
	cin>>n>>m;
	for( int i=1;i<=n;i++ ) cin>>p[i]>>v[i];
	for( int i=1;i<=n;i++ ) for( int j=0;j<=m;j++ )
	if( j < p[i] ) f[i][j]=f[i-1][j];
	else           f[i][j]=max( f[i-1][j],f[i-1][j-p[i]]+v[i] );
	for( int i=n;i>=1;i-- ) for( int j=0;j<=m;j++ )
	if( j < p[i] ) g[i][j]=g[i+1][j];
	else           g[i][j]=max( g[i+1][j],g[i+1][j-p[i]]+v[i] );
	ll maxv=f[n][m];
	for( int i=1;i<=n;i++ )
	{
		ll must=0, mustnot=0;
		for( int j=0;j<=m-p[i];j++ ) must=max( must,f[i-1][j]+g[i+1][m-j-p[i]] );
		for( int j=0;j<=m;j++ ) mustnot=max( mustnot,f[i-1][j]+g[i+1][m-j] );
		must+=v[i];
		if( must < maxv )         cout<<"C";
		else if( mustnot < maxv ) cout<<"A";
		else                      cout<<"B";
	}
	QWQ
}
```

</details>

<h5>

时间复杂度：$O(n)$

</h5>
