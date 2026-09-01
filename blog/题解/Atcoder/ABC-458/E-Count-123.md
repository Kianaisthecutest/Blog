---
title: Count 123
date: 2026-05-22
slug: 题解/Atcoder/ABC-458/E-Count-123
tags: [题解, ABC, 组合数学]
---

{/*truncate*/}

<h5>

组合数学简单题

首先因为相邻两数的差不超过$1$，简言之就是$1$和$3$不能相邻，中间必须要使用$2$隔开

所以我们插板法，数字$2$就是那个板子，并枚举选$i$隔间放数字$1$

首先就是隔间的选法，因为可以最左或最右放非$2$，所以一共$x2+1$个可放隔间，方案数为$C_{i}^{x2+1}$

然后就是将$1$填入这$i$个空间且不能空，插板法得到方案数为$C_{i-1}^{x1-1}$

最后再在$x2+1-i$个隔间中放$3$且可以空，继续插板(先补充$x3$个)得到方案数为$C_{x2-i}^{x2+x3-i}$

相乘求和即可

</h5>

<summary><h3>AC代码</h3></summary>
<details>
	
```cpp
#include<bits/stdc++.h>
using namespace std;
#define QAQ return 
#define QWQ return 0;
#define ll long long
#define pii pair< int,int >

const int N=3e6+10, mod=998244353;

ll inv[N], jc[N], jc_inv[N];

inline ll C( int n,int m ){ QAQ jc[n]*jc_inv[m]%mod*jc_inv[n-m]%mod; }

int main()
{
//	freopen( "txt.in","r",stdin );
//	freopen( "txt.out","w",stdout );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	int x1, x2, x3;
	cin>>x1>>x2>>x3;
	jc[0]=1, jc[1]=1;
	inv[0]=0, inv[1]=1;
	jc_inv[0]=1, jc_inv[1]=1;
	for( int i=2;i<=x1+x2+x3;i++ )
	{
		jc[i]=jc[i-1]*i%mod;
		inv[i]=( -1ll*mod/i*inv[mod%i]%mod+mod )%mod;
		jc_inv[i]=jc_inv[i-1]*inv[i]%mod;
	}
	ll ans=0;
	//由 2 分割开的一些 1 或 3 的段
	//想到拿 2 当隔板去分不同颜色的球来组合计数
	//好像写不了，不同颜色的多段间很难计数 
	//不如思考能不能变成装异色球计数，这个还能写
	//不如将每个隔板间插入一对不同颜色的球，这样放进去就一定是异色的了 
	//所以我们计算至少有 i 个盒子装了不同颜色的球的方案数，最后将这一组异色球拿出来即可，转化为一般隔板问题 
	//化为数学式子就是 (x2+1) 个隔间选 i 个至少存在一个 1 C(x2+1,i)，那么就是往这些 i 段里至少放每段至少一个 1 的方案数，插板得 C(x1-1,i-1)，再给剩下的位置 (x2-i+1) 段放 3，且可以有没有放的的方案数就是继续插板 C(x3+x2-i,x3) 
	for( int i=1;i<=x2;i++ ) if( x1-1 >= i-1 ) ( ans+=C( x2+1,i )*C( x1-1,i-1 )%mod*C( x3+x2-i,x3 ) )%=mod;
	//cao因为段分的不合法的 x1-1 < i-1 的情况没判到条了半天 
	cout<<ans;
	QWQ	 
}
```

</details>

<h5>

时间复杂度：$O(n)$

</h5>
