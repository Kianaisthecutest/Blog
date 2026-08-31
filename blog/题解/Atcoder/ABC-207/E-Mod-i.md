---
title: Mod i
date: 2025-09-18
slug: 题解/Atcoder/ABC-207/E-Mod-i
tags: [题解, ABC, 动态规划, 余数分组]
---

{/*truncate*/}

<h4>

考虑本题暴力，易得转移方程

令$f[j][i]$表示到第$j$个位置最多分割为$i$个组所有的方案数

$f[j][i]=\sum_{k=j}^n f[j][i-1]，sum[k]-sum[j]\equiv 0\pmod i$

就可以很快的得到一个$O(n^3)$的代码，实现好的话可以得到$32pts$

考虑优化，我们可以将式子$sum[k]-sum[j]\equiv 0\pmod i$改写为$sum[k]\equiv sum[j]\pmod i$

所以建立一个桶$vis$，记录所有同余系的$\sum f[x][i-1]$，考虑$f[j][i]$的转移时就只需要加上$vis[sum[j]\%i]$就可以了

时间复杂度$O(n^2)$，可以通过本题

</h4>

```cpp
for( int i=2;i<=n;i++ )
{
	memset( vis,0,sizeof( vis ) );
	for( int j=1;j<=n;j++ )
	{
		( f[j][i]+=vis[sum[j]%i] )%=mod;
		( vis[sum[j]%i]+=f[j][i-1] )%=mod;
	}
}
```