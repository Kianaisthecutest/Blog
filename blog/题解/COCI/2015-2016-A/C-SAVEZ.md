---
title: SAVEZ
date: 2026-09-04
slug: 题解/COCI/2015-2016-A/C-SAVEZ
tags: [题解, COCI, 哈希]
---

{/*truncate*/}

## [COCI 2015/2016 #4] CHEWBACCA
<details>
<summary>题干</summary>

# P7861 [COCI 2015/2016 #2] SAVEZ

## 题目描述

有一个秘密行星 S4 居住着一种奇特的动物，它们的学名是 Loda。Savez 协会派出了一个由 Henrik 将军领导的小组来研究 Loda。Henrik 发现，Loda 有心灵传输的能力，他想在他的军队里雇佣他们。

一只 Loda 由 $N$ 个字符串组成，其中第 $i$ 个字符串记为 $x_i$。研究表明，Loda 能进行的心灵传输次数取决于组成它的字符串的一个特殊子序列（不一定是连续的）。字符串 $x_i$ 和 $x_j\ (i<j)$ 都可以在该子序列中，当且仅当字符串 $x_j$ 以 $x_i$ 开头并以 $x_i$ 结尾。一只 Loda 可以进行的心灵传输次数是组成它的字符串的合法的最长子序列的长度，而你就需要确定它可以进行心灵传输的次数。

## 输入格式

第一行一个整数 $N$，表示组成某一只 Loda 的字符串总数。

接下来 $N$ 行，每行一个仅由大写英文字母构成的字符串 $x_i$，表示构成这一只 Loda 的字符串。

## 输出格式

一行一个整数，表示这只 Loda 可以进行心灵传输的次数。

## 输入输出样例 #1

### 输入 #1

```
5
A
B
AA
BBB
AAA
```

### 输出 #1

```
3
```

## 输入输出样例 #2

### 输入 #2

```
5
A
ABA
BBB
ABABA
AAAAAB
```

### 输出 #2

```
3
```

## 输入输出样例 #3

### 输入 #3

```
6
A
B
A
B
A
B
```

### 输出 #3

```
3
```

## 说明/提示

**【样例 1 解释】**

一个最长的子序列为 `A AA AAA`。

**【样例 3 解释】**

子序列中的字符串允许相等，因此一个最长的子序列为 `A A A` 或 `B B B`。

**【数据范围】**

对于 $100\%$ 的数据，$1\le N \le 2\times 10^6，1\le |x_i| \le 2\times 10^6$，**保证 $\sum |x_i|\le 2\times 10^6$**。

**【说明】**

**本题数据点得分依原题，满分 120**。

题目译自 [COCI 2015-2016](https://hsin.hr/coci/archive/2015_2016/) [CONTEST #2](https://hsin.hr/coci/archive/2015_2016/contest2_tasks.pdf) **T4 SAVEZ**。

</details>

***

## 分析

<h5>

一个另类的最长上升子序列问题

我们可以想到$hash$来判断能从那些状态转移，同时也能通过$hash$值来存储对应值的答案

所以可以$O(\sum_{i=1}^{n} |s_i|)$解决

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

const int p=131, mod=1e9+7;

unordered_map< int,int > f;

int main()
{
    // freopen( "1.in","r",stdin );
    // freopen( "1.out","w",stdout );
    ios::sync_with_stdio( false );
    cin.tie( nullptr ); cout.tie( nullptr );
    int n, ans=0;
    for( cin>>n;n;n-- )
    {
        string s;
        cin>>s;
        int m=s.size();
        int maxf=0;
        int suml=0, sumr=0, powp=1;
        for( int l=0, r=m-1;l<m;l++, r-- )
        {
            suml=( 1ll*suml*p%mod+s[l] )%mod;
            sumr=( 1ll*powp*s[r]%mod+sumr )%mod;
            powp=( 1ll*powp*p )%mod;
            if( suml == sumr && f.find( suml ) != f.end() ) maxf=max( maxf,f[suml] );
        }
        ans=max( ans,++maxf ); f[suml]=max( f[suml],maxf );
    }
    cout<<ans;
    QWQ 
}
```

</details>