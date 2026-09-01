---
title: Random Tree Generation
date: 2026-03-04
slug: 题解/USACO/2026-Third-Gold/Random-Tree-Generation
tags: [题解, 数学, 树形DP, 换根DP]
---

{/*truncate*/}

<h4>

首先考虑总共的方案总数，第$i$次连边有$i-1$种选择，总方案数就是$(n-1)!$

再考虑合法的方案数，对于每个连接上的任一点，它成为所在任一子树上的第一条边的概率是$\frac{1}{siz_{子树}}$

而每个点又是相互独立的，所以以点$i$为根的一颗树他的概率就是$p_i=\prod_{i=\forall 子树} \frac{1}{siz_i}$

而答案就是$\frac{1}{(n-1)!}\times sum_{i=1}^{n}p_i$

这个我们可以先处理逆元然后对每个点为根跑一次树上$DP$解决，时间复杂度$O(tn^2)$

不难发现这份代码的瓶颈在于$O(n)$的对每个点跑一次树上$DP$求子树的$size$积

可以想到用换根$DP$解决这个问题，时间复杂度就能降到$O(tn)$

</h4>

```cpp
#include<bits/stdc++.h>
using namespace std;
#define QAQ return 
#define QWQ return 0;
#define ll long long
#define pii pair< int,int >

const int N=2e5+10;
const ll mod=1e9+7;

int head[N], ver[N<<1], nxt[N<<1], CNT;
inline void add( int x,int y )
{
	ver[++CNT]=y, nxt[CNT]=head[x], head[x]=CNT;
	ver[++CNT]=x, nxt[CNT]=head[y], head[y]=CNT;	
}

int n;
ll siz[N], f[N];
ll jc[N], inv[N], jc_inv[N];

inline void dfs( int x,int fa )//一次树上DP求出根的实际答案 
{
	siz[x]=1;
	for( int i=head[x];i;i=nxt[i] ) if( ver[i] != fa )
	{
		dfs( ver[i],x );
		siz[x]+=siz[ver[i]];
		( f[x]*=f[ver[i]] )%=mod;//先不处理到父亲这条边的贡献 
	}
	( f[x]*=inv[siz[x]] )%=mod;
}

inline void re_dfs( int x,int fa )//二次树上DP换根 
{
	for( int i=head[x];i;i=nxt[i] ) if( ver[i] != fa )
	{
		f[ver[i]]=f[x]*siz[ver[i]]%mod*inv[n-siz[ver[i]]]%mod;//思路就是再父亲节点的基础上少了ver[i]的子树多了另一方所有数这个子树 
		re_dfs( ver[i],x );	
	}
}

inline void sovel()
{
	cin>>n;
	CNT=0;
	for( int i=1;i<=n;i++ ) head[i]=0, f[i]=1;
	for( int i=1, x, y;i<n;i++ ) cin>>x>>y, add( x,y );
	dfs( 1,1 ), re_dfs( 1,1 );
	ll ans=0;
	for( int i=1;i<=n;i++ ) ( ans+=f[i] )%=mod;
	cout<<( ans*jc_inv[n-1] )%mod<<"\n";	
}

int main()
{
//	freopen( "txt.in","r",stdin );
//	freopen( "txt.out","w",stdout );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	jc[0]=1, jc[1]=1;
	inv[0]=0, inv[1]=1;
	jc_inv[0]=1, jc_inv[1]=1;
	for( int i=2;i<=2e5;i++ )
	{
		jc[i]=jc[i-1]*i%mod;
		inv[i]=( -mod/i*inv[mod%i]%mod+mod )%mod;
		jc_inv[i]=jc_inv[i-1]*inv[i]%mod;
	}
	int t;
	for( cin>>t;t;t-- ) sovel();
	QWQ	 
}
```