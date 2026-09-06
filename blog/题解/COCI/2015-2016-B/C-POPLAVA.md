---
title: POPLAVA
date: 2026-09-05
slug: 题解/COCI/2015-2016-B/C-POPLAVA
tags: [题解, COCI, 构造]
---

{/*truncate*/}

## [COCI 2015/2016 #5] POPLAVA
<details>
<summary>题干</summary>

<h2>题目描述</h2>

有一个由 $N$ 列组成的柱状图，从左至右的柱子高度分别为 $h_1,h_2,\dots,h_N$。

现在你需要向其中储水，柱状图的容量定义为使得水的结构“稳定”时最多所能储水的量。即水在重力作用下不会流动。下图为一个稳定的例子。

![](https://cdn.luogu.com.cn/upload/image_hosting/7tnaf06j.png)

具体来说，我们设从左至右每一列上水的高度为 $v_1,v_2,\dots,v_N$。记 $s_i=h_i+v_i$ ，当满足下列条件时为稳定状态：

- 对于任意的 $i\geq2$，当$v_i>0$ 时，有$s_i\le s_{i-1}$；

- 对于任意的 $i\le N-1$，当$v_i>0$ 时，有$s_i\le s_{i+1}$；

- $v_1=v_N=0$。

现在你需要选择一个 $1\sim N$ 的排列作为柱子 $h_1,h_2,\dots,h_N$ 的高度，使得柱状图的容量为 $X$。如果不存在，则输出 `-1`。如果有多种方案，输出任意一种即可。

<h2>输入格式</h2>

输入一行两个整数 $N,X$。

<h2>输出格式</h2>

如果方案不存在，输出 `-1`；

否则输出一行 $N$个整数，为 $h_1,h_2,\dots,h_N$。**输出任意一种方案即可，本题使用 SPJ。**

<h2>输入输出样例 #1</h2>

<h3>输入 #1</h3>

```
3 1
```

<h3>输出 #1</h3>

```
3 1 2
```

<h2>输入输出样例 #2</h2>

<h3>输入 #2</h3>

```
4 1
```

<h3>输出 #2</h3>

```
4 3 1 2
```

<h2>输入输出样例 #3</h2>

<h3>输入 #3</h3>

```
8 17
```

<h3>输出 #3</h3>

```
6 2 3 1 8 4 5 7
```

<h2>说明/提示</h2>

<h4>样例解释</h4>

<h5>样例 $1$</h5>

$v_1=0,v_2=1,v_3=0$。

<h5>样例 $2$</h5>

$v_1=0,v_2=0,v_3=1,v_4=0$。

<h5>样例 $3$</h5>

此样例与题图所对应。

<h4>数据规模与约定</h4>

对于 $100\%$ 的数据，$1\le N\le 10^6$，$1\le X\le 10^{15}$。

<h4>说明</h4>

**题目译自 [COCI2015-2016](https://hsin.hr/coci/archive/2015_2016/) [CONTEST #5](https://hsin.hr/coci/archive/2015_2016/contest5_tasks.pdf) *T4 POPLAVA***。

</details>

***

## 分析

<h5>

首先我们可以很快的想出最大容量是多少，即把$n$和$n-1$放在最左和最右，这样的总容量是$maxf=\frac{(n-1)\times(n-2)}{2}$

然后我们可以先猜后证一个结论：对于$\forall ans\in [1,maxf]$我们都可以构造出来

<details>
<summary>证明</summary>

若我们在证明$1\~k$的正确性

首先当$k=1$时，容易证明成立

那我们只需要证明若$1\~k$成立，则$1\~k+1$也成立就行了

首先$[1,\frac{k\times (k+1)}{2}]$是可以用前$k$个数构造出来的，所以我们现在需要额外构造$(\frac{k\times (k+1)}{2},\frac{(k+1)\times (k+2)}{2}]$的数

我们不妨将这些数先全部减去一个$k+1$，得到我们需要用$[1,k]$构造出$(\frac{(k-2)\times (k+1)}{2},\frac{(k+1)\times k}{2}]$，上界是$\frac{(k+1)\times k}{2}$

而我们根据我们的证明这些数是可以被构造出来的，所以命题成立

</details>

那么我们就可以快速构造出来了

时间复杂度$O(n)$

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

const int N=1e6+10;

bool ot[N];

int main()
{
    // freopen( "1.in","r",stdin );
    // freopen( "1.out","w",stdout );
    ios::sync_with_stdio( false );
    cin.tie( nullptr ); cout.tie( nullptr );
    ll n, x;
    cin>>n>>x;
    if( ( n-1 )*( n-2 )/2 < x )
    { cout<<-1; QWQ }
    x=( n-1 )*( n-2 )/2-x;
    for( int i=n-2;i>=1;i-- ) if( x && x >= i )
        ot[n-i-1]=true, x-=i;
    cout<<n<<" ";
    for( int i=1;i<=n-2;i++ ) if( !ot[i] ) cout<<i<<" ";
    cout<<n-1<<" ";
    for( int i=n-2;i>=1;i-- ) if(  ot[i] ) cout<<i<<" ";
    QWQ 
}
```

</details>