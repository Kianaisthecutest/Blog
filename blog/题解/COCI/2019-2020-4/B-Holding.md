---
title: Holding
date: 2026-09-28
slug: 题解/COCI/2019-2020-4/B-Holding
tags: [题解, COCI, 动态规划, 贪心]
---

{/*truncate*/}

## [COCI 2019/2020 #4] Holding
<details>

<h2>题目背景</h2>

Ivica 有一个由 $N$ 家克罗地亚公司组成的集团，但他的集团正面临着困难。他的企业承受着巨额的负债，所以政$ $府派遣律师没收了他的一切财产。

但我们发现，尽管他有巨额债务在身，他依然与政$ $府达成协议，留住了部分企业。他留住的是哪些？我们也知道了。

<h2>题目描述</h2>

律师们把 Ivica 的公司的 $N$ 份债务文件摆在桌上。第一家公司的债务为 $A_1$ ，第二家公司的债务为 $A_2$ ，依次类推。

Ivica 与政$ $府达成协议，使它留下桌上 $[L,R]$ 区间的所有文件所对应的公司，但他需要承担 $A_L,A_{L+1}\ldots A_R$ 的所有债务，其中 $L$ 和 $R$ 代表桌子上一系列文件中的位置。

幸运的是，律师们也是腐败。他们可以让他以 $|i-j|$ 的价格交换当前放在位置 $i$ 和位置 $j$ 的文件。

Ivica 有点绝望。他口袋里只有 $K$ 元钱，他现在想把这些钱花在这里，使得他的需要承担的债务尽可能少。

请帮他达成目标。

<h2>输入格式</h2>

第一行四个整数 $N,L,R,K$。

第二行 $N$ 个整数，第 $i$ 个表示 $A_i$。

<h2>输出格式</h2>

一行一个整数，表示花不超过 $K$ 元后负债的最小值。

<h2>输入输出样例 #1</h2>

<h3>输入 #1</h3>

```
3 2 2 1
1 2 3
```

<h3>输出 #1</h3>

```
1
```

<h2>输入输出样例 #2</h2>

<h3>输入 #2</h3>

```
5 2 3 3
21 54 12 2 0
```

<h3>输出 #2</h3>

```
12
```

<h2>输入输出样例 #3</h2>

<h3>输入 #3</h3>

```
6 4 6 100
1 2 3 4 5 6
```

<h3>输出 #3</h3>

```
6
```

<h2>说明/提示</h2>

【数据规模与约定】

| 子任务编号 | 特殊限制         | 分值 |
| ---------- | ---------------- | ---- |
| $1$        | $N\le 13$，$R=N$ | $20$ |
| $2$        | $N\le 50$，$R=N$ | $30$ |
| $3$        | $N\le 50$        | $30$ |
| $4$        | 无特殊限制       | $20$ |

对于 $100\%$ 的数据，保证 $1\le N\le 100$，$1\le L\le R\le N$，$1\le K\le 10^4$，$1\le A_i\le 10^6$。

【提示与帮助】

**题目译自 [COCI 2019/2020](https://hsin.hr/coci/archive/2019_2020/) [CONTEST #4](https://hsin.hr/coci/archive/2019_2020/contest4_tasks.pdf) T3 Holding**

在 COCI 中，本题分值为 $110$ 分。

</details>

***

## 分析

<h5>

容易发现交换 $i,j$ 两个元素并花费$∣i−j∣$元，相当于进行了$∣i−j∣$次邻项交换

所以将问题转化为进行不超过 k 次邻项交换使得 [l,r] 区间内的元素之和最小

将这些元素在原数列中的下标按照从小到大排列记为$p_1​,p_2​,⋯,p_m$​，那么在最优决策下，$p1$移动到了$l$，$p2​$移动到了$l+1，……，pi$移动到了$l+i−1$

因为如果移动两个元素$i,j$时，路径发生了交叉，那么必然发生了交换$i,j$两个元素的情形，这一定会更劣

那么状态设计就非常简单

$f_{i,j,k}$表示前$i$个数，选择了$j$个，花费了恰好$k$元的情况下，选出的元素的最小值，容易得到状态转移方程：

$f_{i,j,k}​=min{f_{i−1,j,k}​,f_{i−1,j−1,k−∣l+j−i−1∣​}+a_i​ }$

时间复杂度为$O(n^2k)$，使用滚动数组滚掉第一维空间复杂度为$O(nk)$

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

const int N=1e2+10, K=1e4+10;
const int inf=1e9;

int a[N];
int f[2][N][K];

int main()
{
    // freopen( "txt.in","r",stdin );
    // freopen( "txt.out","w",stdout );
    ios::sync_with_stdio( false );
    cin.tie( nullptr ); cout.tie( nullptr );
    int n, l, r, K;
	cin>>n>>l>>r>>K;
	for( int i=1;i<=n;i++ ) cin>>a[i];
	int m=r-l+1;
    memset( f,0x3f,sizeof f );
    f[0][0][0]=0;
    for( int i=1;i<=n;i++ ) for( int j=0;j<=m;j++ ) for( int k=0;k<=K;k++ )
    {
        int w=abs( l+j-i-1 );
        f[i&1][j][k]=f[i&1^1][j][k];
        if( k >= w && j >= 1 ) f[i&1][j][k]=min( f[i&1][j][k],f[i&1^1][j-1][k-w]+a[i] );
    }
    int ans=inf;
    for( int i=0;i<=K;i++ ) ans=min( ans,f[n&1][m][i] );
    cout<<ans;
    QWQ
}
```

</details>