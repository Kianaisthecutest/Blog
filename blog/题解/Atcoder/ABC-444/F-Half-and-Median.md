---
title: Half and Median
date: 2026-06-13
slug: 题解/Atcoder/ABC-444/F-Half-and-Median
tags: [题解, 二分, 贪心]
---

{/*truncate*/}

<h5>

依然是可以快速想到使用二分全局去判断某一个数能否成为中位数

当我们判断数字$x$能否成为中位数，只需要判断拆分出来的大于等于x的数的个数是否大于最后序列长的一半即可

那么进行分讨，记录每增加一个大于等于$x$的数记为:

<span>&lt;1&gt;</span>对于大于$2x-1$的数，贡献为$1$

<span>&lt;2&gt;</span>对于等于$2x-1$或小于$x$的数，贡献为$0$

<span>&lt;3&gt;</span>对于其他的数$\in[x,2x-1)$，贡献为$-1$

按照这个贪心顺序做下来即可

</h5>

<summary><h3>AC代码</h3></summary>
<details>
	
```cpp
/*
二分整体答案，然后写check 
记二分的值为x，那么对于所有的数x*2+1，它分割一次可以使答案尽可能完成
我们即找这个东西的和是否大于等于序列长的一半即可 
*/
#include<bits/stdc++.h>
using namespace std;
#define QAQ return
#define QWQ return 0;
#define ll long long
#define pii pair< int,int >
#define pll pair< ll,ll >

const int N=1e5+10;

int n;
ll m, k, sum;
ll L[N];

inline bool check( int x )
{
	if( x == 0 ) QAQ true;
	ll mn=k;
	for( int i=1;i<=n;i++ ) if( L[i] >= x ) mn--;
	mn=max( 0ll,mn );
	if( mn > m ) QAQ false;
	vector< pll > vec;
	ll len=x*2-1;
	for( ll i=1, p, a, b, cost;i<=n;i++ )
	{
		p=1;
		while( ( L[i]+p-1 )/p > len ) p<<=1;
		a=L[i]/p, b=L[i]%p;
		if( a >= x && p-b > 0 )
		{
			if( a == len ) cost=x;
			else           cost=a;
			vec.push_back( { cost,p-b } );
		}
		if( a+1 >= x && b > 0 )
		{
			if( a+1 == len ) cost=x;
			else             cost=a+1;
			vec.push_back( { cost,b } );
		}
	}
	sort( vec.begin(),vec.end() );
	ll need=k, keep=0;
	for( auto &[val,num]:vec )
	{
		if( need == 0 ) break;
		ll use=min( need,num );
		keep+=use*val; need-=use;
	}
	if( need > 0 ) QAQ false;
	QAQ mn <= m && m <= sum-n-( keep-k );
}

inline void sovel()
{
	cin>>n>>m;
	k=m+n+1>>1;
	ll maxa=0;
	sum=0;
	for( int i=1;i<=n;i++ ) cin>>L[i], maxa=max( maxa,L[i] ), sum+=L[i];
	int l=0, r=maxa+1;
	while( l+1 != r )
	{
		int mid=l+r>>1;
		if( check( mid ) ) l=mid;
		else               r=mid;	
	}
	cout<<l<<"\n";
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

时间复杂度：$O(nlog^2n)$

</h5>