---
title: 琪亚娜与OSU
date: 2026-10-26
slug: 题解/洛谷-or-Nsoj/琪亚娜与OI比赛/F-琪亚娜与OSU
tags: [题解, 数学, 组合数学, 欧拉定理, Lucas定理, 中国剩余定理CRT]
---

{/*truncate*/}

<h5>

每次的不断进行 $x -> (x+d)\mod N$ 本质上就是一个置换环，那么形成的环数就是 $gcd( N,d )$。

因此，引子印合法当且仅当 $gcd⁡( N,d )=d$，也就是 $d\mid N$。

那么对于一个 $d$，它得到的方案数就是 $\binom{N}{d}$，因此合法琪谱数量就是 $\sum_{d\mid N}\binom{N}{d}$。

每张琪谱独立选择 $Q$ 中主题，那么我们要求的答案就是 $q^{\sum_{d\mid N}\binom{N}{d}}\mod M$。

那么我们先使用一次欧拉定理，另 $x=\sum_{d\mid N}\binom{N}{d}$，因为我们可以知道 $q^{M-1}\equiv 1(\mod M)$。

那么分解得到 $q^x=(q^{M-1})^y\times q^z$，因为 $q^{M-1}\mod M=1, x=(M-1)\times y+z$，所以 $q^x\equiv (q^z=q^{x\mod (M-1)})(\mod M-1)$。

最终得到 $q^{\sum_{d\mid N}\binom{N}{d}}\equiv q^{\sum_{d\mid N}\binom{N}{d}\mod M-1} (\mod M)$。

将上面这一坨拉下来 $\sum_{d\mid N}\binom{N}{d}\mod M-1$，因为我们规定了 $|\mu M|=1$，我们就可以快乐的分解 $M-1$ 的质因数做 $CRT$ 了。

那么我们如何在不爆炸的时间内求解 $\binom{N}{d}\mod prime$ 呢？

因为 $N,d$ 的量级很大，显然我们是无法处理逆元来快速计算这个式子的......吗？

因为我们分解出来已经保证这个模数是质数了，我们就能想到利用 $Lucas$ 定理来减小计算的量级，我们就可以解决了。

时间复杂度：$O(maxprime\times \log n+\sqrt{n}+\tau(n)\log^2 n)$。

</h5>

```cpp
#include<bits/stdc++.h>
using namespace std;
#define ll long long
#define pii pair< int,int >
#define QWQ return 0;
#define QAQ return

const int N=40, M=2e6+10, upper=2e6;

int siz, p[N];
ll sum[N];
ll jc[N][M], inv[N][M], jc_inv[N][M];

inline ll quick_power( ll a,ll b,ll mod )
{
	ll ans=1, base=a%mod;
	while( b )
	{
		if( b&1 ) ( ans*=base )%=mod;
		( base*=base )%=mod; b>>=1;
	}
	QAQ ans;
}

inline void init()
{
	for( int i=1;i<=siz;i++ )
	{
		jc[i][0]=1, jc[i][1]=1;
		inv[i][0]=0, inv[i][1]=1;
		jc_inv[i][0]=1, jc_inv[i][1]=1;
		for( int j=2;j<=upper;j++ )
			jc[i][j]=jc[i][j-1]*j%p[i],
			inv[i][j]=-1ll*p[i]/j*inv[i][p[i]%j]%p[i],
			jc_inv[i][j]=jc_inv[i][j-1]*inv[i][j]%p[i];
	}
}

inline ll C( ll n,ll m,int idx )
{
	if( n < m ) QAQ 0ll;
	QAQ jc[idx][n]*jc_inv[idx][m]%p[idx]*jc_inv[idx][n-m]%p[idx];
}

inline ll Lucas( ll n,ll m,int idx )
{
	if( n < p[idx] && m < p[idx] ) QAQ C( n,m,idx );
    QAQ C( n%p[idx],m%p[idx],idx )*Lucas( n/p[idx],m/p[idx],idx )%p[idx];
}

inline ll CRT()
{
	ll T=1, ans=0;
    for( int i=1;i<=siz;i++ ) T=T*p[i];
    for( int i=1;i<=siz;i++ ) ( ans+=T/p[i]*sum[i]%T*quick_power( T/p[i],p[i]-2ll,p[i] )%T )%=T;
    QAQ ( ans%T+T )%T;
}

int main()
{
    // freopen( "big_sample2.in","r",stdin );
    // freopen( "big_sample2.out","w",stdout );
    ios::sync_with_stdio( false );
    cin.tie( nullptr ); cout.tie( nullptr );
	ll n, q;
	int m;
	cin>>n>>q>>m;
	if( q%m == 0 )
	{ cout<<0; QWQ }
	int tmp=m-1;
	for( int i=2;i*i<=tmp;i++ ) if( tmp%i == 0 )
		p[++siz]=i, tmp/=i;
	if( tmp > 1 ) p[++siz]=tmp;
	init();
	for( ll i=1;i*i<=n;i++ )if( n%i == 0 )
	{
		               for( int j=1;j<=siz;j++ ) ( sum[j]+=Lucas( n,  i,j ) )%=p[j];
		if( i*i != n ) for( int j=1;j<=siz;j++ ) ( sum[j]+=Lucas( n,n/i,j ) )%=p[j];
	}
	cout<<quick_power( q,CRT(),m );
    QWQ
}
```