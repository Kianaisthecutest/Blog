---
title: 琪亚娜与小蛋糕
date: 2026-10-27
slug: 题解/洛谷-or-Nsoj/琪亚娜与OI比赛/C-琪亚娜与小蛋糕
tags: [题解, 博弈论]
---

{/*truncate*/}

<h5>

原本的题出锅了，只能改成更加恶心的了。

首先我们可以发现这个题纯粹暴力是不可能的，一定是有什么强优化点。

我们不妨先做一下部分分。

第一个部分分，这个很简单的每轮一个暴力求就可以了。

第二个部分分也简单，只需要在第一步的基础上做一下预处理就可以 $ O(n) $ 预处理 $ O(1) $ 回答了。

接下来有两种解决方案：

1 然后我们就可以瞪眼发现每 $382$ 为一个循环，预处理后取模输出即可。

***

2 我们发现我们只关注前 $7$ 个点的状态，不妨写成一个七位二进制数，一对应 $0$ ，二对应 $1$。

那么我们发现这个状态至多 $2^7-1$ 个，因为全部为 $0$ 的数列不会变化也不会由其他状态转移过来。

根据数学经验，证不多于后就可以证等于了，我们发现这个变化的序列可以写成这个样子 $b_{n+7}=b_{n+3}\oplus b_{n}$。

反复代入异或消元得到：

$$
\begin{aligned}
b_{n+8} &= b_{n+4} \oplus b_{n+1}, \\
b_{n+16} &= b_{n+4} \oplus b_{n+2} \oplus b_{n+1}, \\
b_{n+32} &= b_{n+2} \oplus b_{n+1}, \\
b_{n+64} &= b_{n+4} \oplus b_{n+2}, \\
b_{n+128} &= b_{n+1}.
\end{aligned}
$$

说明 $b_{n+127}=b_n$，又由于 $127$ 是一个质数，最小周期只能为 $1$ 或 $127$。

所以除了初始全 $0$ 序列，任意序列移动 $127$ 次后回到自身，即循环节为 $127$。

那么在一个长度为 $127$ 完整周期中，我们就会吃 $63$ 次 $1$，$64$ 次 $2$，总共 $191$ 个蛋糕。

也就是说：每行动 $127$ 轮后，吃蛋糕的规则回到原状态且总共吃掉 $191$ 个单位的蛋糕。

因为一个周期的长度为 $127$ 是奇数，所以此时是胜者交换 $winner(n-191) \neq winner(n)$。

所以在加上一轮变成 $254$ 轮时胜负延续就是 $winner(n-382) \neq winner(n)$。

于是得到胜负的循环节为 $382$，预处理一下就可以了。

时间复杂度：$O(500+Q)$

</h5>

```cpp
#include<bits/stdc++.h>
using namespace std;
#define ll long long
#define pii pair< int,int >
#define QWQ return 0;
#define QAQ return

const int N=1e3;
const int mod=382;

int cake[N], f[N];

inline void init( int n )
{
    cake[2]=cake[5]=1;
    cake[1]=cake[3]=cake[4]=cake[6]=cake[7]=2;
    for( int i=8;i<=n;i++ ) cake[i]=( cake[i-4] == cake[i-7] ? 1 : 2 );
    int siz=0;
    for( int i=1;i<=n;i++ )
    for( int j=1;j<=cake[i];j++ ) f[++siz]=i&1;
}

inline void sovel()
{
    ll n;
    cin>>n;
    cout<<( f[( n-1 )%mod+1] ? "Kiana" : "Mei" )<<"\n";
}

int main()
{
    // freopen( ".in","r",stdin );
    // freopen( ".out","w",stdout );
    ios::sync_with_stdio( false );
    cin.tie( nullptr ); cout.tie( nullptr );
    init( 500 );
    int t;
    for( cin>>t;t;t-- ) sovel();
    QWQ
}
```