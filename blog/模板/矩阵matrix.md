---
title: 矩阵matrix
date: 2025-08-19
slug: 模板/矩阵matrix
tags: [模板, 矩阵]
---

{/*truncate*/}

```cpp
struct matrix//封装在结构体中
{
	int n, m;
	int mat[N][N];

	inline matrix( int _n,int _m )//初始化的构造函数
	{
		memset( mat,0,sizeof mat );
		n=_n, m=_m;
	}

	inline void read()//读入矩阵
	{
		for( int i=1;i<=n;i++ ) for( int j=1;j<=m;j++ ) cin>>mat[i][j];
	}

	inline void print()//输出矩阵
	{
		for( int i=1;i<=n;i++ ) for( int j=1;j<=m;j++ ) cout<<mat[i][j]<<" \n"[j==m];
	}

	inline void E()//构造单位矩阵
	{
		for( int i=1;i<=n;i++ ) mat[i][i]=1;
	}

	inline matrix operator *( const matrix &a )const//重载乘号，矩阵乘法
	{
		matrix ans( n,a.m );
		for( int k=1;k<=m;k++ ) for( int i=1;i<=n;i++ ) for( int j=1;j<=a.m;j++ ) ans.mat[i][j]+=mat[i][k]*a.mat[k][j];
		return ans;
	}
};

inline matrix quick_power( matrix a,int k )//矩阵快速幂
{
	matrix ans( a.n,a.n );
	ans.E();//要初始化为单位矩阵
	while( k )
	{
		if( k&1 ) ans=ans*a;
		a=a*a, k>>=1;
	}
	return ans;
}
```