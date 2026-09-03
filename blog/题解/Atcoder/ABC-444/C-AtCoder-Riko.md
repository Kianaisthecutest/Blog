---
title: AtCoder Riko
date: 2026-06-13
slug: 题解/Atcoder/ABC-444/C-AtCoder-Riko
tags: [题解, 模拟]
---

{/*truncate*/}

<h5>

因为是一根断裂成两根或不变，所以我们可以很快的想到这个答案要么是最大+最小，要么就是最大

这个容易证明，因为如果不选这些情况就一定可以通过最大的那根构造出更大的一根

模拟即可

</h5>

<summary><h3>AC代码</h3></summary>
<details>
	
```cpp
/*
对所有的数配对或不配对，得到的值相等
易得要么是最大值，要么就两两配对 
*/
#include<bits/stdc++.h>
using namespace std;
#define QAQ return 
#define QWQ return 0;
#define ll long long
#define pii pair< int,int >

const int N=3e5+10;

ll a[N];

int main()
{
//	freopen( "txt.in","r",stdin );
//	freopen( "txt.out","w",stdout );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	int n;
	cin>>n;
	for( int i=1;i<=n;i++ ) cin>>a[i];
	sort( a+1,a+n+1 );
	ll maxv=a[n];
	bool flag=true;
	int num=0;
	for( int i=n;i>=1;i-- )
	if( a[i] == maxv ) num++;
	else               break;
	for( int i=1, j=n-num;i<j;i++, j-- ) flag&=( a[i]+a[j] == maxv );
	if( n-num&1^1 && flag ) cout<<maxv<<" ";
	flag=true;
	ll sum=a[1]+a[n];
	for( int i=1, j=n;i<j;i++, j-- ) flag&=( a[i]+a[j] == sum );
	if( n&1^1 && flag ) cout<<sum;
	QWQ	  
}
```

</details>

<h5>

时间复杂度：$O(nlogn)$

</h5>