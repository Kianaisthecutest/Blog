---
title: SAN
date: 2026-09-07
slug: 题解/COCI/2015-2016-C/D-SAN
tags: [题解, COCI, 数学, 数位DP]
---

{/*truncate*/}

## [COCI 2015/2016 #6] SAN
<details>
<summary>题干</summary>

<h2>题目描述</h2>

$\text{Anica}$ 有一张神秘的无限表，表里有无限行和无限列。有趣的是，表中的每个数字出现的次数是有限的。

定义函数 $\mathrm{rev}(i)$，返回 $i$ 在十进制下翻转后得到的新数字。例如 $\mathrm{rev}(213)=312$，$\mathrm{rev}(406800)=008604=8604$。

表中第 $i$ 行第 $j$ 列的数字 $A(i,j)$ 由以下方式得到：

- $A(i,1)=i$

- $A(i, j) = A(i, j − 1)+\mathrm{rev}\big(A(i,j-1)\big)$，$j>1$

![](https://cdn.luogu.com.cn/upload/image_hosting/aqhn1qzp.png)

现在 $\text{Anica}$ 给出 $Q$ 个询问，每个询问给出两个整数 $L$ 和 $R$，请你求出无限表中有多少个数的大小在 $\big[L,R\big]$ 中。

<h2>输入格式</h2>

第一行包含一个整数 $Q$。

接下来 $Q$ 行，每行包含两个整数 $L$ 和 $R$。

<h2>输出格式</h2>

输出包含 $Q$ 行，每行一个整数，其中第 $i$ 行为第 $i$ 个问题的答案。

<h2>输入输出样例 #1</h2>

<h3>输入 #1</h3>

```
2
1 10
5 8
```

<h3>输出 #1</h3>

```
18
8
```

<h2>输入输出样例 #2</h2>

<h3>输入 #2</h3>

```
3
17 144
121 121
89 98
```

<h3>输出 #2</h3>

```
265
25
10
```

<h2>输入输出样例 #3</h2>

<h3>输入 #3</h3>

```
1
1 1000000000
```

<h3>输出 #3</h3>

```
1863025563
```

<h2>说明/提示</h2>

**【数据范围】**

对于 $50\%$ 的数据，保证 $1\le L,R\le 10^6$。

对于 $100\%$ 的数据，保证 $1\le Q\le 10^5$，$1\le L,R\le 10^{10}$。

**【题目来源】**

**题目译自 [COCI 2015-2016](https://hsin.hr/coci/archive/2015_2016/) [CONTEST #6](https://hsin.hr/coci/archive/2015_2016/contest6_tasks.pdf) T6 SAN**。

**本题分值按 COCI 原题设置，满分 $160$**。

</details>

***

## 分析

<h5>

# 正解

我们很容易就能发现：能够被表示成$i+\text{rev}(i),i\in N_+$的数并不在多数，也就是说，按照上面那一条转移式，$f_i$大于$1$的并不多，我们可以把这些大于$1$的$f_i$通过数位$DP$求出来，也是前缀和处理一下，然后二分查询即可

我们来考虑一下它的复杂度。假设我们现在枚举的$i$在十进制下有$len \in [1, 10]$位的，也就是 
$\[ \lfloor \lg i + 1 \rfloor = len. \]$  
我们设一个数$x$其从低到高的第$i \in [1, len]$位为$x_i$，则有  
$\[ x = \sum_{i=1}^{len} x_i \cdot 10^{i-1}. \]$

设$k = i + \text{rev}(i)$，在不进位的情况下$k$满足下面这个条件：

$\[k_j = k_{len-j}, \quad \forall j \in [1, len]\]$

而对于$k$的任意一位$k_i$，它都是由$i$的某两位加和得到，故有结论：  
$\[ k_i \in [0, 18], \quad \forall i \in [1, len]. \]$

那么$k$的可能数就只有$O(19^{\lfloor \frac{len}{2} \rfloor})$级别，总数大概在$O(19^5)$级别，实际上略多一点，为$2541196$个

最后的复杂度就大概在：

$\[\lg R\]$

$\[O\left(\sum_{i=1}^{\lg R} w_i^{i+1} + n \log_2 n + n \lg R + Q \log_2 n\right)\]$

其中$n = 2541196, w = 19.$

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

const int N=1e5+10, BIT=20;
const ll upper=1e10;

int C[2][BIT];
ll pow10[11];
map< ll,ll > sum;

inline ll rev( ll x )
{
    ll num=0;
    while( x ) num=num*10+x%10, x/=10;
    QAQ num;
}

inline void dfs( int l,int r,ll num,bool flag,ll f )
{
	if( num > upper )return;
	if( l > r )
    { sum[num]+=f; QAQ; }
    if( l == r )
    {
        for( int i=flag;i<=9;i++ ) sum[num+( pow10[l]*i<<1 ) ]+=f;
        QAQ;
    }
    for( int i=flag;i<=18;i++ ) dfs( l+1,r-1,num+( pow10[l]+pow10[r] )*i,0,f*C[flag][i] );
}

inline void init()
{
    pow10[0]=1;
    for( int i=0;i<=9;i++ ) for( int j=0;j<=9;j++ ) C[1][i+j]+=( i > 0 ), C[0][i+j]++;
    for( int i=1;i<=10;i++ ) pow10[i]=pow10[i-1]*10, dfs( 0,i-1,0,1,1 );
    ll pre=0;
    for( auto &x:sum )
    {
        ll y=x.first+rev( x.first );
        if( y <= upper ) sum[y]+=x.second;
        pre+=x.second; x.second=pre;
    }
}


int main()
{
    // freopen( "1.in","r",stdin );
    // freopen( "1.out","w",stdout );
    ios::sync_with_stdio( false );
    cin.tie( nullptr ); cout.tie( nullptr );
    init();
    int q;
    ll l, r;
    for( cin>>q;q;q-- )
        cin>>l>>r,
        cout<<( --sum.upper_bound( r ) )->second-( --sum.lower_bound( l ) )->second + r-l+1<<"\n";
    QWQ 
}
```

</details>