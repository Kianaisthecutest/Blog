---
title: Plan Holidays
date: 2026-05-05
slug: 题解/Atcoder/ABC-456/F-Plan-Holidays
tags: [题解, ABC, 数学, 矩阵, 线段树]
---

{/*truncate*/}

<h5>

首先考虑分离操作$1,2$，先全做操作$1$再加上操作$2$，所以我们可以转化为这样的一个问题：

选择数列中的一部分，其中最前面选的记为$S$，最后面记为$E$，满足$S-E>=K-1$且选择的相邻两数之间间距不大于$1$

思考一下容易发现最优情况下$S-E=K-1$或$K$，枚举一下最开始选取的点$l$，分讨是$K-1$还是$K$就行了

$f_{l-1,0}=0, f_{l-1,1}=a_{l-1}\\f_{i,0}=f_{i-1,1}, f_{i,1}=min( f_{i-1,0},f_{i-1,1} )+a_i$

但是这样是$O(n^2)$的，不能通过

然后我们就可以使用神秘的矩阵乘法优化这个式子，具体如下

定义新运算矩阵$A=n\times m,B=m\times r$

$(A\bigoplus B)_{i,j}=min_{k=1}^{m}(A_{i,k}+B_{k,j})$

则转移方程为

$\begin{bmatrix}f_{i,0}\\f_{i,1}\end{bmatrix}=\begin{bmatrix}\infty\quad 0\\a_i\quad a_i\end{bmatrix}\bigoplus\begin{bmatrix}f_{i-1,0}\\f_{i-1,1}\end{bmatrix}$

放个线段树进行区间操作然后区间查询答案即可

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

const int N=2e5+10;
const ll inf=1e18;

struct matrix//封装在结构体中
{
	int n, m;
	ll mat[3][3];

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

	inline matrix operator +( const matrix &a )const
	{
		matrix ans( n,a.m );
		ans.mat[1][1]=ans.mat[1][2]=ans.mat[2][1]=ans.mat[2][2]=inf;
		for( int k=1;k<=m;k++ ) for( int i=1;i<=n;i++ ) for( int j=1;j<=a.m;j++ ) ans.mat[i][j]=min( ans.mat[i][j],mat[i][k]+a.mat[k][j] );
		return ans;
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

ll a[N];

struct segment_tree
{
	int l, r;
	matrix mt;

	inline segment_tree() : mt( 2,2 ){}

}st[N<<2];

inline void pushup( int p ){ st[p].mt=st[p<<1|1].mt+st[p<<1].mt; }

inline void build( int p,int l,int r )
{
	st[p].l=l, st[p].r=r;
	if( l == r )
	{
		st[p].mt.mat[1][1]=inf;
		st[p].mt.mat[1][2]=0;
		st[p].mt.mat[2][1]=a[l];
		st[p].mt.mat[2][2]=a[l];
		QAQ;
	}
	int mid=l+r>>1;
	build( p<<1,l,mid );
	build( p<<1|1,mid+1,r );
	pushup( p );
}

inline matrix query( int p,int l,int r )
{
	if( l <= st[p].l && st[p].r <= r ) QAQ st[p].mt;
	int mid=st[p].l+st[p].r>>1;
	matrix ans( 2,2 );
	if( mid >= l ) ans=query( p<<1,l,r );
	if( mid <  r ) ans=( mid >= l ? query( p<<1|1,l,r )+ans : query( p<<1|1,l,r ) );
	QAQ ans;           
}

inline void sovel()
{
	int n, k;
	cin>>n>>k;
	a[0]=inf;
	for( int i=1;i<=n;i++ ) cin>>a[i];
	build( 1,1,n );
	ll ans=inf;
	for( int l=1, r=k;r<=n;l++, r++ )
	{
		matrix mt=query( 1,l,r );
		ans=min( ans,mt.mat[2][1] );
		if( l > 1 ) ans=min( ans,min( mt.mat[1][2],mt.mat[2][2] )+a[l-1] );
	}
	cout<<ans<<"\n";
}

int main()
{
//	freopen( "txt.in","r",stdin );
//	freopen( "txt.out","w",stdout );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	int t;
	for( cin>>t;t;t-- ) sovel();
	QWQ
}
```

</details>

<h5>

时间复杂度：$O(nlogn)$

</h5>
