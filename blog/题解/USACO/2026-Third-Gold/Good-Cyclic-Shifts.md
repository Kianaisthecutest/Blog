---
title: Good Cyclic Shifts
date: 2026-03-04
slug: 题解/USACO/2026-Third-Gold/Good-Cyclic-Shifts
tags: [题解, 树状数组]
---

{/*truncate*/}

<h4>

首先易得邻项交换的次数是逆序对个数，只需要满足逆序对个数$\leq f$就是可以的一组循环位移

设逆序对数为$re$，考虑如何快速的转移$re$和$f$

$re$是好转移的，每次我们将一个数$x$从最后移到最前面，逆序对变化的数量取决于变化的两个位置之间的小于和大于它的数的个数

又因为我们是从最后移到最前且序列是一个排列，所以该区间小于它的数的个数就是$x-1$，大于它的个数是$n-x$

所以$re$就可以$O(1)$的转移，$re=re-(n-x)+(x-1)=re-n+( x<<1 )-1$

再考虑如何转移$f$，这是个十分经典的$trick$，即去绝对值讨论正负性

每次位移后，现在的$p_i$~$p_{n-1}$的对应的$i$都会加一，这时候所以原本的差$p_i-i\le 0$的所有数会使对应的绝对值加一，$p_i-i\gt 0$的所有数会使对应的绝对值减一

这个我们可以用树状数组处理，对应的差值下标加一就行了，而$p_n$单独操作就完了

所以每一轮$f$的转移就是$f=f-abs( p_n-n )+abs( p_n-1 )+ask( 0 )-( ask( n )-ask( 0 ) )$

为了方便处理，我们不妨将下标全部加上$n$，就不存在负数了，时间复杂度$O(tnlogn)$

</h4>

```cpp
/*
首先我们知道，一个数列的交换次数是逆序对的数量
如果一个排列是好的，只需要保证 逆序对数 <= f 
最暴力的方法就是 O(tn^2logn)，每次重新计算逆序对和 f
瓶颈就在于这里，考虑如何优化到 O(1或logn) 转移 
首先是逆序对，将一个数 x 从结尾换到开头逆序对的变化量是 -( n-x )+( x-1 )=-n+2x-1，复杂度变为O(t( nlogn+n^2 )) 
其次是 f，先处理一个记录不同差值所在的点的个数的数组，每次操作我们先删除第一个点所在的那个点的一个贡献
ans会+寻找小于等于0的个数-寻找大于0的个数+abs(换到第一个数上的新数的新贡献)
每次操作后相当于剩下的所有数的对应差值+1，记录差值最后还原即可 
处理不了负下标所以全部值+n 

写炸了，思考能不能更简单的维护这个东西，因为我们已知是下标不断+1，所以是原本的正数-1，负数+1，写错了草 
*/ 
#include<bits/stdc++.h>
using namespace std;
#define QAQ return 
#define QWQ return 0;
#define ll long long
#define pii pair< int,int >

const int N=2e5+10;

int n;
int p[N];
ll tree[N], del[N<<1];

inline ll lowbit( ll x ){ return x&-x; }

inline void add( int x,ll y ){ for( ;x<=n && x;x+=lowbit( x ) ) tree[x]+=y; }
inline ll ask( int x )
{
	ll ans=0;
	for( ;x;x-=lowbit( x ) ) ans+=tree[x];
	return ans;
}

inline void adddel( int x,ll y ){ for( ;x<=( n<<1 ) && x;x+=lowbit( x ) ) del[x]+=y; }
inline ll askdel( int x )
{
	ll ans=0;
	for( ;x;x-=lowbit( x ) ) ans+=del[x];
	return ans;
}

inline void sovel()
{
	cin>>n;
	for( int i=0;i<=n;i++ ) tree[i]=0, del[i]=del[i+n]=0;
	for( int i=1;i<=n;i++ ) cin>>p[i];
	ll re=0, f=0;
	//计算不交换时的逆序对的数量和 f 值 
	for( int i=n;i>=1;i-- ) add( p[i],1 ), re+=ask( p[i]-1 );
	for( int i=1;i<=n;i++ ) adddel( p[i]-i+n,1 ), f+=abs( p[i]-i );
	
	vector< int > ans;
	
	if( re <= ( f>>1 ) ) ans.push_back( 0 );
		
	//计算每一轮后的变化 
	//该轮会将第 n-i+1 个数操作到最前面 
	for( int i=1;i<n;i++ )
	{
		int pos=n-i+1;//当前实际操作的数据
		int x=p[pos];//操作数据的具体值
		re=re-n+( x<<1 )-1;//更新逆序对数量
		adddel( x-pos+n,-1 );//特殊处理pos这个位置上的值，先删去原贡献
		f-=abs( x-n );
		f=f-askdel( n<<1 )+( askdel( n+i-1 )<<1 );//在第i轮相当于所有的差值减去了i-1，在原树状数组上查询贡献
		f+=abs( x-1 );
		adddel( min( x-1+n+i,n<<1 ),1 );//插入新的贡献，注意要+i还原每轮的-1
		if( re <= ( f>>1 ) ) ans.push_back( i );	
	}
	cout<<ans.size()<<"\n";
	for( auto &x:ans ) cout<<x<<" ";
	cout<<"\n";
} 

int main()
{
//	freopen( "data.in","r",stdin );
//	freopen( "txt.out","w",stdout );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	int t;
	for( cin>>t;t;t-- ) sovel();
	QWQ	 
}
```
