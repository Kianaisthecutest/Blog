---
title: Mate
date: 2026-08-31
slug: 题解/COCI/2017-2018-A/B-Mate
tags: [题解, COCI, 组合数学]
---

{/*truncate*/}

## [COCI 2017/2018 #6] Mate
<details>
<summary>题干</summary>

<h2>题目描述</h2>

小 Mate 收到了一个由小写英文字母组成的数组，作为他父母送的礼物。为了让这个聪明的礼物有些用处，他决定在写下一首歌时用它来寻找押韵。

为了找到特定的韵脚，Mate 想要选择一个长度为 D 的单词，该单词以字符数组 XY 结尾，即倒数第二个字母是 X，最后一个字母是 Y。Mate 选择单词的过程是首先划掉给定序列中的一些字母，然后将未划掉的字母合并成一个单词。他想知道有多少种不同的方式可以划掉字母，以满足给定的条件。

如果两个单词的划掉字母的位置集合不同，则认为这两个单词是不同的。

<h2>输入格式</h2>

输入的第一行包含一个由小写英文字母组成的数组 S (2 ≤ |S| ≤ 2000)。

输入的第二行包含整数 Q (1 ≤ Q ≤ 500 000)，表示 Mate 需要选择单词的不同韵脚的数量。

接下来的 Q 行中的每一行包含一个整数 D (2 ≤ D ≤ |S|) 和一个由小写英文字母组成的字符数组 XY。

<h2>输出格式</h2>

Q 行中的第 $i$ 行必须包含第 $i$ 个韵脚所需的方式数。由于该数字可能非常大，只输出值对 1 000 000 007 取模后的结果。

<h2>输入输出样例 #1</h2>

<h3>输入 #1</h3>

```
banana
3
2 na
3 ba
4 nn
```

<h3>输出 #1</h3>

```
3
0
1
```

<h2>输入输出样例 #2</h2>

<h3>输入 #2</h3>

```
malimateodmameitate
3
10 ot
7 aa
3 me
```

<h3>输出 #2</h3>

```
2
464
56
```

<h2>说明/提示</h2>

在占总分 40% 的测试用例中，将满足 |S| ≤ 50。

在额外占总分 40% 的测试用例中，将满足 |S| ≤ 200。

**第一个测试用例的说明：**

以“na”结尾的长度为 2 的单词可以通过以下方式获得：

~~b a n a~~ **n a**，~~b a~~ **n a** ~~n a~~，~~b a~~ **n** ~~a n~~ **a**。

题面翻译由 ChatGPT-4o 提供。

</details>

***

## 分析

<h5>

我们将一个序列中选择的一个$XY$组按照$X$来划分成前后缀

前缀是多个数选择一些来补全，所以就是组合数学；后缀就是找$Y$的个数，与前缀满足乘法原理

所以我们每次询问将整个字符串从后往前扫一遍就可以了

注意要递推处理组合数或者预处理逆元，不然复杂度加一个$\log$就会倒闭

复杂度就是$O( q\times |s| )$

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

const int N=1e5+10, mod=1e9+7;


ll jc[N], inv[N], jc_inv[N];

inline void init( int n )
{
    jc[0]=1, jc[1]=1;
	inv[0]=0, inv[1]=1;
	jc_inv[0]=1, jc_inv[1]=1;
	for( int i=2;i<=n;i++ )
		jc[i]=jc[i-1]*i%mod,
		inv[i]=( -mod/i*inv[mod%i]%mod+mod )%mod,
		jc_inv[i]=( jc_inv[i-1]*inv[i]%mod+mod )%mod;
}

inline ll C( int n,int m )
{
    if( n < m ) QAQ 0ll;
    QAQ jc[n]*jc_inv[m]%mod*jc_inv[n-m]%mod;
}

int main()
{
    // freopen( "1.in","r",stdin );
    // freopen( "1.out","w",stdout );
    ios::sync_with_stdio( false );
    cin.tie( nullptr ); cout.tie( nullptr );
    int q, d;
    string s, str;
    cin>>s;
    int n=s.size(); s=" "+s;
    init( n );
    for( cin>>q;q;q-- )
    {
        cin>>d>>str; str=" "+str;
        ll ans=0, sum=0;
        for( int i=n;i>=1;i-- )
        {
            if( s[i] == str[1] ) ( ans+=sum*C( i-1,d-2 ) )%=mod;
            if( s[i] == str[2] ) sum++;
        }
        cout<<ans<<"\n";
    }
    QWQ
}
```

</details>