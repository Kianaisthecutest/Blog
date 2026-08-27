---
title: Flip to Gather
date: 2025-07-04
slug: 题解/Atcoder/ABC-408/D-Flip-to-Gather
tags: [题解, ABC, 动态规划]
---

{/*truncate*/}

<h5>

题意：改变其中的一些$0$和$1$，使$1$的连续段最多只有一个 

解题思路：由题意，不难想到使用$DP$切这道题目

我们建立转移数组$dp[i][j][k]$，意为第$i$个数为$j$，由$k$表示前面是否有$1$的连续段

现在开始思考转移方程了

<span>&lt;1&gt;</span>如果$j=0,k=0$，这种情况很简单，因为前面不能有任何的$1$嘛

<span>&lt;2&gt;</span>如果$j=0,k=1$，则说明$1$的连续段已经出现过了，分别看前一个数的$01$情况即可

<span>&lt;3&gt;</span>如果$j=1,k=1$，则说明此位置要么是已经出现过的$1$的连续段后面的延续，要么是在中间$1$的连续段的开始

综上, 我们可以得到转移方程

</h5>

$$
\begin{aligned}

&f(i)=(c[i] == 'i')\\
&dp[i][0][0]=dp[i-1][0][0]+f(1)\\
&dp[i][0][1]=min(dp[i-1][0][1],dp[i-1][1][1])+f(1)\\
&dp[i][1][1]=min(dp[i-1][0][0],dp[i-1][1][1])+f(0)

\end{aligned}
$$

<summary><h3>AC代码</h3></summary>
<details>

```cpp
#include <bits/stdc++.h>
using namespace std;

const int N=2e5+10;

int dp[N][2][2];
char c[N];

int min( int a,int b,int c )
{
	return min( a,min( b,c ) );
}

void work()
{
	int n;
	scanf( "%d%s",&n ,c+1 );
	for( int i=1;i<=n;i++ )
	{
	dp[i][0][0]=dp[i-1][0][0]+( c[i] == '1' );
	dp[i][0][1]=min( dp[i-1][1][1],dp[i-1][0][1] )+( c[i] == '1' );
	dp[i][1][1]=min( dp[i-1][0][0],dp[i-1][1][1] )+( c[i] == '0' );
	}
	printf( "%d\n",min( dp[n][0][0],dp[n][0][1],dp[n][1][1] ) );
}

int main() {
//   	freopen( "txt.in","r",stdin );
//   	freopen( ".out","w",stdout );
	int t;
	scanf( "%d",&t );
	while( t-- )
	{
		work();
	}
	return 0;
}
```

</details>

**时间复杂度**：$O(n)$