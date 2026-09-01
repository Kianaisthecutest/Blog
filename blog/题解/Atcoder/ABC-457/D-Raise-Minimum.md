---
title: Raise Minimum
date: 2026-05-15
slug: 题解/Atcoder/ABC-457/D-Raise-Minimum
tags: [题解, ABC, 二分]
---

{/*truncate*/}

<h5>

经典最小值最大环节

直接二分模拟比较操作次数是否合法即可

注意暴$LL$的情况

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

int n;
ll k;
ll a[N];

inline bool check( ll mid )
{
	ll op=0;
	for( int i=1;i<=n;i++ )
	{
		if( mid > a[i] ) op+=( mid-a[i]+i-1 )/i;
		if( op > k ) QAQ false;
	}
	QAQ true;
}

int main()
{
//	freopen( "txt.in","r",stdin );
//	freopen( "txt.out","w",stdout );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	cin>>n>>k;
	ll l=1e18, r=0;
	for( int i=1;i<=n;i++ ) cin>>a[i], l=min( l,a[i] );
	r=a[1]+k;
	while( l < r )
	{
		ll mid=l+r+1>>1;
		if( check( mid ) ) l=mid;
		else               r=mid-1;
	}
	cout<<l;
	QWQ	 
}
```

</details>

<h5>

时间复杂度：$O(nlog(a_{max}-a_{min}+k))$，瓶颈在于二分

</h5>