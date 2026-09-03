---
title: Reconstruct Chocolate
date: 2026-06-14
slug: 题解/Atcoder/ABC-445/D-Reconstruct-Chocolate
tags: [题解, 模拟]
---

{/*truncate*/}

<h5>

因为每次是直接断裂成两块，所以如果考虑从初状态转移，则一定存在一块的宽或高等于目前剩余的矩形

并且容易想到，我们剩余的这个矩形是不断变小的，所以每次只需要看剩余的最大宽或最大高即可

</h5>

<summary><h3>AC代码</h3></summary>
<details>
	
```cpp
/*
从左下角开始，优先填充较大的 
即优先思考从边线开始选择长度较大的部分去将它转化为一个较小的子矩形 
不断向上枚举是否合法 
*/
#include<bits/stdc++.h>
using namespace std;
#define QAQ return 
#define QWQ return 0;
#define ll long long
#define pii pair< int,int >

const int N=2e5+10;

struct value
{
	int h, w, idx;
	
	bool operator< ( const value &x )const
	{
		if( h == x.h ) QAQ w < x.w;
		QAQ h < x.h;
	}
	
};

pii ans[N];
bool vis[N];

int main()
{
//	freopen( "txt.in","r",stdin );
//	freopen( "txt.out","w",stdout );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	int H, W, n; 
	cin>>H>>W>>n;
	priority_queue< value > ph, pw; 
	for( int i=1, h, w;i<=n;i++ ) cin>>h>>w, ph.push( { h,w,i } ), pw.push( { w,h,i } );
	int nh=H, nw=W;
	for( int i=1;i<=n;i++ )
	{
		while( !ph.empty() && vis[ph.top().idx] ) ph.pop();
		while( !pw.empty() && vis[pw.top().idx] ) pw.pop();
		auto [h1,w1,idx1]=ph.top();
		auto [h2,w2,idx2]=pw.top();
    	if( h1 == nh )      ans[idx1]={ H-nh+1,W-nw+1 }, nw-=w1, vis[idx1]=true, ph.pop();
		else if( h2 == nw ) ans[idx2]={ H-nh+1,W-nw+1 }, nh-=w2, vis[idx2]=true, pw.pop();
	}
	for( int i=1;i<=n;i++ ) cout<<ans[i].first<<" "<<ans[i].second<<"\n";
	QWQ	  
}
```

</details>

<h5>

时间复杂度：$O(nlogn)$

</h5>