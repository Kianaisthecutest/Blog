---
title: Diagonal Separation 2
date: 2026-06-12
slug: 题解/Atcoder/ABC-442/F-Diagonal-Separation-2
tags: [题解, 动态规划, 前缀和]
---

{/*truncate*/}

<h5>

首先根据这个题意我们可以想到它一定构成一个从左上角开始的倒三角

于是我们记录每行的前缀白色和，每行$DP$下来即可

</h5>

<summary><h3>AC代码</h3></summary>
<details>
	
```cpp
/*
一定构成一个的白色倒三角 
*/
#include<bits/stdc++.h>
using namespace std;
#define QAQ return
#define QWQ return 0;
#define ll long long
#define pii pair< int,int >

const int N=5e3+10;

int now[N], lst[N], sum[N];
int f[N][N], pre[N][N];
char mp[N][N];

int main()
{
//	freopen( "txt.in","r",stdin );
//	freopen( "txt.out","w",stdout );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	int n;
	cin>>n;
	for( int i=1;i<=n;i++ ) for( int j=1;j<=n;j++ ) cin>>mp[i][j];
	for( int i=1;i<=n;i++ )
	{
		for( int j=1;j<=n;j++ ) pre[i][j]=pre[i][j-1]+( mp[i][j] == '.' );
		sum[i]=pre[i][n];		
	}
	for(int i=1;i<=n;i++)
	{
		for(int j=0;j<=n;j++ ) now[j]=( j-pre[i][j] )+( sum[i]-pre[i][j] );
		lst[n]=f[i-1][n];
		for( int j=n-1;j>=0;j-- ) lst[j]=min( lst[j+1],f[i-1][j] );
		for( int j=0;j<=n;j++ ) f[i][j]=now[j]+lst[j];
	}
	int ans=1e9;
	for( int i=0;i<=n;i++ ) ans=min( ans,f[n][i] );
	cout<<ans;
	QWQ
}

```

</details>

<h5>

时间复杂度：$O(n^2)$

</h5>