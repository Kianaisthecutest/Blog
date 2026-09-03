---
title: Many Repunit sum
date: 2026-06-13
slug: 题解/Atcoder/ABC-444/D-Many-Repunit-Sum
tags: [题解, 差分, 前缀和]
---

{/*truncate*/}

<h5>

每个$A_i$相当于区间$[1,A_i]$加一，直接转化为差分解决即可

</h5>

<summary><h3>AC代码</h3></summary>
<details>
	
```cpp
/*
相当于区间加1操作，看作差分即可速解 
*/
#include<bits/stdc++.h>
using namespace std;
#define QAQ return 
#define QWQ return 0;
#define ll long long
#define pii pair< int,int >

const int N=2e5+10, maxv=4e5;

int b[N], sum[N<<1];

int main()
{
//	freopen( "txt.in","r",stdin );
//	freopen( "txt.out","w",stdout );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	int n;
	cin>>n;
	for( int i=1;i<=n;i++ ) cin>>b[i], sum[b[i]]++;
	for( int i=maxv;i>=1;i-- ) sum[i]+=sum[i+1];
	for( int i=1;i<=maxv;i++ ) sum[i+1]+=sum[i]/10, sum[i]%=10;
	bool flag=true;
	for( int i=maxv;i>=1;i-- )
	if( !flag || sum[i] ) cout<<sum[i], flag=false;
	QWQ	  
}
```

</details>

<h5>

时间复杂度：$O(n)$

</h5>