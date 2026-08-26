---
title: Rima
date: 2026-08-26
slug: blog/题解/COCI/2016-2017-A/D-Rima.md
tags: [题解, COCI, 字典树，动态规划]
---

<h2>字典树，动态规划</h2>

{/*truncate*/}

## [COCI 2016/2017 #4] Rima
<details>
<summary>题干</summary>

<h2>题目描述</h2>

规定字符串 $A,B$ 的最长公共后缀的长度为 $\text{LCS}(A,B)$。

当 $\text{LCS}(A,B) \ge \max(|A|,|B|)-1$ 时，我们认为 $A,B$ 两个字符串押韵。

给定 $N$ 个字符串，要求从中组合出一个长度最长的字符串序列（序列长度为该序列所包含字符串的数量），使得序列中相邻两个字符串押韵。

<h2>输入格式</h2>

第一行，一个整数 $N$。

接下来的 $N$ 行，每行一个字符串。保证所有字符串互不相同，由小写字母组成，且总长度不超过 $3 \times 10^6$。

<h2>输出格式</h2>

输出字符串序列长度的最大值。

<h2>输入输出样例 #1</h2>

<h3>输入 #1</h3>

```
4
honi
toni
oni
ovi
```

<h3>输出 #1</h3>

```
3
```

<h2>输入输出样例 #2</h2>

<h3>输入 #2</h3>

```
5
ask
psk
krafna
sk
k
```

<h3>输出 #2</h3>

```
4
```

<h2>输入输出样例 #3</h2>

<h3>输入 #3</h3>

```
5
pas
kompas
stas
s
nemarime
```

<h3>输出 #3</h3>

```
1
```

<h2>说明/提示</h2>

**【样例 2 解释】**

字符串序列 $\texttt{ask-psk-sk-k}$ 长度最大，为 $4$。

**【样例 3 解释】**

没有任何两个字符串押韵，因此任何一个字符串都可以单独组成一个序列，答案为 $1$。

**【数据规模与约定】**

对于 $30\%$ 的数据，$N \le 18$。

对于 $100\%$ 的数据，$1 \le N \le 5 \times 10^5$。

**【提示与说明】**

**题目译自 [COCI 2016-2017](https://hsin.hr/coci/archive/2016_2017/) [CONTEST #4](https://hsin.hr/coci/archive/2016_2017/contest4_tasks.pdf) _T5 Rima_。**

**本题分值按 COCI 原题设置，满分 $140$。**

</details>

***

## 分析

<h5>

第一眼以为是个自动机，结果后面发现好像字典树上跑$DP$就行了(囧)

首先想到放在字典树上处理公共后缀的

根据题义，我们可以发现一个性质：若$s1$和$s2$押韵，则$||s1|-|s2|| = 0 or 1$

再发现因为是后缀，所以字典树上我们不好处理，因为前缀不同的字符串在不同子树中

所以想到将字符串翻转变成处理前缀，我们选择字典树上的一条路径并将他们从小到大排列就可以保证构造的序列合法

思考如何取得答案：因为长度要求，所以选择的点要么是兄弟要么是父子

最开始我想的在字典树上跑出一个极长的相邻的全是$1$的链就可以了

但是问题就在这里，因为我们还可以以这条链深度最小的那个字符串放在最中间

另一边放这个点的另一颗子树里的一条链就可以了

于是变成树上$DP$寻找一个点为根情况下子树中的最长链和次长链，作和即可

时间复杂度：$O(\sum_{i=1}^{n}|str_i|)$

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

const int N=5e6+10;

int ans, cnt=1;
int trie[N][26], ed[N];
int f[N];
bool vis[N];

inline void add( string s )
{
    int p=1;
    for( int i=s.size()-1;i>=0;i-- )
    {
        if( !trie[p][s[i]-'a'] ) trie[p][s[i]-'a']=++cnt;
        p=trie[p][s[i]-'a'];
    }
    ed[p]++;;
}

inline void tree_dp( int p )
{
    int siz=0, mx1=0, mx2=0;
    for( int i=0;i<26;i++ ) if( trie[p][i] )
    {
        tree_dp( trie[p][i] );
        siz+=ed[trie[p][i]];
        if( mx1 < f[trie[p][i]] )       mx2=mx1, mx1=f[trie[p][i]];
        else if ( mx2 < f[trie[p][i]] ) mx2=f[trie[p][i]];
    } 
    if( ed[p] ) f[p]=mx1+max( siz,1 );
    ans=max( ans,mx1+mx2+ed[p]+max( siz-2,0 ) );
}

int main()
{
    // freopen( "1.in","r",stdin );
    // freopen( "1.out","w",stdout );
    ios::sync_with_stdio( false );
    cin.tie( nullptr ); cout.tie( nullptr );
    int n;
    cin>>n;
    string s;
    for( int i=1;i<=n;i++ ) cin>>s, add( s );
    tree_dp( 1 );
    cout<<ans;
    QWQ
}
```

</details>