---
title: Lozinke
date: 2026-08-31
slug: 题解/COCI/2017-2018-A/A-Lozinke
tags: [题解, COCI, 字典树]
---

{/*truncate*/}

## [COCI 2017/2018 #1] Lozinke
<details>
<summary>题干</summary>

<h2>题目描述</h2>

最近，超级流行的社交网络 Secret Network 发生了用户信息泄露事件。其中包含所有用户的密码。

Mihael 是一名最近在研究计算机安全的年轻学生，他发现整个事件非常有趣。在对社交网络进行实验时，他发现了另一个安全漏洞！当你输入任何包含与实际密码相同的子字符串的字符序列时，登录将会成功。例如，如果用户的密码是 abc，输入字符串 abc、abcd 或 imaabcnema，系统将成功登录，而对于 axbc，登录将失败。

Mihael 想知道存在多少对不同用户的有序对，使得第一个用户可以使用他们自己的密码登录为第二个用户。

<h2>输入格式</h2>

输入的第一行包含正整数 $N$（$1 \leq N \leq 20000$），表示用户的数量。

接下来的 $N$ 行中的每一行包含用户的密码。密码由至少一个、最多 10 个小写英文字母组成。

<h2>输出格式</h2>

输出的第一行必须包含任务中有序对的数量。

<h2>输入输出样例 #1</h2>

<h3>输入 #1</h3>

```
3
aaa
aa
abb

```

<h3>输出 #1</h3>

```
1
```

<h2>输入输出样例 #2</h2>

<h3>输入 #2</h3>

```
3
x
x
xy

```

<h3>输出 #2</h3>

```
4
```

<h2>输入输出样例 #3</h2>

<h3>输入 #3</h3>

```
5
mir
mirta
ta
ir
t

```

<h3>输出 #3</h3>

```
6
```

<h2>说明/提示</h2>

第二个测试用例的说明：

第一个用户可以作为第二个用户登录，第二个用户可以作为第一个用户登录，第三个用户可以作为第一个和第二个用户登录。

题面翻译由 ChatGPT-4o 提供。

</details>

***

## 分析

<h5>

首先可以发现一个$trick$：长度最大只有10，告诉我们可以枚举字串

所以先把所有字符串丢到$Trie$上，然后枚举每个字符串的所有字串去查询即可

复杂度是$O(n\times |s|^2)$

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

const int N=2e4+10, M=1e6+10;

int cnt;
ll ans;
int ed[M];
int trie[M][26];
bool vis[M];
string s[N];

inline void add( string str )
{
    int p=0;
    for( auto &ch:str )
    {
        if( !trie[p][ch-'a'] ) trie[p][ch-'a']=++cnt;
        p=trie[p][ch-'a'];
    }
    ed[p]++;
}

inline void query( string str )
{
    int p=0;
    for( auto &ch:str )
    {
        if( !trie[p][ch-'a'] ) QAQ;
        p=trie[p][ch-'a'];
    }
    if( !vis[p] ) ans+=ed[p], vis[p]=true;
}

inline void requery( string str )
{
    int p=0;
    for( auto &ch:str )
    {
        if( !trie[p][ch-'a'] ) QAQ;
        p=trie[p][ch-'a'];
    }
    vis[p]=false;
}

int main()
{
    // freopen( "1.in","r",stdin );
    // freopen( "1.out","w",stdout );
    ios::sync_with_stdio( false );
    cin.tie( nullptr ); cout.tie( nullptr );
    int n;
    cin>>n;
    for( int i=1;i<=n;i++ ) cin>>s[i], add( s[i] );
    for( int i=1;i<=n;i++ )
    {
        vector< string > str;
        for( int l=1;l<=s[i].size();l++ )
        {
            string tmp;
            for( int r=l;r<=s[i].size();r++ ) tmp.push_back( s[i][r-1] ),str.push_back( tmp );
        }
        for( auto &S:str ) query( S );
        for( auto &S:str ) requery( S );
    }
    cout<<ans-n;
    QWQ
}
```

</details>