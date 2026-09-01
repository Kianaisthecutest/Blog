---
title: Team Division
date: 2026-05-17
slug: 题解/Atcoder/ABC-453/E-Team-Division
tags: [题解, ABC, 差分, 组合数学]
---

{/*truncate*/}

<h5>

首先可以想到枚举两个组分别有多少人，然后就可以变为处理组合计数了

容易想到对于每个状态，影响方案数的主要在于：“必须在某组的”和“两个组均可的”

然后我们就可以利用差分来处理已知当前组组人数时的方案数，求和即可

枚举组$A$的人数$i$，因为我们确定有$A_i-both_i$个一定在$A$组，又因为一共要选择$i$个，所以方案数为$C_{i-A_i+both_i}^{both_i}$

注意要判断此时这个状态是否合法

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

const int N=2e5+10, mod=998244353;

int A[N], B[N], both[N];
ll jc[N], inv[N], jc_inv[N];

inline ll C( int n,int m ){ QAQ jc[n]*jc_inv[m]%mod*jc_inv[n-m]%mod; }

int main()
{
//	freopen( "txt.in","r",stdin );
//	freopen( "txt.out","w",stdout );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	int n;
	cin>>n;
	jc[0]=1, jc[1]=1;
	inv[0]=0, inv[1]=1;
	jc_inv[0]=1, jc_inv[1]=1;
	for( int i=2;i<=n;i++ )
	{
		jc[i]=jc[i-1]*i%mod;
		inv[i]=( -1ll*mod/i*inv[mod%i]%mod+mod )%mod;
		jc_inv[i]=jc_inv[i-1]*inv[i]%mod;
	} 
	for( int i=1, l, r, x, y;i<=n;i++ ) 
	{
		cin>>l>>r;
		x=max( l,n-r ), y=min( r,n-l );
		if( x <= y ) both[x]++, both[y+1]--;
		A[l]++, A[r+1]--;
		B[n-r]++, B[n-l+1]--;
	}
	for( int i=1;i<=n;i++ ) A[i]+=A[i-1], B[i]+=B[i-1], both[i]+=both[i-1];
	ll ans=0;
	for( int i=1;i<n;i++ ) if( A[i]+B[i]-both[i] == n && A[i]-both[i] <= i && B[i]-both[i] <= n-i ) ( ans+=C( both[i],i-A[i]+both[i] ) )%=mod;
	cout<<ans;
	QWQ	 
}
```

</details>

<h5>

时间复杂度：$O(nlogn)$

</h5>