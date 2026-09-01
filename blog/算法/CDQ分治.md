---
title: CDQ分治
date: 2026-01-16
slug: 算法/CDQ分治
tags: [算法, CDQ分治]
---

{/*truncate*/}

## <font color="#39C5BB">1.来源</font>

<h4>

本算法是由$2008\ NOI$金牌得主陈丹琦老师最先整理的，它通过分治的方法将二维线段树（树套树问题）降维到一维

一般用于解决三维偏序问题可用于优化$DP$（部分斜优的方法）和将动态问题离线化为静态问题

</h4>

***

## <font color="#39C5BB">2.例题及算法核心</font>

<h4>

既然都说了常用于解决三维偏序问题，那么模板也无疑是「模板」三维偏序了

首先先回顾一下我们是如何解决二维偏序问题（x和y均小于）的，就是先将它们按照一个关键字排序降维后利用树状数组求解

~~tips：其实就是未排序的逆序对问题~~

具体代码如下，记不到的可以回忆一下

</h4>

<details>

```cpp
struct value
{
	int x, y;
	int idx;
}val[N];

int tree[N], ans[N];

int lowbit( int x ){ return x&-x; }
void add( int x,int y ){ for( ;x<=上界;x+=lowbit( x ) ) tree[x]+=y; }

int query( int x )
{
	ll ans=0;
	for( ;x;x-=lowbit( x ) ) ans+=tree[x];
	return ans;
}

sort( val+1,val+n+1,[]( const value &a,const value &b )
{
	return a.x < b.x;	
} );
for( int i=1;i<=n;i++ ) ans[val[i].idx]+=query( val[i].y ), add( val[i].y,1 );
for( int i=1;i<=n;i++ ) cout<<ans[i]<<" ";
```

</details>

<h4>

回到三维偏序问题，现在我们的问题在于多了一维，即使排序后也会存在两维是无序的

根据二维偏序我们可以得到“降维”这个启发，也就是一次排序可以降一维，但是我们还需要降一维

CDQ分治的思想就是不断地把点对通过递归的方式分给左右两个区间实现二次降维，具体操作如下：

在一次排序保证了第一维的单调性后再通过递归分段的方式在保证左右两段的第一维的大小性质的情况下降维

然后再双指针加入满足第二维的所有值，最后树状数组查询即可

具体实现请看代码

</h4>

```cpp
#include<bits/stdc++.h>
using namespace std;
#define ll long long
#define pii pair< int,int >
#define QAQ return ;
#define QWQ return 0;
#define TAT return

const int N=1e5+10, M=2e5+10;

struct value
{
	int a, b, c;
	int tim, ans;
	
	value()
	{
		tim=ans=0;
	}
	
	bool operator !=( const value &x )
	{
		return ( ( a != x.a ) || ( b != x.b ) || ( c != x.c ) );
	}
	
}A[N], tmp[N];

istream& operator >>( istream& is,value &val )
{
	is>>val.a>>val.b>>val.c;
    return is;
}

int f[N], tree[M];

int lowbit( int x ){ return x&-x; }
void add( int x,int y ){ for( ;x<=2e5;x+=lowbit( x ) ) tree[x]+=y; }

int query( int x )
{
	int ans=0;
	for( ;x;x-=lowbit( x ) ) ans+=tree[x];
	return ans;
}

void CDQ( int l,int r )
{	
	if( l == r ) QAQ//仅剩一个数 
	int mid=l+r>>1;
	CDQ( l,mid ); CDQ( mid+1,r );//经典对半分治 
	
	//二次排序，此时可以保证左边数的第一维小于等于右边数的第一维，实现降维的目的 
	sort( A+l,A+mid+1,[]( const value &x,const value &y ) 
	{
		if( x.b == y.b ) return x.c < y.c;
		return x.b < y.b;	
	} );
	sort( A+mid+1,A+r+1,[]( const value &x,const value &y )
	{
		if( x.b == y.b ) return x.c < y.c;
		return x.b < y.b;	
	} );
	
	int it1=l-1;
	for( int it2=mid+1;it2<=r;it2++ )
	{
		while( it1+1 <= mid && A[it1+1].b <= A[it2].b ) it1++, add( A[it1].c,A[it1].tim );//双指针再扫描出左边所有第二维小于等于该数第二维的 
		A[it2].ans+=query( A[it2].c );
	}
	for( ;it1>=l;it1-- ) add( A[it1].c,-A[it1].tim );//回溯树状数组 
}

int main()
{
//	freopen( "txt.in","r",stdin );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	int n=0, m, k;
	cin>>m>>k;
	for( int i=1;i<=m;i++ ) cin>>tmp[i];
	sort( tmp+1,tmp+m+1,[]( const value &x,const value &y )//一次排序 
	{
		if( x.a == y.a )
		{
			if( x.b == y.b ) return x.c < y.c;
			return x.b < y.b;	
		} 
		return x.a < y.a;
	} );
	int t=0;
	for( int i=1;i<=m;i++ )//神秘离散化 
	{
		t++;
		if( tmp[i] != tmp[i+1] ) A[++n]=tmp[i], A[n].tim=t, t=0;
	}
	CDQ( 1,n );
	for( int i=1;i<=n;i++ ) f[A[i].ans+A[i].tim-1]+=A[i].tim;
	for( int i=0;i<m;i++ ) cout<<f[i]<<"\n";
	QWQ 
}
```

***

## <font color="#39C5BB">3.时间复杂度及推论</font>

<h4>

很容易就可以得到该代码的时间复杂度是分治+树状数组=$O(nlog^2n)$

我们再思考一下CDQ分治解决更高维的偏序问题的时间复杂度

不难想到我们只需要增加一次向内的分治就可以再次实现降维，复杂度就是再次加个$log$的事情

所以得到推论：对于$m$维偏序问题，CDQ分治可以在$O(nlog^{m-1}n)$是时间内解决

</h4>