---
title: Automobil
date: 2026-09-02
slug: 题解/COCI/2017-2018-C/A-Automobil
tags: [题解, COCI, 数学, 离线处理]
---

{/*truncate*/}

## [COCI 2017/2018 #4] Automobil
<details>
<summary>题干</summary>

<h2>题目描述</h2>

米尔科在他的车后座上发现了一个有 $N$ 行 $M$ 列的矩阵。矩阵的第一行由数字 $1, 2, \cdots, M$ 组成，第二行由数字 $M+1, M+2, \cdots, 2M$ 组成，依此类推，直到第 $N$ 行，其由数字 $(N-1)M + 1, (N-1)M + 2, \cdots, NM$ 组成。

例如，对于 $N = 3$ 和 $M = 4$：

| - | - | - | - |
| :----------: | :----------: | :----------: | :----------: |
| **1** | **2** | **3** | **4** |
| **5** | **6** | **7** | **8** |
| **9** | **10** | **11** | **12** |

这样的矩阵对他来说不够有趣，所以他选择了一行或一列 $K$ 次，并将其值乘以一个非负整数。

自然地，现在他想知道矩阵中所有值的和。由于这个和可能非常大，米尔科将对其取模 $10^9 + 7$。帮助米尔科回答这个问题。

<h2>输入格式</h2>

输入的第一行包含任务中的数字 $N$（$1 \le N \le 10^6$）, $M$（$1\le M\le 10^6$）和 $K$（$1\le K\le 10^3$）。

- 或者是将第 $X$ 行乘以 $Y$，形式为 `R X Y`，其中 `R` 表示行乘法，$X$ 是一个正整数（$1\le X\le N$），$Y$ 是一个非负整数（$0 \le Y \le 10^9$）。

- 或者是将第 $X$ 列乘以 $Y$，形式为 `S X Y`，其中 `S` 表示列乘法，$X$ 是一个正整数（$1\le X\le M$），$Y$ 是一个非负整数（$0 \le Y \le 10^9$）。

<h2>输出格式</h2>

你必须输出矩阵最终值的和对 $10^9 + 7$ 取模的结果。

<h2>输入输出样例 #1</h2>

<h3>输入 #1</h3>

```
3 4 4
R 2 4
S 4 1
R 3 2
R 2 0
```

<h3>输出 #1</h3>

```
94
```

<h2>输入输出样例 #2</h2>

<h3>输入 #2</h3>

```
3 1 1
S 1 4

```

<h3>输出 #2</h3>

```
24
```

<h2>输入输出样例 #3</h2>

<h3>输入 #3</h3>

```
2 4 4
S 2 0
S 2 3
R 1 5
S 1 3
```

<h3>输出 #3</h3>

```
80
```

<h2>说明/提示</h2>

在总共价值 $50$ 分的测试用例中，将满足 $1 \le N, M \le 10^3$。

**第一个测试用例的说明**：在将第二行乘以 $4$，第四列乘以 $1$，第三行乘以 $2$，再次将第二行乘以 $0$ 之后，最终矩阵如下所示：

| - | - | - | - |
| :----------: | :----------: | :----------: | :----------: |
| **1** | **2** | **3** | **4** |
| **0** | **0** | **0** | **0** |
| **18** | **20** | **22** | **24** |

最终矩阵中元素的和为 $1 + 2 + 3 + 4 + 0 + 0 + 0 + 0 + 18 + 20 + 22 + 24 = 94$。

题面翻译由 ChatGPT-4o 提供。

</details>

***

## 分析

<h5>

首先在只考虑单独的行或列操作时我们容易做，但是问题在于相交的点产生的影响

基于询问次数很少，我们不如分类存储操作了哪些行或列，然后分离出来单独计算

因为操作的顺序不会影响答案，所以我们可以分为行操作和列操作单独计算

就成了两个可以线性出来的一维问题了

时间复杂度：$O(n)$

</h5>

***

## AC代码
<details>
<summary>Code</summary>

```cpp
#include<bits/stdc++.h>
using namespace std;
#define ll long long
#define pii pair< int,int >
#define QWQ return 0;
#define QAQ return 
#define pll pair< ll,ll >

const int N=1e6+10, mod=1e9+7;

ll row[N], col[N];
vector< pll > r, c; 

int main()
{
    // freopen( "1.in","r",stdin );
    // freopen( "1.out","w",stdout );
    ios::sync_with_stdio( false );
    cin.tie( nullptr ); cout.tie( nullptr );
    int n, m, k;
    cin>>n>>m>>k;
    char op; 
    for( int i=1, x, y;i<=k;i++ )
    {
        cin>>op>>x>>y;
        if( op == 'R' ) r.push_back( { x,y } );
        if( op == 'S' ) c.push_back( { x,y } );
    }
    for( int i=1;i<=n;i++ ) row[i]=1;
    for( auto &[x,y]:r ) ( row[x]*=y )%=mod;
    ll sum=0;
    for( int i=1;i<=n;i++ ) ( sum+=row[i] )%=mod;
    for( int i=1;i<=n;i++ ) ( col[1]+=1ll*( 1ll*m*( i-1 )%mod+1 )*row[i]%mod )%=mod;
    for( int i=2;i<=m;i++ ) col[i]=( col[i-1]+sum )%mod;
    for( auto &[x,y]:c ) ( col[x]*=y )%=mod;
    ll ans=0;
    for( int i=1;i<=m;i++ ) ( ans+=col[i] )%=mod;
    cout<<ans;
	QWQ
}
```

</details>