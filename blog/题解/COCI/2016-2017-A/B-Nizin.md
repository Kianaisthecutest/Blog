---
title: Nizin
date: 2026-08-26
slug: blog/题解/COCI/2016-2017-A/B-Nizin.md
tags: [题解, COCI, 贪心]
---

<h2>贪心</h2>

{/*truncate*/}

## [COCI 2016/2017 #2] Nizin
<details>
<summary>题干</summary>

<h2>题目描述</h2>

设 $A$ 是一个含有 $n$ 个元素的数组，其中各元素的编号为 $1\dots n$。若对于任意整数 $i\in [1,n]$ 都有 $A_i=A_{n-i+1}$，则称 $A$ 是一个「回文数组」。

Mislav 可以通过以下方式修改一个数组：

1. 选择两个**相邻**的元素。
2. 将这两个元素**替换**为一个新的元素，值为它们的和。

现在，给出一个数组。请你计算在至少多少次修改后，Mislav 可以将其修改为一个「回文数组」。

<h2>输入格式</h2>

第一行一个整数 $n$，表示数组中元素的个数。

接下来一行 $n$ 个整数 $a_i$，表示数组中的元素。

<h2>输出格式</h2>

一行，一个整数，表示 Mislav 至少需要修改数组的次数。

<h2>输入输出样例 #1</h2>

<h3>输入 #1</h3>

```
3
1 2 3 
```

<h3>输出 #1</h3>

```
1 
```

<h2>输入输出样例 #2</h2>

<h3>输入 #2</h3>

```
5
1 2 4 6 1
```

<h3>输出 #2</h3>

```
1 
```

<h2>输入输出样例 #3</h2>

<h3>输入 #3</h3>

```
4
1 4 3 2 
```

<h3>输出 #3</h3>

```
2 
```

<h2>说明/提示</h2>

<h4>【样例解释</h4>

使用 `[]` 标记 Mislav 修改时所选择的两个数。

**样例 1 解释**

`[1 2] 3` -> `3 3`。

**样例 2 解释**

`1 [2 4] 6 1` -> `1 6 6 1`。

**样例 3 解释**

`[1 4] 3 2` -> `5 [3 2]` -> `5 5`。

------------

<h4>【数据规模与约定】</h4>

- 对于 $30\%$ 的数据，保证 $n \leq 10$。
- 对于 $60\%$ 的数据，保证 $n \leq 10^3$。
- 对于 $100\%$ 的数据，保证 $1\le n\le 10^6$，$1\le a_i\le 10^9$。

------------

<h4>【说明】</h4>

**题目译自 [COCI2016-2017](https://hsin.hr/coci/archive/2016_2017/) [CONTEST #2](https://hsin.hr/coci/archive/2016_2017/contest2_tasks.pdf) _T3 Nizin_**。

</details>

***

## 分析

<h5>

首先，我们需要想到最左和最右的两个数的限制最大，因为它们只能和唯一的相邻数相加

又因为要保证回文，所以我们可以这样思考：

从最左和最右开始，不断向内收缩相加直到得到两数相等，就可以将子问题减小范围

为什么可以这样呢？因为我们既然要回文，就一定会使最左和最右相等，我们处理的就是这个问题

主要注意如果两段选择的时候重合了就不用再跑了，这说明这中间的一段只能全部合并成一个数

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

const int N=1e6+10;

int a[N];

int main()
{
    // freopen( "1.in","r",stdin );
    // freopen( "1.out","w",stdout );
    ios::sync_with_stdio( false );
    cin.tie( nullptr ); cout.tie( nullptr );
    int n;
    cin>>n;
    for( int i=1;i<=n;i++ ) cin>>a[i];
    int l=1, r=n;
    ll lsum=0, rsum=0;
    int ans=0;
    while( l <= r )
    {
        lsum=a[l], rsum=a[r];
        while( lsum != rsum && l < r )
        {
            ans++;
            if( lsum > rsum ) rsum+=a[--r];
            else              lsum+=a[++l];
        }
        l++, r--;
    }
    cout<<ans;
    QWQ
}
```

</details>