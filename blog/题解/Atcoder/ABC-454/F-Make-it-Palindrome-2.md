---
title: Make it Palindrome 2
date: 2026-05-06
slug: 题解/Atcoder/ABC-454/F-Make-it-Palindrome-2
tags: [题解, ABC, 贪心, 模拟]
---

{/*truncate*/}

<h5>

如果要回文，那么我们操作中间位置是没意义的，而且我们也不会经过中间位置操作

因为那样会使一段需要回文对应的部分同时增加，与不操作无异

所以我们对对应位置做差取绝对值求得要使这对位置相同需要在前面或后面的操作次数

然后我们只需要不断的变化一个前缀或后缀就可以在操作尽量多的位置的情况下尽可能有意义

处理后枚举位置即可

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

ll a[N], b[N], sum[N];

inline void sovel()
{
	int n, m;
	cin>>n>>m;
	for( int i=1;i<=n;i++ )cin>>a[i];
	int lst=0, nm=0;
	for( int i=1;i<=( n>>1 );i++ )
	{
		int now=( a[i]-a[n-i+1]+m )%m;
		b[++nm]=( now-lst+m )%m;
		lst=now;
	}
	b[++nm]=( m-lst )%m;
	sort( b+1,b+nm+1 );
	sum[nm+1]=0;
	for( int i=nm;i>=1;i-- ) sum[i]=sum[i+1]+m-b[i];
	ll ans=sum[1], Sum=0;
	for( int i=1;i<=nm;i++ ) Sum+=b[i], ans=min( ans,max( Sum,sum[i+1] ) );
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

时间复杂度：$O(tn)$

</h5>
