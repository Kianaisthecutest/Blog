---
title: Interval Inversion Count
date: 2026-05-24
slug: 题解/Atcoder/ABC-452/F-Interval-Inversion-Count
tags: [题解, ABC, 树状数组]
---

{/*truncate*/}

<h5>

首先我们先固定一个左端点$l$，考虑计算以$l$为左端点的合法区间数

定义$r1,r2$分别代表满足区间逆序对小于$k$和小于等于$k$的最大右端点

容易由逆序对次数单调性得到方案数为$r2-r1$

再考虑能不能从上一个状态$l$转移到下一个状态$l+1$，同样的根据单调性可以得到这样是可以的

于是每个点最多入树状数组一次和删除一次，达到均摊$O(nlogn)$

</h5>

<summary><h3>AC代码</h3></summary>
<details>
	
```cpp
/*
逆序处理找到以每个点为终止点时候的极小满足条件的区间
再继续后移找到极大区间，做差即可得到一个答案 
*/
#include<bits/stdc++.h>
using namespace std;
#define QAQ return 
#define QWQ return 0;
#define ll long long
#define pii pair< int,int >

const int N=5e5+10;

int n;
int p[N];
int tree[N];
int Max[N], Min[N];

inline int lowbit( int x ){ QAQ x&-x; }

inline void add( int x,int y ){ for( ;x<=n;x+=lowbit( x ) ) tree[x]+=y; }

inline int query( int x )
{
	int ans=0;
	for( ;x;x-=lowbit( x ) ) ans+=tree[x];
	QAQ ans;
}

int main()
{
//	freopen( "txt.in","r",stdin );
//	freopen( "txt.out","w",stdout );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	ll k;
	cin>>n>>k;
	for( int i=1;i<=n;i++ ) cin>>p[i];
	int l=1;
	ll sum=0;
	for( int r=1;r<=n;r++ )
	{
		sum+=query( n )-query( p[r] ); add( p[r],1 );
		while( sum > k ) add( p[l],-1 ), sum-=query( p[l++] );
		Min[r]=l;
	}
	l=1; sum=0;
  	memset( tree,0,sizeof tree );
  	for( int r=1;r<=n;r++ )
	{
		sum+=query( n )-query( p[r] ); add( p[r],1 );
		while( l <= r && sum >= k ) add( p[l],-1 ), sum-=query( p[l++] );
		Max[r]=l;
	}
	ll ans=0;
	for( int i=1;i<=n;i++ ) ans+=Max[i]-Min[i];
	cout<<ans;
	QWQ	  
}
```

</details>

<h5>

时间复杂度：$O(nlogn)$，瓶颈在于树状数组

</h5>
