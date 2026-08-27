---
title: Make Geometric Sequence
date: 2025-07-07
slug: 题解/Atcoder/ABC-413/D-Make-Geometric-Sequence
tags: [题解, ABC, 排序]
---

{/*truncate*/}

<h5>

题意：重新排列数组内的值，使其构成一个等比数列

解题思路：由题意，我们可以快速想到要先排序

那么排序的关键字是什么呢？

思考一下，等比数列的比例$r$固定

$$
\begin{cases}
<span>&lt;1&gt;</span> r \gt 1时：&产生正负同号的数，等比数列单调递增\\
<span>&lt;2&gt;</span> r = 1时：&产生正负同号的数且所有数相等\\
<span>&lt;3&gt;</span> 1\gt r \gt 0：&产生正负同号的数，等比数列单调递减\\
<span>&lt;4&gt;</span> 0 \gt r \gt -1时：&产生正负异号的数且一定轮转出现，同符号数单调递增\\
<span>&lt;5&gt;</span> r = 1时：&产生正负异号的数且一定轮转出现，同符号数相等\\
<span>&lt;6&gt;</span> -1 \gt r时：&产生正负异号的数且一定轮转出现，同符号数单调递减\\
<span>&lt;7&gt;</span> 对于任意 r \lt 0，&正负出现的次数的差值为0或1\\
<span>&lt;8&gt;</span> 对任意等比数列，&若将其倒序阅读一定还为一个等比数列，且新的比例r'={1 \over r}
\end{cases}
$$

那是不是说明我们需要分类讨论呢？再观察一下，不管$r$的正负，我们可以发现一个重要的结论：数列的绝对值单调

因为对于$r \lt 0$，我们可以看作$r=-r \times -1$，所以第$i$个数$a[i]=a[1] \times (-r)^i \times (-1)^i$

于是$\vert a[i] \vert = \vert a[1] \vert \times (-r)^i$，证明完毕

所以我们可以先以绝对值为关键字对数组进行一轮排序，在假设它为等比数列的情况下进行扫描判断

但是对于$r=-1$的情况，我们需要特判一下，因为我们找不到一种简洁的方式使相等绝对值的数字在排序后正负轮次出现,

所以如果$r=-1$的话，按照$<7>$统计并判断即可

</h5>

<summary><h3>AC代码</h3></summary>
<details>

```cpp
#include <bits/stdc++.h>
using namespace std;
#define ll long long

const int N=2e5+10;

ll a[N];

void sovel()
{
	int n;
	scanf( "%d",&n );
	for( int i=1;i<=n;i++ )
	{
		scanf( "%lld",&a[i] );
	}
	sort( a+1,a+n+1,[]( const ll &a,const ll &b )
	{
		return abs( a ) < abs( b );
	} );
	if( abs( a[1] ) == abs( a[n] ) )
	{
		int x0=0, x1=0;
		for( int i=1;i<=n;i++ )
		{
			x0+=( a[i] > 0 );
			x1+=( a[i] < 0 );
		}
		if( !x0 || !x1 || abs( x0-x1 ) < 2 )
		{
			printf( "Yes\n" );
		}
		else
		{
			printf( "No\n" );
		}
	} 
	else
	{
		for( int i=2;i<n;i++ )
		{
			if( a[i]*a[2] == a[i+1]*a[1] )//使用乘法, 以保证精度上不会出错
			{
				continue;
			}
			printf( "No\n" );
			return ;
		}
		printf( "Yes\n" );
	}
	return ;
}

int main() {
//   	freopen( "txt.in","r",stdin );
//   	freopen( ".out","w",stdout );
	int t;
	scanf( "%d",&t );
	while( t-- )
	{
		sovel();
	}
	return 0;
}
```

</details>

**时间复杂度**：$O(nlog(n))$