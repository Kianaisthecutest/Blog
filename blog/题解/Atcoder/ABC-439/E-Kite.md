---
title: Kite
date: 2026-05-31
slug: 题解/Atcoder/ABC-439/E-Kite
tags: [题解, ABC, 动态规划, 二分]
---

{/*truncate*/}

<h5>

首先可以想到我们放置这个要，满足一个条件:若$l1\lt l2$，则$r1\lt r2$，否则产生重合

于是变为在先按照$l$排序后寻找最长上升子序列，$DP$即可

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

struct seq
{
	int l, r;
	
	bool operator <( const seq &x )const
	{
		if( l == x.l ) QAQ r > x.r;
		QAQ l < x.l;
	}
	
}line[N];

int ans[N]; 

int main()
{
//	freopen( "txt.in","r",stdin );
//	freopen( "txt.out","w",stdout );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	int n;
	cin>>n;
	for( int i=1;i<=n;i++ ) cin>>line[i].l>>line[i].r;
	sort( line+1,line+n+1 );
	int m=0;
	for( int i=1;i<=n;i++ )
	if( line[i].r > ans[m] ) ans[++m]=line[i].r;
	else                     ans[lower_bound( ans+1,ans+m+1,line[i].r )-ans]=line[i].r;
	cout<<m;
	QWQ
}
```

</details>

<h5>

时间复杂度：$O(nlogn)$

</h5>