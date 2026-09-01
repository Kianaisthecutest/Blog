---
title: Heavy Buckets
date: 2026-05-31
slug: 题解/Atcoder/ABC-438/E-Heavy-Buckets
tags: [题解, ABC, 倍增]
---

{/*truncate*/}

<h5>

因为每个点仅一个出边，是不会出现多种选择的

所以可以倍增解决，同时记录点和距离即可

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

int fa[N][31];
ll dis[N][31];

int main()
{
//	freopen( "txt.in","r",stdin );
//	freopen( "txt.out","w",stdout );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	int n, q;
	cin>>n>>q;
	for( int i=1;i<=n;i++ ) cin>>fa[i][0], dis[i][0]=i;
	for( int bit=1;bit<=30;bit++ ) for( int i=1;i<=n;i++ ) fa[i][bit]=fa[fa[i][bit-1]][bit-1], dis[i][bit]=dis[i][bit-1]+dis[fa[i][bit-1]][bit-1];
	for( int i=1, t, b;i<=q;i++ )
	{
		cin>>t>>b;
		ll ans=0;
		for( int bit=30;bit>=0;bit-- ) if( ( t>>bit )&1 ) ans+=dis[b][bit], b=fa[b][bit];
		cout<<ans<<"\n";
	}
	QWQ	  
}
```

</details>

<h5>

时间复杂度：$O(nlogn)$

</h5>
