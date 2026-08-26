---
title: Tavan
date: 2026-08-26
slug: 题解/COCI/2016-2017-A/A-Tavan.md
tags: [题解, COCI, 进制]
---

<h2>进制</h2>

{/*truncate*/}

## [COCI 2016/2017 #2] Tavan
<details>
<summary>题干</summary>

<h2>题目描述</h2>

Željko 正在读奶奶的一封信。由于年代久远，信中的一些单词已经无法辨认。他选出了一个长度为 $n$ 的单词，将其中 $m$ 个无法辨认的字母替换为 `#`。

对于每一处 `#`，奶奶都给出了 $k$ 个字母，该处原先的字母是这 $k$ 个字母之一。所有可能的单词中**按字典序排列**的第 $x$ 个，即为原先的单词。

请你帮助他们找出原先的单词。

<h2>输入格式</h2>

第一行四个整数 $n,m,k,x$。

第二行一个长度为 $n$ 的字符串，表示 Željko 选出的单词。

接下来 $m$ 行，每行一个长度为 $k$ 的字符串，表示奶奶给出的字母。

<h2>输出格式</h2>

一行，一个字符串，表示原先的单词。

<h2>输入输出样例 #1</h2>

<h3>输入 #1</h3>

```
9 2 3 7
po#olje#i
sol
znu 
```

<h3>输出 #1</h3>

```
posoljeni
```

<h2>输入输出样例 #2</h2>

<h3>输入 #2</h3>

```
4 1 2 2
#rak
zm 
```

<h3>输出 #2</h3>

```
zrak 
```

<h2>说明/提示</h2>

<h4>样例 1 解释</h4>

所有可能的单词按字典序排列如下：

- `pololjeni`
- `pololjeui`
- `pololjezi`
- `poooljeni`
- `poooljeui`
- `poooljezi`
- `posoljeni`
- `posoljeui`
- `posoljezi`

第 $7$ 个单词为 `posoljeni`。

------------

<h3>数据规模与约定</h3>

对于 $100\%$ 的数据，$1\le n\le 500$，$1\le m\le n$，$1\le k\le 26$，$1\le x\le 10^9$。

所有字符串中仅包含小写字母和 `#`。

------------

<h4>说明</h4>

**题目译自 [COCI2016-2017](https://hsin.hr/coci/archive/2016_2017/) [CONTEST #2](https://hsin.hr/coci/archive/2016_2017/contest2_tasks.pdf) _T2 Tavan_**。

</details>

***

## 分析

<h5>

首先我们明确一下这个排名如何计算

容易想到每一位的排名相对独立，因为我们当这一位变大时所有的更低位任意变换都是更小的

所以容易想到将$x$转成$k$进制数，于是就可以按照每一位的大小选择对应为上的相对大小的字母了

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

const int N=5e3+10;

int rk[N];
char ans[N];

int main()
{
    // freopen( "1.in","r",stdin );
    // freopen( "1.out","w",stdout );
    ios::sync_with_stdio( false );
    cin.tie( nullptr ); cout.tie( nullptr );
    int n, m, k, x;
    string s;
    cin>>n>>m>>k>>x>>s;
    x--;
    for( int i=1;i<=m;i++ ) rk[i]=x%k, x/=k;
    for( int i=1;i<=m;i++ )
    {
        char inch;
        vector< char  > ch;
        for( int j=1;j<=k;j++ ) cin>>inch, ch.push_back( inch );
        sort( ch.begin(),ch.end() );
        ans[i]=ch[rk[m-i+1]];
    }
    int cnt=0;
    for( auto &ch:s )
        if( ch == '#' ) cout<<ans[++cnt];
        else            cout<<ch;
    QWQ
}
```

</details>