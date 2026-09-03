---
title: Egoism
date: 2026-06-12
slug: 题解/Atcoder/ABC-440/F-Egoism
tags: [题解, 平衡树, 线段树, 二分]
---

{/*truncate*/}

<h5>

我们可以将式子简化为$所有的和+想要它翻倍的和$，于是可以贪心的想到我们要把最大的数去翻倍

但是如果最大的全部是$2$马也不行，无法让每个都翻倍，至少要一个$1$马，所以要将最小的$2$换成最大的$1$

线段树上二分+$set$处理

</h5>

<summary><h3>AC代码</h3></summary>
<details>
	
```cpp
#include<bits/stdc++.h>
using namespace std;
#define QAQ return
#define QWQ return 0;
#define int long long
#define ll long long
#define pii pair< ll,ll >

const int N=2e5+10, M=1e6+10, maxa=1e6;
const ll inf=1e18;

int res;
int a[N], b[N];

struct segment_tree
{
	int sum1[M<<2],sum2[M<<2],cnt[M<<2],mins[M<<2];
	
	inline void change( int p,int l,int r,int x,int v,int o )
	{
		if( l == r )
		{ 
			sum1[p]+=v;
			sum2[p]+=v*l;
			cnt[p]+=o;
			mins[p]=inf;
			if( sum1[p]-cnt[p] ) mins[p]=l;
			QAQ; 
		}
		int mid=l+r>>1;
		if( x <= mid ) change( p<<1,l,mid,x,v,o );
		else           change( p<<1|1,mid+1,r,x,v,o );
		sum1[p]=sum1[p<<1]+sum1[p<<1|1];
		sum2[p]=sum2[p<<1]+sum2[p<<1|1];
		cnt[p]=cnt[p<<1]+cnt[p<<1|1];
		mins[p]=min( mins[p<<1],mins[p<<1|1] );
	}
	
	inline pii query( int p,int l,int r,int x )
	{
		if( l == r )
		{
			if( !cnt[p] ) res=min( res,l );
			QAQ { l*x,min( cnt[p],x ) };
		}
		int mid=l+r>>1;
		if( sum1[p<<1|1] >= x ) QAQ query( p<<1|1,mid+1,r,x );
		auto [v1,v2]=query( p<<1,l,mid,x-sum1[p<<1|1] );
		res=min( res,mins[p<<1|1] );
		QAQ { sum2[p<<1|1]+v1,cnt[p<<1|1]+v2 };
	}
	
}st;

signed main()
{
//	freopen( "txt.in","r",stdin );
//	freopen( "txt.out","w",stdout );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	for( int i=0;i<=( maxa<<2 );i++ ) st.mins[i]=inf;
	int n, q;
	cin>>n>>q;
	int sum=0, cnt=0;
	multiset< int > s;
	for( int i=1;i<=n;i++ )
	{
		cin>>a[i]>>b[i];
		cnt+=b[i]-1; sum+=a[i];
		st.change( 1,1,maxa,a[i],1,2-b[i] );
		if( b[i] == 1 ) s.insert( a[i] );
	}
	s.insert( 0 ); 
	for( int i=1, w, x, y;i<=q;i++ )
	{
		cin>>w>>x>>y;
		int del=0, add=0;
		if( b[w] == 1 ) s.erase( s.lower_bound( a[w] ) ), del--;
		if( y == 1 ) s.insert( x ), add++;
		if( b[w] == 2 && y == 1 ) cnt--;
		if( b[w] == 1 && y == 2 ) cnt++;
		sum+=x-a[w];
		st.change( 1,1,maxa,a[w],-1,del ); st.change( 1,1,maxa,x,1,add );
		a[w]=x, b[w]=y;
		res=inf;
		auto [v1,v2]=st.query( 1,1,maxa,cnt );
		int ans=v1+sum;
		if( !v2 && cnt )
		{
			ans-=res;
			if( cnt < n ) ans+=*prev( s.end() );
		}
		cout<<ans<<"\n";
	}
	QWQ
}

```

</details>

<h5>

时间复杂度：$O(nlogn)$

</h5>