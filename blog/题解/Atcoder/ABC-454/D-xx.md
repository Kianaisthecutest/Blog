---
title: (xx)
date: 2026-05-06
slug: 题解/Atcoder/ABC-454/D-xx
tags: [题解, ABC, 模拟]
---

{/*truncate*/}

<h5>

题意是对$s1$字符串操作最后得到$s2$，我们可以想到对$s1$的增加操作等价于对$s2$的减少操作

所以不断对两个字符串进行减少，比较减少后的字符串是否相同即可

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

inline string get( string s1 )
{
	string s2;
	for( auto &ch:s1 )
	{
		s2+=ch;
		if( s2.size() >= 4 && s2.substr( s2.size()-4,s2.size() ) == "(xx)" )
		{
			s2.erase( s2.size()-4,s2.size() );
			s2+="xx";
		}
	}
	QAQ s2;
}

inline void sovel()
{
	string s1, s2;
	cin>>s1>>s2;
	cout<<( get( s1 ) == get( s2 ) ? "Yes" : "No" )<<"\n";
}

int main()
{
//	freopen( "txt.in","r",stdin );
//	freopen( "txt.out","w",stdout );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	int t;
	for( cin>>t;t;t-- ) sovel();
	QWQ
}
```

</details>

<h5>

时间复杂度：$O(tn)$

</h5>
