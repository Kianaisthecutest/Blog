---
title: Exactly K Steps 2
date: 2026-06-14
slug: 题解/Atcoder/ABC-445/F-Exactly-K-Steps-2
tags: [题解, 矩阵, 进制]
---

{/*truncate*/}

<h5>

没啥好说的模板，矩阵加法+快速加(思想就是和快速幂一样的二进制拆分)就行

</h5>

<summary><h3>AC代码</h3></summary>
<details>
	
```cpp
/*
小的 N 就代表了 floyed
cao了矩阵加速模板 
*/
#include<bits/stdc++.h>
using namespace std;
#define QAQ return
#define QWQ return 0;
#define ll long long
#define pii pair< int,int >
#define val first
#define idx second

const int N=1e2+10;
const ll inf=1e18;

struct matrix
{
	int n, m;
	ll mat[N][N];
	
	matrix( int _n,int _m )
	{
		n=_n, m=_m;
		for( int i=1;i<=n;i++ ) for( int j=1;j<=m;j++ ) mat[i][j]=inf;
	}
	
	void read(){ for( int i=1;i<=n;i++ ) for( int j=1;j<=m;j++ ) cin>>mat[i][j]; }
	
	void E(){ for( int i=1;i<=n;i++ ) for( int j=1;j<=m;j++ ) mat[i][i]=0; }
	
	void print(){ for( int i=1;i<=n;i++ ) for( int j=1;j<=m;j++ ) cout<<mat[i][j]<<" \n"[j==m]; }
	
	matrix operator+ ( const matrix &a )const
	{
		matrix ans( n,a.m );
		for( int k=1;k<=m;k++ ) for( int i=1;i<=n;i++ ) for( int j=1;j<=a.m;j++ ) ans.mat[i][j]=min( ans.mat[i][j],mat[i][k]+a.mat[k][j] );
		QAQ ans;
	}
	
};

int n, k;

inline matrix quick_add( matrix a )
{
	matrix ans( n,n ), base( n,n );
	ans.E();
	base=a;
	while( k )
	{
		if( k&1 ) ans=ans+base;
		base=base+base, k>>=1;
	}
	QAQ ans;
}

int main()
{
//	freopen( "txt.in","r",stdin );
//	freopen( "txt.out","w",stdout );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	cin>>n>>k;
	matrix base( n,n );
	base.read();
	base=quick_add( base );
	for( int i=1;i<=n;i++ ) cout<<base.mat[i][i]<<"\n";
	QWQ
}
```

</details>

<h5>

时间复杂度：$O(n^3logk)$

</h5>