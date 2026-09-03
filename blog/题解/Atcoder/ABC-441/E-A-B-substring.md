---
title: A > B substring
date: 2026-06-12
slug: 题解/Atcoder/ABC-441/E-A-B-substring
tags: [题解, 差分, 前缀和]
---

{/*truncate*/}

<h5>

不断偏移求和即可(真的不是在水，就是这么简单)

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

const int N=5e5+10;

int tree[N<<1];

int main()
{
//	freopen( "txt.in","r",stdin );
//	freopen( "txt.out","w",stdout );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	int n, m;
	string s;
	cin>>n>>s;
	s=" "+s;
	tree[n]=1, m=n;
	ll ans=0, query=0;
	for( int i=1;i<=n;i++ )
	{
		if( s[i] == 'A' ) query+=tree[++m-1];
		if( s[i] == 'B' ) query-=tree[--m];
		tree[m]++;
		ans+=query;
	} 
	cout<<ans;
	QWQ	  
}
```

</details>

<h5>

时间复杂度：$O(n)$

</h5>
