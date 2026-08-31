---
title: 「KDOI-06-S」消除序列
date: 2025-11-21
slug: 题解/洛谷-or-Nsoj/[KDOI-06-S]消除序列
tags: [题解, ST表, 线段树, 动态规划]
---

{/*truncate*/}

<h4>

今天模拟赛最舒服的一道题，在前期题读错的情况下还做到了$1h$内切掉，还是数据结构优化类的题目适合我

首先考虑我们最后得到的这个序列需要是一的下标的集合，也就是集合$P$

$p_1,p_2,p_3...$最后会使序列构成形如$100...1000...10...$的形式

又因为操作一会将前面所有的值覆盖掉(存在后效性)，所以启发我们逆序处理(学长有正序的，但是码比我长)

设当前这个点

</h4>

```cpp
/*
记录一个b操作的前缀和
每次从最后面的一个需要1的位置dre开始考虑，贪心的想，他的最优做法是要么1~dre覆盖完0再单点1结束再加上上步区间改的答案 
要么区间改0将子任务缩减，对于区间改0，考虑他的最优解加上上步的区间改的答案就是
因为我们要遍历集合内的每一点，所以总时间复杂度O(m)

为了方便我们实现从最后一个1开始能够遍历全数组所有可能，这里添加一个哨兵p[++m]=n+1，将他的c[n+1]=0就可以了 

我是SB！！！！！！！！！！！！！
没看完题意啊，操作一一定是1~dre区间改完，所以刚刚多想了好多东西
再理顺一遍
因为操作1存在后效性，所以我们考虑逆序处理本问题
记录当前这个点的下标为dre，上一个点的下标为lst，于是我们要处理区间[dre,lst-1]，我们这一步的操作分为以下两种
<1>找到区间上一个点进行操作1，再加上上次操作的贡献和剩下所有单点改1的贡献以及剩余点改0的贡献，结束
<2>区间全部单改，然后将这个问题转化到更小的子问题上 
操作2可以直接前缀和求得，考虑如何快速获得答案(logn级别)
考虑区间[l,r]，x, y\in [l,r]，若f(x) < f(y)，则 a[x]+sumb[r]-sumb[x] < a[y]+sumb[r]-sumb[y]
即对于每一组a[x]-sum[x] < a[y]-sum[y]，x更优
因为这个是定值，所以可以提前处理区间查询即可，若查询值为val，则总贡献为sumb[r]+val+变一贡献 
于是完成本题 
注意，在最后我们还要判断[1,p[1])这段改0的贡献，依旧区间查询求贡献以及区间单改的所有情况 

有史以来最顺的一次，只有第一组小样例错了一个，大样例全国，感觉能1H切T1 

3min找到错误，前缀和求错了，忘了减1
希望不要卡线段树的log，st表我是真不会写QAQ 
*/
#include<bits/stdc++.h>
using namespace std;
#define ll long long
#define pii pair< int,int >
#define QWQ return 0;

const int N=5e5+10;
const ll inf=1e18;

int a[N], b[N], c[N], p[N];
ll sumb[N], sumc[N];

struct segment_tree
{
	int l, r;
	ll val;
}st[N<<2];

void build( int p,int l,int r )
{
	st[p].l=l, st[p].r=r;
	if( l == r ){ st[p].val=a[l]-sumb[l]; return ; }
	int mid=l+r>>1;
	build( p<<1,l,mid );
	build( p<<1|1,mid+1,r );
	st[p].val=min( st[p<<1].val,st[p<<1|1].val );
}

ll query( int p,int l,int r )
{
	if( l <= st[p].l && st[p].r <= r ) return st[p].val;
	int mid=st[p].l+st[p].r>>1;
	ll res=inf;
	if( mid >= l ) res=min( res,query( p<<1,l,r ) );
	if( mid < r  ) res=min( res,query( p<<1|1,l,r ) );
	return res;
}

int main()
{
	freopen( "reserve.in","r",stdin );
	freopen( "reserve.out","w",stdout );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	int n;
	cin>>n;
	for( int i=1;i<=n;i++ ) cin>>a[i];
	for( int i=1;i<=n;i++ ) cin>>b[i], sumb[i]=sumb[i-1]+b[i];
	for( int i=1;i<=n;i++ ) cin>>c[i];
	build( 1,1,n );
	int q;
	cin>>q;
	for( int m;q;q-- )
	{
		cin>>m;
		for( int i=1;i<=m;i++ ) cin>>p[i], sumc[i]=sumc[i-1]+c[p[i]];
		int r=n;
		ll ans=inf;
		ll res=0;
		for( int i=m;i>=1;i-- )
		{
			int l=p[i];
			ll val=query( 1,l,r );
			ans=min( ans,sumb[r]+val+sumc[i]+res );
			res+=sumb[r]-sumb[l];
			r=l-1;
		}
		if( r >= 1 )
		{
			int l=1;
			ll val=query( 1,l,r );
			ans=min( ans,sumb[r]+val+res );
			res+=sumb[r]-sumb[l-1];
		}
		ans=min( ans,res );
		cout<<ans<<"\n";
	}
	QWQ
}
```