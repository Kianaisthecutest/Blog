---
title: Kroničan
date: 2026-08-26
slug: 题解/COCI/2016-2017-A/C-Kroničan
tags: [题解, COCI, 状态压缩, 动态规划]
---

{/*truncate*/}

## [COCI 2016/2017 #3] Kroničan
<details>
<summary>题干</summary>

<h2>题目描述</h2>

Mislav 有 $N$ 个玻璃杯，从 $1\sim N$  编号，每个玻璃杯中都有一定的水。你需要通过倒水（将某个杯子中的水倒入另一个杯子），使这些杯子中只有 $K$ 个有水。

已知将第 $i$ 号玻璃杯中的水倒入第 $j$ 号，需要消耗 $C_{i,j}$ 的代价。Mislav 想知道，经过倒水后满足只有 $K$ 个（或更少）玻璃杯中有水时，消耗的代价总和的最小值。

<h2>输入格式</h2>

第一行包含两个正整数，$N,K$。

接下来 $N$ 行，每行包含 $N$ 个非负整数 $C_{i,j}$。第 $i$ 行 $j$ 列的数表示从玻璃杯 $i$ 倒水到玻璃杯 $j$ 需要付出的代价。保证 $C_{i,i}$ 一定是 $0$。

<h2>输出格式</h2>

输出 Mislav 达成目标需要付出的最小代价和。

<h2>输入输出样例 #1</h2>

<h3>输入 #1</h3>

```
3 3
0 1 1
1 0 1
1 1 0 
```

<h3>输出 #1</h3>

```
0
```

<h2>输入输出样例 #2</h2>

<h3>输入 #2</h3>

```
3 2
0 1 1
1 0 1
1 1 0 
```

<h3>输出 #2</h3>

```
1
```

<h2>输入输出样例 #3</h2>

<h3>输入 #3</h3>

```
5 2
0 5 4 3 2
7 0 4 4 4
3 3 0 1 2
4 3 1 0 5
4 5 5 5 0 
```

<h3>输出 #3</h3>

```
5
```

<h2>说明/提示</h2>

<h4>样例 1 解释</h4>

Mislav 不需要倒水。代价和是 $0$。

<h4>样例 2 解释</h4>

Mislav 需要将任意一个玻璃杯中的水倒入任何其他玻璃杯中，使其满足只有两个玻璃杯中有水。代价和为 $1$。

<h4>样例 3 解释</h4>

Mislav 可以将水从玻璃杯 $4$ 倒入玻璃杯 $3$，然后将玻璃杯 $3$ 中的水倒入玻璃杯 $5$，最后将玻璃杯 $1$ 中的水倒入玻璃杯 $5$。总共付出代价和为 $1+2+2=5$。

<h3>数据规模与约定</h3>

对于 $40\%$ 的数据，满足 $N\le 10$。

对于 $100\%$ 的数据，满足 $1\le K\le N\le 20,C_{i,j}\le10^5$



<h3>说明</h3>

**题目译自 [COCI2016-2017](https://hsin.hr/coci/archive/2016_2017/) [CONTEST #3](https://hsin.hr/coci/archive/2016_2017/contest3_tasks.pdf) _T3 Kroničan_**。

</details>

***

## 分析

<h5>

并没有什么好说的一个模板

首先观察到$n\leq 20$所以可以很快想到状压$DP$来解决

tips：下文所说的$1$和$0$都是指的对应杯子有无水

然后我们只需要每次将一个状态里的一个$1$删除即转移到这个状态里的另一个$1$上即可

因为我们如果出现了从$1$倒水到$0$不如先在$0$还是$1$的时候倒入，这样会少一次倒水肯定不会更劣

时间复杂度：$O(n^2\times 2^n)$

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

const int N=22, inf=1e9;

int c[N][N];
int f[1<<N], popc[1<<N];

int main()
{
    // freopen( "1.in","r",stdin );
    // freopen( "1.out","w",stdout );
    ios::sync_with_stdio( false );
    cin.tie( nullptr ); cout.tie( nullptr );
    int n, k;
    cin>>n>>k;
    for( int i=1;i<=n;i++ ) for( int j=1;j<=n;j++ ) cin>>c[i][j];
    for( int state=0;state<( 1<<n );state++ ) for( int bit=0;bit<n;bit++ ) 
        if( ( state>>bit )&1^1 ) popc[state|( 1<<bit )]=popc[state]+1;
    memset( f,0x3f,sizeof f );
    f[( 1<<n )-1]=0;
    for( int state=( 1<<n )-1;state>=0;state-- )
        for( int bit1=0;bit1<n;bit1++ ) if( ( state>>bit1 )&1 )
        for( int bit2=0;bit2<n;bit2++ ) if( ( state>>bit2 )&1 && bit1 != bit2 )
            f[state^( 1<<bit1 )]=min( f[state^( 1<<bit1 )],f[state]+c[bit1+1][bit2+1] );
    int ans=inf;
    for( int state=0;state<( 1<<n );state++ )
        if( popc[state] == k ) ans=min( ans,f[state] );    
    cout<<ans;
    QWQ
}
```

</details>