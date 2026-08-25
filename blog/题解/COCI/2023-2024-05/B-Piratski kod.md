---
title: Piratski kod
date: 2026-08-25
slug: blog/题解/COCI/2023-2024-05/B-Piratski kod.md
tags: [题解, COCI, DP, 组合数学]
---

DP，组合数学

{/*truncate*/}

便于描述，以下将「没有两个连续的$1$的序列」称为「散块」，将「末尾的两个字符都是$1$的序列」称为「整块」

不难发现一个价值不为$0$的二进制序列其实就是一个整块加上一个散块，所以问题转化为如何求散块和整块的价值

我们设计$f_{i,0/1}$的含义为：长度为$i$的散块，结尾为$0/1$的价值总和

考虑怎么转移

显然转移应该从$f_{i−1,0/1}$增加$0/1$得到$f_{i,0/1}$​

增加一个$0$好办，因为不会增加价值，所以得到转移方程：

$f_{i,0}​=f_{i−1,0}​+f_{i−1,1}​$，

增加一个$1$会对每一条序列都增加$Fib$的价值

注意到是每一条，所以还要再设计一个数组$num_{i,0/1}$​，意思是长度为$i$，结尾为$0/1$的散块的个数

$num$数组的转移是简单的，注意不能连续放两个$1$就行：

$num_{i,0}​=num_{i−1,0}​+num_{i−1,1}​，num_{i,1}​=num_{i−1,0}$​

回到刚才$f$数组的转移，现在已经求出了序列的个数，转移方程就出来了：

$f_{i,1}​=f_{i−1,0}​+num_{i−1,0}​\times Fib_{i+1}$

现在散块算完了，该算整块了,整块和散块的计算是类似的

定义$g_i$为长度为$i$的整块的价值总和$sum_i$​为长度为$i$的整块个数

根据整块的定义，可以发现一个以$1$结尾的散块在末尾加上不计算价值的$1$就成为了整块，同时两个整块拼接在一起仍然是整块

所以为了避免重复计算或者漏算，计算$g_i$时将这个整块拆分成一个前面计算过的整块和一个用散块加$1$形成的整块。

状态转移方程可以推理得到：

$g_i​=\sum_{j=1}^{i-1}​f_j​​\times sum_{i−j−1}​+g_{i−j−1}​​\times num_{j,1}​$

其中$j$枚举的是散块的长度，任意一个整块和任意一个散块合并都会产生贡献，所以用到乘法原理

$sum$数组的转移是类似的：$sum_i​=\sum_{j=1}^{i-1}​sum{i−j−1}​​\times num{j,1}​$

好了，现在散块和整块的价值都计算完毕，最后的价值不为$0$的序列是由一个整块和散块合并而成的，枚举整块的长度即可：

$ans_i​=\sum_{j=2}^{i}​g_j​\times (num_{i−j,0}​+num_{i−j,1}​)$

时间复杂度$O(n^2)$

```cpp
#include<bits/stdc++.h>
using namespace std;
#define ll long long
#define pii pair< int,int >
#define QWQ return 0;
#define QAQ return 

const int N=5e3+10, mod=1e9+7;

int fib[N];
int g[N], sum[N];
int f[N][2], num[N][2];

int main()
{
    // freopen( "1.in","r",stdin );
    // freopen( "1.out","w",stdout );
    ios::sync_with_stdio( false );
    cin.tie( nullptr ); cout.tie( nullptr );
    int n;
    cin>>n;
    fib[1]=1; fib[2]=1;
    for( int i=3;i<=n;i++ ) fib[i]=( fib[i-1]+fib[i-2] )%mod;
    num[0][0]=1;
    for( int i=1;i<=n;i++ )
    {
        f[i][0]=( f[i-1][0]+f[i-1][1] )%mod;
        f[i][1]=( f[i-1][0]+1ll*fib[i+1]*num[i-1][0] )%mod;
        num[i][0]=( num[i-1][0]+num[i-1][1] )%mod;
		num[i][1]=num[i-1][0];
    }
    sum[0]=1;
    for( int i=1;i<=n;i++ ) for( int j=1;j<i;j++ )
    {
        ( g[i]+=( 1ll*f[j][1]*sum[i-j-1]%mod+1ll*g[i-j-1]*num[j][1]%mod )%mod )%=mod;
        ( sum[i]+=1ll*sum[i-j-1]*num[j][1]%mod )%=mod; 
    }
    for( int i=1;i<=n;i++ )
	{
		int ans=0;
		for( int j=2;j<=i;j++ ) ( ans+=1ll*g[j]*( num[i-j][0]+num[i-j][1] )%mod )%=mod;
		cout<<ans<<" ";
	}
    QWQ
}
```