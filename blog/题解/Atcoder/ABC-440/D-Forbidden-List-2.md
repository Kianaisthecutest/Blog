---
title: Forbidden List 2
date: 2026-06-12
slug: 题解/Atcoder/ABC-440/D-Forbidden-List-2
tags: [题解, 二分]
---

{/*truncate*/}

<h5>

这个题还是挺能一眼丁真出来二分的，主要就是找区间内的在列表里的数的个数，然后处理即可

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

const int N=3e5+10;
const ll inf=1e10;

int a[N];

int main()
{
//	freopen( "txt.in","r",stdin );
//	freopen( "txt.out","w",stdout );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	int n, q;
	cin>>n>>q;
	for( int i=1;i<=n;i++ ) cin>>a[i];
	sort( a+1,a+n+1 );
	for( int i=1, x ,y;i<=q;i++ )
	{
		cin>>x>>y;
		ll l=x, r=x+y+n+61, ans=0;
		while( l <= r )
		{
			int mid=l+r>>1;
			int pos=upper_bound( a+1,a+n+1,mid )-lower_bound( a+1,a+n+1,x );
			int sum=mid-x+1, L=sum-pos;
			if( L >= y )
			{
				if( L == y && a[lower_bound( a+1,a+n+1,mid )-a] != mid ) ans=mid;
				r=mid-1;
			}
			else l=mid+1;
			int l=x,r=x+y+n+10,ans=0;
		}
		cout<<ans<<"\n";
	}
	QWQ	  
}
```

</details>

<h5>

时间复杂度：$O((n+q)logn)$

</h5>
