---
title: Kadomatsu Subsequence
date: 2026-05-31
slug: 题解/Atcoder/ABC-439/D-Kadomatsu-Subsequence
tags: [题解, ABC, 数学, 平衡树]
---

{/*truncate*/}

<h5>

简单数学题，即找前缀或后缀中满足比例的数的数的个数求积

利用$map$即可解决

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

ll a[N];
map< ll,int > Count;

int main()
{
//	freopen( "txt.in","r",stdin );
//	freopen( "txt.out","w",stdout );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	int n;
	cin>>n;
	for( int i=1;i<=n;i++ ) cin>>a[i];
	ll ans=0;
	for( int i=1;i<=n;i++ )
	{
		Count[a[i]]++;
		if( a[i]%5 == 0 ) ans+=1ll*Count[a[i]/5*7]*Count[a[i]/5*3];
	}
	Count.clear();
	for( int i=n;i>=1;i-- )
	{
		Count[a[i]]++;
		if( a[i]%5 == 0 ) ans+=1ll*Count[a[i]/5*7]*Count[a[i]/5*3];
	}
	cout<<ans;
	QWQ	  
}
```

</details>

<h5>

时间复杂度：$O(nlogn)$

</h5>
