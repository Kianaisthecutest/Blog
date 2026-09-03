---
title: Cookies
date: 2026-06-12
slug: 题解/Atcoder/ABC-440/E-Cookies
tags: [题解, 图论建模, 最短路]
---

{/*truncate*/}

<h5>

类似于$Dijistra$的一种处理，每次将最高价值的物品换为较小的其他物品，然后解决

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

const int N=50+10;

ll a[N];

int main()
{
//	freopen( "txt.in","r",stdin );
//	freopen( "txt.out","w",stdout );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	int n, k, x;
	cin>>n>>k>>x;
	for( int i=1;i<=n;i++ ) cin>>a[i];
	sort( a+1,a+n+1 );
	multiset< array< ll,3 > > s;
	s.insert( { a[n]*k,n-1,k } );
	vector< ll > ans;
	while( ans.size() < x )
	{
		auto w=*s.rbegin();
		s.erase( s.find( w ) );
		ans.push_back( w[0] );
		if( w[2] ) for( int i=1;i<=w[1];i++ ) s.insert( { w[0]-a[n]+a[i],i,w[2]-1 } );
	}
	for( auto &x:ans ) cout<<x<<"\n";
	QWQ	  
}
```

</details>

<h5>

时间复杂度：$O(nlogn)$

</h5>