---
title: Karte
date: 2026-9-01
slug: 题解/COCI/2017-2018-B/B-Karte
tags: [题解, 贪心, 构造]
---

{/*truncate*/}

## [COCI 2017/2018 #5] Karte
<details>

<h2>题目描述</h2>

有$N$ 张牌叠在一起，第 $i$ 张牌上，有一个数字 $a_i$ 表示它下面**至少**有 $a_i$ 张牌上的信息是错误的，若它下面确实有至少 $a_i$ 张牌的信息是错误的，那这张牌的信息就是正确的，否则这张牌的信息就是错误的。（我们认为最下面的牌的后面有 $0$ 张错误的）

现在需要你重新调整牌的顺序，使得正好有 $K$ 张牌上的信息是错误的。

<h2>输入格式</h2>

第一行两个正整数 $N$ 和 $K$ $( 1 ≤ N≤ 5×10^5,0 ≤ K≤ N )$表示牌的张数和要求的错误信息的个数。
接下来 $N$ 行，每行一个数，表示对应的 $a_i$ $(0 ≤ a_i≤ 5×10^5 )$

<h2>输出格式</h2>

如果调整方案不存在，输出$-1$。否则输出由顶部到底部 $N$ 张牌对应的 $a_i$，若有多种方案，输出任意一种即可。

<h2>输入输出样例 #1</h2>

<h3>输入 #1</h3>

```
4 2
1 2 2 3

```

<h3>输出 #1</h3>

```
2 3 1 2
```

<h2>输入输出样例 #2</h2>

<h3>输入 #2</h3>

```
5 3
2 1 3 0 3

```

<h3>输出 #2</h3>

```
3 3 0 1 2
```

<h2>输入输出样例 #3</h2>

<h3>输入 #3</h3>

```
6 4
0 2 5 2 0 1

```

<h3>输出 #3</h3>

```
-1
```

<h2>说明/提示</h2>

$30\%$的数据 $N≤ 16$。

另有$40\%$的数据 $N≤ 2000$。

**样例 2 说明：**

第 $5$ 张牌上写的是$2$，但是其后面只有 $0$ 张错误，所以它是错误的。

第 $4$ 张牌上写的是$1$，其后面有 $1$ 张错误（第五张），所以它是正确的。

第 $3$ 张牌上写的是$0$，其后面有 $1$ 张错误（第五张），所以它是正确的。

第 $2$ 张牌上写的是$3$，但是其后面只有 $1$ 张错误（第五张），所以它是错误的。

第 $1$ 张牌上写的是$3$，但是其后面只有 $2$ 张错误（第五张，第二张），所以它是错误的。

因此总共有 $3$ 张是错误的。

</details>

***

## 分析

<h5>

首先我们发现越大的数越难满足限制，所以我们不妨让它们非法而让其他的合法

贪心的想，我们尽量将较大的值放在非法位(前$k$个)，其他放在后面就行了

如何才能非法呢，我们从最大的数开始向下枚举，只要满足$剩下的放置点<数的大小$就是合法的了

而且放不了大的肯定也放不了小的，于是排序后线性扫描

时间复杂度：$O(nlogn)$

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

const int N=5e5+10;

int a[N];

int main()
{
    // freopen( "1.in","r",stdin );
    // freopen( "1.out","w",stdout );
    ios::sync_with_stdio( false );
    cin.tie( nullptr ); cout.tie( nullptr );
    int n, k;
    cin>>n>>k;
    for( int i=1;i<=n;i++ ) cin>>a[i];
    sort( a+1,a+n+1 );
    queue< int > q;
    for( int i=n;i>=1 && k;i-- ) 
        if( a[i] >= k || k == 1 ) q.push( a[i] ), k--;
        else { cout<<-1; QWQ; }
    stack< int > stk;
    for( int i=n-q.size();i>=1;i-- )
        if( a[i] > q.size() ){ cout<<-1; QWQ; }
        else stk.push( a[i] );
    while( !stk.empty() ) cout<<stk.top()<<" ", stk.pop();
    while( !q.empty()   ) cout<<q.front()<<" ", q.pop();
    QWQ
}
```

</details>