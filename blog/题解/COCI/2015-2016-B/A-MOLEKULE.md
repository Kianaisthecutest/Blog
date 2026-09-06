---
title: MOLEKULE
date: 2026-09-05
slug: 题解/COCI/2015-2016-B/A-MOLEKULE
tags: [题解, COCI, 贪心]
---

{/*truncate*/}

## [COCI 2015/2016 #3] MOLEKULE
<details>
<summary>题干</summary>

<h2>题目描述</h2>

有 $N$ 个点和 $N-1$ 条无向边，定义一张有向图的代价为一条在这张有向图上的最长通路长度。

现在把这 $N-1$ 条无向边指定方向，使得形成的有向图代价最小。

求一种指定方向的方案。

<h2>输入格式</h2>

第一行一个整数 $N$ 代表点数。      
接下来 $N-1$ 行每行两个整数 $a_i,b_i$ 代表一条边。

<h2>输出格式</h2>

$N-1$ 行每行一个整数 $r$：

- 如果 $r=1$ 代表从 $a_i$ 连向 $b_i$。
- 如果 $r=0$ 代表从 $b_i$ 连向 $a_i$。

<h2>输入输出样例 #1</h2>

<h3>输入 #1</h3>

```
3
1 2
2 3
```

<h3>输出 #1</h3>

```
1
0
```

<h2>输入输出样例 #2</h2>

<h3>输入 #2</h3>

```
4
2 1
1 3
4 1
```

<h3>输出 #2</h3>

```
0
1
0
```

<h2>说明/提示</h2>

<h4>样例 1 解释</h4>

如下图所示：

![](https://cdn.luogu.com.cn/upload/image_hosting/f1q6jgtu.png)

这张图的代价为 $1$，注意 $0\ 1$ 也是一组最优解。

<h4>样例 2 解释</h4>

如下图所示：

![](https://cdn.luogu.com.cn/upload/image_hosting/96aku20f.png)

<h4>数据规模与约定</h4>

对于 $30\%$ 的数据，$N \le 20$。       
对于 $100\%$ 的数据，$2 \le N \le 10^5$，$1 \le a_i,b_i\le N$。

**本题采用 Special Judge。**        
你只需要输出任意一种合法方案。

<h4>说明</h4>

翻译自 [COCI 2015-2016 #3 C MOLEKULE](https://hsin.hr/coci/archive/2015_2016/contest3_tasks.pdf)。

</details>

***

## 分析

<h5>

~~我是傻子，写了20min的换根DP~~

我们贪心的想一想，既然我们想让粒子走最短，我们不如让每个点只有入或者出，这样入连出，出连入和就一定让答案为$1$

![](/img/MOLEKULE.jpg)

我们跑一遍$dfs$就可以了

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

const int N=1e5+10;

bool ans[N];
vector< pii > rode[N];

inline void dfs( int p,int fa,bool bck )
{
    for( auto &[x,iidx]:rode[p] ) if( x != fa )
        dfs( x,p,bck^1 ), ans[iidx>>1]=iidx&1^1^bck;
}

int main()
{
    // freopen( "1.in","r",stdin );
    // freopen( "1.out","w",stdout );
    ios::sync_with_stdio( false );
    cin.tie( nullptr ); cout.tie( nullptr );
    int n;
    cin>>n;
    for( int i=1, x, y;i<n;i++ )
        cin>>x>>y,
        rode[x].push_back( { y,i<<1 } ), rode[y].push_back( { x,i<<1|1 } );
    dfs( 1,1,0 );
    for( int i=1;i<n;i++ ) cout<<ans[i]<<"\n";
	QWQ
}
```

</details>