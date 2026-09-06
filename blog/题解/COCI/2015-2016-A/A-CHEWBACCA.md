---
title: CHEWBACCA
date: 2026-09-04
slug: 题解/COCI/2015-2016-A/A-CHEWBACCA
tags: [题解, COCI, 数学, 模拟]
---

{/*truncate*/}

## [COCI 2015/2016 #4] CHEWBACCA
<details>
<summary>题干</summary>

<h2>题目背景</h2>

**本套赛题 T3 为 [P8053](https://www.luogu.com.cn/problem/P8053)。**

<h2>题目描述</h2>

一棵 $n$ 个节点的 $k$ 级树是按照如下方式构造出来的：

- 首先，新建根节点，并将其编号为 $1$。
- 随后重复如下步骤直至节点总数恰好为 $n$：
  - 设上一个新增节点的编号为 $x$。
  - 在上一层中从左往右找到第一个儿子个数 $<k$ 的节点。
    - 如果该节点上没有儿子，则在该节点下新增一个儿子节点，编号为 $x+1$，并在点 $x+1$ 和我们找到的该父亲节点之间连一条长度为 $1$ 的边。
    - 否则，在该节点最近添加的儿子节点的右边新增一个儿子节点，编号为 $x+1$，并在点 $x+1$ 和我们找到的该父亲节点之间连一条长度为 $1$ 的边。
  - 如果在当前层没有找到儿子个数 $<k$ 的节点，则跳到下一层。

例如，下图为按照如上方法构造出来的包含 $9$ 个节点的 $3$ 级树：

![](https://cdn.luogu.com.cn/upload/image_hosting/ex7c671v.png)

现在，你得到了这棵包含 $n$ 个节点的 $k$ 级树，你需要回答 $q$ 次询问。每次询问给定两个整数 $x,y$，你需要回答在该树中节点 $x$ 到节点 $y$ 的最短路径长度。

<h2>输入格式</h2>

第一行输入三个整数 $n,k,q$，分别表示树的节点数、级数和询问次数。  
随后 $q$ 行，每行输入两个整数 $x,y$，表示本次询问的两个节点。

<h2>输出格式</h2>

输出 $q$ 行，每行一个整数，表示节点 $x$ 到节点 $y$ 的最短路径长度。

<h2>输入输出样例 #1</h2>

<h3>输入 #1</h3>

```
7 2 3
1 2
2 1
4 7
```

<h3>输出 #1</h3>

```
1
1
4
```

<h2>输入输出样例 #2</h2>

<h3>输入 #2</h3>

```
9 3 3
8 9
5 7
8 4
```

<h3>输出 #2</h3>

```
2
2
3
```

<h2>说明/提示</h2>

**【样例 1 解释】**

下图是样例 1 中构造出来的树：

![](https://cdn.luogu.com.cn/upload/image_hosting/v7semhvp.png)

不难发现，对于第 $1$、$2$ 次询问，由于节点 $2$ 是节点 $1$ 的儿子节点，因此这两个点之间的最短路径长度恰好为 $1$。而对于第 $3$ 次询问，一条最短路径是 $4\rightarrow 2\rightarrow 1\rightarrow 3\rightarrow 7$。因此其最短路径长度为 $4$。

**【样例 2 解释】**

样例 2 构造出来的树见『题目描述』部分。

**【数据范围】**

对于 $20\%$ 的数据，保证 $1\leqslant n,q\leqslant 1000$。  
对于 $50\%$ 的数据，保证 $1\leqslant n\leqslant 10^5$。  
对于所有数据，$1\leqslant n\leqslant 10^{15}$，$1\leqslant k\leqslant 1000$，$1\leqslant q\leqslant 10^5$。

**【题目来源】**

本题来源自 **_[COCI 2015-2016](https://hsin.hr/coci/archive/2015_2016/) [CONTEST 4](https://hsin.hr/coci/archive/2015_2016/contest4_tasks.pdf) T4 CHEWBACCA_**，按照原题数据配置，满分 $120$ 分。

由 [Eason_AC](https://www.luogu.com.cn/user/112917) 翻译整理提供。

</details>

***

## 分析

<h5>

很简单的题目，由于线段树的存在所以我们可以很快的想到正解方向

由于完全$k$叉树性质，所以可以得到节点$i$的儿子是$((i-1)\times k+1,i\times k+1]$

反推一下得到节点$i$的父亲是$\lfloor ( i+k-2 )/k \rfloor$

所以我们从两个点暴力向上跳就行了

时间复杂度：$O(qlog_kn)$，因为当$k=1$时会爆炸，所以加上了特判

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

unordered_map< ll,int > dep;

int main()
{
    // freopen( "1.in","r",stdin );
    // freopen( "1.out","w",stdout );
    ios::sync_with_stdio( false );
    cin.tie( nullptr ); cout.tie( nullptr );
    ll n;
    int k, q;
	cin>>n>>k>>q;
    ll x, y;
    for( int i=1;i<=q;i++ )
    {
        cin>>x>>y;
        if( k == 1 ) cout<<abs( x-y )<<"\n";
        else
        {
            ll d1=1, d2=0, tmp=x;
            while( tmp ) dep[tmp]=d1++, tmp=( tmp+k-2 )/k;
            while( y )
            {
                if( dep[y] != 0 )
                { cout<<d2+dep[y]-1<<"\n"; break; }
                d2++; y=( y+k-2 )/k;
            }
            while( x ) dep[x]=0, x=( x+k-2 )/k;
        }
    }
	QWQ
}
```

</details>