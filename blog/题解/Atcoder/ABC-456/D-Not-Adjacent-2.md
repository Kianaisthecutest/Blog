---
title: Not Adjacent 2
date: 2026-05-05
slug: 题解/Atcoder/ABC-456/D-Not-Adjacent-2
tags: [题解, ABC, 数学]
---

{/*truncate*/}

<h5>

我们考虑记录出现的以$A,B,C$为结尾的字串的合法方案数，并以这个进行计算以每个点为终止位置时的方案数

容易想到对我们的方案产生影响的只有前面出现的相同字母的数量，位置无所谓因为一定会算作不同方案

所以我们记录上次的答案是$ans$，则它可以接在所有合法字串后面或单开一个串，即为$ana-1$，又为了合法性，所以我们要减去以该字符结尾的合法字串数量，如此操作即可

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

const int N=1e5+10, p=998244353;

inline int mp( char ch )
{
	if( ch == 'A' ) QAQ 0;
	if( ch == 'B' ) QAQ 1;
	if( ch == 'C' ) QAQ 2;
}

int cnt[3];

int main()
{
//	freopen( "txt.in","r",stdin );
//	freopen( "txt.out","w",stdout );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	string s;
	cin>>s;
	ll ans=0;
	for( auto &ch:s )
	{
		int idx=mp( ch );
		ll tmp=( ( ans+1-cnt[idx] )%p+p )%p;
		( cnt[idx]+=tmp )%=p;
		( ans+=tmp )%=p;
	}
	cout<<ans;
	QWQ
}
```

</details>

<h5>

时间复杂度：$O(n)$

</h5>