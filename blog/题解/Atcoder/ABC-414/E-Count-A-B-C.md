---
title: Count A%B=C
date: 2025-07-15
slug: 题解/Atcoder/ABC-414/E-Count-A-B-C
tags: [题解, ABC, 数论分块]
---

{/*truncate*/}

<h5>

题意：求所有满足条件的三元组的数量

解题思路：因为要满足$a \neq b \neq c$，所以易得$c \leqslant b \leqslant a$，优先固定$a$，所以我们要求$ \sum_{b=1}^{a}\{ a \times b \} $

不好算是吧！我们用补集转化对这个式子进行一个变形：$ { \sum_{b=1}^{a}\{ \forall b \} } - { \sum_{b=1}^{a}\{ a|b \} } $

所以我们现在求$a$的所有因子就行了，而范围内有多少个值呢

由整除原理$ N \div a = c $时，$ a \times c \leqslant N $，所以可得$ c \leqslant \lfloor \frac{N}{a} \rfloor$，我们又将问题转化到了求$ \sum_{a=1}^N \lfloor \frac{N}{a} \rfloor$的个数上，大家用代码跑个实验找找每个$\lfloor \frac{N}{a} \rfloor$的规律

可以发现很多重复的值对不对，仔细数一下，不同的数的个数最多只有$ \sqrt n $个

这个时候就要祭出我们的大杀招：数论分块了

我们对所有的$ c \leqslant \lfloor \frac{N}{a} \rfloor$的可能分块，就可以避免对相同值的重复多次计算

在思考一下分块的方法，首先最后会更新为$ l = r+1 $是不必多说的，那么$r$的位置在哪里呢

回看一下我们的目的：寻找最大的$r$满足$ \lfloor \frac{N}{l} \rfloor = \lfloor \frac{N}{r} \rfloor$，因为是找最大的$r$，所以可以丢掉下取整写为$ \lfloor \frac{N}{l} \rfloor = \frac{N}{r} $

所以$ r = \lfloor \frac{N}{\lfloor \frac{N}{l}  \rfloor }  \rfloor(出题人想出这玩意家里得请哈基高了)$，然后跑循环迭代更新就能求得最大值了

</h5>

<summary><h3>AC代码</h3></summary>
<details>

```cpp
#include <bits/stdc++.h>
using namespace std;
#define ll long long

const int mod=998244353;
const int inv=( mod+1 )/2;

int main() {
//   	freopen( "txt.in","r",stdin );
//   	freopen( ".out","w",stdout );
	std::ios::sync_with_stdio( false );
	std::cin.tie( nullptr );
	ll n;
	cin>>n;
	ll p1=( n%mod )*( ( n+1 )%mod )%mod*inv%mod;
	ll p2=0;
	for( ll l=1,r;l<=n;l=r+1 )
	{
		//遍历所有可能产生的值, 只访问一次相同的数
		//[n/i]段中只有不超过 2sqrt(n) 个 
		r=n/( n/l );
		ll len=( r-l+1 )%mod;
		ll val=( n/l )%mod;
		p2=( p2+len*val%mod )%mod;
	}
	cout<<( p1-p2+mod )%mod;
	return 0;
}
```

</details>

**时间复杂度**：$O(\sqrt n)$