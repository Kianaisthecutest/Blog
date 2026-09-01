---
title: Subsequence Substring
date: 2026-05-24
slug: 题解/Atcoder/ABC-452/D-Subsequence-Substring
tags: [题解, ABC, 模拟]
---

{/*truncate*/}

<h5>

首先我们想一下暴力的问题出在哪里：寻找子串的时候需要暴力全跳，但是我们的目标字符是固定的

于是可以和很快的想到解决方案，就是记录到下一个任意字符的下标，于是可以减去很多无用的遍历

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

const int N=2e5+10;

int mem[26];
int nxt[N][26];

int main()
{
//	freopen( "txt.in","r",stdin );
//	freopen( "txt.out","w",stdout );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	string s1, s2;
	cin>>s1>>s2;
	int n=s1.size(), m=s2.size();
	s1="a"+s1, s2="a"+s2; 
	for( int i=0;i<26;i++ ) mem[i]=n+1;
	for( int i=n;i>=0;i-- )
	{
		for( int j=0;j<26;j++ ) nxt[i][j]=mem[j];
		mem[s1[i]-'a']=i;
	}
	ll ans=0;
	for( int i=1;i<=n;i++ )
	{
		int now=i-1;
		for( int j=1;j<=m && now<=n;j++ ) now=nxt[now][s2[j]-'a'];
		ans+=now-i;
	}
	cout<<ans;
	QWQ	 
}
```

</details>

<h5>

时间复杂度：$O(nm)$

</h5>
