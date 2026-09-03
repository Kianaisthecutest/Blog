---
title: Swap and Range Sum
date: 2026-06-12
slug: 题解/Atcoder/ABC-442/D-Swap-and-Range-Sum
tags: [题解, 前缀和, 模拟]
---

{/*truncate*/}

<h5>

因为每次是交换两个相邻值，所以只会对交换的前面的位置的前缀和产生变化，可以$O(1)$计算

区间求和就是前缀和直接算了

闲扯一句：本题还可以线段树或树状数组$O(nlogn)$解决，但是这个更多是处理交换的两个数不相邻的情况

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

ll a[N], sum[N];

int main()
{
//	freopen( "txt.in","r",stdin );
//	freopen( "txt.out","w",stdout );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	int n, q;
	cin>>n>>q;
	for( int i=1;i<=n;i++ ) cin>>a[i], sum[i]=sum[i-1]+a[i];
	for( int i=1, op, l, r;i<=q;i++ )
	{
		cin>>op>>l;
		if( op == 1 ) sum[l]+=a[l+1]-a[l], swap( a[l],a[l+1] );
		if( op == 2 ) cin>>r, cout<<sum[r]-sum[l-1]<<"\n";
	}
	QWQ	  
}
```

</details>

<h5>

时间复杂度：$O(n+q)$

</h5>
