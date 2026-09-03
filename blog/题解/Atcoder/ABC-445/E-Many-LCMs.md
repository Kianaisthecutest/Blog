---
title: Many LCMs
date: 2026-06-14
slug: 题解/Atcoder/ABC-445/E-Many-LCMs
tags: [题解, 数学, 质数筛法]
---

{/*truncate*/}

<h5>

首先容易想到要把这个全部分解质因数，这样可以快速的计算出全部数的$LCM$

然后考虑如何对"删去一个数"这个操作进行转移

首先，假设删去的数$x$存在一个质因数$p$的出现次数为$cnt$，考虑什么情况会影响$LCM$

首先当我们计算整个的$LCM$时，我们一定是要计算入某质数的最大出现次数$mx1$，$LCM$就是每个质数的最大出现次数次幂的积

那么如果这个数$x$的某个质数满足$cnt=mx_p$，说明这时候我们对于剩下的数它们的该质数的最大值就应该变成次大值的

所以我们只需要记录一下每个质数的最大出现数$mx1$和次大数$mx2$，当满足$cnt=mx_p$时只要除以$p^{mx1_p-mx2_p}$即可，操作逆元解决取模问题

</h5>

<summary><h3>AC代码</h3></summary>
<details>
	
```cpp
/*
筛一遍质数，然后分解，再跑一下逆元即可 
*/
#include<bits/stdc++.h>
using namespace std;
#define QAQ return 
#define QWQ return 0;
#define ll long long
#define pii pair< int,int >

const int N=2e5+10, M=1e7+10, Max=1e7, mod=998244353;

int a[N];
int vis[M];
vector< int > prime;

inline void Euler()
{
	vis[1]=1;
	for( int i=2;i<=Max;i++ )
	{
		if( !vis[i] ) vis[i]=i, prime.push_back( i );
		for( auto &x:prime )
		{
			if( 1ll*i*x > Max ) break;
			vis[i*x]=x;
			if( i%x == 0 ) break;
		}
	}
}

inline ll quick_power( ll a,ll b )
{
	ll ans=1, base=a;
	while( b )
	{
		if( b&1 ) ( ans*=base )%=mod;
		( base*=base )%=mod, b>>=1;
	}
	return ans;
}

inline void sovel()
{
	int n;
	cin>>n;
	map< int,int > mx1, mx2;
	for( int i=1;i<=n;i++ )
	{
		cin>>a[i];
		int x=a[i];
		while( x != 1 )
		{
			int p=vis[x], cnt=0;
			while( x%p == 0 ) cnt++, x/=p;
			if( cnt > mx1[p] )      mx2[p]=mx1[p], mx1[p]=cnt;
			else if( cnt > mx2[p] ) mx2[p]=cnt;
		}
	}
	ll LCM=1;
	for( auto &[val,num]:mx1 ) ( LCM*=quick_power( val,num ) )%=mod;
	for( int i=1;i<=n;i++ )
	{
		int x=a[i];
		ll ans=LCM;
		while( x != 1 )
		{
			int p=vis[x], cnt=0;
			while( x%p == 0 ) cnt++, x/=p;
			if( cnt == mx1[p] ) ( ans*=quick_power( quick_power( p,mx1[p]-mx2[p] ),mod-2 ) )%=mod;
		}
		cout<<ans<<" ";
	}
	cout<<"\n";
}

int main()
{
//	freopen( "txt.in","r",stdin );
//	freopen( "txt.out","w",stdout );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	Euler();
	int t;
	for( cin>>t;t;t-- ) sovel();
	QWQ	  
}
```

</details>

<h5>

时间复杂度：$O(nlogn)$，每个数的分解次数最多$log_2n$次

</h5>