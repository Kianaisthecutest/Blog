---
title: 「KDOI-06-S」树上异或
date: 2025-11-12
slug: 题解/洛谷-or-Nsoj/[KDOI-06-S]树上异或
tags: [题解, 树形DP, 二进制]
---

{/*truncate*/}

<h4>

唉，今天模拟赛时瞪了$2h$没想到写法还因为忘取模导致暴力也没分了，$T2$爆零真是我上午分低的重要原因，因为先改完本题(甚至是自己写的)且思路清晰所以就先来改这个了，待会再补$T1$的题解

首先这道题大家应该都能想到是一个树上$DP$并且可以瞪出来$\sum \prod \oplus c_i$很像树形背包的$\sum c_i$(好吧我没想到背包)

所以可以先写一下较暴力的$44pts$，即设计状态$f_{p,x}$为以$p$为根的子树中的异或和为$x$的答案

转移方程就可以易得$f_{p,k}=\sum_{i\uplus j=k} f[p][i]\times f[x][j]+\sum_{i=0}^{V} f[p][k]+i\times f[x][i]$(前面式子考虑不断边，后面考虑断边，$V$是值域)

时间复杂度是$O(nV^2)$，空间复杂度$O(nV)$，这样就已经可以拿到$44pts$了

这时候我们发现时间和空间都爆炸了，所以考虑如何优化

因为我们做的是异或运算，所以其实每次操作后的对应位只和转移过程中的两个对应位有关

例如转移前$a$的第$i$位是$A$，$b$的第$i$位是$B$，则转移后得到数的第$i$位为$A$^$B$，与其他位无关

这就启发我们拆位进行运算

所以设计状态$f_{p,i,k}$表示以$p$为根的子树在第$i$位是$k$情况下的答案

考虑如何转移改点的权值和的数组，因为每个$f_{p,i,k}=x$能给第$i$位提供$x$的贡献，所以$xorsum_p=\sum_{i=0}^{LOGV} 2^i\times f_{p,i,1}$

所以我们也就可以转移$f_{p,i,k}$了，因为$0=0$^$0=1$^$1，1=0$^$1=1$^$0$，所以可以直接对应位转移过来

</h4>

```cpp
#include<bits/stdc++.h>
using namespace std;
#define ll long long
#define pii pair< int,int >
#define QWQ return 0;

const int N=5e5+10, LOGV=60, mod=998244353;

ll val[N], xorsum[N];
ll f[N][LOGV][2];
vector< int > rode[N];

void dfs( int p,int fa )
{
	for( int i=0;i<LOGV;i++ ) f[p][i][( val[p]>>i )&1]=1;//赋初始值，即原val值对应位i上是0/1数组的 [i][0/1]=1
	for( auto &x:rode[p] )
	{
		if( x == fa ) continue;
		dfs( x,p );
		for( int i=0;i<LOGV;i++ )//每一位依次转移 
		{
			ll f0=f[p][i][0], f1=f[p][i][1];//先记录数组的值，因为转移过程是该变两个的值导致现在的值失去转移意义 
			f[p][i][0]=( f0*f[x][i][0]+f1*f[x][i][1]+f0*xorsum[x] )%mod;//分别是(0^0)+(1^1)+(0+断边) 
			f[p][i][1]=( f1*f[x][i][0]+f0*f[x][i][1]+f1*xorsum[x] )%mod;//分别是(0^1)+(1^0)+(1+断边) 
		}
	}
	for( int i=0;i<LOGV;i++ ) ( xorsum[p]+=( 1ll<<i )%mod*f[p][i][1] )%=mod;//计算该点得到的权值和 
}
                                                                                                                          
int main()
{
//	freopen( "xor.in","r",stdin );
//	freopen( "xor.out","w",stdout );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	srand( time( 0 ) );
	int n;
	cin>>n;
	for( int i=1;i<=n;i++ ) cin>>val[i];
	for( int u=2, v;u<=n;u++ )
		cin>>v,
		rode[u].push_back( v ), rode[v].push_back( u );
	dfs( 1,0 );
	cout<<xorsum[1];
	QWQ
}
```