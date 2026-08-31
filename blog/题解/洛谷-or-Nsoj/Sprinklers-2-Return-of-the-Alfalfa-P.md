---
title: Sprinklers 2 Return of the Alfalfa P
date: 2025-10-13
slug: 题解/洛谷-or-Nsoj/Sprinklers-2-Return-of-the-Alfalfa-P
tags: [题解, 状态压缩, 动态规划, 轮廓线DP]
---

{/*truncate*/}

<h3>

因为图太难画了，所以借下洛谷的题解QWQ

我们要使用两个不同的坐标，一个方格坐标和点坐标，下面的黄格子就是$(2,3)$，黄点就是$(4,3)$

![](/img/Sprinkler1.jpg)

用红色表示被玉米喷水覆盖的方格，蓝色表示被苜蓿喷水覆盖的方格，首先，对于每一种如下的分割线形式均可以获得一些解

![](/img/Sprinkler2.jpg)

在钦定橙色是一定要放玉米喷水器的方格，紫色是一定要放苜蓿喷水器的方格，可以得到如下的图

![](/img/Sprinkler3.jpg)

我们可以很快的想到对于每一个拐角我们都必须放置一个指定的喷水器，其余的点可放可不放，但是只能放固定的一种

将拐角数用$k$表示，总面积用$S$，则方案数就是$2^{S-k}$，这个公式是我们$DP$的基础

考虑如何进行$DP$，定义$f[i][j][x]$意为对于点$(i,j)$方向向右$(0)/$向下$(1)$才到达该点的方案数

我们要$DP$的点是一条线，所以需要枚举$0$~$n$

***

考虑转移状态$f[i][j][0]$

第一种情况是由下图的绿点转移到黄点，即由$f[i][j-1][0]$转移过来

此时可以发现$k$不变，$S$不变，所以方案数没有变

此时$f[i][j][0]+=f[i][j-1][0]$

![](/img/Sprinkler4.jpg)

***

第二种情况是由下面的绿点转移到黄点，即由$f[i][j-1][1]$转移过来

此时可以发现$k-1$，$S$不变，所以方案数应该要变为原来的一半

此时$f[i][j][0]+=\frac{f[i][j-1][0]}{2}$等价于$f[i][j][0]+=f[i][j-1][0]\times inv2$

![](/img/Sprinkler5.jpg)

***

考虑转移状态$f[i][j][1]$

第一种情况是由下图的绿点转移到黄点，即由$f[i-1][j][0]$转移过来

此时可以发现$k+1$，$S+sum[i]$，所以方案数要乘上$2^{sum[i]-1}$

此时$f[i][j][0]+=f[i-1][j][0]\times 2^{sum[i]-1}$

![](/img/Sprinkler6.jpg)

***

第二种情况是由下图的绿点转移到黄点，即由$f[i-1][j][1]$转移过来

此时可以发现$k$不变，$S+sum[i]$，所以方案数要乘上$2^{sum[i]}$

此时$f[i][j][0]+=f[i-1][j][1]\times 2^{sum[i]}$

![](/img/Sprinkler7.jpg)

***

按照如上思路直接进行$O(n^2)$的$DP$即可获得$AC$

这道题也启发我们如果有些题直接处理方格不好处理，可以考虑从分割线的角度入手

所以这也是一道另类的轮廓线$DP$

</h3>

```cpp
/*
由题意易得，对于每一条分割线都是一种合法情况
只需要在拐角处放上喷水器就一定可以满足条件
而剩下的点(喷水器)可放可不放但一定只有一种可能
记录拐角数为 k，总面积为 S，则答案为 2^( S-k ) 
考虑对分割线进行 DP 
此时相当于变成了( 0~n )*( 0~n )的新地图
定义 f[i][j][x] 意为对于点( i,j )方向向右(0)/向下(1)才到达该点的方案数
记录每行的'.'的个数为sum[i] 
考虑如何对每一个状态进行转移， 
<1>f[i][j][0]，如果它由f[i][j-1][0]转移过来，则 k 不变，S 不变，  f[i][j][0]+=f[i][j-1][0]
<2>f[i][j][0]，如果它由f[i][j-1][1]转移过来，则 k+1，   S不变，   f[i][j][0]+=f[i][j-1][1]/2
<3>f[i][j][1]，如果它由f[i-1][j][0]转移过来，则 k+1，   S+sum[i]，f[i][j][1]+=f[i-1][j][0]*2^( sum[i]-1 ) 
<4>f[i][j][1]，如果它由f[i-1][j][1]转移过来，则 k不变， S+sum[i]，f[i][j][1]+=f[i-1][j][1]*2^( sum[i] )
如此跑 DP 便可快乐 AC 
*/ 
#include<bits/stdc++.h>
using namespace std;
#define ll long long
#define pii pair< int,int >

const int N=2e3+10, p=1e9+7, inv2=500000004;

ll pow2[N], sum[N];
ll f[N][N][2];
char mp[N][N]; 

int main()
{
//	freopen( "sprinklers.in","r",stdin );
//	freopen( "sprinklers.out","w",stdout );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	int n;
	cin>>n;
	for( int i=1;i<=n;i++ )
	{
		cin>>( mp[i]+1 );
		for( int j=1;j<=n;j++ )
			sum[i]+=( mp[i][j] == '.'  );
	}
	pow2[0]=1;
	for( int i=1;i<=n;i++ )
		pow2[i]=pow2[i-1]*2%p;
	f[0][0][0]=f[0][0][1]=1;
	for( int i=0;i<=n;i++ )
		for( int j=0;j<=n;j++ )
			if( i || j )
			{
				if( j )
				{
					( f[i][j][0]+=f[i][j-1][0] )%=p;
                	if( mp[i][j] == '.' ) ( f[i][j][0]+=f[i][j-1][1]*inv2%p )%p;
				}
				if( i )
				{
					( f[i][j][1]+=f[i-1][j][1]*pow2[sum[i]]%p )%p;
					if( mp[i][j] == '.' ) ( f[i][j][1]+=f[i-1][j][0]*pow2[sum[i]-1]%p )%p;
				}
			}
	cout<<( f[n][n][0]+f[n][n][1] )%p;
}
```