---
title: Sparse Range
date: 2026-06-13
slug: 题解/Atcoder/ABC-444/E-Sparse-Range
tags: [题解, 双指针, 平衡树]
---

{/*truncate*/}

<h5>

容易想到这个东西的一个性质:如果区间$[l,r]$满足条件，则它的任意一个子区间也满足条件

于是双指针可以快速解决，对于最小差我们可以通过一个$set$在里面二分解决，这样每个数做多进出$set$一次$O(nlogn)$

</h5>

<summary><h3>AC代码</h3></summary>
<details>
	
```cpp
/*
双指针模板了 
每次左端点右移1，右端点肯定只会右移 
*/
#include<bits/stdc++.h>
using namespace std;
#define QAQ return
#define QWQ return 0;
#define ll long long
#define pii pair< int,int >
#define val first
#define idx second

const int N=4e5+10;

int a[N];

int main()
{
//	freopen( "txt.in","r",stdin );
//	freopen( "txt.out","w",stdout );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	int n, d;
	cin>>n>>d;
	for( int i=1;i<=n;i++ ) cin>>a[i];
	set< pii > s;
	ll ans=0;
	for( int l=1, r=0;l<=n;l++ )
	{
		if( r < l ) s.insert( { a[l],l } ), r=l;
		for( ;r<n; )
		{
			auto pos=s.lower_bound( { a[r+1],-1 } );
			bool flag=true;
			if( pos != s.end() )   if( ( *pos ).val-a[r+1] < d )         flag=false;
			if( pos != s.begin() ) if( a[r+1]-( *prev( pos ) ).val < d ) flag=false;
			if( flag ) r++, s.insert( { a[r],r } );
			else       break;
		}
		ans+=r-l+1;
		s.erase( { a[l],l } );
	}
	cout<<ans;
	QWQ
}

```

</details>

<h5>

时间复杂度：$O(nlogn)$

</h5>