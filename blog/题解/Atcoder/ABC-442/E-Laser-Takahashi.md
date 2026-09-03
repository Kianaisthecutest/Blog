---
title: Laser Takahashi
date: 2026-06-12
slug: 题解/Atcoder/ABC-442/E-Laser-Takahashi
tags: [题解, 排序, 离散化, 前缀和]
---

{/*truncate*/}

<h5>

又是讨厌的好想难写的题目

首先我们很容易想到需要按照一种方式排序，然后这样排序后就满足顺时针扫描的顺序，前缀和就可以解决了

然后讨厌的就是如何排序了(其实手动离散也挺讨厌的)，首先先把所有点归到$(x\div gcd(x,y),y\div gcd(x,y))$上，这样可以将同一条线上的点离散下来

然后先考虑上$x$轴上还是下，再根据斜率排就行了

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

struct position
{
	int x, y;
	
	bool operator< ( const position &p )const
	{
		int x1=x, y1=y;
		auto [x2,y2]=p;
		bool up1=( y1 > 0 || !y1 && x1 > 0 );
		bool up2=( y2 > 0 || !y2 && x2 > 0 );
		if( up1 != up2 ) QAQ up1 > up2;
		QAQ 1ll*x1*y2 > 1ll*x2*y1;
	}
	
}loc[N];

int cnt[N], idx[N], sum[N];
map< position,vector< int > > mp;
vector< position > dir;

int main()
{
//	freopen( "txt.in","r",stdin );
//	freopen( "txt.out","w",stdout );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	int n, q;
	cin>>n>>q;
	for( int i=1, x, y;i<=n;i++ ) 
	{
		cin>>x>>y;
		int gcd=__gcd( abs( x ),abs( y ) );
		if( gcd ) x/=gcd, y/=gcd;
		if( mp.find( { x,y } ) == mp.end() ) dir.push_back( { x,y } );
		mp[{ x,y }].push_back( i );
	}
	sort( dir.begin(),dir.end() );
	for( int i=0;i<dir.size();i++ )
	{
		cnt[i+1]=mp[dir[i]].size();
		for( auto &j:mp[dir[i]] ) idx[j]=i+1;
	}
	for( int i=1;i<=dir.size();i++ ) sum[i]=sum[i-1]+cnt[i];
	for( int i=1, a, b;i<=q;i++ )
	{
		cin>>a>>b;
		int x=idx[a], y=idx[b];
		if( x == y )     cout<<cnt[x]<<"\n";
		else if( x > y ) cout<<sum[x]-sum[y-1]<<"\n";
		else             cout<<sum[dir.size()]+sum[x]-sum[y-1]<<"\n";
	}
	QWQ	  
}
```

</details>

<h5>

时间复杂度：$O(nlogn)$

</h5>