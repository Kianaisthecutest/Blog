---
title: Prosti
date: 2026-09-04
slug: 题解/COCI/2015-2016-A/D-Prosti
tags: [题解, COCI, 线性筛法, 二分]
---

{/*truncate*/}

## [COCI 2015/2016 #7] Prosti
<details>
<summary>题干</summary>

<h2>题目描述</h2>

现有 $Q$ 组询问，每次给出正整数 $K,L,M$。定义全体高兴数的集合为 $\{x|x \le M$ 或 $x$ 为质数$\}$。

对于每次询问，求一个正整数 $i$，使得 $[i,i+K-1]$ 内恰好有 $L$ 个高兴数。如果不大于 $10^7$ 的 $i$ 值不存在，输出 $-1$。

<h2>输入格式</h2>

第一行，一个整数 $Q$。

接下来的 $Q$ 行，每行三个整数 $K_i,L_i,M_i$。

<h2>输出格式</h2>

输出 $Q$ 行，每行对应一次询问的答案。

<h2>输入输出样例 #1</h2>

<h3>输入 #1</h3>

```
3
1 1 1
2 0 2
3 1 1
```

<h3>输出 #1</h3>

```
1
8
4
```

<h2>输入输出样例 #2</h2>

<h3>输入 #2</h3>

```
3
4 1 1
5 2 3
5 0 3
```

<h3>输出 #2</h3>

```
6
4
24
```

<h2>输入输出样例 #3</h2>

<h3>输入 #3</h3>

```
4
7 2 5
6 1 1
10 4 5
6 2 2
```

<h3>输出 #3</h3>

```
6
20
5
4
```

<h2>说明/提示</h2>

**【数据规模与约定】**

- 对于 $100\%$ 的数据，$1 \le Q \le 10^5$，$1 \le K_i,M_i \le 150$，$0 \le L_i \le K_i$。

**【提示与说明】**

欢迎大家通过私信或发帖对自行编写的 [Special Judge](https://www.luogu.com.cn/paste/rj308p4r) 进行 hack。

**题目译自 [COCI 2015-2016](https://hsin.hr/coci/archive/2015_2016/) [#7](https://hsin.hr/coci/archive/2015_2016/contest7_tasks.pdf) _Task 5 Prosti_。**

**本题分值按 COCI 原题设置，满分 $140$。**

</details>

***

## 分析

<h5>

首先我们可以考虑一个函数$f(s)$表示以$s$为开始的开心数个数

那我们来考虑一下从$f(s)$到$f(s+1)$的数量变化

<span>&lt;1&gt;</span> 当$s\le M$时

因为此时当我们弹出$s$时贡献肯定会减$1$，而加上的数不一定会提供贡献

所以此时$f(s+1)=f(s)-0/1$

而且我们还可以证明$f(1)\ge \forall f(i)$，记$l=1$

<span>&lt;2&gt;</span> 当$s\gt M$时

此时因为弹出的数和加入的数都需要关注是否是质数，所以不好直接给出单调的结论

此时$f(s+1)=f(s)=0/1/-1$

但是我们把图像画出来一下

![](/img/Prosti.jpg)

首先我们可以证明这个原函数有零点，这个做一遍质数筛就能筛出来，记其值作$r$

其次我们就是在这个函数中找到一个点使它的函数值等于$L$，所以我们将函数整体减去$L$，相当于将$x$轴升高到图示红线位置后找整数零点

那么新函数上的$f(l)\ge 0\ge f(r)$，由于函数连续我们可以通过零点存在定理证明新函数一定在$[l,r]$上存在零点

那么又因为这个函数我们每个整点之间要么不变要么加减一，所以可以证明一定存在整数零点

我们之间在这个区间上二分就行了，时间复杂度：$O(qlog1e7)$

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

const int N=1e7+200, upper=1e7;

int sum[N];
vector< int > prime;

inline void Euler()
{
    sum[1]=1;
    for( int i=2;i<=upper+150;i++ )
    {
        if( !sum[i] ) prime.push_back( i );
        for( auto &x:prime )
        {
            if( 1ll*x*i > upper ) break;
            sum[x*i]=1;
            if( i%x == 0 ) break;
        }
    }
    for( int i=1;i<=upper+150;i++ ) sum[i]=sum[i-1]+( sum[i]^1 );
}

inline int s( int len,int l ){ QAQ sum[l+len-1]-sum[l-1]; }

inline void sovel()
{
    int K, L, M;
    cin>>K>>L>>M;
    int x;
    if( K > M ) x=M+s( K-M,M+1 );
    else        x=K;
    if( x < L ){ cout<<"-1\n"; QAQ; }
    int l=1, r=4652354;
    while( l <= r )
    {
        int mid=l+r>>1;
        if( mid <= M )
        {
            if( mid+K-1 > M ) x=M-mid+1+s( mid+K-1-M,M+1 );
            else              x=K;
        }
        else x=s( K,mid );
        if( x == L )   { cout<<mid<<"\n"; QAQ; }
        else if( x < L ) r=mid-1;
        else             l=mid+1;
    }
}

int main()
{
    // freopen( "txt.in","r",stdin );
    // freopen( "txt.out","w",stdout );
    ios::sync_with_stdio( false );
    cin.tie( nullptr ); cout.tie( nullptr );
    Euler();
    int q;
    for( cin>>q;q;q-- ) sovel();
    QWQ
}
```

</details>