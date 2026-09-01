---
title: Mode in the Subtree
date: 2026-05-06
slug: 题解/Atcoder/ABC-454/G-Mode-in-the-Subtree
tags: [题解, ABC, 重链剖分, 启发式合并]
---

{/*truncate*/}

<h5>

这道题的方法确实是第一次见了，$dsu\ on\ tree$树上启发式合并解决

首先我们容易想到可以开桶对每颗子树单独操作，然后将子树贡献加到根上

但是这样无论是时间复杂度还是空间复杂度都是$O(n^2)$的，肯定无法通过本题

先考虑启发式合并，每次子树合并的时候我们考虑暴力将数据较少的部分加到较多的部分

因为每次相加得到的部分的大小至少翻倍，所以合并变为$logn$级别

但是因为要实现合并要开多个数组且需要使用大常熟哈希表，所以还是无论是时间还是空间都无法通过本题

于是考虑树的性质，对树进行重链剖分，将重链作为主要部分，只删除轻链及其贡献

因为遍历每个轻儿子到根的距离至多为$O(logn)$，所以还是保证了$O(nlogn)$的复杂度

并且因为我们将重链视为基础，所以只需要开一个整体桶进行增加和删除操作就可以实现目的

这样子无论是时间还是空间上都可以通过了

本题的启发在于未来在遇到多个集合的合并操作时可以尝试启发式合并

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

const int N=2.5e6+10, mod=998244353;

int head[N], ver[N], nxt[N], CNT;
inline void add( int x,int y )
{ ver[++CNT]=y, nxt[CNT]=head[x], head[x]=CNT; }

int p[N], c[N];
int siz[N], mson[N];
int mp[N];
int ans, maxn, maxcnt;

inline void add( int p )
{
	if( ++mp[c[p]] > maxn )     maxn=mp[c[p]], maxcnt=1;
	else if( mp[c[p]] == maxn ) maxcnt++;
	for( int i=head[p];i;i=nxt[i] ) add( ver[i] );
}

inline void del( int p )
{
	mp[c[p]]=0;
	for( int i=head[p];i;i=nxt[i] ) del( ver[i] );
}

inline void dfs( int p,bool clear )
{
	for( int i=head[p];i;i=nxt[i] ) if( ver[i] != mson[p] ) dfs( ver[i],true );
	if( mson[p] ) dfs( mson[p],false );
	for( int i=head[p];i;i=nxt[i] ) if( ver[i] != mson[p] ) add( ver[i] );
	if( ++mp[c[p]] > maxn )     maxn=mp[c[p]], maxcnt=1;
	else if( mp[c[p]] == maxn ) maxcnt++;
	( ans+=1ll*( maxn^p )*( maxcnt^p )%mod )%=mod;
	if( clear ) del( p ), maxn=maxcnt=0;
}

int main()
{
//	freopen( "txt.in","r",stdin );
//	freopen( "txt.out","w",stdout );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	int n, seed, m, f;
	cin>>n>>seed>>m>>f;
	for( int i=2;i<=m;i++ ) cin>>p[i];
	for( int i=m+1;i<=n;i++ )
		p[i]=( seed%( i-1 ) )+1,
		seed=( seed*1103515245ll+12345 )%( 1ll<<31 );
	for( int i=1;i<=m;i++ ) cin>>c[i];
	for( int i=m+1;i<=n;i++ )
		c[i]=( seed%f )+1,
		seed=( seed*1103515245ll+12345 )%( 1ll<<31 );
	for( int i=n;i>=1;i-- )
	{
		siz[i]++; siz[p[i]]+=siz[i];
		if( siz[mson[p[i]]] < siz[i] ) mson[p[i]]=i;
	}
	for( int i=2;i<=n;i++ ) add( p[i],i );
	dfs( 1,false );
	cout<<ans;
	QWQ
}
```

</details>

<h5>

时间复杂度：$O(nlogn)$，瓶颈在于重链剖分后的树上启发式合并

</h5>
