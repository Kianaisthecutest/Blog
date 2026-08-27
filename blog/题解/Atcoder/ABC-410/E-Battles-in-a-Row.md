---
title: Battles in a Row
date: 2025-07-02
slug: 题解/Atcoder/ABC-410/E-Battles-in-a-Row
tags: [题解, ABC, 动态规划]
---

{/*truncate*/}

## 分析

<h5>

题意：寻找最大的满足条件的数目

解题思路:

因为要找最大的满足条件的值，不难想到使用$DP$解决此问题

我们的思路很明晰，首先要设定进行转移的方程布尔类型的$f[i][x][y]$，表示在打完第$i$只怪兽后剩余$x$体力和$y$魔力是否可行

于是转移方程为$f[i][x][y]=f[i-1][x+a[i]][y]|f[i-1][x][y+b[i]]$

此方法的时间复杂度为$O(n^3)$，显然过不了此题

于是分析一下，不难得出我们使用布尔类型过于浪费空间

重点就在此处, 我们这时会使用一种$DP$常用的方法, 以实现数组降维

我们会将其中一维的数据转移使数组存储它，此时的$f[i][x]$就会表示在打完第$i$只怪兽后体力为$x$时的剩余魔力最大值

我们的目标就是找到最大的$i$，使$0 \leqslant x \leqslant n$时，$f[i][x] \geqslant 0$

所以转移方程就变为了$f[i][x]=max(f[i][x],f[i-1][x+a[i]])$，时间复杂度也降到了$O(n^2)$

</h5>

<summary><h3>AC代码(蒟蒻不会写, 只能转载大犇的了)</h3></summary>

<details>

```cpp
#include <bits/stdc++.h>
using namespace std;
const int N = 3010;
int dp[N][N];
int a[N], b[N];
int n, x, y;

int main() {
	cin >> n >> x >> y;
	int sum = 0;
	int ans = 0;
	for (int i = 1; i <= n; i++) {
		cin >> a[i] >> b[i];
		sum += b[i];//先记录一下前缀和
		for (int j = 0; j <= x; j++)
			dp[i][j] = dp[i - 1][j];
		for (int j = a[i]; j <= x; j++)
			dp[i][j] = max(dp[i][j], dp[i - 1][j - a[i]] + b[i]);//跑背包，但是我懒得用滚动数组了
		for (int j = 0; j <= x; j++)
			if ((sum - dp[i][j]) <= y)
				ans = max(ans, i);//直接计算是否存在满足要求的
	}
	cout << ans << endl;
	return 0;
}
```

</details>

**时间复杂度**：$O(n^2)$