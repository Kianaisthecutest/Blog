---
title: Forbidden List 2
date: 2026-06-12
slug: 题解/Atcoder/ABC-441/D-Forbidden-List-2
tags: [题解, 搜索]
---

{/*truncate*/}

<h5>

每个点的出边只有$4$个且最深深度只有$10$，所以直接暴搜即可

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

struct value
{
	int p, dis, goes;
};

vector< pii > rode[N];

int main()
{
//	freopen( "txt.in","r",stdin );
//	freopen( "txt.out","w",stdout );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	int n, m, l, s, t;
	cin>>n>>m>>l>>s>>t;
	for( int i=1, u, v, c;i<=m;i++ )
	{
		cin>>u>>v>>c;
		rode[u].push_back( { v,c } );
	}
	vector< int > ans;
	queue< value > q;
	q.push( { 1,0,0 } );
	while( !q.empty() )
	{
		auto [x,dis,goes]=q.front();
		q.pop();
		if( goes == l )
		{
			if( s <= dis ) ans.push_back( x );
			continue;
		}
		for( auto &[y,w]:rode[x] ) if( dis+w <= t ) q.push( { y,dis+w,goes+1 } );
	}
	sort( ans.begin(),ans.end() );
	ans.erase( unique( ans.begin(),ans.end() ),ans.end() );
	for( auto &x:ans ) cout<<x<<" ";
	QWQ	  
}
```

</details>

<h5>

时间复杂度：最劣$O(4^{10})$

</h5>
