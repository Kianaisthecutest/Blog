---
title: Tail of Snake
date: 2026-05-31
slug: 题解/Atcoder/ABC-438/D-Tail-of-Snake
tags: [题解, ABC, 模拟, 前缀和]
---

{/*truncate*/}

<h5>

写出暴力后优化式子即可解决，具体看代码	

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

const int N=3e5+10;

int a[N], b[N], c[N];
ll suma[N], sumb[N], sumc[N];
ll delab[N], delbc[N];

int main()
{
//	freopen( "txt.in","r",stdin );
//	freopen( "txt.out","w",stdout );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	int n;
	cin>>n;
	for( int i=1;i<=n;i++ ) cin>>a[i], suma[i]=suma[i-1]+a[i];
	for( int i=1;i<=n;i++ ) cin>>b[i], sumb[i]=sumb[i-1]+b[i];
	for( int i=1;i<=n;i++ ) cin>>c[i], sumc[i]=sumc[i-1]+c[i];
	//暴力 for( int x=1;x<n;x++ ) for( int y=x+1;y<n;y++ ) ans=max( ans,suma[x]+sumb[y]-sumb[x]+sumc[n]-sumc[y] );
	//提取得到 ans=sumc[n]+max( ans,suma[x]+sumb[y]-sumb[x]-sumc[y] )
	//观察得后面式子为 suma[x]-sumb[x] + sumb[y]-sumc[y]
	//即找这个式子的最大值，分别做差得到 delab[x]+delbc[y]
	//变为枚举x，答案计算变为寻找(x,n)之间的最大delbc，变为线性处理区间最值
	for( int i=1;i<=n;i++ ) delab[i]=suma[i]-sumb[i], delbc[i]=sumb[i]-sumc[i];
	ll ans=-1e18, maxdel=delbc[n-1];
	for( int x=n-2;x>=1;x-- ) ans=max( ans,delab[x]+maxdel ), maxdel=max( maxdel,delbc[x] );
	cout<<sumc[n]+ans;
	QWQ	  
}
```

</details>

<h5>

时间复杂度：$O(n)$

</h5>
