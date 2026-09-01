---
title: Chalkboard Median
date: 2026-05-22
slug: 题解/Atcoder/ABC-458/D-Chalkboard-Median
tags: [题解, ABC, 优先队列]
---

{/*truncate*/}

<h5>

动态中位数模板，对顶堆维护即可

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


priority_queue< int > small;
priority_queue< int,vector< int >,greater< int > > big;

inline void add( int x )
{
	if( x >= small.top() ) big.push( x );
	else                   small.push( x );
	if( small.size() == big.size()+2 ) big.push( small.top() ), small.pop();
	if( big.size() == small.size()+1 ) small.push( big.top() ), big.pop();
}

int main()
{
//	freopen( "txt.in","r",stdin );
//	freopen( "txt.out","w",stdout );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	int x, y;
	cin>>x;
	small.push( x );
	int q;
	for( cin>>q;q;q-- )
	{
		cin>>x>>y;
		add( x );
		add( y );
		cout<<small.top()<<"\n";
	}
	QWQ	 
}
```

</details>

<h5>

时间复杂度：$O(n)$

</h5>