---
title: Concat Power of 2
date: 2026-05-25
slug: 题解/Atcoder/ABC-451/D-Concat-Power-of-2
tags: [题解, ABC, 搜索]
---

{/*truncate*/}

<h5>

首先可以想到范围内的数个数不会太多，于是$dfs$暴力构造即可

最后排个序就写完了

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

ll pow2[30], pow10[10];
map< ll,bool > vis;

vector< ll > good;

inline void dfs( ll num )
{
	if( vis[num] ) QAQ;
	vis[num]=true;
	good.push_back( num );
	ll nxt, n=log10( num )+1;
	for( int i=0;i<=30;i++ )
	{
		nxt=pow2[i]*pow10[n]+num;
		if( nxt <= 1e9  ){ dfs( nxt ); }
		else             break;
	}
}

int main()
{
//	freopen( "txt.in","r",stdin );
//	freopen( "txt.out","w",stdout );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	pow2[0]=1, pow10[0]=1;
	for( int i=1;i<=29;i++ ) pow2[i]=pow2[i-1]<<1;
	for( int i=1;i<=9;i++ ) pow10[i]=pow10[i-1]*10;
	for( int i=0;i<=29;i++ ) dfs( pow2[i] );
	sort( good.begin(),good.end() );
	int n;
	cin>>n;
	cout<<good[n-1];
	QWQ	  
}
```

</details>

<h5>

时间复杂度：$O(3e6)$

</h5>