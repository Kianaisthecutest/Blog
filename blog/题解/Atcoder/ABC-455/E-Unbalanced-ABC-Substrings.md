---
title: Unbalanced ABC Substrings
date: 2026-05-04
slug: 题解/Atcoder/ABC-455/E-Unbalanced-ABC-Substrings
tags: [题解, ABC, 容斥定理, 平衡树]
---

{/*truncate*/}

<h5>

考虑正难则反，利用容斥得到不满足限制的子序列数量然后做差

可以想到利用当前扫描的$A$-$B，A$-$C，B$-$C$可以唯一确定当前状态并推的满足条件的子序列数量

因为减数可能为负数并且容斥$A=B=C$的状态需要一个值对才能确定，所以使用$map$存储

</h5>

<summary><h3>AC代码</h3></summary>
<details>
	
```cpp
/*
用唯一的a，b，c间的差值映射数组，容斥当前位置的不满足条件的子序列数量 
答案做差即可 
*/ 
#include<bits/stdc++.h>
using namespace std;
#define QAQ return 
#define QWQ return 0;
#define ll long long
#define pii pair< int,int >

const int N=2e5+10;

map< int,int > AB, AC, BC;
map< pii,int > ABC;

int main()
{
//	freopen( "txt.in","r",stdin );
//	freopen( "txt.out","w",stdout );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	int n;
	string s;
	cin>>n>>s;
	s=" "+s;
	ll unb=0;
	AB[0]=AC[0]=BC[0]=ABC[{ 0,0 }]=1;
	int A=0, B=0, C=0;
	for( int i=1;i<=n;i++ )
	{
		if( s[i] == 'A' )      A++;
		else if( s[i] == 'B' ) B++;
		else                   C++;
		int ab=A-B, ac=A-C, bc=B-C;
		unb=unb+AB[ab]+AC[ac]+BC[bc]-ABC[{ ab,ac }]*2;
		AB[ab]++, AC[ac]++, BC[bc]++;
		ABC[{ ab,ac }]++;
	}
	cout<<1ll*n*( n+1 )/2-unb;
	QWQ;
}
```

</details>

<h5>

时间复杂度：$O(nlogn)$，瓶颈在于$map$的使用

</h5>