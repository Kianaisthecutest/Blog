---
title: Hash Killer I
date: 2025-08-14
slug: 题解/洛谷-or-Nsoj/Hash-Killer-I
tags: [题解, 构造]
---

{/*truncate*/}

<h4>

好烦人啊，竟然要卡我最喜欢用的自然溢出，你知道的，[OI Wiki](https://oiwiki.33dai.wiki/string/hash/#%E5%8D%A1%E8%87%AA%E7%84%B6%E6%BA%A2%E5%87%BA-hash)真的很好用

首先对于$base$为偶数的情况，只要$l$够大(大于64)则一定会出现$base^l \equiv 0(mod 2^{64})$

然后对于$base$为奇数的情况，使用$Thue Morse$序列(一个$01$序列满足$a_0=0$，$n$为偶数时$a_n=a_{ \frac{n}{2}}$，$n$为奇数$a_n=1-a_{n-1}$)来构造

定义$ \lnot x$是对$01$串$x$按位取反的结果

则对于$Thue Morse$序列$s$，$s_0=0，s_n=s_{n-1}+ \lnot s_{n-1}$

对这两个做差得到

</h4>

$$
\begin{aligned}

s_n- \lnot s_n&=(s_{n-1} \times base^{2^{n-2}} + \lnot s_{n-1})( \lnot s_{n-1} \times base^{2^{n-2}} + s_{n-1})\\
&=(s_{n-1}- \lnot s_{n-1}) \times ( base^{2^{n-2}}-1 ) 

\end{aligned}
$$

<h4>

进行换元$f_n=s_n- \lnot s_n，g_n=base^{2^{n-2}}-1$

所以$f_n=f_{n-1} \times g_n$，进一步得到$f_n=f_1 \times \prod_{i=2}^{n}g_i$

所以不难发现$g$一定是一个偶数

再简短一点的方式，平方差可得$g_n=base^{2^{n-2}}-1=(base^{2^{n-3}}-1) \times (base^{2^{n-3}}+1)$

后半部分一定是一个偶数对吧，满足了我们的条件

然后根据计算，只要$n=12$就可以卡掉自然溢出(详细证明过程见OI Wiki)

</h4>

```cpp
int n=1<<12, len=n>>1;
cout<<n<<" "<<len<<"\n";
for( int i=0;i<n;i++ ) cout<<char( 'a'+( __builtin_popcount( i ) & 1 ) );
//luogu上能过，但是nsoj要wrong(没写spj)
```

